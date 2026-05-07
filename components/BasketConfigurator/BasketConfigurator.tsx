"use client";

import { useEffect, useState } from "react";
import { FiInfo, FiMoon, FiSun } from "react-icons/fi";

import { useBasketStore } from "@/stores/useBasketStore";

import { AboutModal } from "./AboutModal";
import { BasketCanvas } from "@/components/BasketCanvas";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Panel } from "@/components/Panel";
import { useBasketGeometry } from "@/hooks/useBasketGeometry";
import { ExportModal } from "./ExportModal";

export function BasketConfigurator() {
  const config = useBasketStore((s) => s.config);
  const color = useBasketStore((s) => s.config.color);
  const exportBasket = useBasketStore((s) => s.exportBasket);

  const [isDark, setIsDark] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { geometry, busy } = useBasketGeometry(config);

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
    return () => document.body.classList.remove("light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <div className="flex h-full min-h-0">
      <aside className="panel-width bg-panel border-r border-border overflow-y-auto flex flex-col shrink-0">
        <Panel onExport={() => setExportOpen(true)} />
      </aside>
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-bg">
        <BasketCanvas geometry={geometry} color={color} isDark={isDark} />
        <LoadingOverlay busy={busy} isDark={isDark} />
        <div className="absolute top-3 right-3 z-10 flex gap-2">
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
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[11px] text-dim opacity-50">
          Drag to rotate · Scroll to zoom · Right-click to pan
        </div>
      </main>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={exportBasket}
      />
    </div>
  );
}
