import { FC } from 'react';

import ArticlePage from '@/components/blog/ArticleDetail';

interface BlogArticlePageProps {
  params: { id: string };
}

export const runtime = 'edge';

const BlogArticlePage: FC<BlogArticlePageProps> = ({ params }) => {
  return (
    <>
      <ArticlePage id={params.id} />
    </>
  );
};

export default BlogArticlePage;
