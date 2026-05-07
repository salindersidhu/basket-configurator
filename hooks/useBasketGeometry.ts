"use client";

import * as THREE from "three";

import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { generateBasket } from "@/lib/basket";
import { useBasketStore } from "@/stores/useBasketStore";

export function useBasketGeometry() {
  const config = useBasketStore(
    useShallow((s) => ({
      width: s.config.width,
      height: s.config.height,
      length: s.config.length,
      wallThickness: s.config.wallThickness,
      cornerRadius: s.config.cornerRadius,
      pattern: s.config.pattern,
      patternSize: s.config.patternSize,
      patternSpacing: s.config.patternSpacing,
      handles: s.config.handles,
      handleWidth: s.config.handleWidth,
      handleHeight: s.config.handleHeight,
      handleTopOffset: s.config.handleTopOffset,
    })),
  );

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
  }, [config]);

  return { geometry, geometryRef, busy };
}
