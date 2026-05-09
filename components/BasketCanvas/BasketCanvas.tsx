"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { Scene } from "./components/Scene";
import { CAMERA } from "./constants";

export function BasketCanvas({
  geometry,
  color,
}: {
  geometry: THREE.BufferGeometry | null;
  color: string;
}) {
  return (
    <Canvas
      shadows
      className="h-full w-full touch-none"
      camera={CAMERA}
      gl={{
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      dpr={[1, 2]}
    >
      <Scene geometry={geometry} color={color} />
    </Canvas>
  );
}
