import { m } from 'framer-motion';
import React from 'react';

import MakersLogo3D from '@/components/common/MakersLogo3D';

import Intro from './Intro';
import MakersIntodution from './MakersIntodution';
import Missions from './Missions';

export default function Greeting() {
  return (
    <div className='relative h-[600vh]'>
      <div className='absolute inset-0'>
        <m.div
          className='sticky top-0 h-[100vh] pt-[5rem] flex justify-center items-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <MakersLogo3D className='h-[25rem] w-[25rem] opacity-50' />
        </m.div>
      </div>
      <div className='absolute inset-0'>
        <Intro />
        <MakersIntodution />
        <Missions />
      </div>
    </div>
  );
}
