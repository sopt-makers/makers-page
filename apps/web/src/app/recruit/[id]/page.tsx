import Link from 'next/link';
import { FC } from 'react';

import { BlockRenderer } from '@/components/notion/renderer';
import { gateway } from '@/gateway';

interface RecruitSubPageProps {
  params: { id: string };
}

const RecruitSubPage: FC<RecruitSubPageProps> = async ({ params }) => {
  const pageId = params.id;
  console.log('id:', pageId);
  const { blocks } = await gateway.recruit.page.query({ id: pageId });

  return (
    <div>
      <BlockRenderer blocks={blocks} renderPageLink={(id, name) => <Link href={`/recruit/${id}`}>{name}</Link>} />
    </div>
  );
};

export default RecruitSubPage;
