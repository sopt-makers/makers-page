import type { BlockComponentsBase } from '@/components/notion/renderer/BlockResolver';
import RichTextRenderer from '@/components/notion/renderer/RichTextRenderer';
import SyntaxHighlighter from '@/components/notion/renderer/SyntaxHighlighter';

export const blogBlockComponents = {
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
        <div key={column.id} className='min-w-0 flex-1'>
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
} satisfies BlockComponentsBase;
