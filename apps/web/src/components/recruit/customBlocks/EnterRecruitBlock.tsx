'use client';

import { m, SVGMotionProps } from 'framer-motion';
import { FC } from 'react';
interface EnterRecruitBlockProps {
  data: string;
}

const EnterRecruitBlock: FC<EnterRecruitBlockProps> = ({ data }) => {
  const content = getProperty(data, 'content');
  const link = getProperty(data, 'link');

  if (!link) {
    return <div>Custom Block: No link provided. {data}</div>;
  }

  return (
    <div className='flex'>
      <m.a
        href={link}
        target='_blank'
        className='flex items-center gap-[1rem] rounded-[6.5rem] bg-white/5 p-[2rem_3rem_2rem_2rem] text-[2rem] font-bold transition-colors hover:bg-white/10'
        initial='init'
        whileHover='hover'
        variants={{
          init: {
            color: '#ffffff',
          },
          hover: {
            color: ['#5DDBFF', '#5a62b5', '#FDBBF9', '#FFCA00', '#FF6E1D', '#5DDBFF'],
            transition: {
              repeat: Infinity,
              duration: 4,
            },
          },
        }}
      >
        <EnterIcon variants={{ init: { rotate: '0deg' }, hover: { rotate: '45deg' } }} />
        <span>{content}</span>
      </m.a>
    </div>
  );
};

export default EnterRecruitBlock;

function getProperty(data: string, name: string) {
  const reg = new RegExp(`${name}:.?(.*)`);
  const match = data.match(reg);

  if (!match) {
    return null;
  }
  return match[1];
}

function EnterIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <m.svg width={40} height={40} viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M23.466 15.544c-1.207 1.207-3.407 1.207-4.615 0l-.495-.495-.99.99.495.495c.878.878 2.087 1.317 3.297 1.318l-6.11 6.109.99.99 6.11-6.11c0 1.21.44 2.42 1.318 3.298l.495.495.99-.99-.495-.495c-1.208-1.208-1.207-3.408 0-4.615l.495-.495-.99-.99-.495.495z'
        fill='currentColor'
      />
      <circle cx={20} cy={20} r={13.421} transform='rotate(-45 20 20)' stroke='currentColor' strokeWidth={1.167} />
    </m.svg>
  );
}
