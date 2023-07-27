import { FC, ReactNode } from 'react';

interface RecruitLayoutProps {
  children: ReactNode;
}

const RecruitLayout: FC<RecruitLayoutProps> = ({ children }) => {
  return (
    <div className='flex justify-center'>
      <div className='w-[80rem] px-[2.4rem]'>{children}</div>
    </div>
  );
};

export default RecruitLayout;
