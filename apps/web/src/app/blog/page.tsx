import { FC } from 'react';

import ArticleList from '@/components/blog/ArticleList';

interface BlogPageProps {}

export const runtime = 'edge';

const BlogPage: FC<BlogPageProps> = async ({}) => {
  return (
    <div>
      <ArticleList />
    </div>
  );
};

export default BlogPage;
