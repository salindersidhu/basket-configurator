import * as THREE from "three";

type Props = {
  geometry: THREE.BufferGeometry;
  color: string;
};

export function Mesh({ geometry, color }: Props) {
  return (
    <mesh geometry={geometry} castShadow receiveShadow={false}>
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
