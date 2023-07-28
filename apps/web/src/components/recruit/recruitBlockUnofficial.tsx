import clsx from 'clsx';
import { Decoration } from 'notion-types';
import { ReactNode } from 'react';

import type { BlockComponentsBase } from '@/components/notion/unofficial/BlockResolver';

import SyntaxHighlighter from '../notion/official/SyntaxHighlighter';
import { colorStyles } from '../notion/unofficial/colors';
import TextRenderer from '../notion/unofficial/TextRenderer';
import ContentBlock from './ContentBlock';
import EnterRecruitBlock from './customBlocks/EnterRecruitBlock';
import TableBlock from './table/TableBlock';
import TableRowBlock from './table/TableRowBlock';
import ToggleBlock from './ToggleBlock';

export const renderRecruitBlockContainer = (children: ReactNode) => (
  <div className='flex flex-col text-[1.6rem] text-[#f4f4f4] md:text-[1.8rem]'>{children}</div>
);

export const recruitBlockComponents = {
  header: ({ block }) => (
    <h1 className='mb-[1rem] mt-[3rem] text-[3rem] font-bold leading-[130%] md:text-[4rem]'>
      <TextRenderer text={block.properties?.title} />
    </h1>
  ),
  sub_header: ({ block }) => (
    <h2 className='mb-[1rem] mt-[2.4rem] text-[2.6rem] font-bold md:text-[3.2rem]'>
      <TextRenderer text={block.properties?.title} />
    </h2>
  ),
  sub_sub_header: ({ block }) => (
    <h3 className='mb-[1rem] mt-[1.6rem] text-[2rem] font-bold md:text-[2.4rem]'>
      <TextRenderer text={block.properties?.title} />
    </h3>
  ),
  text: ({ block }) => (
    <p className='min-h-[1em] break-words py-[0.6rem] font-normal leading-[150%] text-white/80'>
      <TextRenderer text={block.properties?.title} />
    </p>
  ),
  bulleted_list: ({ block, ctx: { renderBlocks } }) => (
    <div className='flex'>
      <div className='pr-[8px] leading-[150%] text-white/80'>•</div>
      <div className='flex flex-grow flex-col'>
        <div className='leading-[150%] text-white/80'>
          <TextRenderer text={block.properties?.title} />
        </div>
        {renderBlocks(block.content ?? [])}
      </div>
    </div>
  ),
  numbered_list: ({ block, streak, ctx: { renderBlocks } }) => (
    <div className='flex'>
      <div className='pr-[8px] leading-[150%] text-white/80'>{streak + 1}.</div>
      <div className='flex flex-grow flex-col'>
        <div className='leading-[150%] text-white/80'>
          <TextRenderer text={block.properties?.title} />
        </div>
        {renderBlocks(block.content ?? [])}
      </div>
    </div>
  ),
  code: ({ block }) => {
    const customType = plainText(block.properties.caption).trim().toUpperCase();

    if (customType === 'CUSTOM:RECRUIT_BUTTON') {
      return <EnterRecruitBlock data={plainText(block.properties.title)} />;
    }

    return (
      <SyntaxHighlighter language={plainText(block.properties?.language)} code={plainText(block.properties?.title)} />
    );
  },
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
          'my-[1rem] flex rounded-[1rem] p-[2.2rem]',
          colorStyles[block.format.block_color] ?? 'bg-[#292929]',
        )}
      >
        {icon && (
          <div className='font-emoji mr-[1rem] mt-[0.2rem] flex h-[2.4rem] w-[2.4rem] items-center justify-center text-[2rem] leading-[100%]'>
            {icon}
          </div>
        )}
        <div className='flex-grow leading-[140%]'>
          <div className='mb-[1rem]'>
            <TextRenderer text={block.properties.title} />
          </div>
          {renderBlocks(block.content ?? [])}
        </div>
      </div>
    );
  },
  column_list: ({ block, ctx: { renderBlocks } }) =>
    renderBlocks(block.content ?? [], {
      renderContainer: (children) => <div className='flex flex-col md:flex-row'>{children}</div>,
    }),
  column: ({ block, ctx: { renderBlocks } }) =>
    renderBlocks(block.content ?? [], {
      renderContainer: (children) => (
        <div className='flex-1' style={{ flexGrow: block.format.column_ratio * 100 }}>
          {children}
        </div>
      ),
    }),
  image: ({ block }) => (
    <>
      {block.properties.source[0][0] && (
        <ContentBlock format={block.format} className='mx-[0.6rem] my-[1rem]'>
          <img
            src={block.properties.source[0][0]}
            alt='NotionImage'
            width={block.format?.block_width}
            height={block.format?.block_height}
            className={clsx(block.format?.block_page_width && 'w-full')}
            style={{ aspectRatio: block.format?.block_aspect_ratio && 1 / block.format?.block_aspect_ratio }}
          />
        </ContentBlock>
      )}
    </>
  ),
  page: ({ block, ctx: { renderPageLink } }) =>
    renderPageLink({
      id: block.id,
      name: (
        <>
          {block.format?.page_icon && <span className='pr-[0.6rem]'>{block.format.page_icon}</span>}
          <span className='underline decoration-white/20 underline-offset-4'>{plainText(block.properties?.title)}</span>
          <span className='pl-[0.6rem] text-white/60'>{' >'}</span>
        </>
      ),
      className: 'px-[1rem] py-[0.4rem] hover:bg-white/10 rounded transition-colors',
    }),
  table: (props) => <TableBlock {...props} />,
  table_row: ({ block }) => <TableRowBlock columns={block.properties} />,
} satisfies BlockComponentsBase;

function plainText(text?: Decoration[]) {
  if (!text) {
    return '';
  }
  return text.map((v) => v[0]).join('');
}
