'use client';
import Header from '@/components/header/Header';
import CoreValue from '@/components/mainpage/CoreValue';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Missions from '@/components/mainpage/Missions';
import Product from '@/components/mainpage/Product';
import Recruit from '@/components/mainpage/Recruit';

export default function Page() {
  return (
    <div>
      <Header />
      <Greeting />
      <div className='bg-makers-logo bg-center bg-no-repeat'>
        <MakersIntodution />
      </div>
      <div className='bg-makers-logo bg-center bg-no-repeat'>
        <Missions />
      </div>
      <Product />
      <CoreValue />
      <Recruit />
    </div>
  );
}
