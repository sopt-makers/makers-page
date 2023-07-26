import type { Block } from 'notion-types';
import { ReactElement } from 'react';

export type NotionBlock = Block;

export interface NotionRendererContext {
  blockMap: Record<string, NotionBlock>;
  renderBlocks: (blockIds: string[], className?: string) => ReactElement;
  renderPageLink: (options: { id: string; name: string; className?: string }) => ReactElement;
}

export type PageLinkRenderer = (options: { id: string; name: string; className?: string }) => ReactElement;
