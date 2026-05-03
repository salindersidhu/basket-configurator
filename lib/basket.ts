import * as THREE from 'three';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import type { BasketConfig } from '@/lib/types';

/** Keeps wall patterns above the bottom slab so openings do not cut the floor (mm above inner floor). */
const PATTERN_CLEARANCE_ABOVE_FLOOR_MM = 3;

const evaluator = new Evaluator();

export function generateBasket(config: BasketConfig): THREE.BufferGeometry {
  const {
    width = 100,
    height = 60,
    length = 150,
    wallThickness = 2,
    cornerRadius = 0,
    pattern = 'none',
    patternSize = 8,
    patternSpacing = 3,
    handles = true,
    handleSides = 'front-back',
    handleWidth = 60,
    handleHeight = 20,
    handleTopOffset = 8,
  } = config;

  let result: Brush;
  const cr = Math.min(cornerRadius, width / 4, length / 4);

  if (cr > 1) {
    const outerGeo = makeRoundedBox(width, height, length, cr);
    result = new Brush(outerGeo);
  } else {
    const outerGeo = new THREE.BoxGeometry(width, height, length);
    outerGeo.translate(0, height / 2, 0);
    result = new Brush(outerGeo);
  }

  const innerW = width - wallThickness * 2;
  const innerH = height + 2;
  const innerL = length - wallThickness * 2;
  const innerCR = Math.max(0, cr - wallThickness);

  if (innerW > 0 && innerH > 0 && innerL > 0) {
    let innerGeo: THREE.BufferGeometry;
    if (innerCR > 1) {
      innerGeo = makeRoundedBox(innerW, innerH, innerL, innerCR);
      innerGeo.translate(0, wallThickness, 0);
    } else {
      innerGeo = new THREE.BoxGeometry(innerW, innerH, innerL);
      innerGeo.translate(0, wallThickness + innerH / 2, 0);
    }
    result = evaluator.evaluate(result, new Brush(innerGeo), SUBTRACTION);
  }

  const handleOnFB = handles && (handleSides === 'front-back' || handleSides === 'all');
  const handleOnLR = handles && (handleSides === 'left-right' || handleSides === 'all');

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

  if (pattern !== 'none') {
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

function makeRoundedBox(w: number, h: number, l: number, r: number): THREE.BufferGeometry {
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

  const geo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 8 });
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
  const handleGeos: THREE.BufferGeometry[] = [];

  if (onFB) {
    const hcw = Math.min(handleWidth, width - 20);
    const hch = Math.min(handleHeight, height - topOffset - wallT - 5);
    if (hcw > 0 && hch > 0) {
      addHandlePair(handleGeos, hcw, hch, wallT, height, topOffset, length / 2, 'z');
    }
  }

  if (onLR) {
    const hcw = Math.min(handleWidth, length - 20);
    const hch = Math.min(handleHeight, height - topOffset - wallT - 5);
    if (hcw > 0 && hch > 0) {
      addHandlePair(handleGeos, hcw, hch, wallT, height, topOffset, width / 2, 'x');
    }
  }

  if (handleGeos.length === 0) return brush;
  const merged = mergeGeometries(handleGeos, false);
  if (!merged) return brush;
  return evaluator.evaluate(brush, new Brush(merged), SUBTRACTION);
}

function addHandlePair(
  geos: THREE.BufferGeometry[],
  hcw: number,
  hch: number,
  wallT: number,
  height: number,
  topOffset: number,
  wallPos: number,
  axis: 'x' | 'z',
): void {
  const shape = makeRoundedRect(hcw, hch);
  const cutDepth = wallT * 4;
  const yPos = height - topOffset - hch;

  for (const sign of [1, -1]) {
    const geo = new THREE.ExtrudeGeometry(shape, { depth: cutDepth, bevelEnabled: false });
    geo.translate(0, 0, -cutDepth / 2);
    if (axis === 'z') {
      geo.translate(0, yPos, sign * wallPos);
    } else {
      applyTransform(geo, new THREE.Vector3(sign * wallPos, yPos, 0), new THREE.Euler(0, Math.PI / 2, 0));
    }
    geos.push(geo);
  }
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
  pattern: BasketConfig['pattern'],
  bWidth: number,
  bHeight: number,
  bLength: number,
  wallT: number,
  size: number,
  spacing: number,
  handleOnFB: boolean,
  handleOnLR: boolean,
  handleW: number,
  handleH: number,
  handleTopOffset: number,
): Brush {
  const walls = [
    { faceW: bWidth, faceH: bHeight, axis: 'z' as const, pos: bLength / 2, hasH: handleOnFB },
    { faceW: bWidth, faceH: bHeight, axis: 'z' as const, pos: -bLength / 2, hasH: handleOnFB },
    { faceW: bLength, faceH: bHeight, axis: 'x' as const, pos: -bWidth / 2, hasH: handleOnLR },
    { faceW: bLength, faceH: bHeight, axis: 'x' as const, pos: bWidth / 2, hasH: handleOnLR },
  ];

  const allCutGeos: THREE.BufferGeometry[] = [];
  const bufferSize = size + 4;

  for (const wall of walls) {
    if (pattern === 'holes') {
      collectCirclesForWall(
        allCutGeos,
        wall,
        wallT,
        size,
        spacing,
        wall.hasH,
        handleW,
        handleH,
        bHeight,
        handleTopOffset,
        bufferSize,
      );
    } else {
      collectHexagonsForWall(
        allCutGeos,
        wall,
        wallT,
        size,
        spacing,
        wall.hasH,
        handleW,
        handleH,
        bHeight,
        handleTopOffset,
        bufferSize,
      );
    }
  }

  if (allCutGeos.length === 0) return brush;

  let res = brush;
  const batchSize = 150;
  for (let i = 0; i < allCutGeos.length; i += batchSize) {
    const batch = allCutGeos.slice(i, i + batchSize);
    const merged = mergeGeometries(batch, false);
    if (merged) {
      res = evaluator.evaluate(res, new Brush(merged), SUBTRACTION);
    }
  }
  return res;
}

