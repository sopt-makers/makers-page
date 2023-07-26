import Link from 'next/link';
import { FC } from 'react';

import { BlockRenderer } from '@/components/notion/renderer';
import { recruitBlockComponents } from '@/components/recruit/recruitBlockComponents';
import { gateway } from '@/gateway';

interface RecruitSubPageProps {
  params: { id: string };
}

const RecruitSubPage: FC<RecruitSubPageProps> = async ({ params }) => {
  const pageId = params.id;

  const { blocks } = await gateway.recruit.page.query({ id: pageId });

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

export default RecruitSubPage;
