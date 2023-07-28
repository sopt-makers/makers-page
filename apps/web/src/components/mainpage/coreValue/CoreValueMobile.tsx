import clsx from 'clsx';
import { MotionValue, useMotionValue, useSpring } from 'framer-motion';
import { FC, ReactElement, useState } from 'react';

import { cards } from './cardData';
import ValueCard from './ValueCard';

interface CoreValueMobileProps {
  className?: string;
}

const CoreValueMobile: FC<CoreValueMobileProps> = ({ className }) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <h1 className='text-40-semibold mt-[40rem]'>CORE VALUE</h1>

      <div className='grid w-fit auto-rows-fr grid-cols-2 gap-x-[2.4rem] gap-y-[2.4rem]'>
        <div className=''></div>
        <div className='row-span-2'></div>
        {cards.map((card, idx) => (
          <Flipper key={idx} className='row-span-2 text-[0.6rem]'>
            {(flipValue) => <ValueCard className='' {...card} seq={idx + 1} flipValue={flipValue} />}
          </Flipper>
        ))}
      </div>
    </div>
  );
};

export default CoreValueMobile;

interface FlipperProps {
  className?: string;
  children: (flipValue: MotionValue<number>) => ReactElement;
}

const Flipper: FC<FlipperProps> = ({ className, children }) => {
  const value = useMotionValue(0);
  const spring = useSpring(value, {});
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    if (isOpen) {
      value.set(0);
      setIsOpen(false);
      return;
    }

    value.set(1);
    setIsOpen(true);
  }

  return (
    <div className={clsx('', className)} onClick={handleClick}>
      {children(spring)}
    </div>
  );
};
