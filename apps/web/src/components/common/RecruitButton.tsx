import dayjs from 'dayjs';
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

      const difference = deadline.diff(now, 'second');

      let timeLeft = '3기 지원이 마감되었어요.';

      if (difference > 0) {
        const hours = Math.floor(difference / 3600);
        const minutes = Math.floor((difference / 60) % 60);
        const seconds = difference % 60;

        timeLeft = `${hours.toString().padStart(3, ' ')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')} 뒤 지원 마감`;
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <button className='bg-dark1 mb-[5.104rem] mt-[4rem] rounded-[1.2rem] border border-solid border-white px-[4rem] py-[1.6rem]'>
      <p className='text-24-semibold'>3기 합류하기 (~8/05)</p>
      <p className='text-16-regular mt-[1.2rem]'>{timeLeft}</p>
    </button>
  );
}
