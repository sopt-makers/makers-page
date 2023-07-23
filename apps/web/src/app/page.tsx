'use client';

import Archive from '@/components/mainpage/Archive';
import CoreValue from '@/components/mainpage/CoreValue';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Missions from '@/components/mainpage/Missions';
import Product from '@/components/mainpage/Product';

export default function Page() {
  return (
    <div>
      <Greeting />
      <MakersIntodution />
      <Missions />
      <CoreValue />
      <Product />
      <Archive />
    </div>
  );
}
