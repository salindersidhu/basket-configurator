import { PanelSection } from "../PanelSection";
import { SegmentedControl } from "../SegmentedControl";

type Props = {
  isImperial: boolean;
  setIsImperial: (val: boolean) => void;
};

export function UnitSection({ isImperial, setIsImperial }: Props) {
  return (
    <PanelSection title="Units">
      <SegmentedControl
        value={isImperial ? "imperial" : "metric"}
        options={[
          { value: "metric", label: "Metric (mm)" },
          { value: "imperial", label: "Freedom (in)" },
        ]}
        onChange={(val) => setIsImperial(val === "imperial")}
      />
    </PanelSection>
  );
}
