"use client";

import { useEffect, useState } from "react";
import { FiInfo, FiMoon, FiSun } from "react-icons/fi";

import { useBasketStore } from "@/stores/useBasketStore";
import { useThemeStore } from "@/stores/useThemeStore";

import { AboutModal } from "./AboutModal";
import { BasketCanvas } from "@/components/BasketCanvas";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Panel } from "@/components/Panel";
import { useBasketGeometry } from "@/hooks/useBasketGeometry";
import { ExportModal } from "./ExportModal";

export function BasketConfigurator() {
  const color = useBasketStore((s) => s.config.color);
  const exportBasket = useBasketStore((s) => s.exportBasket);

  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { geometry, busy } = useBasketGeometry();

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
    return () => document.body.classList.remove("light");
  }, [isDark]);

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <aside className="panel-width hidden shrink-0 flex-col overflow-y-auto border-r border-border bg-panel md:flex">
        <Panel onExport={() => setExportOpen(true)} />
      </aside>

      <main className="relative flex h-[40dvh] min-h-0 min-w-0 flex-none flex-col bg-bg md:h-auto md:flex-1">
        <BasketCanvas geometry={geometry} color={color} />
        <LoadingOverlay busy={busy} />

        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            title="Toggle theme"
            className="toolbar-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/80 text-txt transition-colors hover:bg-surface-hover"
            onClick={toggleTheme}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            title="About"
            className="toolbar-btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface/80 text-txt transition-colors hover:bg-surface-hover"
            onClick={() => setAboutOpen(true)}
          >
            <FiInfo size={20} />
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[11px] text-dim opacity-50">
          <span className="md:hidden">
            Swipe to rotate · Pinch to zoom · Pan with two fingers
          </span>
          <span className="hidden md:inline">
            Drag to rotate · Scroll to zoom · Right-click to pan
          </span>
        </div>
      </main>

      <section className="h-[60dvh] min-h-0 flex-none overflow-hidden rounded-t-2xl border-t border-border bg-panel md:hidden">
        <Panel onExport={() => setExportOpen(true)} />
      </section>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={exportBasket}
      />
    </div>
  );
}
