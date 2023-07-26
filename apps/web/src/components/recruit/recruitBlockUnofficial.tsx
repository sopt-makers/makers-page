import { Decoration } from 'notion-types';

import type { BlockComponentsBase } from '@/components/notion/unofficial/BlockResolver';

import SyntaxHighlighter from '../notion/renderer/SyntaxHighlighter';
import TextRenderer from '../notion/unofficial/TextRenderer';
import ContentBlock from './ContentBlock';
import ToggleBlock from './ToggleBlock';

export const recruitBlockComponents = {
  header: ({ block }) => (
    <h1 className='text-[4rem] font-bold'>
      <TextRenderer text={block.properties?.title} />
    </h1>
  ),
  sub_header: ({ block }) => (
    <h2 className='text-[3.2rem] font-bold'>
      <TextRenderer text={block.properties?.title} />
    </h2>
  ),
  sub_sub_header: ({ block }) => (
    <h3 className='text-[2.4rem] font-bold'>
      <TextRenderer text={block.properties?.title} />
    </h3>
  ),
  text: ({ block }) => (
    <p className='min-h-[1em] whitespace-normal break-words text-[1.8rem]'>
      <TextRenderer text={block.properties?.title} />
    </p>
  ),
  bulleted_list: ({ block, ctx: { renderBlocks } }) => (
    <div className='flex'>
      <div className='pr-[8px]'>•</div>
      <div className='flex flex-grow flex-col'>
        <div className='text-[1.8rem]'>
          <TextRenderer text={block.properties?.title} />
        </div>
        {renderBlocks(block.content ?? [])}
      </div>
    </div>
  ),
  numbered_list: ({ block, streak, ctx: { renderBlocks } }) => (
    <div className='flex'>
      <div className='pr-[8px]'>{streak + 1}.</div>
      <div className='flex flex-grow flex-col'>
        <div className='text-[1.8rem]'>
          <TextRenderer text={block.properties?.title} />
        </div>
        {renderBlocks(block.content ?? [])}
      </div>
    </div>
  ),
  code: ({ block }) => (
    <SyntaxHighlighter language={plainText(block.properties?.language)} code={plainText(block.properties?.title)} />
  ),
  divider: () => (
    <div className='flex h-[1.3rem] w-full items-center'>
      <div className='h-[1px] w-full border-b border-white' />
    </div>
  ),
  toggle: ({ block, ctx: { renderBlocks } }) => (
    <ToggleBlock header={<TextRenderer text={block.properties?.title} />}>
      {renderBlocks(block.content ?? [])}
    </ToggleBlock>
  ),
  callout: ({ block, ctx: { renderBlocks } }) => (
    <div className='flex whitespace-pre'>
      <div className=''>{block.format.page_icon.startsWith('/') ? '' : block.format.page_icon}</div>
      <div className='flex-grow'>{renderBlocks(block.content ?? [])}</div>
    </div>
  ),
  column_list: ({ block, ctx: { renderBlocks } }) =>
    renderBlocks(block.content ?? [], { renderContainer: (children) => <div className='flex'>{children}</div> }),
  column: ({ block, ctx: { renderBlocks } }) =>
    renderBlocks(block.content ?? [], {
      renderContainer: (children) => (
        <div className='flex-1' style={{ flexGrow: block.format.column_ratio * 100 }}>
          {children}
        </div>
      ),
    }),
  image: ({ block }) => (
    <ContentBlock format={block.format}>
      <img
        src={block.properties.source[0][0]}
        alt='NotionImage'
        width={block.format?.block_width}
        height={block.format?.block_height}
      />
    </ContentBlock>
  ),
} satisfies BlockComponentsBase;

function plainText(text?: Decoration[]) {
  if (!text) {
    return '';
  }
  return text.map((v) => v[0]).join('');
}
