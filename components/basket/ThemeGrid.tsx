import { useMemo } from "react";
import * as THREE from "three";
import { GRID } from "./constants";

export function ThemeGrid({ isDark }: { isDark: boolean }) {
  const grid = useMemo(() => {
    const color1 = isDark ? 0x303030 : 0xd0d0d0;
    const color2 = isDark ? 0x222222 : 0xe0e0e0;

    return new THREE.GridHelper(GRID.size, GRID.divisions, color1, color2);
  }, [isDark]);

  return <primitive object={grid} dispose={null} />;
}
