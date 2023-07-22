'use client';

import { FC, ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const FullPage: FC<PageProps> = ({ children }) => {
  return <div className='snap-start h-screen'>{children}</div>;
};

export default FullPage;
