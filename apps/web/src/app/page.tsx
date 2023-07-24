'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

import MakersLogo3D from '@/components/common/MakersLogo3D';
import Header from '@/components/header/Header';
import Archive from '@/components/mainpage/Archive';
import CoreValue from '@/components/mainpage/CoreValue';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Product from '@/components/mainpage/Product';
import RecruitBanner from '@/components/mainpage/RecruitBanner';

export default function Page() {
  return (
    <ReactLenis root>
      <div>
        <Header />
        <Greeting />
        <MakersLogo3D />
        <MakersIntodution />
        <CoreValue />
        <Product />
        <Archive />
        <RecruitBanner />
      </div>
    </ReactLenis>
  );
}
