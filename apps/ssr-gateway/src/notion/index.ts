import { createRawNotionAPIClient } from './api';
import { NotionBlock, PageObjectResponse } from './types';

export function createNotionClient(notionApiKey: string) {
  const notionRawAPI = createRawNotionAPIClient(notionApiKey);

  async function getDatabaseContents(id: string) {
    const dbData = await notionRawAPI.databaseRetrieve(id);

    const objects = dbData.results.filter((result): result is PageObjectResponse => 'properties' in result);

    return objects;
  }

  async function getBlocks(id: string): Promise<ModifiedBlock[]> {
    const data = await notionRawAPI.retrieveBlockChildren(id);
    const rawBlocks = data.results.filter((result): result is NotionBlock => 'type' in result);

    const blocks = await Promise.all(
      rawBlocks.map(async (block) => {
        if (isChildrenableBlock(block)) {
          return {
            ...block,
            children: block.has_children ? await getBlocks(block.id) : [],
          };
        }

        return block;
      }),
    );

    return blocks;
  }

  async function getPage(id: string) {
    const page = await notionRawAPI.retrievePage(id);
    if (!('properties' in page)) {
      throw new Error();
    }

    return page;
  }

  return {
    getDatabaseContents,
    getBlocks,
    getPage,
  };
}

const childrenableBlockTypes = ['bulleted_list_item', 'numbered_list_item'] satisfies NotionBlock['type'][];

function isChildrenableBlock(
  block: NotionBlock,
): block is typeof block & { type: (typeof childrenableBlockTypes)[number] } {
  return childrenableBlockTypes.includes(block.type as never);
}
function _modifiedBlockFactory(block: NotionBlock) {
  if (isChildrenableBlock(block)) {
    return {
      ...block,
      children: [] as NotionBlock[],
    } as const;
  }
  return { ...block } as const;
}
export type ModifiedBlock = ReturnType<typeof _modifiedBlockFactory>;

export type NotionClient = ReturnType<typeof createNotionClient>;
