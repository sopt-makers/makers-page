'use client';

import { Button, Table } from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { useGateway } from '@/gateway/browser';

import ArticleManageRow from './ArticleManageRow';

interface ArticleRefetchProps {}

const ArticleRefetch: FC<ArticleRefetchProps> = ({}) => {
  const gateway = useGateway();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articleListAdmin'],
    queryFn: () => gateway.blog.articleList.query(),
  });
  const { mutate: mutateRefetch, status: refetchStatus } = useMutation({
    mutationFn: () => gateway.blog.refetchArticleList.mutate(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['articleListAdmin'] });
    },
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Button onClick={() => mutateRefetch()} disabled={refetchStatus === 'pending'}>
        리스트 다시 불러오기
      </Button>
      <Table.Root>
        {data.map((entry) => (
          <ArticleManageRow key={entry.id} id={entry.id} />
        ))}
      </Table.Root>
    </div>
  );
};

export default ArticleRefetch;
