'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function RecruitButton() {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const deadline = dayjs('2023-08-05T13:00:00');
    const start = dayjs('2023-07-29T00:00:00');

    const calculateTimeLeft = () => {
      const now = dayjs();

      if (now.isBefore(start)) {
        return '7/29부터 지원 가능';
      }

      if (now.isAfter(deadline)) {
        return '지원이 마감되었어요.';
      }

      const difference = deadline.diff(now, 'second');

      const days = Math.floor(difference / (3600 * 24));
      const hours = Math.floor((difference / 3600) % 24);
      const minutes = Math.floor((difference / 60) % 60);
      const seconds = difference % 60;

      return `3기 지원 마감까지 ${days}일 ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href='/recruit/'
      className='bg-dark1 mb-[3rem] mt-[4rem] rounded-[1.2rem] border border-solid border-[#808388] px-[4rem] py-[1.6rem]'
    >
      <p className='md:text-24-semibold text-18-semibold'>3기 합류하기 (~8/5)</p>
      <p className='text-16-regular mt-[1.2rem] text-center'>{timeLeft}</p>
    </Link>
  );
}
