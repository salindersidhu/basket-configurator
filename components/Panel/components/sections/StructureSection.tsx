import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SliderControl } from "../SliderControl";

export function StructureSection() {
  const wallThickness = useBasketStore((s) => s.config.wallThickness);
  const isImperial = useBasketStore((s) => s.isImperial);
  const update = useBasketStore((s) => s.update);

  return (
    <PanelSection title="Structure">
      <SliderControl
        min={1}
        max={8}
        step={0.5}
        label="Wall Thickness"
        value={wallThickness}
        isImperial={isImperial}
        onChange={(v) => update("wallThickness", v)}
      />
    </PanelSection>
  );
}
