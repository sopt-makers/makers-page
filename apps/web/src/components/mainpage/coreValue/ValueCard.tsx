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
        <div className='bg-gray2 relative flex h-full flex-col overflow-clip rounded-[0.8rem]'>
          <div className='[&>svg]:h-full [&>svg]:w-full'>{image}</div>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <span className={clsx(orbitron.className, 'text-[1.4rem] font-bold leading-[100%] md:text-[3.6rem]')}>
              {keyword}
            </span>
            <span className='mt-[0.76rem] text-[1.2rem] font-semibold md:mt-[2rem] md:text-[2.8rem]'>{name}</span>
          </div>
          <div
            className={clsx(
              orbitron.className,
              'absolute left-0 right-0 top-[1.18rem] flex justify-center text-[1rem] md:top-[3.2rem] md:text-[2.4rem]',
            )}
          >
            {formattedSeq}
          </div>
        </div>
      }
      back={
        <div className='relative h-full overflow-clip rounded-[0.8rem]'>
          <div className='md:text-24-semibold h-full w-full text-[1rem]'>{description}</div>
          <div
            className={clsx(
              orbitron.className,
              'absolute left-0 right-0 top-[1.18rem] flex justify-center text-[1rem] md:top-[3.2rem] md:text-[2.4rem]',
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
