import * as THREE from "three";
import Module from "manifold-3d";

import type { BasketConfig } from "@/lib/types";

const PATTERN_CLEARANCE_ABOVE_FLOOR_MM = 3;

let manifoldPromise: Promise<any> | null = null;

async function getManifoldModule() {
  manifoldPromise ??= (async () => {
    const wasm = await Module();
    wasm.setup();
    return wasm;
  })();

  return manifoldPromise;
}

export async function generateBasket(
  config: BasketConfig,
): Promise<THREE.BufferGeometry> {
  const wasm = await getManifoldModule();
  const { Manifold } = wasm;

  const {
    width = 100,
    height = 60,
    length = 150,
    wallThickness = 2,
    cornerRadius = 0,
    pattern = "none",
    patternSize = 8,
    patternSpacing = 3,
    handles = true,
    handleSides = "front-back",
    handleWidth = 60,
    handleHeight = 20,
    handleTopOffset = 8,
  } = config;

  const cr = Math.min(cornerRadius, width / 4, length / 4);
  const innerCR = Math.max(0, cr - wallThickness);
  const baseThickness = wallThickness;

  let result =
    cr > 1
      ? roundedBox(Manifold, width, height, length, cr)
      : box(Manifold, width, height, length, 0, height / 2, 0);

  const innerW = width - wallThickness * 2;
  const innerL = length - wallThickness * 2;
  const innerH = height - baseThickness;

  if (innerW > 0 && innerH > 0 && innerL > 0) {
    const inner =
      innerCR > 1
        ? roundedBox(Manifold, innerW, innerH, innerL, innerCR).translate([
            0,
            baseThickness,
            0,
          ])
        : box(
            Manifold,
            innerW,
            innerH,
            innerL,
            0,
            baseThickness + innerH / 2,
            0,
          );

    result = result.subtract(inner);
  }

  const handleOnFB =
    handles && (handleSides === "front-back" || handleSides === "all");
  const handleOnLR =
    handles && (handleSides === "left-right" || handleSides === "all");

  if (handles && handleWidth > 0 && handleHeight > 0) {
    result = cutHandles(
      Manifold,
      result,
      width,
      height,
      length,
      wallThickness,
      handleWidth,
      handleHeight,
      handleTopOffset,
      handleOnFB,
      handleOnLR,
    );
  }

  if (pattern !== "none") {
    result = cutPattern(
      Manifold,
      result,
      pattern,
      width,
      height,
      length,
      wallThickness,
      patternSize,
      patternSpacing,
      handleOnFB,
      handleOnLR,
      handleWidth,
      handleHeight,
      handleTopOffset,
    );
  }

  return manifoldToThreeGeometry(result);
}

function box(
  Manifold: any,
  w: number,
  h: number,
  l: number,
  x: number,
  y: number,
  z: number,
) {
  return Manifold.cube([w, h, l], true).translate([x, y, z]);
}

function cylY(
  Manifold: any,
  radius: number,
  height: number,
  x: number,
  y: number,
  z: number,
  segments = 32,
) {
  return Manifold.cylinder(height, radius, radius, segments, true)
    .rotate([90, 0, 0])
    .translate([x, y, z]);
}

function cylZ(
  Manifold: any,
  radius: number,
  depth: number,
  x: number,
  y: number,
  z: number,
  segments = 32,
) {
  return Manifold.cylinder(depth, radius, radius, segments, true).translate([
    x,
    y,
    z,
  ]);
}

function cylX(
  Manifold: any,
  radius: number,
  depth: number,
  x: number,
  y: number,
  z: number,
  segments = 32,
) {
  return Manifold.cylinder(depth, radius, radius, segments, true)
    .rotate([0, 90, 0])
    .translate([x, y, z]);
}

function roundedBox(Manifold: any, w: number, h: number, l: number, r: number) {
  r = Math.min(r, w / 2 - 0.1, l / 2 - 0.1);

  const parts = [
    box(Manifold, w - 2 * r, h, l, 0, h / 2, 0),
    box(Manifold, w, h, l - 2 * r, 0, h / 2, 0),

    cylY(Manifold, r, h, -w / 2 + r, h / 2, -l / 2 + r),
    cylY(Manifold, r, h, w / 2 - r, h / 2, -l / 2 + r),
    cylY(Manifold, r, h, w / 2 - r, h / 2, l / 2 - r),
    cylY(Manifold, r, h, -w / 2 + r, h / 2, l / 2 - r),
  ];

  return Manifold.union(parts);
}

