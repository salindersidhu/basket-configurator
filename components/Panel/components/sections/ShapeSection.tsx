import type { BasketConfig } from "@/lib/types";

import { PanelSection } from "../PanelSection";
import { SliderControl } from "../SliderControl";

interface Props {
  config: BasketConfig;
  isImperial: boolean;
  update: <K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) => void;
}

export function ShapeSection({ config, isImperial, update }: Props) {
  return (
    <PanelSection title="Shape">
      <SliderControl
        id="width"
        value={config.width}
        isImperial={isImperial}
        onChange={(v) => update("width", v)}
      />
      <SliderControl
        id="height"
        value={config.height}
        isImperial={isImperial}
        onChange={(v) => update("height", v)}
      />
      <SliderControl
        id="length"
        value={config.length}
        isImperial={isImperial}
        onChange={(v) => update("length", v)}
      />
      <SliderControl
        id="cornerRadius"
        value={config.cornerRadius}
        isImperial={isImperial}
        onChange={(v) => update("cornerRadius", v)}
      />
    </PanelSection>
  );
}
