import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import HorizontalScroll from './HorizontalScroll';
import { BaseImage, ConnectionImage, OpportunityImage, OwnershipImage, PleasureImage } from './images';
import ValueCard from './ValueCard';

interface CoreValueSectionProps {}

const CoreValueSection: FC<CoreValueSectionProps> = ({}) => {
  return (
    <HorizontalScroll className='h-[300vh]'>
      {() => (
        <div className='flex h-full items-center'>
          <div className='flex gap-[3.2rem]'>
            <div className='text-80-bold flex w-[45rem] flex-col pl-[8rem]'>
              <span>CORE</span>
              <span>VALUE</span>
            </div>
            {cards.map((card, idx) => (
              <ValueCard key={card.keyword} className='h-[52rem] w-[36.8rem]' {...card} seq={idx + 1} />
            ))}
          </div>
        </div>
      )}
    </HorizontalScroll>
  );
};

interface CardBaseProps {
  className?: string;
  children?: ReactNode;
}

const DescriptionCard: FC<CardBaseProps> = ({ className, children }) => {
  return (
    <div className={clsx('flex h-full w-full items-center justify-center whitespace-pre-line text-center', className)}>
      {children}
    </div>
  );
};

const cards = [
  {
    keyword: 'Ownership',
    name: '오너십',
    image: <OwnershipImage />,
    description: (
      <DescriptionCard className='bg-brand-orange text-orange-sub'>
        {`주체적인 책임감으로
          스스로 필요한 가치를 발견하고,
          모두가 앞으로 나아가는
          추진력을 경험합니다.`}
      </DescriptionCard>
    ),
  },
  {
    keyword: 'Connection',
    name: '연결',
    image: <ConnectionImage />,
    description: (
      <DescriptionCard className='bg-brand-skyblue text-skyblue-sub'>
        {`자유로운 네트워킹 환경 속
          뛰어난 동료와 깊이 연결되는
          경험을 할 수 있습니다.`}
      </DescriptionCard>
    ),
  },
  {
    keyword: 'Base',
    name: '기반',
    image: <BaseImage />,
    description: (
      <DescriptionCard className='bg-brand-blue text-blue-sub'>
        {`조직의 단단한 기반으로써,
          성장에 필요한 믿음직한 발판을
          제공합니다.`}
      </DescriptionCard>
    ),
  },
  {
    keyword: 'Opportunity',
    name: '기회',
    image: <OpportunityImage />,
    description: (
      <DescriptionCard className='bg-brand-pink text-pink-sub'>
        {`지속적인 경험을 통해
          시야를 확장하고,
          더 넓고 새로운 경험의
          기회를 선사합니다.`}
      </DescriptionCard>
    ),
  },
  {
    keyword: 'Pleasure',
    name: '즐거움',
    image: <PleasureImage />,
    description: (
      <DescriptionCard className='bg-brand-yellow text-yellow-sub'>
        {`존중을 기반으로,
          진정으로 모두가 즐겁게
          스스로의 목표를 세우고
          이루는 경험을 선사합니다.`}
      </DescriptionCard>
    ),
  },
];

export default CoreValueSection;
