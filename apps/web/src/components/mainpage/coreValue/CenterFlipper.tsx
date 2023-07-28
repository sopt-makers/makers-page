import { MotionValue, useTransform } from 'framer-motion';
import { FC, ReactElement } from 'react';

interface CenterFlipperProps {
  centerLineProgress: MotionValue<number>;
  flipRange: [number, number];
  children: (flipValue: MotionValue<number>) => ReactElement;
}

const CenterFlipper: FC<CenterFlipperProps> = ({ flipRange, centerLineProgress, children }) => {
  const flip = useTransform(centerLineProgress, flipRange, [0, 1]);
  return children(flip);
};

export default CenterFlipper;
