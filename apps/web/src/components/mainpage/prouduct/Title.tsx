import clsx from 'clsx';

interface TitleProps {
  type: 'official' | 'playground' | 'app';
  children: React.ReactNode;
  className?: string;
}

interface TitleMap {
  [key: string]: {
    color: string;
    text: string;
  };
}

const titleMap: TitleMap = {
  official: {
    color: 'brand-yellow',
    text: 'SOPT 공식 홈페이지',
  },
  playground: {
    color: 'brand-skyblue',
    text: 'SOPT 플레이그라운드',
  },
  app: {
    color: 'brand-pink',
    text: 'SOPT 공식 앱',
  },
};

export default function Title({ type, children, className }: TitleProps) {
  const titleConfig = titleMap[type];
  return (
    <div
      className={clsx('bg-black100 z-10 flex cursor-pointer flex-row items-end justify-start py-[2.4rem]', className)}
    >
      <span className={`hover:text-${titleConfig.color} pl-[4rem]`}>{titleConfig.text}</span>
      <div className='justify-cetner flex flex-row items-center'>
        <ArrowIcon className={`mx-[0.8rem] fill-${titleConfig.color}`} />
        <span className='text-16-regular ml-[0.8rem]'>{children}</span>
      </div>
    </div>
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
