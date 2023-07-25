'use client';

import clsx from 'clsx';

import Description from './Description';
import Title from './Title';

interface ProductProps {
  className?: string;
}

export default function Product({ className }: ProductProps) {
  return (
    <div className='relative h-[300vh]'>
      <div className='absolute inset-0 mt-[48rem]'>
        <article className={clsx('h-[250vh]', className)}>
          <div className='flex flex-row justify-start'>
            <section className='min-w-[36.4rem] mr-[6.704rem]'>
              <p className='sticky top-0 ml-[6rem] pt-[8.4rem] text-40-semibold'>
                메이커스는
                <br />
                3개의 제품으로
                <br />
                <span className='text-main-makers'>
                  SOPT에
                  <br />
                  없던 가치
                </span>
                를
                <br />
                더하고 있어요.
              </p>
            </section>
            <nav className='w-full h-max border-l border-solid border-white h-screen text-40-semibold'>
              <div className='pl-[4rem] py-[2.4rem] flex flex-col border-b border-solid border-white'>
                <Title type='official' />
                <Description type='official' />
              </div>
              <div className='pl-[4rem] py-[2.4rem] flex flex-col border-b border-solid border-white'>
                <Title type='playground' />
                <Description type='playground' />
              </div>
              <div className='pl-[4rem] py-[2.4rem] flex flex-col border-b border-solid border-white'>
                <Title type='app' />
                <Description type='app' />
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  );
}
