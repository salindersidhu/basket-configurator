export const CAMERA = {
  position: [200, 180, 250] as const,
  fov: 45,
  near: 0.1,
  far: 5000,

  fitDistanceMultiplier: 3.2,
  fitAnimationMs: 500,
  fitDirection: [1, 0.7, 1] as const,

  minDistance: 40,
  maxDistance: 1000,
  dampingFactor: 0.08,
};

export const COLORS = {
  darkBg: "#141414",
  lightBg: "#f5f5f5",
};

export const GRID = {
  size: 400,
  divisions: 40,
  colors: {
    dark: [0x303030, 0x222222],
    light: [0xd0d0d0, 0xe0e0e0],
  },
};
