import { ReactNode, useEffect } from "react";

/**
 * TODO:
 *
 * ADD TITLE AND SUBTITLE PROPS
 */

type ModalProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string | ReactNode;
};

export function Modal({
  id,
  open,
  onClose,
  children,
  title,
  subtitle,
}: ModalProps) {
  // close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div id={id} className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog bg-panel border border-border rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-txt">{title}</h2>
            {subtitle && <p className="text-xs text-dim">{subtitle}</p>}
          </div>
          <button
            onClick={() => onClose()}
            className="modal-close w-7 h-7 rounded-md text-muted hover:text-txt hover:bg-surface cursor-pointer flex items-center justify-center transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
