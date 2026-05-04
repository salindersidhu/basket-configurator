import * as THREE from "three";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

import type { BasketConfig } from "@/lib/types";

const PATTERN_CLEARANCE_ABOVE_FLOOR_MM = 3;

const evaluator = new Evaluator();

const cylCache = new Map<string, THREE.CylinderGeometry>();
const hexCache = new Map<string, THREE.CylinderGeometry>();

function getCylinder(radius: number, depth: number, segments: number) {
  const key = `${radius}-${depth}-${segments}`;
  let geo = cylCache.get(key);
  if (!geo) {
    geo = new THREE.CylinderGeometry(radius, radius, depth, segments);
    cylCache.set(key, geo);
  }
  return geo.clone();
}

function getHex(radius: number, depth: number) {
  const key = `${radius}-${depth}`;
  let geo = hexCache.get(key);
  if (!geo) {
    geo = new THREE.CylinderGeometry(radius, radius, depth, 6);
    hexCache.set(key, geo);
  }
  return geo.clone();
}

export function generateBasket(config: BasketConfig): THREE.BufferGeometry {
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

  let result: Brush;
  const cr = Math.min(cornerRadius, width / 4, length / 4);
  const innerCR = Math.max(0, cr - wallThickness);
  const baseThickness = wallThickness;

  if (cr > 1) {
    const geo = makeRoundedBox(width, height, length, cr);
    result = new Brush(geo);
  } else {
    const geo = new THREE.BoxGeometry(width, height, length);
    geo.translate(0, height / 2, 0);
    result = new Brush(geo);
  }

  const innerW = width - wallThickness * 2;
  const innerL = length - wallThickness * 2;
  const innerH = height - baseThickness;

  if (innerW > 0 && innerH > 0 && innerL > 0) {
    let innerGeo: THREE.BufferGeometry;
    if (innerCR > 1) {
      innerGeo = makeRoundedBox(innerW, innerH, innerL, innerCR);
      // rounded box is bottom-aligned
      innerGeo.translate(0, baseThickness, 0);
    } else {
      innerGeo = new THREE.BoxGeometry(innerW, innerH, innerL);
      innerGeo.translate(0, baseThickness + innerH / 2, 0);
    }
    result = evaluator.evaluate(result, new Brush(innerGeo), SUBTRACTION);
  }

  const handleOnFB =
    handles && (handleSides === "front-back" || handleSides === "all");
  const handleOnLR =
    handles && (handleSides === "left-right" || handleSides === "all");

  if (handles && handleWidth > 0 && handleHeight > 0) {
    result = cutHandles(
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

  const geo = result.geometry;
  geo.computeVertexNormals();
  return geo;
}

function makeRoundedBox(w: number, h: number, l: number, r: number) {
  r = Math.min(r, w / 2 - 0.1, l / 2 - 0.1);
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hl = l / 2;

  shape.moveTo(-hw + r, -hl);
  shape.lineTo(hw - r, -hl);
  shape.quadraticCurveTo(hw, -hl, hw, -hl + r);
  shape.lineTo(hw, hl - r);
  shape.quadraticCurveTo(hw, hl, hw - r, hl);
  shape.lineTo(-hw + r, hl);
  shape.quadraticCurveTo(-hw, hl, -hw, hl - r);
  shape.lineTo(-hw, -hl + r);
  shape.quadraticCurveTo(-hw, -hl, -hw + r, -hl);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h,
    bevelEnabled: false,
    curveSegments: 8,
  });

  geo.rotateX(-Math.PI / 2);
  return geo;
}

