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

    const blockMap = Object.fromEntries(
      Object.keys(chunk.recordMap.block).map((key) => [key, chunk.recordMap.block[key].value]),
    );
    const pageBlock = blockMap[pageId];

    if (!pageBlock || pageBlock.type !== 'page') {
      throw new Error('Invalid page');
    }

    const title = pageBlock.properties?.title?.map((v) => v[0]).join('') ?? '제목 없음';

    return {
      title,
      pageBlock,
      blockMap,
    };
  }

  return {
    getPage,
  };
}

export type NotionUnofficialClient = ReturnType<typeof createNotionUnofficialClient>;
