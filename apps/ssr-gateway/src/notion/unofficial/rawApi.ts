import type { PageChunk } from 'notion-types';
import { parsePageId } from 'notion-utils';

export function createUnofficialNotionRawClient() {
  const defaultHeaders = {
    'Content-Type': 'application/json',
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

  async function loadPageChunk(
    id: string,
    opts: {
      chunkLimit?: number;
      chunkNumber?: number;
    } = { chunkLimit: 100, chunkNumber: 0 },
  ) {
    const parsedPageId = parsePageId(id);
    if (!parsedPageId) {
      throw new Error(`Invalid notion page id: ${id}`);
    }

    const response = await fetchWithErrorHandling('https://www.notion.so/api/v3/loadPageChunk', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        pageId: parsedPageId,
        limit: opts.chunkLimit,
        chunkNumber: opts.chunkNumber,
        cursor: { stack: [] },
        verticalColumns: false,
      }),
    });

    const data: PageChunk = await response.json();
    return data;
  }

  return {
    loadPageChunk,
  };
}

export type NotionRawAPI = ReturnType<typeof createUnofficialNotionRawClient>;
