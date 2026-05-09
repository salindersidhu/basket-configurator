"use client";

import { HollowDotsSpinner } from "react-epic-spinners";

import { useThemeStore } from "@/stores/useThemeStore";

export function LoadingOverlay({ busy }: { busy: boolean }) {
  const isDark = useThemeStore((s) => s.isDark);

  if (!busy) return null;

  return (
    <div className="pointer-events-none absolute top-4 left-1/2 z-10 -translate-x-1/2 px-3 py-1.5">
      <HollowDotsSpinner
        color={isDark ? "#f5f5f5" : "#141414"}
        animationDuration={1000}
      />
    </div>
  );
}