function cutHandles(
  brush: Brush,
  width: number,
  height: number,
  length: number,
  wallT: number,
  handleWidth: number,
  handleHeight: number,
  topOffset: number,
  onFB: boolean,
  onLR: boolean,
): Brush {
  const geos: THREE.BufferGeometry[] = [];

  const add = (axis: "x" | "z", pos: number) => {
    const w = Math.min(handleWidth, axis === "x" ? length - 20 : width - 20);
    const h = Math.min(handleHeight, height - topOffset - wallT - 5);

    if (w <= 0 || h <= 0) return;

    const shape = makeRoundedRect(w, h);
    const depth = wallT * 4;
    const y = height - topOffset - h;

    for (const sign of [1, -1]) {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: false,
      });

      geo.translate(0, 0, -depth / 2);

      if (axis === "z") {
        geo.translate(0, y, sign * pos);
      } else {
        applyTransform(
          geo,
          new THREE.Vector3(sign * pos, y, 0),
          new THREE.Euler(0, Math.PI / 2, 0),
        );
      }

      geos.push(geo);
    }
  };

  if (onFB) add("z", length / 2);
  if (onLR) add("x", width / 2);

  if (!geos.length) return brush;

  const merged = mergeGeometries(geos, false);
  if (!merged) return brush;
  return evaluator.evaluate(brush, new Brush(merged), SUBTRACTION);
}

function makeRoundedRect(w: number, h: number): THREE.Shape {
  const shape = new THREE.Shape();
  const r = Math.min(5, w / 2, h / 2);
  const hw = w / 2;
  shape.moveTo(-hw + r, 0);
  shape.lineTo(hw - r, 0);
  shape.quadraticCurveTo(hw, 0, hw, r);
  shape.lineTo(hw, h - r);
  shape.quadraticCurveTo(hw, h, hw - r, h);
  shape.lineTo(-hw + r, h);
  shape.quadraticCurveTo(-hw, h, -hw, h - r);
  shape.lineTo(-hw, r);
  shape.quadraticCurveTo(-hw, 0, -hw + r, 0);
  return shape;
}

function cutPattern(
  brush: Brush,
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
): Brush {
  const baseThickness = wallT;
  const depth = wallT * 4;
  const buffer = size + 4;

  const walls = [
    {
      faceW: bWidth,
      faceH: bHeight,
      axis: "z" as const,
      pos: bLength / 2,
      handle: handleOnFB,
    },
    {
      faceW: bWidth,
      faceH: bHeight,
      axis: "z" as const,
      pos: -bLength / 2,
      handle: handleOnFB,
    },
    {
      faceW: bLength,
      faceH: bHeight,
      axis: "x" as const,
      pos: -bWidth / 2,
      handle: handleOnLR,
    },
    {
      faceW: bLength,
      faceH: bHeight,
      axis: "x" as const,
      pos: bWidth / 2,
      handle: handleOnLR,
    },
  ];

  const all: THREE.BufferGeometry[] = [];

  for (const wall of walls) {
    const step = size * 2 + spacing;
    const radius = size;

    const cols = Math.floor((wall.faceW - radius * 2) / step);
    const rows = Math.floor((wall.faceH - radius * 2) / step);

    if (cols <= 0 || rows <= 0) continue;

    const startX = (-(cols - 1) * step) / 2;
    const startY = radius;

    const minY = baseThickness + PATTERN_CLEARANCE_ABOVE_FLOOR_MM + radius;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * step;
        const y = startY + r * step;

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
        )
          continue;

        const geo =
          pattern === "holes"
            ? getCylinder(radius, depth, 12)
            : getHex(radius, depth);

        if (wall.axis === "z") {
          applyTransform(
            geo,
            new THREE.Vector3(x, y, wall.pos),
            new THREE.Euler(Math.PI / 2, 0, 0),
          );
        } else {
          applyTransform(
            geo,
            new THREE.Vector3(wall.pos, y, x),
            new THREE.Euler(0, 0, Math.PI / 2),
          );
        }

        all.push(geo);
      }
    }
  }

  if (!all.length) return brush;

  let res = brush;
  const batchSize = 150;

  for (let i = 0; i < all.length; i += batchSize) {
    const merged = mergeGeometries(all.slice(i, i + batchSize), false);
    if (merged) {
      res = evaluator.evaluate(res, new Brush(merged), SUBTRACTION);
    }
  }
  return res;
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

function applyTransform(
  geo: THREE.BufferGeometry,
  pos: THREE.Vector3,
  rot: THREE.Euler,
) {
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromEuler(rot);
  m.compose(pos, q, new THREE.Vector3(1, 1, 1));
  geo.applyMatrix4(m);
}
