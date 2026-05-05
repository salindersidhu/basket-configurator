"use client";

import { Modal } from "@/components/Modal";
import { VERSION, COMMIT } from "@/lib/version";

type Props = {
  open: boolean;
  onClose: () => void;
};

const TECH_TAGS = [
  "Next.js",
  "React",
  "Three.js",
  "React Three Fiber",
  "manifold-3d",
  "STL Export",
];

export function AboutModal({ open, onClose }: Props) {
  function renderTechTags() {
    return TECH_TAGS.map((tag) => (
      <span
        key={tag}
        className="px-2.5 py-0.5 text-[11px] rounded-full border border-border bg-surface text-muted"
      >
        {tag}
      </span>
    ));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      id="about-modal"
      title="Basket Configurator"
      icon={<img src="/icon0.svg" />}
      subtitle={
        <>
          Build {VERSION} (
          <a
            href={`https://github.com/salindersidhu/basket-configurator/commit/${COMMIT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover underline"
          >
            {COMMIT.slice(0, 7)}
          </a>
          )
        </>
      }
    >
      <p className="text-sm text-muted leading-relaxed mb-3">
        A browser-based 3D configurator for designing printable baskets. Adjust
        dimensions, wall patterns, handles, corner rounding, and colour, then
        export as STL.
      </p>
      <p className="text-sm text-muted leading-relaxed mb-4">
        Geometry is generated using Manifold (WebAssembly) to produce fast,
        watertight meshes that are reliable for 3D printing and compatible with
        modern slicers.
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">{renderTechTags()}</div>
      <p className="text-xs text-dim">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/salindersidhu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover underline"
        >
          Salinder Sidhu
        </a>
      </p>
    </Modal>
  );
}
