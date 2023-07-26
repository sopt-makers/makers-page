import type { BlockComponentsBase } from '@/components/notion/renderer/BlockResolver';
import RichTextRenderer from '@/components/notion/renderer/RichTextRenderer';
import SyntaxHighlighter from '@/components/notion/renderer/SyntaxHighlighter';

import ToggleBlock from './ToggleBlock';

export const recruitBlockComponents = {
  heading_1: ({ block }) => (
    <h1 className='text-[4rem] font-bold'>
      <RichTextRenderer richText={block.heading_1.rich_text} />
    </h1>
  ),
  heading_2: ({ block }) => (
    <h2 className='text-[3.2rem] font-bold'>
      <RichTextRenderer richText={block.heading_2.rich_text} />
    </h2>
  ),
  heading_3: ({ block }) => (
    <h3 className='text-[2.4rem] font-bold'>
      <RichTextRenderer richText={block.heading_3.rich_text} />
    </h3>
  ),
  paragraph: ({ block }) => (
    <p className='text-[1.8rem]'>
      <RichTextRenderer richText={block.paragraph.rich_text} />
    </p>
  ),
  bulleted_list_item: ({ block, renderBlocks }) => (
    <div className='flex'>
      <div className='pr-[8px]'>•</div>
      <div className='flex flex-grow flex-col'>
        <div className='text-[1.8rem]'>
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
        <div className='text-[1.8rem]'>
          <RichTextRenderer richText={block.numbered_list_item.rich_text} />
        </div>
        {renderBlocks(block.children)}
      </div>
    </div>
  ),
  column_list: ({ block, renderBlocks }) => (
    <div className='flex whitespace-pre'>
      {block.children.map((column) => (
        <div key={column.id} className='min-w-0 flex-1'>
          {renderBlocks([column])}
        </div>
      ))}
    </div>
  ),
  column: ({ block, renderBlocks }) => <>{renderBlocks(block.children)}</>,
  child_page: ({ block, renderPageLink }) => (
    <div className='text-[1.8rem]'>{renderPageLink(block.id, block.child_page.title)}</div>
  ),
  code: ({ block }) => (
    <SyntaxHighlighter language={block.code.language} code={block.code.rich_text.map((t) => t.plain_text).join('')} />
  ),
  image: ({ block }) =>
    block.image.type === 'external' ? (
      <img
        src={block.image.external.url}
        alt={block.image.caption.map((v) => v.plain_text).join('')}
        className='w-full'
      />
    ) : (
      <div>Invalid Image: {JSON.stringify(block.image, null, 2)}</div>
    ),
  divider: () => (
    <div className='flex h-[1.3rem] w-full items-center'>
      <div className='h-[1px] w-full border-b border-white' />
    </div>
  ),
  toggle: ({ block, renderBlocks }) => (
    <ToggleBlock header={<RichTextRenderer richText={block.toggle.rich_text} />}>
      {renderBlocks(block.children)}
    </ToggleBlock>
  ),
} satisfies BlockComponentsBase;
