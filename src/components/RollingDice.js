import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const diceTextureUrls = [
  '/dice/1.png',
  '/dice/2.png',
  '/dice/3.png',
  '/dice/4.png',
  '/dice/5.png',
  '/dice/6.png',
];

// Load dice textures once
const loadTextures = () => {
  const loader = new THREE.TextureLoader();
  return diceTextureUrls.map(url => loader.load(url));
};

function Dice({ position, velocity }) {
  const meshRef = useRef();
  const textures = React.useMemo(() => loadTextures(), []);

  // Materials for each dice face
  const materials = textures.map(
    (tex) => new THREE.MeshBasicMaterial({ map: tex })
  );

  // Update position and rotation each frame
  useFrame(() => {
    if (!meshRef.current) return;

    // Spin dice
    meshRef.current.rotation.x += 0.03;
    meshRef.current.rotation.y += 0.04;

    // Move dice
    meshRef.current.position.add(velocity.current);

    // Bounce boundaries (inside viewport size)
    const { viewport } = useThree();

    // Boundaries based on viewport size (adjust dice size)
    const boundaryX = viewport.width / 2 - 0.5;
    const boundaryY = viewport.height / 2 - 0.5;

    if (meshRef.current.position.x > boundaryX || meshRef.current.position.x < -boundaryX) {
      velocity.current.x *= -1;
    }
    if (meshRef.current.position.y > boundaryY || meshRef.current.position.y < -boundaryY) {
      velocity.current.y *= -1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} material={materials} castShadow>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default function RollingDice() {
  // Position and velocity are stored in refs so they persist between renders
  const position = React.useRef(new THREE.Vector3(0, 0, 0));
  const velocity = React.useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    0
  ));

  return (
    <Canvas
      orthographic
      camera={{ zoom: 50, position: [0, 0, 100] }}
      style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}
    >
      <ambientLight />
      <Dice position={position.current} velocity={velocity} />
    </Canvas>
  );
}
