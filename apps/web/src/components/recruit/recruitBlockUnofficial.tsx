import { Decoration } from 'notion-types';
import { ReactNode } from 'react';

import type { BlockComponentsBase } from '@/components/notion/unofficial/BlockResolver';

import { baseBlockComponents } from '../notion/unofficial/blockComponents/base';
import SyntaxHighlighter from '../notion/unofficial/blockComponents/SyntaxHighlighter';
import EnterRecruitBlock from './customBlocks/EnterRecruitBlock';

export const renderRecruitBlockContainer = (children: ReactNode) => (
  <div className='flex flex-col text-[1.6rem] text-[#f4f4f4] md:text-[1.8rem]'>{children}</div>
);

export const recruitBlockComponents = {
  ...baseBlockComponents,
  code: ({ block }) => {
    const customType = plainText(block.properties.caption).trim().toUpperCase();

    if (customType === 'CUSTOM:RECRUIT_BUTTON') {
      return <EnterRecruitBlock data={plainText(block.properties.title)} />;
    }

    return (
      <SyntaxHighlighter language={plainText(block.properties?.language)} code={plainText(block.properties?.title)} />
    );
  },
} satisfies BlockComponentsBase;

function plainText(text?: Decoration[]) {
  if (!text) {
    return '';
  }
  return text.map((v) => v[0]).join('');
}
