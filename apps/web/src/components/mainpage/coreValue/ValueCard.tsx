import clsx from 'clsx';
import { MotionValue } from 'framer-motion';
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
  flipValue: MotionValue<number>;
}

const ValueCard: FC<ValueCardProps> = ({ className, image, keyword, name, description, seq, flipValue }) => {
  const formattedSeq = `${seq}`.padStart(2, '0');

  return (
    <FlipableCard
      className={className}
      flipValue={flipValue}
      front={
        <div className='bg-gray2 relative flex h-[52em] w-[36.8em] flex-col overflow-clip rounded-[0.8em]'>
          <div className='[&>svg]:h-full [&>svg]:w-full'>{image}</div>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <span className={clsx(orbitron.className, 'text-[3.6em] font-bold leading-[100%]')}>{keyword}</span>
            <span className='mt-[2em]'>
              <span className='text-[2.8em] font-semibold'>{name}</span>
            </span>
          </div>
          <div className={clsx(orbitron.className, 'absolute left-0 right-0 top-[3.2em] flex justify-center ')}>
            <span className='text-[2.4em]'>{formattedSeq}</span>
          </div>
        </div>
      }
      back={
        <div className='relative h-[52em] w-[36.8em] overflow-clip rounded-[0.8em]'>
          <div className='h-full w-full text-[2.4em] font-semibold leading-[150%]'>{description}</div>
          <div className={clsx(orbitron.className, 'absolute left-0 right-0 top-[3.2em] flex justify-center')}>
            <span className='text-[2.4em]'>{formattedSeq}</span>
          </div>
        </div>
      }
    />
  );
};

export default ValueCard;
