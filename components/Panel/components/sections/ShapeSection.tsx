import { useShallow } from "zustand/react/shallow";

import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SliderControl } from "../SliderControl";

export function ShapeSection() {
  const { width, height, length, cornerRadius, isImperial, update } =
    useBasketStore(
      useShallow((s) => ({
        width: s.config.width,
        height: s.config.height,
        length: s.config.length,
        cornerRadius: s.config.cornerRadius,
        isImperial: s.isImperial,
        update: s.update,
      })),
    );

  return (
    <PanelSection title="Shape">
      <SliderControl
        min={40}
        max={300}
        step={1}
        label="Width"
        value={width}
        isImperial={isImperial}
        onChange={(v) => update("width", v)}
      />
      <SliderControl
        min={20}
        max={200}
        step={1}
        label="Height"
        value={height}
        isImperial={isImperial}
        onChange={(v) => update("height", v)}
      />
      <SliderControl
        min={40}
        max={300}
        step={1}
        label="Length"
        value={length}
        isImperial={isImperial}
        onChange={(v) => update("length", v)}
      />
      <SliderControl
        min={0}
        max={60}
        step={1}
        label="Corner Radius"
        value={cornerRadius}
        isImperial={isImperial}
        onChange={(v) => update("cornerRadius", v)}
      />
    </PanelSection>
  );
}
