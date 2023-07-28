import clsx from 'clsx';
import type { Decoration, LinkFormat, SubDecoration } from 'notion-types';
import { FC } from 'react';

import { colorStyles } from './colors';

interface TextRendererProps {
  text?: Decoration[];
}

const TextRenderer: FC<TextRendererProps> = ({ text = [] }) => {
  return text.map(([c, deco], idx) => {
    if (!deco) {
      return c;
    }

    const linkDeco = deco.find((v): v is LinkFormat => v[0] === 'a');
    if (linkDeco) {
      return (
        <a key={idx} href={linkDeco[1]} target='_blank' className={clsx(getSubdecoClass(deco))}>
          {c}
        </a>
      );
    }

    if (deco.find((v) => v[0] === 'c')) {
      const isLeftCode = idx > 0 && hasType(text[idx - 1][1], 'c');
      const isRightCode = idx < text.length - 1 && hasType(text[idx + 1][1], 'c');

      return (
        <span
          key={idx}
          className={clsx(
            'rounded bg-[rgba(135,131,120,0.15)] py-[0.1rem] text-[#a33434]',
            !isLeftCode && 'rounded-l-[0.3rem] pl-[0.7rem]',
            !isRightCode && 'rounded-r-[0.3rem] pr-[0.7rem]',
          )}
          {...{ 'data-role': 'code' }}
        >
          <span className={clsx(getSubdecoClass(deco), 'text-[1.6rem]')}>{c}</span>
        </span>
      );
    }

    return (
      <span key={idx} className={clsx(getSubdecoClass(deco))}>
        {c}
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
    return 'underline underline-offset-4';
  }
  if (type === 'a') {
    return 'text-[#e2e2e2] hover:text-gray0 decoration-[#dfdfdf] hover:decoration-gray0 cursor-pointer underline underline-offset-2 transition-colors';
  }
  if (type === 'h') {
    return colorStyles[extra] ?? '';
  }

  return '';
}

function hasType(subDeco: SubDecoration[] | undefined, type: SubDecoration['0']) {
  return subDeco && subDeco.some((deco) => deco[0] === type);
}

const _newStyles =
  'text-[#ffffff] hover:text-gray0 decoration-[#ffffff] hover:decoration-gray0 cursor-pointer underline underline-offset-2 transition-colors';
