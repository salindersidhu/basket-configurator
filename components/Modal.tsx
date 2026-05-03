import { ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  icon?: ReactNode;
};

export function Modal({
  id,
  open,
  onClose,
  children,
  title,
  subtitle,
  icon,
}: ModalProps) {
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
        className="modal-dialog bg-panel border border-border rounded-xl shadow-2xl p-6 max-w-xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {icon && <div className="h-8 w-8">{icon}</div>}
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-txt">{title}</h2>
              )}
              {subtitle && (
                <p className="text-xs text-dim mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close w-7 h-7 rounded-md text-muted hover:text-txt hover:bg-surface cursor-pointer flex items-center justify-center transition-colors"
          >
            <IoMdClose size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
