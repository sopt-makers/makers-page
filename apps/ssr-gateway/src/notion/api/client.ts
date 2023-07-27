import { cloneDeep, uniq } from 'lodash-es';
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

    const blockMap = Object.fromEntries(Object.values(chunk.recordMap.block).map(({ value }) => [value.id, value]));
    const pageBlock = blockMap[pageId];

    if (!pageBlock || pageBlock.type !== 'page') {
      throw new Error('Invalid page');
    }
    const title = pageBlock.properties?.title?.map((v) => v[0]).join('') ?? null;

    const fetchMissing = async (blocks: Block[], blockMap: Record<string, Block>): Promise<Record<string, Block>> => {
      const unknownBlockIds = uniq(
        blocks
          .filter((block) => block.type !== 'page')
          .flatMap((block) => {
            if (block.content && block.content.length > 0) {
              return block.content.filter((id) => !blockMap[id]);
            }
            return [];
          }),
      );

      if (unknownBlockIds.length === 0) {
        return blockMap;
      }

      const newChunk = await notionRawAPI.syncRecordValues(unknownBlockIds);

      const mergedBlockMap = {
        ...blockMap,
        ...Object.fromEntries(Object.values(newChunk.recordMap.block).map(({ value }) => [value.id, value])),
      };

      return fetchMissing(getBlocks(newChunk), mergedBlockMap);
    };

    const mergedBlockMap = await fetchMissing(getBlocks(chunk), blockMap);

    return {
      title,
      pageBlock,
      blockMap: mergedBlockMap,
    };
  }

  async function SignFileUrls(blockMap: Record<string, Block>) {
    const queries = Object.values(blockMap).flatMap((block) => {
      if (block.type !== 'image') {
        return [];
      }

      const source = block.properties?.source[0][0];
      if (source.includes('/secure.notion-static.com/')) {
        return {
          blockId: block.id,
          query: {
            permissionRecord: {
              table: 'block' as const,
              id: block.id,
            },
            url: source,
          },
        };
      }
      return [];
    });

    const { signedUrls } = await notionRawAPI.getSignedFileUrls(queries.map(({ query }) => query));

    const imageSignedUrlMap = Object.fromEntries(queries.map(({ blockId }, idx) => [blockId, signedUrls[idx]]));

    const clonedBlockMap = cloneDeep(blockMap);

    for (const block of Object.values(clonedBlockMap)) {
      if (block.type === 'image') {
        block.properties.source = [[imageSignedUrlMap[block.id]]];
      }
    }

    return clonedBlockMap;
  }

  return {
    getPage,
    SignFileUrls,
  };
}

export type NotionUnofficialClient = ReturnType<typeof createNotionUnofficialClient>;
