'use client';

import type { Color } from 'notion-types';
import { createContext, ReactNode } from 'react';

interface TableBlockContextValue {
  order: string[];
  format: Record<
    string,
    {
      width?: number;
      color?: Color;
    }
  >;
  rowHeader: boolean;
  columnHeader: boolean;
}

export const TableBlockContext = createContext<TableBlockContextValue>(
  new Proxy(
    {},
    {
      get() {
        throw new Error('TableBlockContextProvider is not set.');
      },
    },
  ) as never,
);

import { FC } from 'react';

type TableProviderProps = {
  children: ReactNode;
} & TableBlockContextValue;

export const TableProvider: FC<TableProviderProps> = ({ children, ...props }) => {
  return <TableBlockContext.Provider value={props}>{children}</TableBlockContext.Provider>;
};
