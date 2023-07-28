'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

import CoreValueSection from '@/components/mainpage/coreValue/CoreValueSection';
import FeedbackSection from '@/components/mainpage/feedback/FeedbackSection';
import GreetingSection from '@/components/mainpage/greeting/GreetingSection';
import ProductSection from '@/components/mainpage/prouduct/ProductSection';
import RecruitSection from '@/components/mainpage/recruit/RecruitSection';

export default function Page() {
  return (
    <ReactLenis root>
      <div className='overflow-x-clip'>
        {/* <Header /> */}
        <GreetingSection />
        <ProductSection />
        <CoreValueSection />
        <FeedbackSection />
        <RecruitSection />
      </div>
    </ReactLenis>
  );
}
