'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface InspectableBoxProps {
  className?: string;
  children: (ctx: PositionContext) => ReactNode;
}

interface PositionContext {
  width: number;
  height: number;
  x: number;
  y: number;
}

const InspectableBox: FC<InspectableBoxProps> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [positionContext, setPositionContext] = useState<PositionContext | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entires) => {
      if (!ref.current) {
        return;
      }

      for (const entry of entires) {
        setPositionContext({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
          x: ref.current.offsetLeft,
          y: ref.current.offsetTop,
        });
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {positionContext && children(positionContext)}
    </div>
  );
};

export default InspectableBox;
