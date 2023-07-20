import clsx from 'clsx';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { gateway } from '@/gateway';

interface ArticleListProps {
  category?: string;
}

const ArticleList: FC<ArticleListProps> = async ({ category: currentCategory }) => {
  const { articles, categories } = await gateway.blog.list.query({
    category: currentCategory ? decodeURIComponent(currentCategory) : undefined,
  });

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-[800px]'>
        <div className='sticky top-0 flex gap-[8px] bg-black100 px-[16px] py-[12px] md:mt-[56px]'>
          <Link href='/blog'>
            <Chip active={!currentCategory}>전체</Chip>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${category}`}>
              <Chip active={category === currentCategory}>{category}</Chip>
            </Link>
          ))}
        </div>
        <div className=''>
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/article/${article.id}`}
              className='flex px-[24px] py-[16px] md:py-[40px]'
            >
              <div className='flex flex-grow flex-col'>
                <div className='text-[14px] font-light text-gray60 md:text-[16px]'>
                  {/* {article.category} | {article.publishedAt && format(article.publishedAt, 'yyyy.MM.dd')} */}
                  {article.publishedAt.toString()}
                </div>
                <h1 className='mt-[6px] line-clamp-2 break-keep text-[22px] font-bold leading-tight text-white100 md:mt-[8px] md:text-[28px]'>
                  {article.title}
                </h1>
                <div className='mt-[12px] text-[14px] font-light md:text-[16px]'>
                  {article.editors.length === 1 && (
                    <>
                      <span className='text-white100'>{article.editors[0].name}</span>
                      <span className='px-[4px] text-gray60'>∙</span>
                      <span className='text-gray60'>{article.editors[0].role}</span>
                    </>
                  )}
                  {article.editors.length >= 2 && (
                    <span className='text-white100'>{article.editors.map((editor) => editor.name).join(', ')}</span>
                  )}
                </div>
              </div>
              {article.thumbnail && (
                <div className='mt-[25px] flex h-[68px] w-[68px] justify-center overflow-hidden md:mt-0 md:h-[140px] md:w-[140px]'>
                  <img
                    src={article.thumbnail.url}
                    alt='Thumbnail'
                    height='140'
                    className='h-full w-full object-cover'
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;

interface ChipProps {
  children: ReactNode;
  active?: boolean;
}

const Chip: FC<ChipProps> = ({ children, active = false }) => {
  return (
    <div
      className={clsx(
        'cursor-pointer rounded-[12px] border px-[12px] py-[8px] text-[16px] transition',
        active ? 'border-gray10 bg-gray10 text-black100' : 'border-black40 bg-black80 text-gray10 hover:bg-black60',
      )}
    >
      {children}
    </div>
  );
};
