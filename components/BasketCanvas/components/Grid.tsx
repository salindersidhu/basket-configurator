import * as THREE from "three";
import { useEffect, useMemo } from "react";

import { GRID } from "../constants";
import { useThemeStore } from "@/stores/useThemeStore";

export function Grid() {
  const isDark = useThemeStore((s) => s.isDark);

  const grid = useMemo(() => {
    const [color1, color2] = isDark ? GRID.colors.dark : GRID.colors.light;
    return new THREE.GridHelper(GRID.size, GRID.divisions, color1, color2);
  }, [isDark]);

  useEffect(() => {
    const [color1, color2] = isDark ? GRID.colors.dark : GRID.colors.light;

    const materials = Array.isArray(grid.material)
      ? grid.material
      : [grid.material];

    if (materials.length >= 2) {
      (materials[0] as THREE.LineBasicMaterial).color.setHex(color1);
      (materials[1] as THREE.LineBasicMaterial).color.setHex(color2);

      materials[0].needsUpdate = true;
      materials[1].needsUpdate = true;
    }
  }, [isDark, grid]);

  return <primitive object={grid} position={[0, 0.002, 0]} />;
}
