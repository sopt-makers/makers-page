'use client';

import clsx from 'clsx';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { FC, ReactNode, useRef } from 'react';

import useDomInspect from '@/util/useDomInspect';

interface HorizontalScrollProps {
  className?: string;
  children: (ctx: { progress: MotionValue<number>; centerLine: MotionValue<number> }) => ReactNode;
}

const HorizontalScroll: FC<HorizontalScrollProps> = ({ className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const { width: childrenWidth, height: childrenHeight } = useDomInspect(childrenRef);
  const { width: containerWidth, height: containerHeight } = useDomInspect(containerRef);

  const posX = useTransform(scrollYProgress, [0, 1], [0, containerWidth - childrenWidth]);
  const posY = useTransform(scrollYProgress, (v) => (v < 1 ? 0 : containerHeight - childrenHeight));
  const innerBoxPosition = useTransform(scrollYProgress, (v) => (v <= 0 || v >= 1 ? 'static' : 'fixed'));

  const centerLine = useTransform(scrollYProgress, [0, 1], [containerWidth / 2, childrenWidth - containerWidth / 2]);

  return (
    <div ref={containerRef} className={clsx('w-full overflow-x-hidden', className)}>
      <m.div
        ref={childrenRef}
        className='bottom-0 h-screen w-fit'
        style={{ x: posX, y: posY, position: innerBoxPosition }}
      >
        {children({ progress: scrollYProgress, centerLine })}
      </m.div>
    </div>
  );
};

export default HorizontalScroll;
