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

export function HandleSection({ config, isImperial, update }: Props) {
  return (
    <PanelSection title="Handles">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={config.handles}
          onChange={(e) => update("handles", e.target.checked)}
        />
        <span className="text-xs text-muted group-hover:text-txt transition-colors">
          Enable handles
        </span>
      </label>
      {config.handles && (
        <div className={`mt-3 ${config.handles ? "" : "hidden"}`}>
          <div className="mb-3">
            <span className="text-xs text-muted block mb-1.5">Placement</span>
            <SegmentedControl
              value={config.handleSides}
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
            value={config.handleWidth}
            isImperial={isImperial}
            onChange={(v) => update("handleWidth", v)}
          />
          <SliderControl
            min={10}
            max={60}
            step={1}
            label="Height"
            value={config.handleHeight}
            isImperial={isImperial}
            onChange={(v) => update("handleHeight", v)}
          />
          <SliderControl
            min={5}
            max={60}
            step={1}
            label="Top Offset"
            value={config.handleTopOffset}
            isImperial={isImperial}
            onChange={(v) => update("handleTopOffset", v)}
          />
        </div>
      )}
    </PanelSection>
  );
}
