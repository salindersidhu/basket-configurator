import { useShallow } from "zustand/react/shallow";

import type { Handles } from "@/lib/types";
import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";
import { SliderControl } from "../SliderControl";

export function HandleSection() {
  const {
    handles,
    handleWidth,
    handleHeight,
    handleTopOffset,
    isImperial,
    update,
  } = useBasketStore(
    useShallow((s) => ({
      handles: s.config.handles,
      handleWidth: s.config.handleWidth,
      handleHeight: s.config.handleHeight,
      handleTopOffset: s.config.handleTopOffset,
      isImperial: s.isImperial,
      update: s.update,
    })),
  );

  const hasHandles = handles !== "none";

  function handleChange(val: string) {
    update("handles", val as Handles);
  }

  return (
    <PanelSection title="Handles">
      <SegmentedControl
        value={handles}
        options={[
          { value: "none", label: "None" },
          { value: "ends", label: "Ends" },
          { value: "sides", label: "Sides" },
          { value: "all", label: "All" },
        ]}
        onChange={handleChange}
      />
      {hasHandles && (
        <>
          <SliderControl
            min={20}
            max={200}
            step={1}
            label="Width"
            value={handleWidth}
            isImperial={isImperial}
            onChange={(v) => update("handleWidth", v)}
          />
          <SliderControl
            min={10}
            max={60}
            step={1}
            label="Height"
            value={handleHeight}
            isImperial={isImperial}
            onChange={(v) => update("handleHeight", v)}
          />
          <SliderControl
            min={5}
            max={60}
            step={1}
            label="Top Offset"
            value={handleTopOffset}
            isImperial={isImperial}
            onChange={(v) => update("handleTopOffset", v)}
          />
        </>
      )}
    </PanelSection>
  );
}
