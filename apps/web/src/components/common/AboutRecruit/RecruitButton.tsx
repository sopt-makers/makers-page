'use client';

import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecruitButton() {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const deadline = dayjs('2024-08-09T14:59:00.000Z');
    const start = dayjs('2024-07-31T02:00:00.000Z');

    const calculateTimeLeft = () => {
      const now = dayjs();

      if (now.isBefore(start)) {
        return '7/31 11:00 부터 지원 가능';
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
        return '현재 35기 메이커스 팀 모집 중 (~8/9 금요일 23시 59분)';
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
        className='mb-[0.5rem] mt-[4rem] rounded-[1.2rem] bg-white'
      >
        <Button theme='white' size='lg' RightIcon={IconChevronRight}>35기 지원하기</Button>
      </Link>
      <p className='text-16-regular text-brand-orange mb-[4.2rem] mt-[1.2rem] text-center'>{timeLeft}</p>
    </>
  );
}
