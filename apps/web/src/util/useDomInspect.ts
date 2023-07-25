import { RefObject, useEffect, useState } from 'react';

interface PositionContext {
  width: number;
  height: number;
  x: number;
  y: number;
}

const useDomInspect = (ref: RefObject<HTMLElement>) => {
  const [positionContext, setPositionContext] = useState<PositionContext>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (!ref.current) {
        return;
      }

      for (const entry of entries) {
        setPositionContext({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
          x: ref.current.offsetLeft,
          y: ref.current.offsetTop,
        });
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return positionContext;
};

export default useDomInspect;
