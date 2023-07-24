'use client';

import clsx from 'clsx';

interface ProductProps {
  className?: string;
}

export default function Product({ className }: ProductProps) {
  return (
    <article className={clsx('h-[200vh]', className)}>
      <div className='flex flex-row justify-start'>
        <section className='min-w-[22.75rem] mt-[5.25rem] mr-[4.19rem]'>
          <p className='ml-[3.75rem] text-40-semibold'>
            메이커스는
            <br />
            3개의 제품으로
            <br />
            <span className='text-main-makers'>
              SOPT에
              <br />
              없던 가치
            </span>
            를
            <br />
            더하고 있어요.
          </p>
        </section>
        <nav className='w-full border-l border-solid border-white h-screen text-40-semibold'>
          <div className='pl-[2.5rem] py-[1.5rem] flex flex-col gap-[0.5rem] border-b border-solid border-white'>
            <div className='flex flex-row justify-start items-end cursor-pointer'>
              <span>SOPT 공식 홈페이지</span>
              <div className='flex flex-row justify-cetner items-center gap-[1rem]'>
                <ArrowIcon className='fill-sub-yellow' />
                <span className='text-16-regular'>OFFICIAL</span>
              </div>
            </div>
          </div>
          <div className='pl-[2.5rem] py-[1.5rem] flex flex-row justify-start items-end border-b border-solid- border-white cursor-pointer'>
            <span>SOPT 플레이그라운드</span>
            <div className='flex flex-row justify-cetner items-center gap-[1rem]'>
              <ArrowIcon className='fill-sub-skyblue' />
              <span className='text-16-regular'>
                PLAYGROUND
                <br />& CREW
              </span>
            </div>
          </div>
          <div className='pl-[2.5rem] py-[1.5rem] flex flex-row justify-start items-end cursor-pointer'>
            <span>SOPT 공식 앱</span>
            <div className='flex flex-row justify-cetner items-center gap-[1rem]'>
              <ArrowIcon className='fill-sub-pink' />
              <span className='text-16-regular'>
                APP
                <br />& OPERATION
              </span>
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={50} height={50} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M34.065 13.813H11.18v-3h28.007V38.82h-3V15.934L12.99 39.132l-2.122-2.121 23.198-23.199z'
      />
    </svg>
  );
}
