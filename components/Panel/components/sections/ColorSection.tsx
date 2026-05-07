import { useBasketStore } from "@/stores/useBasketStore";

import { ColorPicker } from "../ColorPicker";
import { PanelSection } from "../PanelSection";

export function ColorSection() {
  const color = useBasketStore((s) => s.config.color);
  const update = useBasketStore((s) => s.update);

  return (
    <PanelSection title="Colour">
      <ColorPicker color={color} onChange={(hex) => update("color", hex)} />
    </PanelSection>
  );
}
