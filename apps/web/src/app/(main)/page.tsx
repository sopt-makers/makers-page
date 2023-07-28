import { RenderingLoading } from '@/components/common/RenderingLoading';
import CoreValueSection from '@/components/mainpage/coreValue/CoreValueSection';
import FeedbackSection from '@/components/mainpage/feedback/FeedbackSection';
import FloatingSection from '@/components/mainpage/floating/FloatingSection';
import GreetingSection from '@/components/mainpage/greeting/GreetingSection';
import MemberSection from '@/components/mainpage/member/MemberSection';
import ProductSection from '@/components/mainpage/prouduct/ProductSection';
import RecruitSection from '@/components/mainpage/recruit/RecruitSection';

export default function Page() {
  return (
    <div className='overflow-x-clip'>
      <FloatingSection />
      <GreetingSection />
      <ProductSection />
      <CoreValueSection />
      <FeedbackSection />
      <MemberSection />
      <RecruitSection />
      <RenderingLoading />
    </div>
  );
}
