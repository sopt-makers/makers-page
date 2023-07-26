'use client';

import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import { useGateway } from '@/gateway/browser';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
  const gateway = useGateway();

  const { mutate, status } = useMutation({ mutationFn: () => gateway.recruit.invalidate.mutate() });

  return (
    <div>
      <button onClick={() => mutate()}>리크루트 페이지 다시 로드</button>
      <p>Result: {status}</p>
    </div>
  );
};

export default AdminPage;
