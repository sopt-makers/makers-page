import { FC } from 'react';

interface RecruitLoadingProps {}

const RecruitLoading: FC<RecruitLoadingProps> = ({}) => {
  return (
    <div className='flex animate-pulse flex-col gap-[1rem] pt-[6rem]'>
      {[
        skeletons.header(6),
        skeletons.space(),
        skeletons.text(12),
        skeletons.text(12),
        skeletons.text(9),
        skeletons.text(4),
        skeletons.space(),
        skeletons.text(3),
        skeletons.text(12),
        skeletons.text(12),
        skeletons.text(10),
        skeletons.text(8),
        skeletons.text(12),
        skeletons.text(12),
        skeletons.text(3),
      ]}
    </div>
  );
};

export default RecruitLoading;

const skeletons = {
  header: (len: number) => (
    <div className='mb-[1rem] grid grid-cols-12'>
      <div className='h-[4rem] rounded-full bg-white/20' style={{ gridColumn: `span ${len} / span ${len}` }} />
    </div>
  ),
  text: (len: number) => (
    <div className='grid grid-cols-12'>
      <div className='h-[1.6rem] rounded-full bg-white/20' style={{ gridColumn: `span ${len} / span ${len}` }} />
    </div>
  ),
  space: () => <div className='h-[2rem]'></div>,
};
