import Link from 'next/link';
import { FC } from 'react';

import BlockRenderer from '@/components/notion/unofficial/BlockRenderer';
import { recruitBlockComponents } from '@/components/recruit/recruitBlockUnofficial';
import { gateway } from '@/gateway';

interface RecruitSubPageProps {
  params: { id: string };
}

const RecruitSubPage: FC<RecruitSubPageProps> = async ({ params }) => {
  const pageId = params.id;

  const { title, pageBlock, blockMap } = await gateway.recruit.page.query({ id: pageId });

  function getBlock(id: string) {
    const block = blockMap[id];
    if (block) {
      return block;
    }
    throw new Error('Invalid Block Id: ' + id);
  }

  return (
    <div>
      {title}
      <BlockRenderer
        blocks={pageBlock.content ?? []}
        blockComponents={recruitBlockComponents}
        getBlock={getBlock}
        renderPageLink={({ id, name, className }) => (
          <Link href={`/recruit/${id}`} className={className}>
            {name}
          </Link>
        )}
      />
    </div>
  );
};

export default RecruitSubPage;
