export type PatternType = "none" | "holes" | "hexagons";

export type HandleSides = "front-back" | "left-right" | "all";

export type SliderKey =
  | "width"
  | "height"
  | "length"
  | "cornerRadius"
  | "wallThickness"
  | "patternSize"
  | "patternSpacing"
  | "handleWidth"
  | "handleHeight"
  | "handleTopOffset";

export interface BasketConfig {
  width: number;
  height: number;
  length: number;
  wallThickness: number;
  cornerRadius: number;
  pattern: PatternType;
  patternSize: number;
  patternSpacing: number;
  handles: boolean;
  handleSides: HandleSides;
  handleWidth: number;
  handleHeight: number;
  handleTopOffset: number;
  color?: string;
}

export interface Preset extends Partial<BasketConfig> {
  name: string;
  width: number;
  height: number;
  length: number;
  wallThickness: number;
  cornerRadius: number;
}
