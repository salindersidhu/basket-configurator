import * as THREE from "three";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import { CAMERA } from "../constants";

type Props = {
  geometry: THREE.BufferGeometry | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
};

export function Camera({ geometry, controlsRef }: Props) {
  const { camera } = useThree();

  useEffect(() => {
    if (!geometry || !controlsRef.current) return;

    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const box = geometry.boundingBox;
    const sphere = geometry.boundingSphere;
    if (!box || !sphere) return;

    const center = new THREE.Vector3();
    box.getCenter(center);

    const radius = sphere.radius;
    const distance = radius * CAMERA.fitDistanceMultiplier;

    const direction = new THREE.Vector3(...CAMERA.fitDirection).normalize();
    const targetPosition = center
      .clone()
      .add(direction.multiplyScalar(distance));

    const startPosition = camera.position.clone();
    const startTarget = controlsRef.current.target.clone();

    const duration = CAMERA.fitAnimationMs;
    const start = performance.now();

    let frame = 0;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(t);

      camera.position.lerpVectors(startPosition, targetPosition, eased);
      controlsRef.current?.target.lerpVectors(startTarget, center, eased);

      camera.near = Math.max(CAMERA.near, radius / 100);
      camera.far = radius * 30;

      camera.lookAt(controlsRef.current?.target ?? center);
      camera.updateProjectionMatrix();
      controlsRef.current?.update();

      if (t < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [geometry, camera, controlsRef]);

  return null;
}
