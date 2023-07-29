'use client';

import { FC } from 'react';

interface LightProps {}

const Light: FC<LightProps> = ({}) => {
  return (
    <>
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
      <directionalLight color='#b1c1da' intensity={0.3} position={[3, 2, 3]} />
    </>
  );
};

export default Light;
