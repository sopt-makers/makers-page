import { FC } from 'react';

import ArticleList from '@/components/blog/ArticleList';

interface BlogCategoryPageProps {
  params: { category: string };
}

export const runtime = 'edge';

const BlogCategoryPage: FC<BlogCategoryPageProps> = ({ params }) => {
  return (
    <>
      <ArticleList category={params.category} />
    </>
  );
};

export default BlogCategoryPage;
