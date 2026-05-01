'use client';

import { Bounds, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const DARK_BG = '#141414';
const LIGHT_BG = '#f5f5f5';

function ThemeGrid({ isDark }: { isDark: boolean }) {
  const grid = useMemo(() => {
    const line1 = isDark ? 0x303030 : 0xd0d0d0;
    const line2 = isDark ? 0x222222 : 0xe0e0e0;
    return new THREE.GridHelper(400, 40, line1, line2);
  }, [isDark]);

  useEffect(() => {
    return () => {
      grid.geometry.dispose();
      const mats = grid.material;
      if (Array.isArray(mats)) mats.forEach((m) => m.dispose());
      else mats.dispose();
    };
  }, [grid]);

  return <primitive object={grid} />;
}

function BasketMesh({
  geometry,
  color,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
}) {
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene({
  geometry,
  color,
  isDark,
}: {
  geometry: THREE.BufferGeometry | null;
  color: string;
  isDark: boolean;
}) {
  return (
    <>
      <color attach="background" args={[isDark ? DARK_BG : LIGHT_BG]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[150, 250, 200]}
        intensity={1.4}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-100, 100, -100]} intensity={0.3} />
      <hemisphereLight args={[0xcccccc, 0x333333, 0.4]} />
      <ThemeGrid isDark={isDark} />
      {geometry ? (
        <Bounds key={geometry.uuid} fit clip observe={false} margin={1.2}>
          <BasketMesh geometry={geometry} color={color} />
        </Bounds>
      ) : null}
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} target={[0, 30, 0]} />
    </>
  );
}

export function BasketCanvas({
  geometry,
  color,
  isDark,
}: {
  geometry: THREE.BufferGeometry | null;
  color: string;
  isDark: boolean;
}) {
  return (
    <Canvas
      shadows
      className="h-full w-full touch-none"
      camera={{ position: [200, 180, 250], fov: 45, near: 0.1, far: 5000 }}
      gl={{
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      dpr={[1, 2]}
    >
      <Scene geometry={geometry} color={color} isDark={isDark} />
    </Canvas>
  );
}
