import { createRawNotionAPIClient } from './api';
import { NotionBlock, NotionPage } from './types';

export interface NotionImageHandler {
  save: (key: string, url: string) => Promise<{ url: string }>;
  getResponse: (key: string) => Promise<Response>;
}

export function createNotionClient(notionApiKey: string, imageSaver: NotionImageHandler) {
  const notionRawAPI = createRawNotionAPIClient(notionApiKey);

  async function getDatabaseContents(id: string) {
    const dbData = await notionRawAPI.databaseRetrieve(id);

    const objects = dbData.results.filter((result): result is NotionPage => 'properties' in result);

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

        if (block.type === 'image') {
          if (block.image.type === 'file') {
            const imagePath = new URL(block.image.file.url).pathname;
            const imageKey = imagePath.replace(/^\/secure.notion-static.com\//, '').replaceAll('/', '-');

            const { url: savedImageUrl } = await imageSaver.save(`${imageKey}`, block.image.file.url);

            return {
              ...block,
              image: {
                type: 'external' as const,
                caption: block.image.caption,
                external: { url: savedImageUrl, expiry_time: '' },
              },
            };
          }
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

const childrenableBlockTypes = [
  'bulleted_list_item',
  'numbered_list_item',
  'column_list',
  'column',
] satisfies NotionBlock['type'][];

function isChildrenableBlock(
  block: NotionBlock,
): block is typeof block & { type: (typeof childrenableBlockTypes)[number] } {
  return childrenableBlockTypes.includes(block.type as never);
}

export type X<T extends NotionBlock> = T extends { type: (typeof childrenableBlockTypes)[number] }
  ? T & { children: X<NotionBlock>[] }
  : T;

export type ModifiedBlock = X<NotionBlock>;

export type NotionClient = ReturnType<typeof createNotionClient>;
