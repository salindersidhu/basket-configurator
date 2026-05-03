import type { BasketConfig } from "@/lib/types";

import { ColorPicker } from "../ColorPicker";
import { PanelSection } from "../PanelSection";

type Props = {
  config: BasketConfig;
  update: <K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) => void;
};

export function ColorSection({ config, update }: Props) {
  return (
    <PanelSection title="Colour">
      <ColorPicker
        color={config.color || "#b8b8b8"}
        onChange={(hex) => update("color", hex)}
      />
    </PanelSection>
  );
}
