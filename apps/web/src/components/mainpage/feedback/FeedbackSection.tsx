'use client';

import { m } from 'framer-motion';
import { FC } from 'react';

interface FeedbackSectionProps {}

const FeedbackSection: FC<FeedbackSectionProps> = ({}) => {
  return (
    <div className='flex'>
      <div>
        <div className='flex flex-col sticky top-0 pt-[12.5rem] px-[5rem]'>
          <div className='flex flex-col'>
            <span>메이커들이</span>
            <span>직접 얘기하는</span>
            <span>활동 후기</span>
          </div>
          <div>makers 구성원 전체보기</div>
        </div>
      </div>
      <div className='flex-1'>
        <m.div className='flex flex-col gap-[1.81rem] pr-[5rem]'>
          {feedbacks.map((feedback, idx) => (
            <m.div key={idx} className='p-[2.5rem] bg-sub-skyblue rounded-[0.5rem]'>
              <div>{feedback}</div>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  );
};

export default FeedbackSection;

const feedbacks = [
  '후기1',
  '후기2',
  '후기3',
  '후기4',
  '후기5',
  '후기6',
  '후기1',
  '후기2',
  '후기3',
  '후기4',
  '후기5',
  '후기6',
];
