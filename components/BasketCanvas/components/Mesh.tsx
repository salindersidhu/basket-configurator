import * as THREE from "three";

export function Mesh({
  geometry,
  color,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
}) {
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
