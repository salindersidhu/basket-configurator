"use client";

import {
  ColorSection,
  PresetSection,
  ShapeSection,
  UnitSection,
  StructureSection,
  WallPatternSection,
  HandleSection,
} from "./components/sections";

interface Props {
  onExport?: () => void;
}

export function Panel({ onExport }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="hidden items-center gap-3 border-b border-border px-5 py-4 md:flex">
        <img src="/icon0.svg" className="w-6 h-6" />
        <div>
          <h1 className="text-base font-semibold tracking-tight">
            Basket Configurator
          </h1>
          <p className="text-[11px] text-dim mt-0.5">
            Design and export for 3D printing
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 sections-container">
        <PresetSection />
        <ColorSection />
        <UnitSection />
        <ShapeSection />
        <StructureSection />
        <WallPatternSection />
        <HandleSection />
      </div>
      <div className="sticky bottom-0 bg-panel px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-border">
        <button
          onClick={onExport}
          className="w-full py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all bg-accent text-white hover:bg-accent-hover active:scale-[0.98]"
        >
          Export STL
        </button>
      </div>
    </div>
  );
}
