'use client';

import type { Decoration } from 'notion-types';
import { FC, useContext } from 'react';

import TextRenderer from '@/components/notion/unofficial/TextRenderer';

import { TableBlockContext } from './context';

interface TableRowBlockProps {
  columns: Record<string, Decoration[]>;
}

const TableRowBlock: FC<TableRowBlockProps> = ({ columns }) => {
  const { order, format } = useContext(TableBlockContext);

  const ordered = order.map((key) => ({ key, text: columns[key] }));

  const totalWidth = Object.values(format)
    .map((v) => v.width ?? 0)
    .reduce((prev, v) => prev + v, 0);

  return (
    <tr className='border-gray0 border-spacing-0 border'>
      {ordered.map(({ key, text }, idx) => {
        const width = format[key]?.width ?? undefined;
        return (
          <td
            key={idx}
            className='border-gray0 border-spacing-0 whitespace-pre-wrap border px-[1rem] py-[0.4rem] align-top text-[1.8rem]'
            style={{ width: width && `${width / totalWidth}%` }}
          >
            <TextRenderer text={text} />
          </td>
        );
      })}
    </tr>
  );
};

export default TableRowBlock;
