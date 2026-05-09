import * as THREE from "three";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

import { CAMERA } from "../constants";

type Props = {
  geometry: THREE.BufferGeometry | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
};

export function Camera({ geometry, controlsRef }: Props) {
  const { camera, size } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  const previousGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!geometry || !controlsRef.current) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const box = geometry.boundingBox;
    const sphere = geometry.boundingSphere;

    if (!box || !sphere) return;

    const radius = sphere.radius;

    const center = new THREE.Vector3();
    const boxSize = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(boxSize);

    const isMobile = size.width < 768;
    const aspect = size.width / size.height;

    const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z);

    const verticalFov = THREE.MathUtils.degToRad(perspectiveCamera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);

    const fitHeightDistance = maxDimension / (2 * Math.tan(verticalFov / 2));
    const fitWidthDistance = maxDimension / (2 * Math.tan(horizontalFov / 2));

    const distance = isMobile
      ? Math.max(fitHeightDistance, fitWidthDistance) * 1.9
      : radius * CAMERA.fitDistanceMultiplier;

    const mobileLift = isMobile ? boxSize.y * 0.18 : 0;
    const target = center.clone().add(new THREE.Vector3(0, mobileLift, 0));

    const direction = new THREE.Vector3(...CAMERA.fitDirection).normalize();
    const targetPosition = target
      .clone()
      .add(direction.multiplyScalar(distance));

    const shouldAnimate = previousGeometryRef.current !== geometry;
    previousGeometryRef.current = geometry;

    function applyCamera() {
      perspectiveCamera.near = Math.max(CAMERA.near, radius / 100);
      perspectiveCamera.far = radius * 50;
      perspectiveCamera.lookAt(target);
      perspectiveCamera.updateProjectionMatrix();

      controlsRef.current?.update();
    }

    // Resize only: snap immediately instead of starting a new animation.
    if (!shouldAnimate) {
      perspectiveCamera.position.copy(targetPosition);
      controlsRef.current.target.copy(target);
      applyCamera();
      return;
    }

    const startPosition = perspectiveCamera.position.clone();
    const startTarget = controlsRef.current.target.clone();

    const duration = CAMERA.fitAnimationMs;
    const start = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(t);

      perspectiveCamera.position.lerpVectors(
        startPosition,
        targetPosition,
        eased,
      );

      controlsRef.current?.target.lerpVectors(startTarget, target, eased);

      applyCamera();

      if (t < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [geometry, perspectiveCamera, controlsRef, size.width, size.height]);

  return null;
}
