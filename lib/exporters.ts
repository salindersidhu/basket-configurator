import * as THREE from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

export function exportSTL(
  geometry: THREE.BufferGeometry,
  filename = "basket.stl",
): void {
  if (!geometry) {
    console.warn("exportSTL: no geometry provided");
    return;
  }

  const exporter = new STLExporter();

  // Ensure geometry is up to date
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  const parsed = exporter.parse(mesh, { binary: true });
  const arrayBuffer = parsed instanceof DataView ? parsed.buffer : parsed;

  const blob = new Blob([arrayBuffer], {
    type: "application/octet-stream",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
