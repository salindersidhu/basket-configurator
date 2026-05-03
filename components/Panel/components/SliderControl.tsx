import { useEffect, useState } from "react";

import { toMM, toDisplay } from "@/lib/utils";

interface Props {
  value: number;
  isImperial: boolean;
  min: number;
  max: number;
  step: number;
  label: string;
  onChange: (val: number) => void;
}

export function SliderControl({
  value,
  isImperial,
  min,
  max,
  step,
  label,
  onChange,
}: Props) {
  const unit = isImperial ? "in" : "mm";

  const displayValue = toDisplay(value, isImperial);
  const [input, setInput] = useState(displayValue.toString());

  useEffect(() => {
    setInput(displayValue.toString());
  }, [displayValue]);

  const displayMin = toDisplay(min, isImperial);
  const displayMax = toDisplay(max, isImperial);
  const displayStep = toDisplay(step, isImperial);

  function commit() {
    const parsed = Number(input);

    if (Number.isNaN(parsed)) {
      setInput(displayValue.toString());
      return;
    }

    const mm = toMM(parsed, isImperial);

    if (mm < min || mm > max) {
      setInput(displayValue.toString());
      return;
    }

    onChange(mm);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = Number(e.target.value);
    if (!Number.isNaN(raw)) {
      onChange(toMM(raw, isImperial));
    }
  }

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted">{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={commit}
            onKeyDown={handleInputKeyDown}
            className="w-16 bg-input border border-input-border rounded px-2 py-0.5 text-xs text-txt text-right outline-none focus:border-accent transition-colors"
          />
          <span className="text-[10px] text-dim w-6">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={displayMin}
        max={displayMax}
        step={displayStep}
        value={displayValue}
        onChange={handleSliderChange}
        className="w-full"
      />
    </div>
  );
}
