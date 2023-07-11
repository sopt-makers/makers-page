import { FC } from 'react';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const result = await gateway.recruit.mainPage.query();

  return <div className='whitespace-pre-wrap'>{JSON.stringify(result, null, 2)}</div>;
};

export default RecruitPage;
