import clsx from 'clsx';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface HorizontalScrollProps {
  className?: string;
  children: (ctx: { progress: MotionValue<number>; centerLine: MotionValue<number> }) => ReactNode;
}

const HorizontalScroll: FC<HorizontalScrollProps> = ({ className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const [childrenWidth, setChildrenWidth] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const posX = useTransform(scrollYProgress, [0, 1], [0, containerWidth - childrenWidth]);
  const posY = useTransform(scrollYProgress, (v) => (v < 1 ? 0 : containerHeight - childrenHeight));
  const innerBoxPosition = useTransform(scrollYProgress, (v) => (v <= 0 || v >= 1 ? 'static' : 'fixed'));

  const centerLine = useTransform(scrollYProgress, [0, 1], [containerWidth / 2, childrenWidth - containerWidth / 2]);

  useEffect(() => {
    if (!childrenRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setChildrenWidth(entry.contentRect.width);
        setChildrenHeight(entry.contentRect.height);
      }
    });
    observer.observe(childrenRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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
