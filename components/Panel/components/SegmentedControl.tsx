interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}

export function SegmentedControl({ value, options, onChange }: Props) {
  return (
    <div className="flex gap-1 mb-3 bg-input rounded-md p-0.5 border border-input-border">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`seg-btn toggle-btn flex-1 py-1.5 text-[11px] font-medium rounded cursor-pointer text-center ${
            value === o.value
              ? "bg-accent text-white"
              : "text-muted hover:text-txt"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
