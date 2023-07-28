import Link from 'next/link';

import { RightArrowIcon } from '../../common/RightArrowIcon';

export default function Footer() {
  return (
    <Link href='/recruit/'>
      <button className='text-24-semibold fixed bottom-[6rem] right-[6rem] z-20'>
        <div className='flex flex-row items-center justify-center gap-[0.8rem]'>
          3기 합류하기 (~8/5)
          <RightArrowIcon />
        </div>
      </button>
    </Link>
  );
}
