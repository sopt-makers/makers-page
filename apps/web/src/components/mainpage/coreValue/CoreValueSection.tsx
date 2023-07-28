import { FC } from 'react';

import CoreValueDesktop from './CoreValueDesktop';
import CoreValueMobile from './CoreValueMobile';

interface CoreValueSectionProps {}

const CoreValueSection: FC<CoreValueSectionProps> = ({}) => {
  return (
    <>
      <div className='h-[20rem]' />
      <CoreValueDesktop className='hidden md:block' />
      <CoreValueMobile className='block md:hidden' />
    </>
  );
};

export default CoreValueSection;
