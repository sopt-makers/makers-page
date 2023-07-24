'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

import MakersLogo3D from '@/components/common/MakersLogo3D';
import Archive from '@/components/mainpage/Archive';
import CoreValue from '@/components/mainpage/CoreValue';
import FeedbackSection from '@/components/mainpage/feedback/FeedbackSection';
import Greeting from '@/components/mainpage/Greeting';
import MakersIntodution from '@/components/mainpage/MakersIntodution';
import Product from '@/components/mainpage/Product';
import RecruitBanner from '@/components/mainpage/RecruitBanner';

export default function Page() {
  return (
    <ReactLenis root>
      <div>
        <Greeting />
        <FeedbackSection />
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
