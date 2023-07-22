'use client';

import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';

import { MakersLogoModel } from './MakersLogoModel';

interface MakersLogo3DProps {
  className?: string;
}

const MakersLogo3D: FC<MakersLogo3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const elementX = (rect.right + rect.left) / 2;
      const elementY = (rect.top + rect.bottom) / 2;

      const dx = clientX - elementX;
      const dy = clientY - elementY;

      console.log(dx, dy);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx('h-[200px]', className)}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.01} />
        <hemisphereLight intensity={0.125} color='#8040df' groundColor='red' />
        <spotLight
          castShadow
          color='#d9dcc0'
          intensity={1.5}
          position={[-50, 50, 40]}
          angle={0.25}
          penumbra={1}
          shadow-mapSize={[128, 128]}
          shadow-bias={0.00005}
        />
        <directionalLight color='#b1c1da' intensity={0.5} position={[3, 2, 3]} />
        <Inner />
      </Canvas>
    </div>
  );
};

export default MakersLogo3D;

interface InnerProps {}

const Inner: FC<InnerProps> = ({}) => {
  return (
    <>
      <MakersLogoModel />
    </>
  );
};
