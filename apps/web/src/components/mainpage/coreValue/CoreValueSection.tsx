import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { FC, useRef } from 'react';

import { BaseImage, ConnectionImage, OpportunityImage, OwnershipImage, PleasureImage } from './images';

interface CoreValueSectionProps {}

const CoreValueSection: FC<CoreValueSectionProps> = ({}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0', '-300vw']);

  useMotionValueEvent(x, 'change', console.log);

  return (
    <div ref={ref} className='h-[300vh]'>
      <m.div className='sticky top-0 flex h-[100vh] w-fit max-w-none items-center' style={{ x }}>
        <div className='flex gap-[3.2rem] pl-[8rem]'>
          <div className='text-80-bold flex w-[45rem] flex-col'>
            <span>CORE</span>
            <span>VALUE</span>
          </div>
          {cards.map((card) => (
            <div
              key={card.keyword}
              className='bg-gray2 flex h-[52rem] w-[36.8rem] flex-col overflow-clip rounded-[0.8rem]'
            >
              <div className=''>{card.image}</div>
              <div className='flex flex-1 flex-col items-center justify-center'>
                <span className=''>{card.keyword}</span>
                <span className='mt-[2rem] text-[2.8rem] font-semibold'>{card.name}</span>
              </div>
            </div>
          ))}
        </div>
      </m.div>
    </div>
  );
};

const cards = [
  { keyword: 'Ownership', name: '오너십', image: <OwnershipImage /> },
  { keyword: 'Connection', name: '연결', image: <ConnectionImage /> },
  { keyword: 'Base', name: '기반', image: <BaseImage /> },
  { keyword: 'Opportunity', name: '기회', image: <OpportunityImage /> },
  { keyword: 'Pleasure', name: '즐거움', image: <PleasureImage /> },
];

export default CoreValueSection;
