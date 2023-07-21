import { ReactElement } from 'react';
import { ModifiedBlock } from 'ssr-gateway';

import RichTextRenderer from './RichTextRenderer';
import SyntaxHighlighter from './SyntaxHighlighter';

interface BlockResolverProps<T extends string = string> {
  block: ModifiedBlock & { type: T };
  streak: number;
  renderBlocks: (blocks: ModifiedBlock[]) => ReactElement;
  renderPageLink: (id: string, name: string) => ReactElement;
}

export function BlockResolver({ block, streak, renderBlocks, renderPageLink }: BlockResolverProps) {
  const Comp = blockComponents[block.type as keyof typeof blockComponents] as (
    props: BlockResolverProps,
  ) => ReactElement;

  if (Comp) {
    return <Comp block={block} streak={streak} renderBlocks={renderBlocks} renderPageLink={renderPageLink} />;
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
  numbered_list_item: ({ block, streak, renderBlocks }) => (
    <div className='flex'>
      <div className='pr-[8px]'>{streak + 1}.</div>
      <div className='flex flex-grow flex-col'>
        <div className=''>
          <RichTextRenderer richText={block.numbered_list_item.rich_text} />
        </div>
        {renderBlocks(block.children)}
      </div>
    </div>
  ),
  column_list: ({ block, renderBlocks }) => (
    <div className='flex whitespace-pre'>
      {block.children.map((column) => (
        <div key={column.id} className='flex-grow flex-shrink-0'>
          {renderBlocks([column])}
        </div>
      ))}
    </div>
  ),
  column: ({ block, renderBlocks }) => <>{renderBlocks(block.children)}</>,
  child_page: ({ block, renderPageLink }) => <div>{renderPageLink(block.id, block.child_page.title)}</div>,
  code: ({ block }) => (
    <SyntaxHighlighter language={block.code.language} code={block.code.rich_text.map((t) => t.plain_text).join('')} />
  ),
  image: ({ block }) => <div>{JSON.stringify(block.image)}</div>,
} satisfies BlockRendererObjectBase;

type BlockRendererObjectBase = {
  [K in ModifiedBlock['type']]?: (props: BlockResolverProps<K>) => ReactElement;
};
