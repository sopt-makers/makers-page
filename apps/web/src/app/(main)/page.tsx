import { Suspense } from 'react';

import { RenderingLoading } from '@/components/common/RenderingLoading';
import CoreValueSection from '@/components/mainpage/coreValue/CoreValueSection';
import FeedbackSection from '@/components/mainpage/feedback/FeedbackSection';
import GreetingSection from '@/components/mainpage/greeting/GreetingSection';
import ProductSection from '@/components/mainpage/prouduct/ProductSection';
import RecruitSection from '@/components/mainpage/recruit/RecruitSection';

export default function Page() {
  return (
    <div className='overflow-x-clip'>
      {/* <Header /> */}
      <GreetingSection />
      <Suspense fallback={<div />}>
        <ProductSection />
        <CoreValueSection />
        <FeedbackSection />
        <RecruitSection />
      </Suspense>
      <RenderingLoading />
    </div>
  );
}
