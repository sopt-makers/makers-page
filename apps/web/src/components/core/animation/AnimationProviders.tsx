'use client';
import { domMax, LazyMotion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const AnimationProviders: FC<ProvidersProps> = ({ children }) => {
  // Lazy Load를 여기서 직접 적용하진 않지만, 유사시를 대비해 미리 LazyMotion 감싸놓기
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
};

export default AnimationProviders;
