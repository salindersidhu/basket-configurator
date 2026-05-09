import * as THREE from "three";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import { Camera } from "./Camera";
import { Grid } from "./Grid";
import { Lights } from "./Lights";
import { Mesh } from "./Mesh";
import { CAMERA, COLORS } from "../constants";

import { useThemeStore } from "@/stores/useThemeStore";

type Props = {
  geometry: THREE.BufferGeometry | null;
  color: string;
};

export function Scene({ geometry, color }: Props) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const isDark = useThemeStore((s) => s.isDark);

  return (
    <>
      <color
        attach="background"
        args={[isDark ? COLORS.darkBg : COLORS.lightBg]}
      />

      <Lights />
      <Grid />

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
