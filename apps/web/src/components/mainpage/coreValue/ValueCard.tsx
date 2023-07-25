import clsx from 'clsx';
import { MotionValue, useTransform } from 'framer-motion';
import { Orbitron } from 'next/font/google';
import { FC, ReactNode } from 'react';

import FlipableCard from './FlipableCard';

const orbitron = Orbitron({ subsets: ['latin'], preload: false, display: 'swap' });

interface ValueCardProps {
  className?: string;

  image: ReactNode;
  keyword: string;
  name: string;
  description: ReactNode;
  seq: number;
  centerLineProgress: MotionValue<number>;
  center: number;
}

const OPEN_DELTA = 400;
const KEEP_DELTA = 200;

const ValueCard: FC<ValueCardProps> = ({
  className,
  image,
  keyword,
  name,
  description,
  seq,
  center,
  centerLineProgress,
}) => {
  const flip = useTransform(
    centerLineProgress,
    [center - OPEN_DELTA, center - KEEP_DELTA, center + KEEP_DELTA, center + OPEN_DELTA],
    [0, 1, 1, 0],
  );

  const formattedSeq = `${seq}`.padStart(2, '0');

  return (
    <FlipableCard
      className={className}
      flipValue={flip}
      front={
        <div className='bg-gray2 relative flex h-full flex-col overflow-clip rounded-[0.8rem]'>
          <div className=''>{image}</div>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <span className={clsx(orbitron.className, 'text-[3.6rem] font-bold leading-[100%]')}>{keyword}</span>
            <span className='mt-[2rem] text-[2.8rem] font-semibold'>
              {name} {center}
            </span>
          </div>
          <div
            className={clsx(
              orbitron.className,
              'absolute left-0 right-0 top-[3.2rem] flex justify-center text-[2.4rem]',
            )}
          >
            {formattedSeq}
          </div>
        </div>
      }
      back={
        <div className='relative h-full overflow-clip rounded-[0.8rem]'>
          <div className='text-24-semibold h-full w-full'>{description}</div>
          <div
            className={clsx(
              orbitron.className,
              'absolute left-0 right-0 top-[3.2rem] flex justify-center text-[2.4rem]',
            )}
          >
            {formattedSeq}
          </div>
        </div>
      }
    />
  );
};

export default ValueCard;
