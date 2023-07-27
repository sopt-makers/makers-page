import clsx from 'clsx';
import { m, useScroll, useTransform } from 'framer-motion';
import { SVGProps, useRef } from 'react';

import RecruitButton from '@/components/common/RecruitButton';

interface GreetingProps {
  className?: string;
}

export default function Intro({ className }: GreetingProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <article ref={containerRef} className={clsx('h-[120vh]', className)}>
      <m.div
        className='sticky top-0 flex h-screen w-full flex-col items-center justify-center'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        style={{ opacity }}
      >
        <h1 className='md:text-64-semibold text-32-regular mt-[6rem] text-center font-semibold'>
          SOPT에 없던 <br className='md:hidden' />
          새로운 가치를 <br />
          제품을 통해 만들어갑니다.
        </h1>
        <RecruitButton />
        <ArrowIcon />
      </m.div>
    </article>
  );
}

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
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
