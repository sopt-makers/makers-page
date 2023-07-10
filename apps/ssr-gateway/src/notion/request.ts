import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { NotionRawAPI } from './api';

export type { BlockObjectResponse as NotionBlock };

export function createNotionAPI(notionRawAPI: NotionRawAPI) {
  async function getDatabaseContents(id: string) {
    const dbData = await notionRawAPI.databaseRetrieve(id);

    const objects = dbData.results.filter((result): result is PageObjectResponse => 'properties' in result);

    return objects;
  }

  async function getBlocks(id: string) {
    const data = await notionRawAPI.retrieveBlockChildren(id);

    const blocks = data.results.filter((result): result is BlockObjectResponse => 'type' in result);

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
