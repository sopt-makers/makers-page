'use client';

import clsx from 'clsx';
import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GreetingProps {
  className?: string;
}

export default function Missions({ className }: GreetingProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.6, 0.7], [0, 1, 1, 0]);

  return (
    <article ref={containerRef} className={clsx('h-[280vh]', className)}>
      <div className='sticky top-0 flex h-screen w-full items-center justify-center'>
        <div className='text-60-semibold flex flex-col  items-center justify-center gap-[1.6rem]'>
          <m.p className='flex items-start justify-center gap-[1.792rem]' style={{ opacity: opacity1 }}>
            <span className='text-sub-skyblue text-16-regular'>MISSION 1.</span>
            <span>
              3천명이 넘는 SOPT 구성원들의
              <br />
              연결되지 못한 가치를 발견하고,
            </span>
          </m.p>
          <m.p className='flex gap-[1.792rem]' style={{ opacity: opacity2 }}>
            <span className='text-main-makers text-16-regular'>MISSION 2.</span>
            <span>SOPT 활동이 더 즐거울 수 있도록 도우며,</span>
          </m.p>
          <m.p className='flex gap-[1.792rem]' style={{ opacity: opacity3 }}>
            <span className='text-sub-pink text-16-regular'>MISSION 3.</span>
            <span>SOPT를 대내외적으로 더 잘 알려요.</span>
          </m.p>
        </div>
      </div>
    </article>
  );
}
