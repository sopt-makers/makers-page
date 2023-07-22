'use client';
import { lazy } from 'react';

import Header from '@/components/header/Header';
import Archive from '@/components/mainpage/Archive';
import CoreValue from '@/components/mainpage/CoreValue';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Product from '@/components/mainpage/Product';
import RecruitBanner from '@/components/mainpage/RecruitBanner';

const Logo3D = lazy(() => import('@/components/common/MakersLogo3D'));

export default function Page() {
  return (
    <div>
      <Header />
      <Greeting />
      <Logo3D />
      <MakersIntodution />
      <CoreValue />
      <Product />
      <Archive />
      <RecruitBanner />
    </div>
  );
}
