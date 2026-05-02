import * as THREE from "three";
import { Bounds, OrbitControls, useBounds } from "@react-three/drei";
import { useEffect } from "react";

import { Lights } from "./Lights";
import { ThemeGrid } from "./ThemeGrid";
import { Mesh } from "./Mesh";
import { COLORS } from "../constants";

type Props = {
  geometry: THREE.BufferGeometry | null;
  color: string;
  isDark: boolean;
};

function Fit({ geometry }: { geometry: THREE.BufferGeometry | null }) {
  const bounds = useBounds();

  useEffect(() => {
    if (!geometry) return;

    // wait for r3f commit
    requestAnimationFrame(() => {
      bounds.refresh().fit();
    });
  }, [geometry, bounds]);

  return null;
}

export function Scene({ geometry, color, isDark }: Props) {
  return (
    <>
      <color
        attach="background"
        args={[isDark ? COLORS.darkBg : COLORS.lightBg]}
      />

      <Lights />
      <ThemeGrid isDark={isDark} />

      {geometry && (
        <Bounds fit clip margin={1.2}>
          <Mesh geometry={geometry} color={color} />
          <Fit geometry={geometry} />
        </Bounds>
      )}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        target={[0, 30, 0]}
      />
    </>
  );
}
