'use client';

import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GENERATION, RECRUIT_DEADLINE, RECRUIT_START } from '@/config';

const deadline = dayjs(RECRUIT_DEADLINE);
const start = dayjs(RECRUIT_START);

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

      if (days > 0 || hours >= 24) {
        return `${GENERATION}기 리쿠르팅 진행 중 (~${deadline.format('MM.DD')})`;
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
        href='https://sopt-makers.notion.site/37-22976042aac28009811df7026480fa54'
        className='mb-[0.5rem] mt-[4rem] rounded-[1.2rem] bg-white'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button theme='white' size='lg' RightIcon={IconChevronRight}>
          37기 지원하기
        </Button>
        {/* <Button theme='white' size='lg' RightIcon={IconChevronRight}>35기 모집글 보기</Button> */}
      </Link>
      <p className='text-16-regular text-brand-orange mb-[4.2rem] mt-[1.2rem] text-center'>{timeLeft}</p>
    </>
  );
}
