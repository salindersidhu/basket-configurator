import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function PanelSection({ title, defaultOpen = true, children }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="panel-section">
      <div
        onClick={() => setIsOpen((v) => !v)}
        className="section-header flex items-center gap-2 cursor-pointer select-none"
      >
        <span className="text-[11px] font-medium uppercase tracking-wider text-dim flex-1">
          {title}
        </span>
        <span
          className={`section-chevron-wrap text-muted ${isOpen ? "" : "collapsed"}`}
        >
          <FiChevronDown size={12} />
        </span>
      </div>
      <div
        className={`section-body  ${isOpen ? "" : "section-body-collapsed"}`}
      >
        {children}
      </div>
    </div>
  );
}
