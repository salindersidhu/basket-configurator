export type PatternType = "none" | "holes" | "hexagons";

export type Handles = "none" | "ends" | "sides" | "all";

export interface BasketConfig {
  width: number;
  height: number;
  length: number;
  wallThickness: number;
  cornerRadius: number;
  pattern: PatternType;
  patternSize: number;
  patternSpacing: number;
  handles: Handles;
  handleWidth: number;
  handleHeight: number;
  handleTopOffset: number;
  color: string;
}

export type BasketGeometryConfig = Omit<BasketConfig, "color">;
export interface Preset extends Partial<BasketConfig> {
  name: string;
  width: number;
  height: number;
  length: number;
  wallThickness: number;
  cornerRadius: number;
}
