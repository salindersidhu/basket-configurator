"use client";

import { useRef } from "react";

import { Modal } from "@/components/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onExport: (filename: string) => void;
};

export function ExportModal({ open, onClose, onExport }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const name = inputRef.current?.value.trim() || "basket";
    onExport(`${name}.stl`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} id="export-modal" title="Export STL">
      <div className="mb-4">
        <label className="text-xs text-muted block mb-1.5">Filename</label>

        <div className="flex">
          <input
            ref={inputRef}
            defaultValue="my-basket"
            className="flex-1 bg-input border border-input-border rounded-l-md px-3 py-2 text-sm text-txt"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleExport();
            }}
          />
          <span className="bg-surface border border-l-0 border-input-border rounded-r-md px-3 py-2 text-sm text-dim">
            .stl
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-lg text-sm border border-border text-muted cursor-pointer hover:bg-surface-hover transition-colors active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          className="flex-1 py-2 rounded-lg text-sm bg-accent text-white cursor-pointer hover:bg-accent-hover transition-colors active:scale-[0.98]"
        >
          Download
        </button>
      </div>
    </Modal>
  );
}
