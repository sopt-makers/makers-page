import Link from 'next/link';

import { gateway } from '@/gateway';

import { BlockRenderer } from '../notion/official/BlockRenderer';
import { blogBlockComponents } from './blogBlockComponents';

interface ArticlePageProps {
  id: string;
}

async function ArticlePage({ id }: ArticlePageProps) {
  const article = await gateway.blog.article.query({ id });

  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-full max-w-[800px] flex-col px-[16px]'>
        <Link href='/blog' className='flex gap-x-[8px] self-start py-[24px] pr-[8px]'>
          <BackIcon />
          <span className='text-gray80 text-[16px] font-light leading-[20px]'>블로그 홈 가기</span>
        </Link>
        {article.thumbnail && (
          <div className='border-real-white/10 overflow-clip rounded-lg border md:rounded-3xl'>
            <img src={article.thumbnail} alt='Thumbnail Image' />
          </div>
        )}
        <div className='mt-[20px] flex md:mt-[32px]'>
          {article.category && (
            <>
              <Link href={`/blog/category/${article.category}`}>
                <span className='bg-black80 text-white100 rounded-[13px] px-[12px] py-[6px] leading-[120%]'>
                  {article.category}
                </span>
              </Link>
            </>
          )}
        </div>
        <h1 className='text-white100 mt-[12px] break-keep text-[28px] font-bold leading-[130%] md:text-[40px]'>
          {article.title}
        </h1>
        <div className='text-gray60 mt-[8px] text-[14px] font-light'>
          {/* {article.publishedAt && format(article.publishedAt, 'yyyy.MM.dd')} */}
          {article.publishedAt?.toString()}
        </div>
        <div className='mt-[40px] md:mt-[80px]'>
          <BlockRenderer
            blocks={article.blocks}
            blockComponents={blogBlockComponents}
            renderPageLink={() => <div>Subpage not allowed</div>}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;

function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.852 2.642a.498.498 0 010 .7L7.194 10l6.658 6.658a.498.498 0 010 .7.498.498 0 01-.7 0L6.144 10.35a.498.498 0 010-.7l7.008-7.008a.498.498 0 01.7 0z'
        fill='#808388'
      />
    </svg>
  );
}
