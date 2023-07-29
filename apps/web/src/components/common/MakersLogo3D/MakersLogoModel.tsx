/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/logo.gltf --transform --types
*/

import { useGLTF } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Fill: THREE.Mesh;
  };
  materials: {
    Mat: THREE.MeshStandardMaterial;
  };
};

export function MakersLogoModel(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/logo-transformed.glb') as GLTFResult;
  return (
    <group {...props} dispose={null} scale={20}>
      <group rotation={[-Math.PI, -Math.PI, -Math.PI]}>
        <group position={[-0.07, -0.09, 0]}>
          <group position={[0.08, 0.08, 0]}>
            <mesh geometry={nodes.Fill.geometry} position={[-0.08, -0.08, 0]}>
              <meshPhongMaterial color='#fff' shininess={10} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/logo-transformed.glb');
