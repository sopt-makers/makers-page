'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecruitButton() {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const deadline = dayjs('2024-02-11T14:59:00.000Z');
    const start = dayjs('2024-01-28T15:00:00.000Z');

    const calculateTimeLeft = () => {
      const now = dayjs();

      if (now.isBefore(start)) {
        return '1/29 부터 지원 가능';
      }

      if (now.isAfter(deadline)) {
        return '지원이 마감되었어요.';
      }

      const difference = deadline.diff(now, 'second');

      const days = Math.floor(difference / (3600 * 24));
      const hours = Math.floor((difference / 3600) % 24);
      const minutes = Math.floor((difference / 60) % 60);
      // const seconds = difference % 60;

      if (days > 0 || hours >= 24) {
        return '현재 메이커스 4기 모집 중 (~2/11 일요일 23시 59분)';
      }

      return `지원 마감까지 ${hours.toString()}시간 ${minutes.toString().padStart(2, '0')}분 남았어요.`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Link
        href='/recruit/'
        className='mb-[0.5rem] mt-[4rem] rounded-[1.2rem] border border-solid border-[#808388] bg-white px-[2.6rem] py-[1.6rem]'
      >
        <p className='md:text-18-semibold text-18-semibold text-black100 flex items-center justify-center gap-[0.25rem]'>
          4기 지원하기 <RightArrow />
        </p>
      </Link>
      <p className='text-16-regular text-brand-orange mb-[4.2rem] mt-[1.2rem] text-center'>{timeLeft}</p>
    </>
  );

  function RightArrow(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path d='M9 18L15 12L9 6' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
      </svg>
    );
  }
}
