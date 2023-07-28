'use client';

import clsx from 'clsx';
import { FC } from 'react';

import HorizontalScroll from '@/components/common/HorizontalScroll';
import InspectableBox from '@/components/common/InspectableBox';

import { cards } from './cardData';
import CenterFlipper from './CenterFlipper';
import ValueCard from './ValueCard';

interface CoreValueDesktopProps {
  className?: string;
}

const CoreValueDesktop: FC<CoreValueDesktopProps> = ({ className }) => {
  return (
    <HorizontalScroll className={clsx('h-[400rem]', className)}>
      {({ centerLine }) => (
        <div className='flex h-full items-center'>
          <div className='flex gap-[3.2rem]'>
            <div className='text-80-bold flex w-[70vw] flex-col pl-[8rem]'>
              <span>CORE</span>
              <span>VALUE</span>
            </div>
            {cards.map((card, idx) => (
              <InspectableBox key={card.keyword}>
                {({ x, width }) => (
                  <CenterFlipper centerLineProgress={centerLine} flipRange={[x - width / 2, x + width / 2]}>
                    {(flipValue) => (
                      <ValueCard className='h-[52rem] w-[36.8rem]' {...card} seq={idx + 1} flipValue={flipValue} />
                    )}
                  </CenterFlipper>
                )}
              </InspectableBox>
            ))}
            <div className='w-[50vw]' />
          </div>
        </div>
      )}
    </HorizontalScroll>
  );
};

export default CoreValueDesktop;
