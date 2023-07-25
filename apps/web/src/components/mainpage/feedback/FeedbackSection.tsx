'use client';

import { m } from 'framer-motion';
import { FC } from 'react';

import { feedbacks } from './data';
import FeedbackCard from './FeedbackCard';
import { GoIcon } from './icons';

interface FeedbackSectionProps {}

const FeedbackSection: FC<FeedbackSectionProps> = ({}) => {
  return (
    <div className='flex'>
      <div>
        <div className='sticky top-0 flex flex-col gap-[2.4rem] px-[8rem] pt-[20rem]'>
          <div className='text-64-bold flex flex-col'>
            <span>메이커들이</span>
            <span>직접 얘기하는</span>
            <span>활동 후기</span>
          </div>
          <div className='text-24-semibold flex items-center gap-[0.8rem] align-middle'>
            makers 구성원 전체보기 <GoIcon />
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <m.div className='flex flex-col gap-[2.9rem] pr-[8rem]'>
          {feedbacks.map((feedback, idx) => {
            const { style, dark } = cardColorStyles[idx % cardColorStyles.length];

            return <FeedbackCard key={idx} className={style} isDark={dark} {...feedback} />;
          })}
        </m.div>
      </div>
    </div>
  );
};

export default FeedbackSection;

const cardColorStyles = [
  { style: 'bg-sub-skyblue', dark: false },
  { style: 'bg-main-makers', dark: false },
  { style: 'bg-sub-yellow', dark: false },
  { style: 'bg-sub-blue', dark: true },
  { style: 'bg-sub-pink', dark: false },
];
