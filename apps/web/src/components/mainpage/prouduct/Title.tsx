import Link from 'next/link';

interface TitleProps {
  type: 'official' | 'playground' | 'app';
}

export default function Title({ type }: TitleProps) {
  switch (type) {
    case 'official':
      return (
        <Link className='sticky top-0' href='https://www.sopt.org/'>
          <div className='bg-black100 z-10 flex cursor-pointer flex-row items-end justify-start py-[2.4rem]'>
            <span className='hover:text-brand-yellow'>SOPT 공식 홈페이지</span>
            <div className='justify-cetner flex flex-row items-center'>
              <ArrowIcon className='fill-brand-yellow' />
              <span className='text-16-regular'>OFFICIAL</span>
            </div>
          </div>
        </Link>
      );
    case 'playground':
      return (
        <Link className='sticky top-0' href='https://playground.sopt.org/'>
          <div className='bg-black100 z-10 flex cursor-pointer flex-row items-end justify-start py-[2.4rem]'>
            <span className='hover:text-brand-skyblue'>SOPT 플레이그라운드</span>
            <div className='justify-cetner flex flex-row items-center'>
              <ArrowIcon className='fill-brand-skyblue' />
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
        <div className='bg-black100 sticky top-0 z-10 flex cursor-pointer flex-row items-end justify-start py-[2.4rem]'>
          <span className='hover:text-brand-pink'>SOPT 공식 앱</span>
          <div className='justify-cetner flex flex-row items-center'>
            <ArrowIcon className='fill-brand-pink' />
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
