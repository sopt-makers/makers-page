import React from 'react';

import MakersLogo3D from '@/components/common/MakersLogo3D';

import Intro from './Intro';
import MakersIntodution from './MakersIntodution';
import Missions from './Missions';

export default function Greeting() {
  return (
    <div className='relative h-[770rem] md:h-[790rem]'>
      <div className='absolute inset-0'>
        <div className='sticky top-0 flex h-[100vh] items-center justify-center pt-[8rem]'>
          <MakersLogo3D className='h-[27rem] w-[27rem] opacity-50 md:h-[40rem] md:w-[40rem]' />
        </div>
      </div>
      <div className='absolute inset-0'>
        <Intro />
        <MakersIntodution />
        <Missions />
      </div>
    </div>
  );
}
