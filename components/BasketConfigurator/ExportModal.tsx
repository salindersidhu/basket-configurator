"use client";

import { useRef, useState } from "react";

import { Modal } from "@/components/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onExport: (filename: string) => Promise<void>;
};

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function ExportModal({ open, onClose, onExport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (exporting) return;

    const name = inputRef.current?.value.trim() || "basket";

    setExporting(true);

    try {
      await waitForPaint();
      await onExport(`${name}.stl`);
      onClose();
    } finally {
      setExporting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={exporting ? () => {} : onClose}
      id="export-modal"
      title="Export STL"
    >
      <div className="mb-4">
        <label className="text-xs text-muted block mb-1.5">Filename</label>

        <div className="flex">
          <input
            ref={inputRef}
            defaultValue="my-basket"
            disabled={exporting}
            className="flex-1 bg-input border border-input-border rounded-l-md px-3 py-2 text-sm text-txt disabled:opacity-60"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleExport();
            }}
          />
          <span className="bg-surface border border-l-0 border-input-border rounded-r-md px-3 py-2 text-sm text-dim">
            .stl
          </span>
        </div>
      </div>

      {exporting && (
        <div className="mb-4">
          <div className="mb-1.5 text-xs text-muted">Preparing STL…</div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div className="h-full w-1/3 animate-[indeterminate_1s_ease-in-out_infinite] rounded-full bg-accent" />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onClose}
          disabled={exporting}
          className="flex-1 py-2 rounded-lg text-sm border border-border text-muted cursor-pointer hover:bg-surface-hover transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex-1 py-2 rounded-lg text-sm bg-accent text-white cursor-pointer hover:bg-accent-hover transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
        >
          {exporting ? "Exporting…" : "Download"}
        </button>
      </div>
    </Modal>
  );
}
