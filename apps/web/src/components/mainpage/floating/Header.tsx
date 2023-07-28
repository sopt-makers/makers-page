// import Link from 'next/link';

import MakersLogo from '@/components/common/icons/MakersLogo';

import { handleScroll } from './handleScroll';

interface NavButton {
  name: string;
  position: number;
}

export default function Header() {
  const navButtons: NavButton[] = [
    { name: 'INTRODUTION', position: 3000 },
    { name: 'OUR MISSION', position: 6500 },
    { name: 'SERVICE', position: 7900 },
    { name: 'CORE VALUE', position: 10010 },
    { name: 'FEEDBACK', position: 14000 },
    // { name: 'MEMBERS', position: undefined },
    { name: 'RECRUIT', position: 50000 },
  ];

  return (
    <header className='fixed z-20 flex w-full justify-between py-[4rem] pl-[6rem] pr-[3.808rem]'>
      <section className='flex'>
        <MakersLogo className='mr-[8rem] cursor-pointer' onClick={() => handleScroll(0)} />
        {/* <div className='text-18-regular flex items-center justify-center gap-[4rem]'>
          <Link href='/blog'>
            <span className='hover:text-18-semibold cursor-pointer'>BLOG</span>
          </Link>
          <Link href='/recruit/'>
            <span className='hover:text-18-semibold cursor-pointer'>RECRUIT</span>
          </Link>
        </div> */}
      </section>
      <nav className='text-16-regular fixed right-0 top-0 flex flex-col items-end gap-[0.608rem] pb-[6.1rem] pl-[3.9rem] pr-[5.4rem] pt-[4.9rem]'>
        {navButtons.map((button, index) => (
          <button
            className='hover:bg-black100 hover:font-extrabold hover:underline'
            key={index}
            onClick={() => handleScroll(button.position)}
          >
            {button.name}
          </button>
        ))}
      </nav>
    </header>
  );
}
