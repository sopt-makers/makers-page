import clsx from 'clsx';
import type { Decoration, SubDecoration } from 'notion-types';
import { FC } from 'react';

interface TextRendererProps {
  text: Decoration[];
}

const TextRenderer: FC<TextRendererProps> = ({ text }) => {
  return text.map(([text, deco], idx) => {
    if (!deco) {
      return text;
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

function getStyle([type, _extra]: SubDecoration) {
  if (type === 'b') {
    const newStyle = 'font-bold';
    return newStyle;
  }
  if (type === '_') {
    const newStyle = 'underline-offset-1';
    return newStyle;
  }

  return '';
}
