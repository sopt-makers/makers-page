import { FC } from 'react';

import { BlockRenderer } from '@/components/notion/renderer';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const { blocks } = await gateway.recruit.mainPage.query();

  return (
    <div>
      <BlockRenderer blocks={blocks} />
    </div>
  );
};

export default RecruitPage;
