'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

import CoreValueSection from '@/components/mainpage/coreValue/CoreValueSection';
import GreetingSection from '@/components/mainpage/greeting/GreetingSection';
import ProductSection from '@/components/mainpage/ProductSection';
import Recruit from '@/components/mainpage/Recruit';

export default function Page() {
  return (
    <ReactLenis root>
      <div>
        {/* <Header /> */}
        <GreetingSection />
        <ProductSection className='sticky top-0' />
        <CoreValueSection />
        <Recruit />
      </div>
    </ReactLenis>
  );
}
