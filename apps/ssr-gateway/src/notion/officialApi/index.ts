import type {
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { PageChunk } from 'notion-types';
import { parsePageId } from 'notion-utils';

export function createRawNotionAPIClient(notionApiKey: string) {
  const defaultHeaders = {
    'Authorization': `Bearer ${notionApiKey}`,
    'Notion-Version': '2022-06-28',
  };

  async function fetchWithErrorHandling(url: string, options: RequestInit): Promise<Response> {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.text();
      console.error(errorData);
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  }

  async function databaseRetrieve(id: string) {
    const response = await fetchWithErrorHandling(`https://api.notion.com/v1/databases/${id}/query`, {
      method: 'POST',
      headers: defaultHeaders,
    });

    const data: QueryDatabaseResponse = await response.json();
    return data;
  }

  async function retrieveBlockChildren(id: string, cursor?: string) {
    const url = new URL(`https://api.notion.com/v1/blocks/${id}/children`);
    url.searchParams.set('page_size', '100');
    if (cursor) {
      url.searchParams.set('start_cursor', cursor);
    }

    const response = await fetchWithErrorHandling(url.href, {
      headers: defaultHeaders,
    });

    const data: ListBlockChildrenResponse = await response.json();
    return data;
  }

  async function retrievePage(id: string) {
    const response = await fetchWithErrorHandling(`https://api.notion.com/v1/pages/${id}`, {
      headers: defaultHeaders,
    });

    const data: GetPageResponse = await response.json();
    return data;
  }

  async function getPageUnofficial(
    id: string,
    {
      chunkLimit = 100,
      chunkNumber = 0,
    }: {
      chunkLimit?: number;
      chunkNumber?: number;
    } = {},
  ) {
    const parsedPageId = parsePageId(id);
    console.log(parsedPageId);

    if (!parsedPageId) {
      throw new Error(`invalid notion pageId "${id}"`);
    }

    const body = {
      pageId: parsedPageId,
      limit: chunkLimit,
      chunkNumber: chunkNumber,
      cursor: { stack: [] },
      verticalColumns: false,
    };

    const response = await fetchWithErrorHandling('https://www.notion.so/api/v3/loadPageChunk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data: PageChunk = await response.json();
    return data;
  }

  return {
    databaseRetrieve,
    retrieveBlockChildren,
    retrievePage,
    getPageUnofficial,
  };
}

export type NotionRawAPI = ReturnType<typeof createRawNotionAPIClient>;
