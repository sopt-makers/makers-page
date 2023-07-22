'use client';

import FullPage from '@/components/common/FullPage';
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
      <FullPage>
        <Greeting />
      </FullPage>
      <FullPage>
        <MakersIntodution />
      </FullPage>
      <FullPage>
        <CoreValue />
      </FullPage>
      <FullPage>
        <Product />
      </FullPage>
      <FullPage>
        <Archive />
      </FullPage>
      <FullPage>
        <RecruitBanner />
      </FullPage>
    </div>
  );
}
