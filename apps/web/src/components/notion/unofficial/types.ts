import type { Block } from 'notion-types';
import { ReactElement, ReactNode } from 'react';

export type NotionBlock = Block;

export interface NotionRendererContext {
  renderBlocks: (
    blockIds: string[],
    options?: { renderContainer?: (children: ReactNode) => ReactElement },
  ) => ReactElement;
  renderPageLink: PageLinkRenderer;
}

export type PageLinkRenderer = (options: { id: string; name: ReactNode; className?: string }) => ReactElement;
