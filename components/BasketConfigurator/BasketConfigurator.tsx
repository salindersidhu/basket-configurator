"use client";

import type { BasketConfig } from "@/lib/types";

import { useEffect, useState } from "react";
import { FiInfo, FiMoon, FiSun } from "react-icons/fi";

import { AboutModal } from "./AboutModal";
import { BasketCanvas } from "@/components/BasketCanvas";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Panel } from "@/components/Panel";
import { useBasketGeometry } from "@/hooks/useBasketGeometry";
import { ExportModal } from "./ExportModal";

import { exportSTL } from "@/lib/exporters";

const initialConfig: BasketConfig = {
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
};

export function BasketConfigurator() {
  const [config, setConfig] = useState(initialConfig);
  const [modelColor, setModelColor] = useState("#b8b8b8");
  const [isDark, setIsDark] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { geometry, busy } = useBasketGeometry(config);

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
    return () => document.body.classList.remove("light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  const handleExport = async (filename: string) => {
    await exportSTL(config, filename);
  };

  return (
    <div className="flex h-full min-h-0">
      <aside className="panel-width bg-panel border-r border-border overflow-y-auto flex flex-col shrink-0">
        <Panel
          config={config}
          onChange={setConfig}
          onColorChange={setModelColor}
          onExport={() => setExportOpen(true)}
        />
      </aside>
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-bg">
        <BasketCanvas geometry={geometry} color={modelColor} isDark={isDark} />
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
        onExport={handleExport}
      />
    </div>
  );
}
