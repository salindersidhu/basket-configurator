import { PALETTE } from "../constants";

interface Props {
  color: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ color, onChange }: Props) {
  return (
    <>
      <div className="grid grid-cols-8 gap-2">
        {PALETTE.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{ background: c }}
            className={`color-swatch w-7 h-7 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 focus:outline-none ${
              color === c ? "border-text" : "border-transparent"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <label
          htmlFor="custom-color"
          className="text-xs text-muted cursor-pointer"
        >
          Custom
        </label>
        <input
          id="custom-color"
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value || "#b8b8b8")}
          className="w-8 h-8 rounded cursor-pointer border border-input-border bg-transparent p-0"
        />
      </div>
    </>
  );
}
