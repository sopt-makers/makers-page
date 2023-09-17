'use Client';

import Link from 'next/link';
import React from 'react';

export default function NoticeButton() {
  return (
    <div className='mb-[9.3rem] mt-[4rem] flex flex-col gap-[1.2rem] md:flex-row'>
      <Link
        href='https://docs.google.com/forms/d/e/1FAIpQLScQQoHcjvOBnPAsNU_PJ27pO5ymNjoYfFIXt2n46KxjuPCSbg/viewform'
        className='w-[23rem]'
      >
        <p className='md:text-18-bold text-black100 text-16-bold flex items-center justify-center gap-[0.6rem] rounded-[0.6rem] bg-white px-[2rem] py-[1.6rem]'>
          <NoticeIcon />
          4기 모집 알림 신청
        </p>
      </Link>
      <Link href='/recruit/' className='w-[23rem]'>
        <p className='md:text-18-bold text-16-bold bg-gray2 flex items-center justify-center gap-[0.6rem] rounded-[0.6rem] px-[2rem] py-[1.6rem] text-white'>
          <ArrowIcon />
          3기 모집글 보기 (마감)
        </p>
      </Link>
    </div>
  );
}

function NoticeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 1.833A5.67 5.67 0 004.332 7.5v3.965l-1.555 2.332a.667.667 0 00-.112.37V15c0 .368.298.667.667.667h13.333a.667.667 0 00.667-.667v-.833a.667.667 0 00-.112-.37l-1.555-2.332V7.5a5.67 5.67 0 00-5.667-5.667zM7.987 17h4.022A2.328 2.328 0 0110 18.166c-.86 0-1.607-.472-2.012-1.166z'
        fill='#0F1010'
      />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M15.848 4.378a.666.666 0 00-.586-.322h-9.43a.667.667 0 100 1.333h7.835L4.25 14.806a.667.667 0 10.943.943l9.417-9.418v7.836a.667.667 0 001.334 0V4.722a.664.664 0 00-.096-.344z'
        fill='#FCFCFC'
      />
    </svg>
  );
}
