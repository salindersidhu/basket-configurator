import { useShallow } from "zustand/react/shallow";

import type { PatternType } from "@/lib/types";

import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";
import { SliderControl } from "../SliderControl";

export function WallPatternSection() {
  const { pattern, patternSize, patternSpacing, isImperial, update } =
    useBasketStore(
      useShallow((s) => ({
        pattern: s.config.pattern,
        patternSize: s.config.patternSize,
        patternSpacing: s.config.patternSpacing,
        isImperial: s.isImperial,
        update: s.update,
      })),
    );

  return (
    <PanelSection title="Wall Pattern">
      <SegmentedControl
        value={pattern}
        options={[
          { value: "none", label: "Solid" },
          { value: "holes", label: "Circles" },
          { value: "hexagons", label: "Hexagons" },
        ]}
        onChange={(val) => update("pattern", val as PatternType)}
      />
      {pattern !== "none" && (
        <>
          <SliderControl
            min={3}
            max={20}
            step={0.5}
            label="Size"
            value={patternSize}
            isImperial={isImperial}
            onChange={(v) => update("patternSize", v)}
          />
          <SliderControl
            min={1}
            max={10}
            step={0.5}
            label="Spacing"
            value={patternSpacing}
            isImperial={isImperial}
            onChange={(v) => update("patternSpacing", v)}
          />
        </>
      )}
    </PanelSection>
  );
}
