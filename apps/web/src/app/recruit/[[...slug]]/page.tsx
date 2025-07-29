import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import GithubLogo from '@/components/common/icons/GithubLogo';
import BlockRenderer from '@/components/notion/unofficial/BlockRenderer';
import { recruitBlockComponents, renderRecruitBlockContainer } from '@/components/recruit/recruitBlockUnofficial';

import { gateway } from '../../../gateway';

interface RecruitPageProps {
  params: { slug: string[] | undefined };
}

const RecruitPage: FC<RecruitPageProps> = async ({ params: { slug = [] } }) => {
  const [pageId] = slug;
  const page = await gateway.recruit.page.query({ id: pageId });

  if (page.status === 'NEED_REFRESH') {
    return <div>지금 페이지를 사용할 수 없어요. 잠시 뒤에 다시 시도해주세요.</div>;
  }
  if (page.status === 'NOT_FOUND') {
    notFound();
  }

  const { blockMap, path, id } = page;
  const pageBlock = blockMap[id];

  function getBlock(id: string) {
    const block = blockMap[id];
    if (block) {
      return block;
    }
    throw new Error('Invalid Block Id: ' + id);
  }

  return (
    <div className='whitespace-pre-wrap'>
      <div className='flex flex-wrap items-center gap-2 text-[1.6rem]'>
        {path.map((fragment) => (
          <>
            <Link
              key={fragment.id}
              href={fragment.id ? `/recruit/${fragment.id}` : '/recruit/'}
              className='rounded-[0.6rem] border border-white/25 px-[1.2rem] py-[0.6rem] transition-colors hover:bg-[#282a2b]'
            >
              {fragment.title}
            </Link>
            <div className='last:hidden'>{'>'}</div>
          </>
        ))}
      </div>
      <BlockRenderer
        blocks={pageBlock.content ?? []}
        blockComponents={recruitBlockComponents}
        getBlock={getBlock}
        renderPageLink={({ id, name, className }) => (
          <Link href={`/recruit/${id}`} className={className}>
            {name}
          </Link>
        )}
        renderContainer={renderRecruitBlockContainer}
      />

      <div className='mt-[5rem] flex items-center justify-end pb-[1.6rem] pr-[2rem]'>
        <a
          href='https://github.com/sopt-makers/makers-page'
          target='_blank'
          className='flex w-[2rem] items-center justify-center text-[#6c6c6c]'
        >
          <GithubLogo />
        </a>
      </div>
    </div>
  );
};

export default RecruitPage;
