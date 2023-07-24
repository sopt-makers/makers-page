'use client';

export default function Product() {
  return (
    <article className='flex flex-row justify-start mt-[33.5rem]'>
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
          <div>
            <img
              className='my-[2.5rem]'
              src='https://github.com/sopt-makers/makers-page/assets/97586683/a59a5edd-d39c-42c8-b362-4d5542e02ec8'
              alt='official_image'
            />
            <div className='text-16-regular'>
              SOPT 공식 홈페이지에서는 그동안 잘 드러나지 않던 SOPT의 다양한 활동들과 사람들을 소개하고, 멋진 결과물을
              잘 보여주어
              <br /> SOPT가 지닌 열정과 가치들을 잘 알리는 역할을 해요.
              <br />
              <br /> 그로 인해 대외적으로 후원 및 협력을 용이하게 하고, 더 많은 분들이 SOPT를 잘 이해하고 지원할 수
              있도록 도와요.
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
        <div className='pl-[2.5rem] py-[1.5rem] flex flex-row justify-start items-end border-b border-solid- border-white cursor-pointer'>
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
