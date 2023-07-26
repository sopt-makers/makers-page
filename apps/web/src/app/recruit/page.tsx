import Link from 'next/link';
import { FC } from 'react';

import BlockRenderer from '@/components/notion/unofficial/BlockRenderer';
import { recruitBlockComponents } from '@/components/recruit/recruitBlockUnofficial';

import { gateway } from '../../gateway';

interface RecruitPageProps {}

const RecruitPage: FC<RecruitPageProps> = async ({}) => {
  const { title, pageBlock, blockMap } = await gateway.recruit.pageUnofficial.query({});

  return (
    <div>
      {title}
      <BlockRenderer
        blocks={pageBlock.content ?? []}
        blockComponents={recruitBlockComponents}
        blockMap={blockMap}
        renderPageLink={({ id, name, className }) => (
          <Link href={`/recruit/${id}`} className={className}>
            {name}
          </Link>
        )}
      />
      {/* <BlockRenderer
        blocks={blocks}
        blockComponents={recruitBlockComponents}
        renderPageLink={({ id, name, className }) => (
          <Link href={`/recruit/${id}`} className={className}>
            {name}
          </Link>
        )}
      /> */}
    </div>
  );
};

export default RecruitPage;
