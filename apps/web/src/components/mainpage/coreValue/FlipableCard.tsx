import clsx from 'clsx';
import { m, MotionValue, useTransform } from 'framer-motion';
import { FC, forwardRef, ReactNode } from 'react';

interface FlipableCardProps {
  className?: string;
  front: ReactNode;
  back: ReactNode;
  flipValue: MotionValue<number>;
}

const FlipableCard: FC<FlipableCardProps> = forwardRef<HTMLDivElement, FlipableCardProps>(
  ({ className, front, back, flipValue }, ref) => {
    const frontRotation = useTransform(flipValue, [0, 1], ['0deg', '180deg']);

    return (
      <div ref={ref} className={clsx(className)} style={{ perspective: '1000px' }}>
        <m.div className='relative h-full w-full ' style={{ rotateY: frontRotation, transformStyle: 'preserve-3d' }}>
          <div className={`absolute inset-0`} style={{ backfaceVisibility: 'hidden' }}>
            {front}
          </div>
          <m.div className={`absolute inset-0`} style={{ backfaceVisibility: 'hidden', rotateY: '180deg' }}>
            {back}
          </m.div>
        </m.div>
      </div>
    );
  },
);

export default FlipableCard;
