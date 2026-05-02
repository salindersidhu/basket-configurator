"use client";

import { useEffect, useRef, useState } from "react";
import { FiInfo, FiMoon, FiSun } from "react-icons/fi";

import { BasketCanvas } from "@/components/BasketCanvas";
import { Modal } from "@/components/Modal";

import { generateBasket } from "@/lib/basket";
import type { BasketConfig } from "@/lib/types";
import { createPanel } from "@/lib/panel";
import { exportSTL } from "@/lib/exporters";
import { VERSION, COMMIT } from "@/lib/version";

const initialConfig = (): BasketConfig => ({
  width: 120,
  height: 70,
  length: 160,
  wallThickness: 2.5,
  cornerRadius: 0,
  pattern: "none",
  patternSize: 8,
  patternSpacing: 3,
  handles: true,
  handleSides: "front-back",
  handleWidth: 60,
  handleHeight: 20,
  handleTopOffset: 8,
  color: "#b8b8b8",
});

export function BasketConfiguratorApp() {
  const panelRef = useRef<HTMLElement>(null);
  const geometryRef = useRef<ReturnType<typeof generateBasket> | null>(null);
  const exportInputRef = useRef<HTMLInputElement>(null);

  const [geometry, setGeometry] = useState<ReturnType<
    typeof generateBasket
  > | null>(null);
  const [modelColor, setModelColor] = useState("#b8b8b8");
  const [isDark, setIsDark] = useState(true);
  const [busy, setBusy] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    const panelEl = panelRef.current;
    if (!panelEl) return;

    const config = initialConfig();
    let rebuildTimer: ReturnType<typeof setTimeout> | null = null;

    function rebuild(): void {
      setBusy(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            const geo = generateBasket(config);
            setGeometry((prev) => {
              prev?.dispose();
              geometryRef.current = geo;
              return geo;
            });
          } catch (e) {
            console.error("Basket generation failed:", e);
          }
          setBusy(false);
        }, 10);
      });
    }

    function debouncedRebuild(): void {
      if (rebuildTimer) clearTimeout(rebuildTimer);
      const isComplex =
        config.pattern !== "none" || config.handles || config.cornerRadius > 1;
      const delay = isComplex ? 250 : 30;
      rebuildTimer = setTimeout(rebuild, delay);
    }

    createPanel(
      panelEl,
      config,
      () => debouncedRebuild(),
      (hex) => setModelColor(hex),
    );

    panelEl.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest('[data-export="stl"]');
      if (btn) setExportOpen(true);
    });

    rebuild();

    return () => {
      if (rebuildTimer) clearTimeout(rebuildTimer);
      geometryRef.current?.dispose();
      geometryRef.current = null;
      panelEl.replaceChildren();
    };
  }, []);

  const toggleTheme = (): void => {
    setIsDark((d) => {
      const next = !d;
      document.body.classList.toggle("light", !next);
      return next;
    });
  };

  const handleExport = () => {
    const g = geometryRef.current;
    if (!g) return;

    const filename = `${exportInputRef.current?.value.trim() || "basket"}.stl`;
    exportSTL(g, filename);
    setExportOpen(false);
  };

  return (
    <div className="flex h-full min-h-0">
      <aside
        ref={panelRef}
        id="panel"
        className="panel-width bg-panel border-r border-border overflow-y-auto flex flex-col shrink-0"
      />
      <main
        id="viewer"
        className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-bg"
      >
        <div className="absolute inset-0 min-h-0">
          <BasketCanvas
            geometry={geometry}
            color={modelColor}
            isDark={isDark}
          />
        </div>
        <div
          className={`pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-md bg-surface/80 px-3 py-1.5 text-xs text-muted ${
            busy ? "" : "hidden"
          }`}
        >
          Generating...
        </div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            type="button"
            title="Toggle theme"
            className="toolbar-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/80 text-txt transition-colors hover:bg-surface-hover"
            onClick={toggleTheme}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            type="button"
            title="About"
            className="toolbar-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/80 text-txt transition-colors hover:bg-surface-hover"
            onClick={() => setAboutOpen(true)}
          >
            <FiInfo size={20} />
          </button>
        </div>
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[11px] text-dim opacity-50">
          Drag to rotate · Scroll to zoom · Right-click to pan
        </div>
        <Modal
          open={aboutOpen}
          onClose={() => setAboutOpen(false)}
          id="about-modal"
          title="Basket Configurator"
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
            A browser-based 3D configurator for designing printable baskets.
            Adjust dimensions, wall patterns, handles, corner rounding, and
            color, then export as STL.
          </p>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Geometry is generated using CSG boolean operations for accurate
            manifold meshes.
          </p>
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
        <Modal
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          id="export-modal"
          title="Export STL"
        >
          <div className="mb-4">
            <label className="text-xs text-muted block mb-1.5">Filename</label>

            <div className="flex">
              <input
                ref={exportInputRef}
                defaultValue="basket"
                className="flex-1 bg-input border border-input-border rounded-l-md px-3 py-2 text-sm text-txt"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleExport();
                }}
              />
              <span className="bg-surface border border-l-0 border-input-border rounded-r-md px-3 py-2 text-sm text-dim">
                .stl
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setExportOpen(false)}
              className="flex-1 py-2 rounded-lg text-sm border border-border text-muted cursor-pointer hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex-1 py-2 rounded-lg text-sm bg-accent text-white cursor-pointer hover:bg-accent-hover transition-colors"
            >
              Download
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
}
