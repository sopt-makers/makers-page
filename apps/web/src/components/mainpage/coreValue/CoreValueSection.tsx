import clsx from 'clsx';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import { FC, useRef } from 'react';

import { BaseImage, ConnectionImage, OpportunityImage, OwnershipImage, PleasureImage } from './images';

const orbitron = Orbitron({ subsets: ['latin'], preload: false, display: 'swap' });

interface CoreValueSectionProps {}

const CoreValueSection: FC<CoreValueSectionProps> = ({}) => {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0', '-300vw']);

  useMotionValueEvent(scrollY, 'change', console.log);

  return (
    <div ref={ref} className='relative h-[300vh] w-full overflow-x-hidden'>
      <div className=' inset-0'>
        <m.div className='flex h-[100vh] w-fit max-w-none items-center' style={{ x }}>
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
                  <span className={clsx(orbitron.className, 'text-[3.6rem] font-bold leading-[100%]')}>
                    {card.keyword}
                  </span>
                  <span className='mt-[2rem] text-[2.8rem] font-semibold'>{card.name}</span>
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
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
