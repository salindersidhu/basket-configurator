import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

export function exportSTL(geometry: THREE.BufferGeometry, filename = 'basket.stl'): void {
  const exporter = new STLExporter();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  const parsed = exporter.parse(mesh, { binary: true });
  const blob = new Blob([parsed as unknown as BlobPart], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
