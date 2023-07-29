'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { FC, ReactNode } from 'react';

import GithubLogo from '@/components/common/icons/GithubLogo';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <ReactLenis root>
      {children}
      <div className='flex items-center justify-end pb-[1.6rem] pr-[2rem]'>
        <a
          href='https://github.com/sopt-makers/makers-page'
          target='_blank'
          className='flex w-[2rem] items-center justify-center text-[#6c6c6c]'
        >
          <GithubLogo />
        </a>
      </div>
    </ReactLenis>
  );
};

export default MainLayout;
