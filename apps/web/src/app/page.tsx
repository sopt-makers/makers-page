'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

import GreetingSection from '@/components/mainpage/greeting/GreetingSection';
import ProductSection from '@/components/mainpage/prouduct/ProductSection';
import Recruit from '@/components/mainpage/Recruit';

export default function Page() {
  return (
    <ReactLenis root>
      <div>
        {/* <Header /> */}
        <GreetingSection />
        <ProductSection />
        {/* <CoreValue /> */}
        <Recruit />
      </div>
    </ReactLenis>
  );
}
