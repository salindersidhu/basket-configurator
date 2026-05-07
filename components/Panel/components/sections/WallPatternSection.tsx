import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";
import { SliderControl } from "../SliderControl";

export function WallPatternSection() {
  const pattern = useBasketStore((s) => s.config.pattern);
  const patternSize = useBasketStore((s) => s.config.patternSize);
  const patternSpacing = useBasketStore((s) => s.config.patternSpacing);
  const isImperial = useBasketStore((s) => s.isImperial);
  const update = useBasketStore((s) => s.update);

  return (
    <PanelSection title="Wall Pattern">
      <SegmentedControl
        value={pattern}
        options={[
          { value: "none", label: "Solid" },
          { value: "holes", label: "Circles" },
          { value: "hexagons", label: "Hexagons" },
        ]}
        onChange={(val) => update("pattern", val as any)}
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
