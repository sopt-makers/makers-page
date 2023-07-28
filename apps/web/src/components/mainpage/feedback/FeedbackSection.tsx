import { FC } from 'react';

import { feedbacks } from './data';
import FeedbackCard from './FeedbackCard';
import { GoIcon } from './icons';

interface FeedbackSectionProps {}

const FeedbackSection: FC<FeedbackSectionProps> = ({}) => {
  return (
    <div className='mb-[4rem] flex flex-col px-[2rem] pt-[30rem] md:flex-row md:p-0'>
      <div>
        <div className='sticky top-0 flex flex-col gap-[1rem] md:gap-[2.4rem] md:p-[20rem_8rem_0]'>
          <div className='md:text-64-bold flex flex-col text-[4rem] font-semibold leading-[120%]'>
            <span>메이커들이</span>
            <span>직접 얘기하는</span>
            <span>활동 후기</span>
          </div>
          <div className='md:text-24-semibold flex items-center gap-[0.8rem] align-middle text-[1.8rem] font-semibold'>
            makers 구성원 전체보기 <GoIcon />
          </div>
        </div>
      </div>
      <div className='mt-[4rem] flex justify-end md:mt-0 md:flex-1'>
        <div className='flex w-full max-w-[70rem] flex-col gap-[1.4rem] md:gap-[2.9rem] md:p-[20rem_8rem_0_0]'>
          {feedbacks.map((feedback, idx) => {
            const { style, dark } = cardColorStyles[idx % cardColorStyles.length];

            return <FeedbackCard key={idx} className={style} isDark={dark} {...feedback} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;

const cardColorStyles = [
  { style: 'bg-brand-skyblue', dark: false },
  { style: 'bg-brand-orange', dark: false },
  { style: 'bg-brand-yellow', dark: false },
  { style: 'bg-brand-blue', dark: true },
  { style: 'bg-brand-pink', dark: false },
];
