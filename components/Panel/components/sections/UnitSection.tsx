import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";

export function UnitSection() {
  const isImperial = useBasketStore((s) => s.isImperial);
  const setIsImperial = useBasketStore((s) => s.setIsImperial);

  return (
    <PanelSection title="Units">
      <SegmentedControl
        value={isImperial ? "imperial" : "metric"}
        options={[
          { value: "metric", label: "Metric (mm)" },
          { value: "imperial", label: "Freedom (in)" },
        ]}
        onChange={(val) => setIsImperial(val === "imperial")}
      />
    </PanelSection>
  );
}
