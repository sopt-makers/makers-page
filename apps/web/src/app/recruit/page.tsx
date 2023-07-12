import Link from 'next/link';
import { FC } from 'react';

import { BlockRenderer } from '@/components/notion/renderer';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const { blocks } = await gateway.recruit.page.query({});

  return (
    <div>
      <BlockRenderer blocks={blocks} renderPageLink={(id, name) => <Link href={`/recruit/${id}`}>{name}</Link>} />
    </div>
  );
};

export default RecruitPage;
