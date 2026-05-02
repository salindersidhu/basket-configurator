"use client";

import { useState } from "react";

import type { BasketConfig } from "@/lib/types";

import { PRESETS } from "./constants";

import { ColorPicker } from "./components/ColorPicker";
import { PanelSection } from "./components/PanelSection";
import { SegmentedControl } from "./components/SegmentedControl";
import { SliderControl } from "./components/SliderControl";

interface Props {
  config: BasketConfig;
  onChange: (config: BasketConfig) => void;
  onColorChange?: (hex: string) => void;
  onExport?: () => void;
}

export function Panel({ config, onChange, onColorChange, onExport }: Props) {
  const [isImperial, setIsImperial] = useState(false);

  function update<K extends keyof BasketConfig>(
    key: K,
    value: BasketConfig[K],
  ) {
    const next = { ...config, [key]: value };
    onChange(next);

    if (key === "color") {
      onColorChange?.(value as string);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border">
        <h1 className="text-base font-semibold tracking-tight">
          Basket Configurator
        </h1>
        <p className="text-[11px] text-dim mt-0.5">
          Design and export for 3D printing
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 sections-container">
        <PanelSection title="Presets">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  const next = {
                    ...config,
                    width: preset.width,
                    height: preset.height,
                    length: preset.length,
                    wallThickness: preset.wallThickness,
                    cornerRadius: preset.cornerRadius || 0,
                    pattern: preset.pattern || "none",
                    patternSize: preset.patternSize ?? 8,
                    patternSpacing: preset.patternSpacing ?? 3,
                    handles: preset.handles ?? false,
                    handleSides: preset.handleSides || "front-back",
                    handleWidth: preset.handleWidth ?? 60,
                    handleHeight: preset.handleHeight ?? 20,
                    handleTopOffset: preset.handleTopOffset ?? 8,
                  };

                  onChange(next);

                  if (next.color) {
                    onColorChange?.(next.color);
                  }
                }}
                className="toggle-btn px-3 py-1.5 text-[11px] rounded-md border border-input-border bg-input text-muted hover:border-accent hover:text-txt cursor-pointer whitespace-nowrap"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </PanelSection>
        <PanelSection title="Colour">
          <ColorPicker
            color={config.color || "#b8b8b8"}
            onChange={(hex) => update("color", hex)}
          />
        </PanelSection>
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
        <PanelSection title="Shape">
          <SliderControl
            id="width"
            value={config.width}
            isImperial={isImperial}
            onChange={(v) => update("width", v)}
          />
          <SliderControl
            id="height"
            value={config.height}
            isImperial={isImperial}
            onChange={(v) => update("height", v)}
          />
          <SliderControl
            id="length"
            value={config.length}
            isImperial={isImperial}
            onChange={(v) => update("length", v)}
          />
          <SliderControl
            id="cornerRadius"
            value={config.cornerRadius}
            isImperial={isImperial}
            onChange={(v) => update("cornerRadius", v)}
          />
        </PanelSection>
        <PanelSection title="Structure">
          <SliderControl
            id="wallThickness"
            value={config.wallThickness}
            isImperial={isImperial}
            onChange={(v) => update("wallThickness", v)}
          />
        </PanelSection>
        <PanelSection title="Wall Pattern">
          <SegmentedControl
            value={config.pattern}
            options={[
              { value: "none", label: "Solid" },
              { value: "holes", label: "Circles" },
              { value: "hexagons", label: "Hexagons" },
            ]}
            onChange={(val) => update("pattern", val as any)}
          />
          {config.pattern !== "none" && (
            <>
              <SliderControl
                id="patternSize"
                value={config.patternSize}
                isImperial={isImperial}
                onChange={(v) => update("patternSize", v)}
              />
              <SliderControl
                id="patternSpacing"
                value={config.patternSpacing}
                isImperial={isImperial}
                onChange={(v) => update("patternSpacing", v)}
              />
            </>
          )}
        </PanelSection>
        <PanelSection title="Handles">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={config.handles}
              onChange={(e) => update("handles", e.target.checked)}
            />
            <span className="text-xs text-muted group-hover:text-txt transition-colors">
              Enable handles
            </span>
          </label>
          {config.handles && (
            <div className={`mt-3 ${config.handles ? "" : "hidden"}`}>
              <div className="mb-3">
                <span className="text-xs text-muted block mb-1.5">
                  Placement
                </span>
                <SegmentedControl
                  value={config.handleSides}
                  options={[
                    { value: "front-back", label: "Front & Back" },
                    { value: "left-right", label: "Left & Right" },
                    { value: "all", label: "All Sides" },
                  ]}
                  onChange={(val) => update("handleSides", val as any)}
                />
              </div>
              <SliderControl
                id="handleWidth"
                value={config.handleWidth}
                isImperial={isImperial}
                onChange={(v) => update("handleWidth", v)}
              />
              <SliderControl
                id="handleHeight"
                value={config.handleHeight}
                isImperial={isImperial}
                onChange={(v) => update("handleHeight", v)}
              />
              <SliderControl
                id="handleTopOffset"
                value={config.handleTopOffset}
                isImperial={isImperial}
                onChange={(v) => update("handleTopOffset", v)}
              />
            </div>
          )}
        </PanelSection>
      </div>
      <div className="px-5 py-4 border-t border-border">
        <button
          onClick={onExport}
          className="w-full py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all
          bg-accent text-white hover:bg-accent-hover active:scale-[0.98]"
        >
          Export STL
        </button>
      </div>
    </div>
  );
}
