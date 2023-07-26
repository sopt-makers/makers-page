import clsx from 'clsx';
import { BaseContentBlock } from 'notion-types';
import { FC, ReactNode } from 'react';

type Format = Exclude<BaseContentBlock['format'], undefined>;

interface ContentBlockProps {
  className?: string;
  format?: Format;
  children?: ReactNode;
}

const ContentBlock: FC<ContentBlockProps> = ({ className, format, children }) => {
  return <div className={clsx(format && alignStyles[format.block_alignment], className)}>{children}</div>;
};

export default ContentBlock;

const alignStyles = {
  left: 'self-start',
  center: 'self-center',
  right: 'self-end',
} satisfies Record<Format['block_alignment'], string>;
