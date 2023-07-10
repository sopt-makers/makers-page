import type { NotionBlock } from './request';

export type PickNotionBlock<T extends NotionBlock['type']> = Extract<NotionBlock, { [key in T]: unknown }>;

export type NotionBlockData<T extends NotionBlock['type']> = Extract<NotionBlock, { [key in T]: unknown }>[T];
