import type {
  BlockObjectResponse as NotionBlock,
  PageObjectResponse as NotionPage,
} from '@notionhq/client/build/src/api-endpoints';

export type { NotionBlock, NotionPage };

export type PickNotionBlock<T extends NotionBlock['type']> = Extract<NotionBlock, { [key in T]: unknown }>;

export type NotionBlockData<T extends NotionBlock['type']> = PickNotionBlock<T>[T];
