'use client';

import Header from '@/components/header/Header';
import Archive from '@/components/mainpage/Archive';
import CoreValue from '@/components/mainpage/CoreValue';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Product from '@/components/mainpage/Product';
import RecruitBanner from '@/components/mainpage/RecruitBanner';

export default function Page() {
  return (
    <div>
      <Header />
      <Greeting />
      <MakersIntodution />
      <CoreValue />
      <Product />
      <Archive />
      <RecruitBanner />
    </div>
  );
}
