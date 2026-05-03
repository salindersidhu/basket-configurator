import type { BasketConfig } from "@/lib/types";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";
import { SliderControl } from "../SliderControl";

type Props = {
  config: BasketConfig;
  isImperial: boolean;
  update: <K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) => void;
};

export function WallPatternSection({ config, isImperial, update }: Props) {
  return (
    <PanelSection title="Wall Pattern">
      <SegmentedControl
        value={config.pattern}
        options={[
          { value: "none", label: "Solid" },
          { value: "holes", label: "Circles" },
          { value: "hexagons", label: "Hexagons" },
        ]}
        onChange={(val) => update("pattern", val as any)}
      />
      {config.pattern !== "none" && (
        <>
          <SliderControl
            id="patternSize"
            value={config.patternSize}
            isImperial={isImperial}
            onChange={(v) => update("patternSize", v)}
          />
          <SliderControl
            id="patternSpacing"
            value={config.patternSpacing}
            isImperial={isImperial}
            onChange={(v) => update("patternSpacing", v)}
          />
        </>
      )}
    </PanelSection>
  );
}
