import { FC } from 'react';

import { gateway } from '@/gateway';

interface MemberSlideShowProps {}

const MemberSlideShow: FC<MemberSlideShowProps> = async ({}) => {
  const memberList = await gateway.makers.memberList.query();

  return <div className='whitespace-pre-wrap'>{JSON.stringify(memberList)}</div>;
};

export default MemberSlideShow;
