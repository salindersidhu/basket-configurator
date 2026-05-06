import * as THREE from "three";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import { Camera } from "./Camera";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Mesh } from "./Mesh";
import { CAMERA, COLORS } from "../constants";

type Props = {
  geometry: THREE.BufferGeometry | null;
  color: string;
  isDark: boolean;
};

export function Scene({ geometry, color, isDark }: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  return (
    <>
      <color
        attach="background"
        args={[isDark ? COLORS.darkBg : COLORS.lightBg]}
      />

      <Lights />
      <Grid isDark={isDark} />

      {geometry && <Mesh geometry={geometry} color={color} />}

      <Camera geometry={geometry} controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={CAMERA.dampingFactor}
        minDistance={CAMERA.minDistance}
        maxDistance={CAMERA.maxDistance}
      />
    </>
  );
}
