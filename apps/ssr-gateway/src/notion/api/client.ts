import { cloneDeep, uniq } from 'lodash-es';
import { Block, Decoration, PageChunk } from 'notion-types';
import { parsePageId } from 'notion-utils';

import { createUnofficialNotionRawClient } from './rawApi';

export function createNotionUnofficialClient() {
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

    const title = pageBlock.properties?.title?.map((v) => v[0]).join('') ?? '';

    const properties = (() => {
      if (!chunk.recordMap.collection) {
        return {};
      }

      if (pageBlock.parent_id in chunk.recordMap.collection && pageBlock.properties) {
        const properties = pageBlock.properties as Record<string, Decoration[]>;
        const collection = chunk.recordMap.collection[pageBlock.parent_id].value;
        return Object.fromEntries(
          Object.entries(collection.schema).map(([key, value]) => {
            const deco = properties[key];
            return [
              value.name,
              {
                type: value.type,
                value: deco,
              },
            ];
          }),
        );
      }

      return {};
    })();

    return {
      title,
      pageBlock,
      blockMap: mergedBlockMap,
      properties,
    };
  }

  async function signFileUrls(blockMap: Record<string, Block>) {
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

    if (queries.length === 0) {
      return blockMap;
    }

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

  async function resignSignedUrls(pageId: string, urls: string[]) {
    const result = await notionRawAPI.getSignedFileUrls(
      urls.map((url) => {
        const newUrl = new URL(url);
        newUrl.search = '';

        return {
          url: newUrl.href,
          permissionRecord: {
            table: 'block',
            id: parsePageId(pageId),
          },
        };
      }),
    );

    return result.signedUrls;
  }

  return {
    getPage,
    signFileUrls,
    resignSignedUrls,
  };
}

export type NotionUnofficialClient = ReturnType<typeof createNotionUnofficialClient>;
