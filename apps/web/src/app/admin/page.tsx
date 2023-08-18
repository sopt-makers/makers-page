'use client';
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import ArticleRefetch from '@/components/blog/admin/ArticleRefetch';
import { useGateway } from '@/gateway/browser';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
  const gateway = useGateway();

  const { mutate, status, error } = useMutation({ mutationFn: () => gateway.recruit.refresh.mutate() });

  return (
    <Theme appearance='dark'>
      <div className='text-18-regular px-[1rem] py-[1rem]'>
        <button
          className='bg-gray1 rounded-[1rem] px-[2rem] py-[1rem]'
          onClick={() => mutate()}
          disabled={status === 'pending'}
        >
          리크루트 페이지 새로고침
        </button>
        <p>Result: {status}</p>
        <p>{error && error.message}</p>

        <div>
          <ArticleRefetch />
        </div>
      </div>
    </Theme>
  );
};

export default AdminPage;
