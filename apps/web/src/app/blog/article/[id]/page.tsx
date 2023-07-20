import { FC } from 'react';

interface BlogArticlePageProps {
  params: { id: string };
}

export const runtime = 'edge';

const BlogArticlePage: FC<BlogArticlePageProps> = ({ params }) => {
  return <>{params.id}</>;
};

export default BlogArticlePage;
