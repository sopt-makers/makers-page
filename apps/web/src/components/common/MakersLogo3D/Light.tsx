'use client';

import { useFrame } from '@react-three/fiber';
import { MotionValue, transform, useMotionValueEvent, useTransform } from 'framer-motion';
import { FC, useRef } from 'react';
import { SpotLight, Vector3 } from 'three';

interface LightProps {
  progress: MotionValue<number>;
}

const Light: FC<LightProps> = ({ progress }) => {
  return (
    <>
      <MotionLight progress={progress} color='#FF6E1D' range={[0, 0.2]} />
      <MotionLight progress={progress} color='#5DDBFF' range={[0.2, 0.4]} />
      <MotionLight progress={progress} color='#474fad' range={[0.4, 0.6]} />
      <MotionLight progress={progress} color='#FDBBF9' range={[0.6, 0.8]} />
      <MotionLight progress={progress} color='#FFCA00' range={[0.8, 1]} />
    </>
  );
};

export default Light;

interface MotionLightProps {
  progress: MotionValue<number>;
  color: string;
  range: [number, number];
}

// const maxIntensity = 0.3;
const transformX = transform([0, 1], [1, -1]);
const transformY = transform([0, 1], [-1, 1]);
const transformIntensity = transform([0, 0.5, 1], [0, 1, 0], {});

const MotionLight: FC<MotionLightProps> = ({ color, progress, range }) => {
  const ranged = useTransform(progress, range, [0, 1]);
  const light = useRef<SpotLight>(null);

  const targetVec = useRef(new Vector3(0, 0, 2));

  useMotionValueEvent(ranged, 'change', (v) => console.log(color, transformIntensity(v)));

  useFrame(() => {
    const cur = ranged.get();
    targetVec.current.setX(transformX(cur));
    targetVec.current.setY(transformY(cur));

    if (light.current) {
      light.current.position.lerp(targetVec.current, 0.2);

      light.current.intensity = transformIntensity(cur);
    }
  });

  return <spotLight ref={light} color={color} position={[-10, -10, -10]} />;
};
