import Link from 'next/link';
import { FC, ReactNode } from 'react';

import MakersLogo from '@/components/common/icons/MakersLogo';

interface RecruitLayoutProps {
  children: ReactNode;
}

const RecruitLayout: FC<RecruitLayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <div className='flex md:p-[2rem_3rem_1rem]'>
        <Link href='/' className='py-[2rem] md:p-[1rem_1.5rem] '>
          <MakersLogo className='h-[2rem] md:h-[3rem]' />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default RecruitLayout;
