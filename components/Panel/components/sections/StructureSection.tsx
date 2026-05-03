import type { BasketConfig } from "@/lib/types";

import { PanelSection } from "../PanelSection";
import { SliderControl } from "../SliderControl";

type Props = {
  config: BasketConfig;
  isImperial: boolean;
  update: <K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) => void;
};

export function StructureSection({ config, isImperial, update }: Props) {
  return (
    <PanelSection title="Structure">
      <SliderControl
        id="wallThickness"
        value={config.wallThickness}
        isImperial={isImperial}
        onChange={(v) => update("wallThickness", v)}
      />
    </PanelSection>
  );
}
