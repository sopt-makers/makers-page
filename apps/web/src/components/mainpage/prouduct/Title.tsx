import Link from 'next/link';

interface TitleProps {
  type: 'official' | 'playground' | 'app';
}

export default function Title({ type }: TitleProps) {
  switch (type) {
    case 'official':
      return (
        <Link className='sticky top-0' href='https://www.sopt.org/'>
          <div className='py-[2.4rem] flex flex-row justify-start items-end bg-black100 z-10 cursor-pointer'>
            <span className='hover:text-sub-yellow'>SOPT 공식 홈페이지</span>
            <div className='flex flex-row justify-cetner items-center'>
              <ArrowIcon className='fill-sub-yellow' />
              <span className='text-16-regular'>OFFICIAL</span>
            </div>
          </div>
        </Link>
      );
    case 'playground':
      return (
        <Link className='sticky top-0' href='https://playground.sopt.org/'>
          <div className='py-[2.4rem] flex flex-row justify-start items-end bg-black100 z-10 cursor-pointer'>
            <span className='hover:text-sub-skyblue'>SOPT 플레이그라운드</span>
            <div className='flex flex-row justify-cetner items-center'>
              <ArrowIcon className='fill-sub-skyblue' />
              <span className='text-16-regular'>
                PLAYGROUND
                <br />& CREW
              </span>
            </div>
          </div>
        </Link>
      );
    case 'app':
      return (
        <div className='py-[2.4rem] sticky top-0 flex flex-row justify-start items-end bg-black100 z-10 cursor-pointer'>
          <span className='hover:text-sub-pink'>SOPT 공식 앱</span>
          <div className='flex flex-row justify-cetner items-center'>
            <ArrowIcon className='fill-sub-pink' />
            <span className='text-16-regular'>
              APP
              <br />& OPERATION
            </span>
          </div>
        </div>
      );
    default:
      return null;
  }
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
