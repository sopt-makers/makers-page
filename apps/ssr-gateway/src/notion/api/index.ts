import type {
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

export function createRawNotionAPIClient(notionApiKey: string) {
  const defaultHeaders = {
    'Authorization': `Bearer ${notionApiKey}`,
    'Notion-Version': '2022-06-28',
  };

  async function fetchWithErrorHandling(url: string, options: RequestInit): Promise<Response> {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
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

  async function retrieveBlockChildren(id: string) {
    const response = await fetchWithErrorHandling(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, {
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

  return {
    databaseRetrieve,
    retrieveBlockChildren,
    retrievePage,
  };
}

export type NotionRawAPI = ReturnType<typeof createRawNotionAPIClient>;
