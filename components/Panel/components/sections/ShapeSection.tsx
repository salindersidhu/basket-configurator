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
        min={40}
        max={300}
        step={1}
        label="Width"
        value={config.width}
        isImperial={isImperial}
        onChange={(v) => update("width", v)}
      />
      <SliderControl
        min={20}
        max={200}
        step={1}
        label="Height"
        value={config.height}
        isImperial={isImperial}
        onChange={(v) => update("height", v)}
      />
      <SliderControl
        min={40}
        max={300}
        step={1}
        label="Length"
        value={config.length}
        isImperial={isImperial}
        onChange={(v) => update("length", v)}
      />
      <SliderControl
        min={0}
        max={60}
        step={1}
        label="Corner Radius"
        value={config.cornerRadius}
        isImperial={isImperial}
        onChange={(v) => update("cornerRadius", v)}
      />
    </PanelSection>
  );
}
