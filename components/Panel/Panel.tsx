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
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
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
      <div className="px-5 py-4 border-t border-border">
        <button
          onClick={onExport}
          className="w-full py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all
          bg-accent text-white hover:bg-accent-hover active:scale-[0.98]"
        >
          Export STL
        </button>
      </div>
    </div>
  );
}
