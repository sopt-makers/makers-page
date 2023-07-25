import React from 'react';

import MakersLogo3D from '@/components/common/MakersLogo3D';

import Intro from './Intro';
import MakersIntodution from './MakersIntodution';
import Missions from './Missions';

export default function Greeting() {
  return (
    <div className='relative h-[960vh]'>
      <div className='absolute inset-0'>
        <div className='sticky top-0 h-[100vh] pt-[8rem] flex justify-center items-center'>
          <MakersLogo3D className='h-[40rem] w-[40rem] opacity-50' />
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
