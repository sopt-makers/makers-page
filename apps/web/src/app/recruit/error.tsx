'use client';

import { FC, useEffect } from 'react';

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Notion 데이터를 불러오는데 실패했습니다.</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
