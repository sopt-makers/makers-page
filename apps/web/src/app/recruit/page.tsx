import Link from 'next/link';
import { FC } from 'react';

import { BlockRenderer } from '@/components/notion/renderer';
import { recruitBlockComponents } from '@/components/recruit/recruitBlockComponents';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const { blocks } = await gateway.recruit.page.query({});

  return (
    <div>
      <BlockRenderer
        blocks={blocks}
        blockComponents={recruitBlockComponents}
        renderPageLink={({ id, name, className }) => (
          <Link href={`/recruit/${id}`} className={className}>
            {name}
          </Link>
        )}
      />
    </div>
  );
};

export default RecruitPage;
