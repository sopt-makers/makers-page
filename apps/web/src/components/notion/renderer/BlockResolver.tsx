import { ReactElement } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

import { BlockRenderer } from '.';
import RichTextRenderer from './RichTextRenderer';

interface BlockResolverProps {
  block: ModifiedBlock;
  position: number;
}

export function BlockResolver({ block, position }: BlockResolverProps) {
  const Comp = blockComponents[block.type as keyof typeof blockComponents] as (
    props: BlockResolverProps,
  ) => ReactElement;

  if (Comp) {
    return <Comp block={block} position={position} />;
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
  bulleted_list_item: ({ block }) => (
    <div className='flex'>
      <div className='pr-[8px]'>•</div>
      <div className='flex flex-grow flex-col'>
        <div className='text-[17px] font-light leading-[160%] text-gray10 md:text-[18px]'>
          <RichTextRenderer richText={block.bulleted_list_item.rich_text} />
        </div>
        {block.children && <BlockRenderer blocks={block.children} />}
      </div>
    </div>
  ),
} satisfies BlockRendererObjectBase;

type BlockRendererObjectBase = {
  [key in ModifiedBlock['type']]?: (props: { block: ModifiedBlock & { type: key }; position: number }) => ReactElement;
};
