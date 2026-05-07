import type { BasketConfig } from "@/lib/types";

import { useBasketStore } from "@/stores/useBasketStore";

import { PRESETS } from "../../constants";
import { PanelSection } from "../PanelSection";

export function PresetSection() {
  const config = useBasketStore((s) => s.config);
  const updateAll = useBasketStore((s) => s.updateAll);

  function setPreset(preset: (typeof PRESETS)[number]) {
    const next: BasketConfig = {
      ...config,
      width: preset.width,
      height: preset.height,
      length: preset.length,
      wallThickness: preset.wallThickness,
      cornerRadius: preset.cornerRadius || 0,
      pattern: preset.pattern || "none",
      patternSize: preset.patternSize ?? 8,
      patternSpacing: preset.patternSpacing ?? 3,
      handles: preset.handles ?? false,
      handleSides: preset.handleSides || "front-back",
      handleWidth: preset.handleWidth ?? 60,
      handleHeight: preset.handleHeight ?? 20,
      handleTopOffset: preset.handleTopOffset ?? 8,
    };

    updateAll(next);
  }

  return (
    <PanelSection title="Presets">
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => setPreset(preset)}
            className="toggle-btn px-3 py-1.5 text-[11px] rounded-md border border-input-border bg-input text-muted hover:border-accent hover:text-txt cursor-pointer whitespace-nowrap"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </PanelSection>
  );
}
