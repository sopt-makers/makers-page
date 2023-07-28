import { FC, Suspense } from 'react';

import MemberSlideShow from './MemberSlideShow';

interface MemberSectionProps {}

const MemberSection: FC<MemberSectionProps> = ({}) => {
  return (
    <div>
      <Suspense>
        <MemberSlideShow />
      </Suspense>
    </div>
  );
};

export default MemberSection;
