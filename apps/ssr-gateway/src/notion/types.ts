import type { NotionBlock } from '.';

export type PickNotionBlock<T extends NotionBlock['type']> = Extract<NotionBlock, { [key in T]: unknown }>;

export type NotionBlockData<T extends NotionBlock['type']> = PickNotionBlock<T>[T];
