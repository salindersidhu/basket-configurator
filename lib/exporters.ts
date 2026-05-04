import * as THREE from "three";

import type { BasketConfig } from "@/lib/types";

import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { generateBasket } from "./basket/manifold";

export async function exportSTL(
  config: BasketConfig,
  filename = "basket.stl",
): Promise<void> {
  const geometry = await generateBasket(config);

  if (!geometry) {
    console.warn("exportSTL: no geometry generated");
    return;
  }

  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  mesh.updateMatrixWorld(true);

  const exporter = new STLExporter();
  const parsed = exporter.parse(mesh, { binary: true });

  const arrayBuffer =
    parsed instanceof DataView
      ? parsed.buffer.slice(
          parsed.byteOffset,
          parsed.byteOffset + parsed.byteLength,
        )
      : parsed;

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
