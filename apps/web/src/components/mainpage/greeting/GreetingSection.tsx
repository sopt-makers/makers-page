'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import MakersLogo3D from '@/components/common/MakersLogo3D';

import Intro from './Intro';
import MakersIntroduction from './MakersIntroduction';
import Missions from './Missions';

export default function Greeting() {
  const ref = useRef(null);
  const { scrollYProgress: containerProgress } = useScroll({
    target: ref,
  });
  const paddingBottomLogo = useTransform(containerProgress, [0, 0.15], ['35rem', '0rem']);
  const opacityLogo = useTransform(containerProgress, [0, 0.15], [1, 0.5]);

  return (
    <div ref={ref} className='relative h-[770rem] md:h-[790rem]'>
      <div className='absolute inset-0'>
        <div className='sticky top-0 flex h-[100vh] items-center justify-center'>
          <m.div style={{ paddingBottom: paddingBottomLogo, opacity: opacityLogo }}>
            <MakersLogo3D
              className='h-[27rem] w-full max-w-[40rem] md:h-[40rem] md:w-[40rem]'
              progress={containerProgress}
            />
          </m.div>
        </div>
      </div>
      <m.div className='absolute inset-0'>
        <Intro className='pt-[10rem] md:pt-[20rem]' />
        <MakersIntroduction />
        <Missions />
      </m.div>
    </div>
  );
}
