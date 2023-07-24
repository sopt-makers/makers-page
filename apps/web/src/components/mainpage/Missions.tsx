'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Missions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <article ref={ref} className='flex flex-col justify-center items-center gap-[1rem] mt-[19.69rem] text-60-semibold'>
      <p
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
        className='flex justify-center items-start gap-[1.12rem]'
      >
        <span className='text-sub-skyblue text-16-regular'>MISSION 1.</span>
        <span>
          3천명이 넘는 SOPT 구성원들의
          <br />
          연결되지 못한 가치를 발견하고,
        </span>
      </p>
      <p
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s',
        }}
        className='flex gap-[1.12rem]'
      >
        <span className='text-main-makers text-16-regular'>MISSION 2.</span>
        <span>SOPT 활동이 더 즐거울 수 있도록 도우며,</span>
      </p>
      <p
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 2.8s',
        }}
        className='flex gap-[1.12rem]'
      >
        <span className='text-sub-pink text-16-regular'>MISSION 3.</span>
        <span>SOPT를 대내외적으로 더 잘 알려요.</span>
      </p>
    </article>
  );
}
