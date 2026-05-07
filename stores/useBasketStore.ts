import type { BasketConfig } from "@/lib/types";

import { create } from "zustand";
import { DEFAULT_BASKET_COLOR, PRESETS } from "@/components/Panel/constants";
import { exportSTL } from "@/lib/exporters";

const preset = PRESETS[1];

export const DEFAULT_CONFIG: BasketConfig = {
  width: preset.width,
  height: preset.height,
  length: preset.length,
  wallThickness: preset.wallThickness,
  cornerRadius: preset.cornerRadius ?? 0,
  pattern: preset.pattern ?? "none",
  patternSize: preset.patternSize ?? 8,
  patternSpacing: preset.patternSpacing ?? 3,
  handles: preset.handles ?? "none",
  handleWidth: preset.handleWidth ?? 60,
  handleHeight: preset.handleHeight ?? 20,
  handleTopOffset: preset.handleTopOffset ?? 8,
  color: DEFAULT_BASKET_COLOR,
};

type BasketStore = {
  config: BasketConfig;
  isImperial: boolean;

  update: <K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) => void;

  updateAll: (next: BasketConfig) => void;
  setIsImperial: (value: boolean) => void;
  exportBasket: (filename: string) => Promise<void>;
  reset: () => void;
};

export const useBasketStore = create<BasketStore>()((set, get) => ({
  config: DEFAULT_CONFIG,
  isImperial: false,

  update: (key, value) =>
    set((state) => ({
      config: {
        ...state.config,
        [key]: value,
      },
    })),

  updateAll: (next) => set({ config: next }),

  setIsImperial: (value) => set({ isImperial: value }),

  exportBasket: async (filename) => {
    await exportSTL(get().config, filename);
  },

  reset: () =>
    set({
      config: DEFAULT_CONFIG,
      isImperial: false,
    }),
}));
