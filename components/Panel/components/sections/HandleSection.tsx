import type { BasketConfig } from "@/lib/types";

import { useBasketStore } from "@/stores/useBasketStore";

import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";
import { SliderControl } from "../SliderControl";

export function HandleSection() {
  const handles = useBasketStore((s) => s.config.handles);
  const handleSides = useBasketStore((s) => s.config.handleSides);
  const handleWidth = useBasketStore((s) => s.config.handleWidth);
  const handleHeight = useBasketStore((s) => s.config.handleHeight);
  const handleTopOffset = useBasketStore((s) => s.config.handleTopOffset);
  const isImperial = useBasketStore((s) => s.isImperial);
  const update = useBasketStore((s) => s.update);

  return (
    <PanelSection title="Handles">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={handles}
          onChange={(e) => update("handles", e.target.checked)}
        />
        <span className="text-xs text-muted group-hover:text-txt transition-colors">
          Enable handles
        </span>
      </label>
      {handles && (
        <div className={`mt-3 ${handles ? "" : "hidden"}`}>
          <div className="mb-3">
            <span className="text-xs text-muted block mb-1.5">Placement</span>
            <SegmentedControl
              value={handleSides}
              options={[
                { value: "front-back", label: "Front & Back" },
                { value: "left-right", label: "Left & Right" },
                { value: "all", label: "All Sides" },
              ]}
              onChange={(val) => update("handleSides", val as any)}
            />
          </div>
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
        </div>
      )}
    </PanelSection>
  );
}
