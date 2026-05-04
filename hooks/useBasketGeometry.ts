"use client";

import { useEffect, useRef, useState } from "react";

import { generateBasket } from "@/lib/basket/BVHCSG";
import type { BasketConfig } from "@/lib/types";

export function useBasketGeometry(config: BasketConfig) {
  const geometryRef = useRef<ReturnType<typeof generateBasket> | null>(null);

  const [geometry, setGeometry] = useState<ReturnType<
    typeof generateBasket
  > | null>(null);

  const [busy, setBusy] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setBusy(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const geo = generateBasket(config);

      setGeometry((prev) => {
        prev?.dispose();
        geometryRef.current = geo;
        return geo;
      });

      setBusy(false);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    config.width,
    config.height,
    config.length,
    config.wallThickness,
    config.cornerRadius,
    config.pattern,
    config.patternSize,
    config.patternSpacing,
    config.handles,
    config.handleSides,
    config.handleWidth,
    config.handleHeight,
    config.handleTopOffset,
  ]);

  return { geometry, geometryRef, busy };
}
