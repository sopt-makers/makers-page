import clsx from 'clsx';
import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GreetingProps {
  className?: string;
}

export default function Intro({ className }: GreetingProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.5, 1], [1, 1, 1, 0, 0]);

  return (
    <article ref={containerRef} className={clsx('h-[200vh]', className)}>
      <m.div
        className='sticky top-0 flex flex-col justify-start items-center pt-[20rem]'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
      >
        <h1 className='mt-[3.75rem] text-center text-64-semibold'>
          SOPT에 없던 새로운 가치를 <br />
          제품을 통해 만들어갑니다.
        </h1>
        <button className='mt-[2.5rem] mb-[3.19rem] px-[2.5rem] py-[1rem] bg-dark1 rounded-[0.75rem] border border-solid border-[#808388]'>
          <p className='text-24-semibold'>3기 합류하기 (~8/88)</p>
          <p className='text-16-regular mt-[0.75rem]'>72:21:03 뒤 지원 마감</p>
        </button>
        <ArrowIcon />
      </m.div>
    </article>
  );
}

function ArrowIcon(props) {
  return (
    <svg width={48} height={48} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M25.2 33.6c0-2.925 2.665-5.592 5.592-5.592h1.2v-2.4h-1.2c-2.129 0-4.125.934-5.592 2.399V13.2h-2.4v14.807c-1.466-1.465-3.463-2.399-5.592-2.399h-1.2v2.4h1.2c2.927 0 5.592 2.667 5.592 5.592v1.2h2.4v-1.2z'
        fill='#fff'
      />
      <circle cx={24} cy={24} r={23.4} stroke='#fff' strokeWidth={1.2} />
    </svg>
  );
}
