import * as THREE from "three";
import { useMemo } from "react";

import { GRID } from "../constants";

type Props = {
  isDark: boolean;
};

export function Grid({ isDark }: Props) {
  const grid = useMemo(() => {
    const [color1, color2] = isDark ? GRID.colors.dark : GRID.colors.light;

    return new THREE.GridHelper(GRID.size, GRID.divisions, color1, color2);
  }, [isDark]);

  return <primitive object={grid} position={[0, 0.002, 0]} dispose={null} />;
}
