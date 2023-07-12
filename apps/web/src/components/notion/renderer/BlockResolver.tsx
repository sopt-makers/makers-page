import { ReactElement } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

import RichTextRenderer from './RichTextRenderer';

interface BlockResolverProps<T extends string = string> {
  block: ModifiedBlock & { type: T };
  streak: number;
  renderBlocks: (blocks: ModifiedBlock[]) => ReactElement;
}

export function BlockResolver({ block, streak, renderBlocks }: BlockResolverProps) {
  const Comp = blockComponents[block.type as keyof typeof blockComponents] as (
    props: BlockResolverProps,
  ) => ReactElement;

  if (Comp) {
    return <Comp block={block} streak={streak} renderBlocks={renderBlocks} />;
  }

  return <div>Unresolved Block type: {block.type}</div>;
}

const blockComponents = {
  heading_1: ({ block }) => (
    <h1>
      <RichTextRenderer richText={block.heading_1.rich_text} />
    </h1>
  ),
  heading_2: ({ block }) => (
    <h2>
      <RichTextRenderer richText={block.heading_2.rich_text} />
    </h2>
  ),
  heading_3: ({ block }) => (
    <h3>
      <RichTextRenderer richText={block.heading_3.rich_text} />
    </h3>
  ),
  paragraph: ({ block }) => (
    <p>
      <RichTextRenderer richText={block.paragraph.rich_text} />
    </p>
  ),
  bulleted_list_item: ({ block, renderBlocks }) => (
    <div className='flex'>
      <div className='pr-[8px]'>•</div>
      <div className='flex flex-grow flex-col'>
        <div className=''>
          <RichTextRenderer richText={block.bulleted_list_item.rich_text} />
        </div>
        {renderBlocks(block.children)}
      </div>
    </div>
  ),
  numbered_list_item: ({ block, streak: position, renderBlocks }) => (
    <div className='flex'>
      <div className='pr-[8px]'>{position + 1}.</div>
      <div className='flex flex-grow flex-col'>
        <div className=''>
          <RichTextRenderer richText={block.numbered_list_item.rich_text} />
        </div>
        {renderBlocks(block.children)}
      </div>
    </div>
  ),
} satisfies BlockRendererObjectBase;

type BlockRendererObjectBase = {
  [K in ModifiedBlock['type']]?: (props: BlockResolverProps<K>) => ReactElement;
};
