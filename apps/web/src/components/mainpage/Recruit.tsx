'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

import RecruitButton from '../common/RecruitButton';

export default function Recruit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <article ref={ref} className='mb-[14.4rem] mt-[23.808rem] flex flex-row items-center justify-between'>
      <LeftFrame
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
        className='mt-[13.504rem]'
      />
      <section
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 1.2s',
        }}
        className='flex items-center justify-center'
      >
        <div className='absolute flex flex-col items-center justify-center'>
          <h1 className='text-80-bold text-center'>
            SOPT에 새로운 가치를 더하는
            <br />
            메이커스에 합류하세요
          </h1>
          <RecruitButton />
        </div>
      </section>
      <RightFrame
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
        className='mb-[9.696rem]'
      />
    </article>
  );
}

function LeftFrame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={410} height={535} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0_220_3523)'>
        <path d='M410 248.004L342 304v-44.004L410 204v44.004z' fill='#F3BD39' />
        <path d='M342 260H224v44h118v-44z' fill='#E5A324' />
        <path d='M308.67 459.374l-84.899 75.196v-52.743l84.899-73.219v50.766z' fill='#FF8139' />
        <path d='M223.855 482.029h-357.57v53.023l357.57-1.351v-51.672z' fill='#FF6E1D' />
        <path d='M223.744 303.896l-72.956 61.276v-44.065l72.956-61.277v44.066z' fill='#5FCAE8' />
        <path d='M150.787 321.046h-284.459v44.066h284.459v-44.066z' fill='#36BDD3' />
        <path d='M51.617 43.313l-116.015 96.313V95.56L51.617 0v43.313z' fill='#F3BD39' />
        <path d='M213.428 83.873H4.81' stroke='#1F299C' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M223.744 260.692h-79.417' stroke='#5FCAE8' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M410 203.5l-197-.5' stroke='#F3BD39' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M308.67 409.403H150.788' stroke='#FF8039' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M51.723.863h-260.488' stroke='#F3BD39' strokeWidth={1.779} />
        <path d='M151.21 409.238l-85.177 72.801v-45.26l85.177-71.607v44.066z' fill='#DCB0D2' />
        <path d='M65.997 436.847h-232.338v45.009H65.997v-45.009z' fill='#D59AC5' />
        <path d='M213.427 204.128l-69.1 57.421V140.331l69.1-57.42v121.217z' fill='#2B3C98' />
        <path d='M144.802 139.789h-209.2V261.26h209.2V139.789z' fill='#1F299C' />
      </g>
      <defs>
        <clipPath id='prefix__clip0_220_3523'>
          <path fill='#fff' d='M0 0h410v535H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}

function RightFrame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={431} height={572} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0_220_3522)'>
        <path d='M293.34 226.303l-86.022 75.568v-55.823l86.022-75.569v55.824z' fill='#DCB0D2' />
        <path d='M207.265 245.693H0v55.721h207.265v-55.721z' fill='#D59AC5' />
        <path d='M560.121 301.677H207.374v55.824h352.747v-55.824z' fill='#36BDD3' />
        <path d='M637.798 1.222h-258.7' stroke='#1F299C' strokeWidth={1.779} strokeMiterlimit={10} />
        <path d='M295.538 169.969H88' stroke='#DCB0D2' />
        <path d='M380 .972l-84 71.074' stroke='#1F299C' strokeWidth={1.779} />
        <path d='M455.19 448.314H94.21v56.734h360.98v-56.734z' fill='#FF6E1D' />
        <path d='M552.698 72.056H293.276v153.883h259.422V72.056z' fill='#1F299C' />
        <path d='M0 245.186l87.766-75.476' stroke='#DCB0D2' />
        <path d='M94.21 448.314l112.559-91.179' stroke='#FF6E1D' />
      </g>
      <defs>
        <clipPath id='prefix__clip0_220_3522'>
          <path fill='#fff' d='M0 0h431v572H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
