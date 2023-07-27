import clsx from 'clsx';
import type { Decoration, LinkFormat, SubDecoration } from 'notion-types';
import { FC } from 'react';

import { colorStyles } from './colors';

interface TextRendererProps {
  text?: Decoration[];
}

const TextRenderer: FC<TextRendererProps> = ({ text = [] }) => {
  return text.map(([text, deco], idx) => {
    if (!deco) {
      return text;
    }

    const linkDeco = deco.find((v): v is LinkFormat => v[0] === 'a');
    if (linkDeco) {
      return (
        <a key={idx} href={linkDeco[1]} target='_blank' className={clsx(getSubdecoClass(deco))}>
          {text}
        </a>
      );
    }

    return (
      <span key={idx} className={clsx(getSubdecoClass(deco))}>
        {text}
      </span>
    );
  });
};

export default TextRenderer;

function getSubdecoClass(subDeco: SubDecoration[]): string[] {
  if (subDeco.length === 0) {
    return [];
  }

  return [getStyle(subDeco[0]), ...getSubdecoClass(subDeco.slice(1))];
}

function getStyle([type, extra]: SubDecoration) {
  if (type === 'b') {
    return 'font-bold';
  }
  if (type === '_') {
    return 'underline underline-offset-1';
  }
  if (type === 'a') {
    return 'text-gray1 hover:text-gray0 decoration-gray0 cursor-pointer underline hover:underline-offset-1';
  }
  if (type === 'h') {
    return colorStyles[extra] ?? '';
  }

  return '';
}

<div className='underline underline-offset-1' />;

// function hasType(subDeco: SubDecoration[], type: SubDecoration['0']) {
//   return subDeco.some((deco) => deco[0] === type);
// }
