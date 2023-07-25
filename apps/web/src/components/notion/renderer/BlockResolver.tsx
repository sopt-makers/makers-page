import { ReactElement } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

interface BlockComponentProps<T extends string = string> {
  block: ModifiedBlock & { type: T };
  streak: number;
  renderBlocks: (blocks: ModifiedBlock[]) => ReactElement;
  renderPageLink: (id: string, name: string) => ReactElement;
}

type BlockResolverProps = BlockComponentProps<string> & {
  blockComponents: BlockComponentsBase;
};

export function BlockResolver({ blockComponents, block, streak, renderBlocks, renderPageLink }: BlockResolverProps) {
  const Comp = blockComponents[block.type as keyof typeof blockComponents] as (
    props: BlockComponentProps,
  ) => ReactElement;

  if (Comp) {
    return <Comp block={block} streak={streak} renderBlocks={renderBlocks} renderPageLink={renderPageLink} />;
  }

  return <div>Unresolved Block type: {block.type}</div>;
}

export type BlockComponentsBase = {
  [K in ModifiedBlock['type']]?: (props: BlockComponentProps<K>) => ReactElement;
};
