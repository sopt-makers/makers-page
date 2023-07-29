import { FC, ReactNode } from 'react';

interface RecruitLayoutProps {
  children: ReactNode;
}

const RecruitLayout: FC<RecruitLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-[100%] max-w-[80rem] px-[2.4rem] pb-[6rem] pt-[2rem] md:pt-[4rem]'>{children}</div>
    </div>
  );
};

export default RecruitLayout;
