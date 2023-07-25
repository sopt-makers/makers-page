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

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.5, 1], [0, 1, 1, 0, 0]);

  return (
    <article ref={containerRef} className={clsx('h-[200vh]', className)}>
      <m.div
        className='sticky top-0 pt-[17rem] flex flex-col justify-center items-center gap-[1rem] text-60-semibold'
        style={{ opacity }}
      >
        <p className='flex justify-center items-start gap-[1.12rem]'>
          <span className='text-sub-skyblue text-16-regular'>MISSION 1.</span>
          <span>
            3천명이 넘는 SOPT 구성원들의
            <br />
            연결되지 못한 가치를 발견하고,
          </span>
        </p>
        <p className='flex gap-[1.12rem]'>
          <span className='text-main-makers text-16-regular'>MISSION 2.</span>
          <span>SOPT 활동이 더 즐거울 수 있도록 도우며,</span>
        </p>
        <p className='flex gap-[1.12rem]'>
          <span className='text-sub-pink text-16-regular'>MISSION 3.</span>
          <span>SOPT를 대내외적으로 더 잘 알려요.</span>
        </p>
      </m.div>
    </article>
  );
}