function roundedRectCutout(
  Manifold: any,
  axis: "x" | "z",
  w: number,
  h: number,
  depth: number,
  x: number,
  y: number,
  z: number,
) {
  const r = Math.min(5, w / 2, h / 2);

  const parts =
    axis === "z"
      ? [
          box(Manifold, w, h - 2 * r, depth, x, y + h / 2, z),
          box(Manifold, w - 2 * r, h, depth, x, y + h / 2, z),
          cylZ(Manifold, r, depth, x - w / 2 + r, y + r, z),
          cylZ(Manifold, r, depth, x + w / 2 - r, y + r, z),
          cylZ(Manifold, r, depth, x - w / 2 + r, y + h - r, z),
          cylZ(Manifold, r, depth, x + w / 2 - r, y + h - r, z),
        ]
      : [
          box(Manifold, depth, h - 2 * r, w, x, y + h / 2, z),
          box(Manifold, depth, h, w - 2 * r, x, y + h / 2, z),
          cylX(Manifold, r, depth, x, y + r, z - w / 2 + r),
          cylX(Manifold, r, depth, x, y + r, z + w / 2 - r),
          cylX(Manifold, r, depth, x, y + h - r, z - w / 2 + r),
          cylX(Manifold, r, depth, x, y + h - r, z + w / 2 - r),
        ];

  return Manifold.union(parts);
}

function cutHandles(
  Manifold: any,
  basket: any,
  width: number,
  height: number,
  length: number,
  wallT: number,
  handleWidth: number,
  handleHeight: number,
  topOffset: number,
  onFB: boolean,
  onLR: boolean,
) {
  const cutters: any[] = [];
  const depth = wallT * 8;

  if (onFB) {
    const w = Math.min(handleWidth, width - 20);
    const h = Math.min(handleHeight, height - topOffset - wallT - 5);
    const y = height - topOffset - h;

    if (w > 0 && h > 0) {
      cutters.push(
        roundedRectCutout(Manifold, "z", w, h, depth, 0, y, length / 2),
        roundedRectCutout(Manifold, "z", w, h, depth, 0, y, -length / 2),
      );
    }
  }

  if (onLR) {
    const w = Math.min(handleWidth, length - 20);
    const h = Math.min(handleHeight, height - topOffset - wallT - 5);
    const y = height - topOffset - h;

    if (w > 0 && h > 0) {
      cutters.push(
        roundedRectCutout(Manifold, "x", w, h, depth, width / 2, y, 0),
        roundedRectCutout(Manifold, "x", w, h, depth, -width / 2, y, 0),
      );
    }
  }

  if (!cutters.length) return basket;

  return basket.subtract(Manifold.union(cutters));
}

function cutPattern(
  Manifold: any,
  basket: any,
  pattern: BasketConfig["pattern"],
  bWidth: number,
  bHeight: number,
  bLength: number,
  wallT: number,
  size: number,
  spacing: number,
  handleOnFB: boolean,
  handleOnLR: boolean,
  handleWidth: number,
  handleHeight: number,
  handleTopOffset: number,
) {
  const baseThickness = wallT;
  const depth = wallT * 8;
  const buffer = size + 4;
  const cutters: any[] = [];

  const walls = [
    { faceW: bWidth, axis: "z" as const, pos: bLength / 2, handle: handleOnFB },
    {
      faceW: bWidth,
      axis: "z" as const,
      pos: -bLength / 2,
      handle: handleOnFB,
    },
    {
      faceW: bLength,
      axis: "x" as const,
      pos: -bWidth / 2,
      handle: handleOnLR,
    },
    { faceW: bLength, axis: "x" as const, pos: bWidth / 2, handle: handleOnLR },
  ];

  for (const wall of walls) {
    const step = size * 2 + spacing;
    const radius = size;

    const cols = Math.floor((wall.faceW - radius * 2) / step);
    const rows = Math.floor((bHeight - radius * 2) / step);

    if (cols <= 0 || rows <= 0) continue;

    const startX = (-(cols - 1) * step) / 2;
    const startY = radius;
    const minY = baseThickness + PATTERN_CLEARANCE_ABOVE_FLOOR_MM + radius;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + col * step;
        const y = startY + row * step;

        if (y < minY) continue;

        if (
          wall.handle &&
          isInsideHandleZone(
            x,
            y,
            bHeight,
            handleWidth,
            handleHeight,
            handleTopOffset,
            wallT,
            buffer,
          )
        ) {
          continue;
        }

        const segments = pattern === "holes" ? 24 : 6;

        if (wall.axis === "z") {
          cutters.push(cylZ(Manifold, radius, depth, x, y, wall.pos, segments));
        } else {
          cutters.push(cylX(Manifold, radius, depth, wall.pos, y, x, segments));
        }
      }
    }
  }

  if (!cutters.length) return basket;

  return basket.subtract(Manifold.union(cutters));
}

function isInsideHandleZone(
  x: number,
  y: number,
  wallHeight: number,
  handleWidth: number,
  handleHeight: number,
  topOffset: number,
  wallT: number,
  buffer: number,
) {
  const halfW = handleWidth / 2;
  const h = Math.min(handleHeight, wallHeight - topOffset - wallT - 5);

  const top = wallHeight - topOffset;
  const bottom = top - h;

  return (
    x > -halfW - buffer &&
    x < halfW + buffer &&
    y > bottom - buffer &&
    y < top + buffer
  );
}

function manifoldToThreeGeometry(manifold: any): THREE.BufferGeometry {
  const mesh = manifold.getMesh();

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(mesh.vertProperties, 3),
  );

  geometry.setIndex(new THREE.BufferAttribute(mesh.triVerts, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;
}
