"use client";

import { useState } from "react";

import type { BasketConfig } from "@/lib/types";

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
  config: BasketConfig;
  onChange: (config: BasketConfig) => void;
  onColorChange?: (hex: string) => void;
  onExport?: () => void;
}

export function Panel({ config, onChange, onColorChange, onExport }: Props) {
  const [isImperial, setIsImperial] = useState(false);

  function update<K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) {
    const next = { ...config, [key]: value };
    onChange(next);

    if (key === "color") {
      onColorChange?.(value as string);
    }
  }

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
        <PresetSection config={config} updateAll={(next) => onChange(next)} />
        <ColorSection config={config} update={update} />
        <UnitSection isImperial={isImperial} setIsImperial={setIsImperial} />
        <ShapeSection config={config} isImperial={isImperial} update={update} />
        <StructureSection
          config={config}
          isImperial={isImperial}
          update={update}
        />
        <WallPatternSection
          config={config}
          isImperial={isImperial}
          update={update}
        />
        <HandleSection
          config={config}
          isImperial={isImperial}
          update={update}
        />
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
