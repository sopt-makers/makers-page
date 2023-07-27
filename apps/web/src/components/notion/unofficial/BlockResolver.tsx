import type { Block } from 'notion-types';
import { ReactElement } from 'react';

import { NotionRendererContext } from './types';

interface BlockComponentProps<T extends string = string> {
  block: Block & { type: T };
  streak: number;
  ctx: NotionRendererContext;
}

type BlockResolverProps = BlockComponentProps<string> & {
  blockComponents: BlockComponentsBase;
};

export function BlockResolver({ blockComponents, block, streak, ctx }: BlockResolverProps) {
  const Comp = blockComponents[block.type as keyof typeof blockComponents] as (
    props: BlockComponentProps,
  ) => ReactElement;

  if (Comp) {
    return <Comp block={block} streak={streak} ctx={ctx} />;
  }

  return <div>Unresolved Block type: {block.type}</div>;
}

export type BlockComponentsBase = {
  [K in Block['type']]?: (props: BlockComponentProps<K>) => ReactElement;
};
