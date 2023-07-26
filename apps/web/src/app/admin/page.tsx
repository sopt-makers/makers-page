'use client';

import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import { useGateway } from '@/gateway/browser';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
  const gateway = useGateway();

  const { mutate, status, data } = useMutation({ mutationFn: () => gateway.recruit.refresh.mutate() });

  return (
    <div className='text-18-regular'>
      <button onClick={() => mutate()}>리크루트 페이지 새로고침</button>
      <p>Result: {status}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default AdminPage;
