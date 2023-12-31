'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import clsx from 'clsx';
import { MotionValue, useMotionValue } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';
import { Group, Vector3 } from 'three';

import Light from './Light';
import { MakersLogoModel } from './MakersLogoModel';

interface MakersLogo3DProps {
  className?: string;
  progress: MotionValue<number>;
}

const MakersLogo3D: FC<MakersLogo3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const posY = useMotionValue(0);
  const posX = useMotionValue(0);

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

      if (!isNaN(dx)) {
        posX.set(dx);
      }
      if (!isNaN(dy)) {
        posY.set(dy);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [posX, posY]);

  return (
    <div ref={containerRef} className={clsx('h-[200px]', className)}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2] }}>
        <Light />
        <Inner posY={posY} posX={posX} />
      </Canvas>
    </div>
  );
};

export default MakersLogo3D;

interface InnerProps {
  posY: MotionValue<number>;
  posX: MotionValue<number>;
}

const Inner: FC<InnerProps> = ({ posY, posX }) => {
  const groupRef = useRef<Group>(null);
  const currentRef = useRef(new Vector3(0, 0, 2));
  const pointRef = useRef(new Vector3(0, 0, 2));

  useFrame(() => {
    if (groupRef.current) {
      pointRef.current.setX(clamp(-1, posX.get() * 0.003, 1));
      pointRef.current.setY(clamp(-1, -posY.get() * 0.003, 1));

      currentRef.current.lerp(pointRef.current, 0.03);
      groupRef.current.lookAt(currentRef.current);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <MakersLogoModel />
      </group>
    </>
  );
};

function clamp(a: number, target: number, b: number) {
  return Math.max(a, Math.min(target, b));
}
