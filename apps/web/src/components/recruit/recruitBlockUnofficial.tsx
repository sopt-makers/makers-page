import clsx from 'clsx';
import { Decoration } from 'notion-types';

import type { BlockComponentsBase } from '@/components/notion/unofficial/BlockResolver';

import SyntaxHighlighter from '../notion/official/SyntaxHighlighter';
import { colorStyles } from '../notion/unofficial/colors';
import TextRenderer from '../notion/unofficial/TextRenderer';
import ContentBlock from './ContentBlock';
import ToggleBlock from './ToggleBlock';

export const recruitBlockComponents = {
  header: ({ block }) => (
    <h1 className='mb-[1rem] mt-[3rem] text-[4rem] font-bold leading-[130%]'>
      <TextRenderer text={block.properties?.title} />
    </h1>
  ),
  sub_header: ({ block }) => (
    <h2 className='mb-[1rem] mt-[2.4rem] text-[3.2rem] font-bold'>
      <TextRenderer text={block.properties?.title} />
    </h2>
  ),
  sub_sub_header: ({ block }) => (
    <h3 className='mb-[1rem] mt-[1.5rem] text-[2.4rem] font-bold'>
      <TextRenderer text={block.properties?.title} />
    </h3>
  ),
  text: ({ block }) => (
    <p className='min-h-[1em] break-words py-[0.4rem] text-[1.8rem] leading-[140%]'>
      <TextRenderer text={block.properties?.title} />
    </p>
  ),
  bulleted_list: ({ block, ctx: { renderBlocks } }) => (
    <div className='flex'>
      <div className='pr-[8px] text-[1.8rem]'>•</div>
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
      <div className='pr-[8px] text-[1.8rem]'>{streak + 1}.</div>
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
      <div className='h-[1px] w-full border-b border-white/30' />
    </div>
  ),
  toggle: ({ block, ctx: { renderBlocks } }) => (
    <ToggleBlock header={<TextRenderer text={block.properties?.title} />}>
      {renderBlocks(block.content ?? [])}
    </ToggleBlock>
  ),
  callout: ({ block, ctx: { renderBlocks } }) => {
    const icon = block.format.page_icon.startsWith('/') ? null : block.format.page_icon;

    return (
      <div
        className={clsx(
          'my-[0.6rem] flex rounded-lg p-[1.6rem]',
          colorStyles[block.format.block_color] ?? 'bg-[#292929]',
        )}
      >
        {icon && (
          <div className='font-emoji flex h-[2.4rem] w-[2.4rem] items-center justify-center pr-[1rem] text-[2rem]'>
            {icon}
          </div>
        )}
        <div className='flex-grow text-[1.8rem] leading-[140%]'>
          <div>
            <TextRenderer text={block.properties.title} />
          </div>
          {renderBlocks(block.content ?? [])}
        </div>
      </div>
    );
  },
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
    <ContentBlock format={block.format} className='my-[1rem]'>
      <img
        src={block.properties.source[0][0]}
        alt='NotionImage'
        width={block.format?.block_width}
        height={block.format?.block_height}
        className={clsx(block.format?.block_page_width && 'w-full')}
        style={{ aspectRatio: block.format?.block_aspect_ratio && 1 / block.format?.block_aspect_ratio }}
      />
    </ContentBlock>
  ),
  page: ({ block, ctx: { renderPageLink } }) =>
    renderPageLink({ id: block.id, name: plainText(block.properties?.title), className: 'text-[1.8rem] px-[1rem]' }),
} satisfies BlockComponentsBase;

function plainText(text?: Decoration[]) {
  if (!text) {
    return '';
  }
  return text.map((v) => v[0]).join('');
}
