import { FC } from 'react';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const result = await gateway.notion.getPage.query({ id: '67b6d72792324f918291eb33ed1d4658' });

  return <>{JSON.stringify(result)}</>;
};

export default RecruitPage;
