'use client';

import clsx from 'clsx';
import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GreetingProps {
  className?: string;
}

export default function MakersIntodution({ className }: GreetingProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.52, 1], [0, 1, 1, 0, 0]);

  return (
    <article ref={containerRef} className={clsx('h-[200vh]', className)}>
      <m.div
        className='sticky top-0 pt-[12rem] flex flex-col justify-center items-center text-center'
        style={{ opacity }}
      >
        <div className='flex flex-col justify-center items-center text-center'>
          <p className='flex justify-center items-center gap-[1rem] text-32-regular'>
            <TextLogo />는
          </p>
          <p className='mt-[3.75rem] text-40-semibold'>
            SOPT에 필요한 프로덕트를 만들어
            <br /> <span className='text-main-makers'>3천여명의 구성원</span>들을{' '}
            <span className='text-sub-skyblue'>연결</span>하고 <span className='text-sub-yellow'>새로운 가치</span>를
            제공하기 위한
            <br /> SOPT 특수 기구예요.
          </p>
          <p className='mt-[2.5rem] text-32-regular'>
            수년간 방치되어 SOPT를 잘 드러내지 못하는 공식 홈페이지를 보고
            <br />
            홈페이지에 오너십을 가진 조직의 부재라는 문제 의식으로부터
            <br />
            이를 지속 가능한 방법으로 해결하고자 22년 7월 30일 특수 기구로 시작했어요.
          </p>
          <button className='flex flex-row justify-center items-center gap-[0.5rem] mt-[3.75rem] px-[2rem]  py-[1.5rem] text-24-semibold'>
            makers 탄생 배경 보러가기 <ArrowIcon />
          </button>
        </div>
      </m.div>
    </article>
  );
}

function TextLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={300} height={52} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M18.21 40.233H7.13c-3.482 0-6.305-2.83-6.305-6.32v-.46c0-.252.205-.457.456-.457h4.552c.251 0 .456.205.456.457 0 .721.581 1.305 1.3 1.305h10.889c1.206 0 2.184-.981 2.184-2.19v-1.683c0-.967-.78-1.75-1.745-1.75H7.882c-4.16 0-7.531-3.38-7.531-7.551v-1.769c0-4.38 3.542-7.932 7.91-7.932H18.68c3.846 0 6.966 3.129 6.966 6.985a.457.457 0 01-.456.457h-4.699a.307.307 0 01-.306-.307v-.198a1.46 1.46 0 00-1.458-1.461H7.953a2.145 2.145 0 00-2.142 2.147v1.764a2.387 2.387 0 002.384 2.39H19.48c3.668 0 6.64 2.98 6.64 6.658v1.98c0 4.38-3.542 7.932-7.91 7.932v.003zM291.736 39.906h-11.081c-3.481 0-6.304-2.83-6.304-6.32v-.46c0-.252.205-.457.456-.457h4.552c.251 0 .456.205.456.457 0 .721.581 1.305 1.301 1.305h10.888c1.206 0 2.184-.981 2.184-2.19v-1.683c0-.967-.781-1.75-1.745-1.75H281.41c-4.16 0-7.531-3.38-7.531-7.551v-1.769c0-4.38 3.542-7.931 7.911-7.931h10.418c3.846 0 6.966 3.127 6.966 6.984a.456.456 0 01-.456.457h-4.698a.308.308 0 01-.307-.307v-.198a1.46 1.46 0 00-1.457-1.461h-10.775a2.145 2.145 0 00-2.141 2.147v1.764a2.386 2.386 0 002.383 2.39h11.285c3.668 0 6.641 2.98 6.641 6.658v1.98c0 4.38-3.542 7.932-7.911 7.932l-.002.003zM46.598 17.478a2.548 2.548 0 012.541 2.549V32.3a2.548 2.548 0 01-2.54 2.55h-9.626a2.548 2.548 0 01-2.54-2.55V20.027a2.548 2.548 0 012.54-2.549h9.625zm0-5.474h-9.625c-4.417 0-7.997 3.591-7.997 8.023V32.3c0 4.432 3.58 8.023 7.997 8.023h9.625c4.418 0 7.998-3.591 7.998-8.023V20.027c0-4.432-3.58-8.023-7.998-8.023zM63.137 12.004h-3.993a.735.735 0 00-.734.736v38.524c0 .407.329.736.734.736h3.993c.405 0 .733-.33.733-.736V12.74a.735.735 0 00-.733-.736zM198.99 0h-4.036a.713.713 0 00-.712.714v38.568c0 .394.319.714.712.714h4.036c.393 0 .712-.32.712-.714V.714A.713.713 0 00198.99 0zM272.169 12.271a.712.712 0 00-.712-.714h-8.998c-2.638 0-3.825 1.31-4.537 3.689V12.15a.712.712 0 00-.712-.714h-4.039a.712.712 0 00-.712.714v27.132c0 .395.318.714.712.714h4.039a.712.712 0 00.712-.714V20.96c0-2.17 1.754-3.93 3.92-3.93h9.612a.712.712 0 00.713-.713v-4.048l.002.002z'
        fill='#fff'
      />
      <path d='M205.881 27.386V21.91h-11.4v5.477h11.4z' fill='#fff' />
      <path
        d='M214.348 11.195h5.605a.42.42 0 01.328.682l-10.373 13.132h-7.116l10.51-13.306a1.336 1.336 0 011.049-.508h-.003zM215.305 40.237h5.608a.42.42 0 00.33-.678l-11.334-14.55h-7.117l11.46 14.712c.254.326.643.516 1.053.516zM164.662 12.148v4.048c0 .395.318.714.712.714h16.474a2.284 2.284 0 012.282 2.287v20.085c0 .395.318.714.712.714h4.038a.712.712 0 00.712-.714V17.386c0-3.273-2.671-5.95-5.935-5.95h-18.28a.713.713 0 00-.713.714l-.002-.002zM76.627 12.125h-8.761a4.48 4.48 0 00-4.475 4.486v18.661a5.076 5.076 0 005.069 5.082h8.169c3.905 0 7.072-3.175 7.072-7.09V19.217c0-3.915-3.167-7.089-7.072-7.089l-.002-.002zm1.727 19.909a2.81 2.81 0 01-2.808 2.814h-8.528a3.156 3.156 0 01-3.152-3.16V20.867a3.156 3.156 0 013.152-3.16h8.528a2.81 2.81 0 012.808 2.815v11.515-.002zM97.6 34.758a3.335 3.335 0 01-3.33-3.34V17.468h9.733a.713.713 0 00.713-.714v-4.05a.713.713 0 00-.713-.713H94.27V4.984a.712.712 0 00-.713-.714h-3.563a.712.712 0 00-.712.714v5.368c0 .904-.732 1.638-1.634 1.638h-.74a.712.712 0 00-.713.714v4.049c0 .395.318.714.713.714h1.899v13.952c0 4.867 3.936 8.814 8.791 8.814h6.455a.712.712 0 00.712-.714v-4.05a.712.712 0 00-.712-.713h-6.455l.002.002zM151.8 11.11h-4.835a7.53 7.53 0 00-5.918 2.87 7.185 7.185 0 00-5.749-2.87H130.7a7.536 7.536 0 00-6.362 3.496v-2.782a.712.712 0 00-.712-.714h-4.04a.712.712 0 00-.712.714v27.458c0 .395.318.714.712.714h4.04a.712.712 0 00.712-.714V19.474a2.889 2.889 0 012.886-2.89h5.996a2.995 2.995 0 012.992 2.997V39.28c0 .395.318.714.712.714h3.957a.712.712 0 00.712-.714V19.477a2.888 2.888 0 012.885-2.892h5.997a2.995 2.995 0 012.992 2.999v19.693c0 .395.318.714.712.714h4.123a.712.712 0 00.712-.714v-20.95c0-3.988-3.225-7.22-7.205-7.22l-.009.003z'
        fill='#fff'
      />
      <path
        d='M168.602 23.86c-3.169 0-5.74 2.575-5.74 5.754v4.628c0 3.177 2.569 5.754 5.74 5.754h8.948c5.761 0 7.992-4.683 7.992-10.458v-7.389l-16.94 1.711zm15.516 5.973c0 2.874-1.823 4.728-4.69 4.728h-8.251c-1.576 0-2.855-.807-2.855-2.387V31.3c0-1.58 1.279-2.387 2.855-2.387l12.941-1.328v2.249zM227.279 29.112v-2.688h-5.459v3.691c0 5.59 4.517 10.122 10.088 10.122h13.41c.394 0 .712-.32.712-.715v-4.05a.712.712 0 00-.712-.715h-12.411c-3.107 0-5.628-2.527-5.628-5.647v.002z'
        fill='#fff'
      />
      <path
        d='M221.82 19.302v8.325h25.617a.724.724 0 00.723-.726v-7.597c0-4.346-3.509-7.868-7.84-7.868h-10.657c-4.331 0-7.84 3.522-7.84 7.868l-.003-.002zm20.883 2.848h-14.917a.51.51 0 01-.508-.51V18.86c0-1.074.869-1.946 1.939-1.946h11.544c1.071 0 1.939.872 1.939 1.946v3.293l.003-.002z'
        fill='#fff'
      />
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.8 11.4c-1.463 0-2.796-1.333-2.796-2.796v-.6h-1.2v.6c0 1.064.466 2.063 1.199 2.796H6.6v1.2h7.403c-.733.733-1.2 1.732-1.2 2.796v.6h1.2v-.6c0-1.463 1.334-2.796 2.797-2.796h.6v-1.2h-.6z'
        fill='#fff'
      />
      <circle cx={12} cy={12} r={11.5} stroke='#fff' />
    </svg>
  );
}
