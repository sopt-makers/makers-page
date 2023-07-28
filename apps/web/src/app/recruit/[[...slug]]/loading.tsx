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
        skeletons.text(8),
        skeletons.text(4),
        skeletons.space(),
        ...randGen(4, 10, () => skeletons.text()),
        skeletons.space(),
        ...randGen(5, 8, () => skeletons.text()),
      ]}
    </div>
  );
};

export default RecruitLoading;

function randInt(start: number, end: number) {
  return Math.floor(Math.random() * (end - start)) + start;
}

function randGen<T>(start: number, end: number, fn: () => T) {
  return [...new Array(randInt(start, end))].map(() => fn());
}

const skeletons = {
  header: (len: number) => (
    <div className='mb-[1rem] grid grid-cols-12'>
      <div className='h-[4rem] rounded-full bg-white/20' style={{ gridColumn: `span ${len} / span ${len}` }} />
    </div>
  ),
  text: (width?: number) => {
    const f = (x: number) => -1 / 20 / (x + 0.08) + 1;
    const len = width ?? Math.ceil(f(Math.random()) * 12);

    return (
      <div className='grid grid-cols-12'>
        <div className='h-[1.6rem] rounded-full bg-white/20' style={{ gridColumn: `span ${len} / span ${len}` }} />
      </div>
    );
  },
  space: () => <div className='h-[2rem]'></div>,
};
