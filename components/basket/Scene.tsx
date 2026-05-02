import * as THREE from "three";
import { Bounds, OrbitControls } from "@react-three/drei";

import { Lights } from "./Lights";
import { ThemeGrid } from "./ThemeGrid";
import { BasketMesh } from "./BasketMesh";
import { COLORS } from "./constants";

export function Scene({
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
      {/* Background */}
      <color
        attach="background"
        args={[isDark ? COLORS.darkBg : COLORS.lightBg]}
      />

      {/* Lights */}
      <Lights />

      {/* Grid */}
      <ThemeGrid isDark={isDark} />

      {/* Model */}
      {geometry && (
        <Bounds key={geometry?.uuid} fit clip margin={1.2}>
          <BasketMesh geometry={geometry} color={color} />
        </Bounds>
      )}

      {/* Controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        target={[0, 30, 0]}
      />
    </>
  );
}
