import { uniq } from 'lodash-es';
import { Block, PageChunk } from 'notion-types';
import { parsePageId } from 'notion-utils';

import { createUnofficialNotionRawClient } from './rawApi';

export interface NotionImageHandler {
  save: (key: string, url: string) => Promise<{ url: string }>;
  getResponse: (key: string) => Promise<Response>;
  delete: (keys: string[]) => Promise<void>;
}

export function createNotionUnofficialClient(_imageHandler: NotionImageHandler) {
  const notionRawAPI = createUnofficialNotionRawClient();

  async function getPage(id: string) {
    const pageId = parsePageId(id);
    const chunk = await notionRawAPI.loadPageChunk(pageId);

    const getBlocks = (chunk: PageChunk) => {
      return Object.keys(chunk.recordMap.block).map((key) => chunk.recordMap.block[key].value);
    };

    const blockMap = Object.fromEntries(
      Object.keys(chunk.recordMap.block).map((key) => [key, chunk.recordMap.block[key].value]),
    );
    const pageBlock = blockMap[pageId];

    if (!pageBlock || pageBlock.type !== 'page') {
      throw new Error('Invalid page');
    }

    const fetchMissing = async (blocks: Block[], blockMap: Record<string, Block>): Promise<Record<string, Block>> => {
      const unknownBlocks = blocks
        .flatMap((block) => {
          if (block.content && block.content.length > 0) {
            return block.content.filter((id) => !blockMap[id]);
          }
          return null;
        })
        .filter((id): id is string => !!id);

      if (unknownBlocks.length === 0) {
        return blockMap;
      }

      const newChunk = await notionRawAPI.syncRecordValues(uniq(unknownBlocks));

      const newBlockMap = {
        ...blockMap,
        ...Object.fromEntries(
          Object.keys(newChunk.recordMap.block).map((key) => [key, newChunk.recordMap.block[key].value]),
        ),
      };

      return fetchMissing(getBlocks(newChunk), newBlockMap);
    };

    const newBlockMap = await fetchMissing(getBlocks(chunk), blockMap);

    const title = pageBlock.properties?.title?.map((v) => v[0]).join('') ?? '제목 없음';

    return {
      title,
      pageBlock,
      blockMap: newBlockMap,
    };
  }

  return {
    getPage,
  };
}

export type NotionUnofficialClient = ReturnType<typeof createNotionUnofficialClient>;
