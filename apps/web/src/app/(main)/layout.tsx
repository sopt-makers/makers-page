'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default MainLayout;
