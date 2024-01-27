import { FC } from 'react';

import RecruitButton from './RecruitButton';

interface AboutRecruitProps {}

// 모집 상태가 바뀌면 여기의 버튼을 상황에 맞게 <RecruitButton /> 과 <NoticeButton /> 으로 바꿔주면 됩니다.

const AboutRecruit: FC<AboutRecruitProps> = ({}) => {
  return <RecruitButton />;
};

export default AboutRecruit;
