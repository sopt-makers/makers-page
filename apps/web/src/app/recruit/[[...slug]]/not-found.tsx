import { FC } from 'react';

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = ({}) => {
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center'>
      <h2 className='text-40-semibold'>404 Not Found</h2>
      <div className='text-18-regular'>찾으려는 페이지가 없어요!</div>
    </div>
  );
};

export default NotFoundPage;
