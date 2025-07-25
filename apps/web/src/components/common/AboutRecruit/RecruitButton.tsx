'use client';

import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const deadline = dayjs('2025-08-13T23:59:00.000Z');
const start = dayjs('2025-07-30T11:00:00.000Z');

export default function RecruitButton() {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();

      if (now.isBefore(start)) {
        return '7/30 11:00 부터 지원 가능';
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
        return '일부 포지션 추가 모집 중 (~2/5 수요일 23시 59분)';
        // return '일부 포지션 모집 연장 (~2/6 목요일 14시 59분)';
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
      {/* <Link href='/recruit/' className='mb-[0.5rem] mt-[4rem] rounded-[1.2rem] bg-white'> */}
      <Link
        href='https://sopt-makers.notion.site/36-2ff73e675e064d8fa762d409134eeb32'
        className='mb-[0.5rem] mt-[4rem] rounded-[1.2rem] bg-white'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button theme='white' size='lg' RightIcon={IconChevronRight}>
          36기 지원하기
        </Button>
        {/* <Button theme='white' size='lg' RightIcon={IconChevronRight}>35기 모집글 보기</Button> */}
      </Link>
      <p className='text-16-regular text-brand-orange mb-[4.2rem] mt-[1.2rem] text-center'>{timeLeft}</p>
    </>
  );
}
