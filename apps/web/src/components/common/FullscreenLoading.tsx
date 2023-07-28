import { FC } from 'react';

import MakersLogo from './icons/MakersLogo';

interface FullscreenLoadingProps {}

const FullscreenLoading: FC<FullscreenLoadingProps> = ({}) => {
  return (
    <div className='flex min-h-[calc(100vh+1px)] justify-center pt-[20rem]'>
      <MakersLogo />
    </div>
  );
};

export default FullscreenLoading;
