import { SLIDER_DEFS } from "../constants";

import { toMM, toDisplay } from "@/lib/utils";

interface Props {
  id: keyof typeof SLIDER_DEFS;
  value: number;
  isFreedom: boolean;
  onChange: (val: number) => void;
}

export function SliderControl({ id, value, isFreedom, onChange }: Props) {
  const def = SLIDER_DEFS[id];
  const unit = isFreedom ? "in" : "mm";
  const range = isFreedom ? def.in : def.mm;

  const displayValue = toDisplay(value, isFreedom);

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted">{def.label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={displayValue}
            min={range.min}
            max={range.max}
            step={range.step}
            onChange={(e) =>
              onChange(toMM(parseFloat(e.target.value), isFreedom))
            }
            className="w-16 bg-input border border-input-border rounded px-2 py-0.5 text-xs text-txt text-right outline-none focus:border-accent transition-colors"
          />
          <span className="text-[10px] text-dim w-6">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={displayValue}
        onChange={(e) => onChange(toMM(parseFloat(e.target.value), isFreedom))}
        className="w-full"
      />
    </div>
  );
}