function collectCirclesForWall(
  geos: THREE.BufferGeometry[],
  wall: {
    faceW: number;
    faceH: number;
    axis: 'x' | 'z';
    pos: number;
    hasH: boolean;
  },
  wallT: number,
  radius: number,
  spacing: number,
  hasHandle: boolean,
  handleW: number,
  handleH: number,
  bHeight: number,
  handleTopOffset: number,
  buffer: number,
): void {
  const step = radius * 2 + spacing;
  const margin = radius + spacing;
  const cols = Math.floor((wall.faceW - margin * 2) / step);
  const rows = Math.floor((wall.faceH - margin * 2) / step);
  if (cols <= 0 || rows <= 0) return;

  const startX = (-(cols - 1) * step) / 2;
  const startY = margin;
  const depth = wallT * 4;

  const minHoleCenterY = wallT + PATTERN_CLEARANCE_ABOVE_FLOOR_MM + radius;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lx = startX + c * step;
      const ly = startY + r * step;
      if (ly < minHoleCenterY) continue;
      if (hasHandle && isInsideHandle(lx, ly, bHeight, handleW, handleH, handleTopOffset, wallT, buffer))
        continue;

      const cyl = new THREE.CylinderGeometry(radius, radius, depth, 12);
      if (wall.axis === 'z') {
        applyTransform(cyl, new THREE.Vector3(lx, ly, wall.pos), new THREE.Euler(Math.PI / 2, 0, 0));
      } else {
        applyTransform(cyl, new THREE.Vector3(wall.pos, ly, lx), new THREE.Euler(0, 0, Math.PI / 2));
      }
      geos.push(cyl);
    }
  }
}

function collectHexagonsForWall(
  geos: THREE.BufferGeometry[],
  wall: {
    faceW: number;
    faceH: number;
    axis: 'x' | 'z';
    pos: number;
    hasH: boolean;
  },
  wallT: number,
  size: number,
  spacing: number,
  hasHandle: boolean,
  handleW: number,
  handleH: number,
  bHeight: number,
  handleTopOffset: number,
  buffer: number,
): void {
  const step = size * 2 + spacing;
  const rowH = (step * Math.sqrt(3)) / 2;
  const margin = size + spacing;
  const cols = Math.floor((wall.faceW - margin * 2) / step);
  const rows = Math.floor((wall.faceH - margin * 2) / rowH);
  if (cols <= 0 || rows <= 0) return;

  const startX = (-(cols - 1) * step) / 2;
  const startY = margin;
  const depth = wallT * 4;

  const minHoleCenterY = wallT + PATTERN_CLEARANCE_ABOVE_FLOOR_MM + size;

  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 1 ? step / 2 : 0;
    for (let c = 0; c < cols; c++) {
      const lx = startX + c * step + offset;
      const ly = startY + r * rowH;
      if (ly < minHoleCenterY) continue;
      if (Math.abs(lx) > wall.faceW / 2 - margin) continue;
      if (hasHandle && isInsideHandle(lx, ly, bHeight, handleW, handleH, handleTopOffset, wallT, buffer))
        continue;

      const hex = new THREE.CylinderGeometry(size, size, depth, 6);
      if (wall.axis === 'z') {
        applyTransform(hex, new THREE.Vector3(lx, ly, wall.pos), new THREE.Euler(Math.PI / 2, 0, 0));
      } else {
        applyTransform(hex, new THREE.Vector3(wall.pos, ly, lx), new THREE.Euler(0, 0, Math.PI / 2));
      }
      geos.push(hex);
    }
  }
}

function applyTransform(geo: THREE.BufferGeometry, position: THREE.Vector3, rotation: THREE.Euler): void {
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromEuler(rotation);
  m.compose(position, q, new THREE.Vector3(1, 1, 1));
  geo.applyMatrix4(m);
}

function isInsideHandle(
  x: number,
  y: number,
  wallHeight: number,
  handleWidth: number,
  handleHeight: number,
  topOffset: number,
  wallT: number,
  buffer: number,
): boolean {
  const hcw = handleWidth / 2;
  const hch = Math.min(handleHeight, wallHeight - topOffset - wallT - 5);
  const top = wallHeight - topOffset;
  const bot = top - hch;
  return x > -hcw - buffer && x < hcw + buffer && y > bot - buffer && y < top + buffer;
}
