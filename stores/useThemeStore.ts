import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  isDark: boolean;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
};

function getSystemTheme() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: getSystemTheme(),

      setTheme: (isDark) => set({ isDark }),

      toggleTheme: () => {
        set({ isDark: !get().isDark });
      },
    }),
    {
      name: "theme", // localStorage key
    },
  ),
);
