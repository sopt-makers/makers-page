import { descriptionMap } from './data';

interface DescriptionProps {
  type: 'official' | 'playground' | 'app';
  children: React.ReactNode;
}

export default function Description({ type, children }: DescriptionProps) {
  const descriptionConfig = descriptionMap[type];

  return (
    <div className='flex flex-col pb-[2.4rem] pl-[4rem]'>
      <img
        className='w-[86rem] pb-[4rem] pt-[1.6rem]'
        src={descriptionConfig.imageUrl}
        alt={descriptionConfig.altText}
      />
      <div className='text-16-regular'>
        <span>{children}</span>
      </div>
    </div>
  );
}
