import { Button, Table } from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';

import { useGateway } from '@/gateway/browser';

interface ArticleManageRowProps {
  id: string;
}

const ArticleManageRow: FC<ArticleManageRowProps> = ({ id }) => {
  const gateway = useGateway();
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['adminArticle', id], queryFn: () => gateway.blog.articleNew.query(id) });
  const { status: mutateStatus, mutate } = useMutation({
    mutationFn: () => gateway.blog.refetchArticle.mutate(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['adminArticle', id] });
    },
  });

  return (
    <Table.Row key={id}>
      <Table.RowHeaderCell>{id}</Table.RowHeaderCell>
      <Table.Cell>
        <Link href={`/blog/article/${id}`}>{data?.meta.title}</Link>
      </Table.Cell>
      <Table.Cell>{data && format(new Date(data?.lastFetched), 'yyyy/MM/dd HH:mm')}</Table.Cell>
      <Table.Cell width={0}>
        <Button disabled={mutateStatus === 'pending'} onClick={() => mutate()}>
          Refetch
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default ArticleManageRow;
