'use client';

import MakersLogo3D from '@/components/common/MakersLogo3D';
import Greeting from '@/components/mainpage/Greeting';

export default function Page() {
  return (
    <div>
      {/* <Header /> */}
      <div className='relative h-[300vh]'>
        <div className='absolute inset-0'>
          <div className='sticky top-0 h-[100vh] pt-[5rem] flex justify-center items-center'>
            <MakersLogo3D className='h-[20rem] w-[20rem]' />
          </div>
        </div>
        <div className='absolute inset-0'>
          <Greeting className='' />
        </div>
      </div>
      {/* <div className='bg-makers-logo bg-center bg-no-repeat'>
        <MakersIntodution />
      </div>
      <div className='bg-makers-logo bg-center bg-no-repeat'>
        <Missions />
      </div>
      <Product />
      <CoreValue />
      <Recruit /> */}
    </div>
  );
}
