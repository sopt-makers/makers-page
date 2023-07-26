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
    const title = pageBlock.properties?.title?.map((v) => v[0]).join('') ?? '제목 없음';

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

    const imageBlocks = Object.values(newBlockMap).filter(
      (block): block is typeof block & { type: 'image' } => block.type === 'image',
    );

    const queries = imageBlocks.flatMap((block) => {
      const source = block.properties?.source[0][0];
      if (source.includes('/secure.notion-static.com/')) {
        return {
          permissionRecord: {
            table: 'block' as const,
            id: block.id,
          },
          url: source,
        };
      }
      return [];
    });

    const { signedUrls } = await notionRawAPI.getSignedFileUrls(queries);

    const imageSignedUrlMap = Object.fromEntries(signedUrls.map((url, idx) => [imageBlocks[idx].id, url]));

    for (const block of Object.values(newBlockMap)) {
      if (block.type === 'image') {
        console.log();
        block.properties.source = [[imageSignedUrlMap[block.id]]];
      }
    }

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
