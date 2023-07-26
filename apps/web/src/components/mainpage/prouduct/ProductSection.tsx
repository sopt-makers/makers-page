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
            <section className='mr-[6.704rem] min-w-[36.4rem]'>
              <p className='text-40-semibold sticky top-0 ml-[6rem] pt-[8.4rem]'>
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
            <nav className='text-40-semibold h-max w-full border-l border-solid border-white'>
              <div className='flex flex-col border-b border-solid border-white py-[2.4rem] pl-[4rem]'>
                <Title type='official' />
                <Description type='official' />
              </div>
              <div className='flex flex-col border-b border-solid border-white py-[2.4rem] pl-[4rem]'>
                <Title type='playground' />
                <Description type='playground' />
              </div>
              <div className='flex flex-col border-b border-solid border-white py-[2.4rem] pl-[4rem]'>
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
