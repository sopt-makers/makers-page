'use client';

import MakersLogo3D from '@/components/common/MakersLogo3D';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Missions from '@/components/mainpage/Missions';
import Product from '@/components/mainpage/Product';
import Recruit from '@/components/mainpage/Recruit';

export default function Page() {
  return (
    <div>
      {/* <Header /> */}
      <div className='relative h-[600vh]'>
        <div className='absolute inset-0'>
          <div className='sticky top-0 h-[100vh] pt-[5rem] flex justify-center items-center'>
            <MakersLogo3D className='h-[25rem] w-[25rem] opacity-50' />
          </div>
        </div>
        <div className='absolute inset-0'>
          <Greeting />
          <MakersIntodution />
          <Missions />
        </div>
      </div>
      <div className='relative h-[500vh]'>
        <div className='absolute inset-0 mt-[30rem]'>
          <Product className='sticky top-0' />
        </div>
      </div>
      {/* <CoreValue /> */}
      <Recruit />
    </div>
  );
}
