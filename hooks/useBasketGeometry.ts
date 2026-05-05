"use client";

import * as THREE from "three";

import { useEffect, useRef, useState } from "react";

import { generateBasket } from "@/lib/basket";
import type { BasketConfig } from "@/lib/types";

export function useBasketGeometry(config: BasketConfig) {
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [busy, setBusy] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let cancelled = false;
    setBusy(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const geo = await generateBasket(config);

        if (cancelled) {
          geo.dispose();
          return;
        }

        setGeometry((prev) => {
          prev?.dispose();
          geometryRef.current = geo;
          return geo;
        });
      } finally {
        if (!cancelled) {
          setBusy(false);
        }
      }
    }, 100);

    return () => {
      cancelled = true;
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
