'use client';

import clsx from 'clsx';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { FC, ReactElement, useRef } from 'react';

import { cards } from './cardData';
import ValueCard from './ValueCard';

interface CoreValueMobileProps {
  className?: string;
}

const CoreValueMobile: FC<CoreValueMobileProps> = ({ className }) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <h1 className='text-40-semibold mt-[40rem]'>CORE VALUE</h1>
      <div className='mt-[5rem] grid w-fit auto-rows-auto grid-cols-2 gap-x-[2.4rem] gap-y-[2.4rem]'>
        <div className=''></div>
        <div className='row-span-2'></div>
        {cards.map((card, idx) => (
          <Flipper key={idx} className='row-span-2 text-[calc(50vw*0.023)]'>
            {(flipValue) => <ValueCard className='' {...card} seq={idx + 1} flipValue={flipValue} />}
          </Flipper>
        ))}
      </div>
    </div>
  );
};

export default CoreValueMobile;

interface FlipperProps {
  className?: string;
  children: (flipValue: MotionValue<number>) => ReactElement;
}

const Flipper: FC<FlipperProps> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'center start'],
  });

  const flipValue = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div ref={ref} className={clsx('', className)}>
      {children(flipValue)}
    </div>
  );
};
