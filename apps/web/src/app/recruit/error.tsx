'use client';

import { FC, useEffect } from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center'>
      <div className='text-18-regular'>페이지 로드에 실패했어요. 나중에 다시 시도해주세요.</div>
      <button onClick={reset} className='text-16-regular bg-gray1 mt-[1rem] rounded-[0.8rem] p-[1rem]'>
        다시 시도
      </button>
    </div>
  );
};

export default ErrorPage;
