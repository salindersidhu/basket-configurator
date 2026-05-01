import type { BasketConfig, HandleSides, PatternType } from '@/lib/types';

const MM_PER_INCH = 25.4;

type SliderKey =
  | 'width'
  | 'height'
  | 'length'
  | 'cornerRadius'
  | 'wallThickness'
  | 'patternSize'
  | 'patternSpacing'
  | 'handleWidth'
  | 'handleHeight'
  | 'handleTopOffset';

interface Preset extends Partial<BasketConfig> {
  name: string;
  width: number;
  height: number;
  length: number;
  wallThickness: number;
  cornerRadius: number;
}

const PRESETS: Preset[] = [
  {
    name: 'Small Tray',
    width: 80,
    height: 30,
    length: 120,
    wallThickness: 2,
    cornerRadius: 0,
    pattern: 'none',
    handles: false,
  },
  {
    name: 'Storage Bin',
    width: 150,
    height: 100,
    length: 200,
    wallThickness: 3,
    cornerRadius: 0,
    pattern: 'none',
    handles: true,
    handleSides: 'front-back',
    handleWidth: 80,
    handleHeight: 25,
    handleTopOffset: 10,
  },
  {
    name: 'Pencil Cup',
    width: 80,
    height: 100,
    length: 80,
    wallThickness: 2,
    cornerRadius: 15,
    pattern: 'hexagons',
    patternSize: 6,
    patternSpacing: 2,
    handles: false,
  },
  {
    name: 'Fruit Basket',
    width: 200,
    height: 80,
    length: 250,
    wallThickness: 2.5,
    cornerRadius: 20,
    pattern: 'holes',
    patternSize: 8,
    patternSpacing: 4,
    handles: true,
    handleSides: 'front-back',
    handleWidth: 70,
    handleHeight: 20,
    handleTopOffset: 8,
  },
  {
    name: 'Desk Organizer',
    width: 100,
    height: 50,
    length: 180,
    wallThickness: 2,
    cornerRadius: 8,
    pattern: 'none',
    handles: false,
  },
  {
    name: 'Laundry Hamper',
    width: 250,
    height: 180,
    length: 250,
    wallThickness: 3,
    cornerRadius: 30,
    pattern: 'holes',
    patternSize: 10,
    patternSpacing: 5,
    handles: true,
    handleSides: 'all',
    handleWidth: 80,
    handleHeight: 30,
    handleTopOffset: 15,
  },
  {
    name: 'Soap Dish',
    width: 60,
    height: 15,
    length: 90,
    wallThickness: 1.5,
    cornerRadius: 12,
    pattern: 'holes',
    patternSize: 4,
    patternSpacing: 2,
    handles: false,
  },
  {
    name: 'Tool Caddy',
    width: 120,
    height: 90,
    length: 180,
    wallThickness: 3,
    cornerRadius: 5,
    pattern: 'hexagons',
    patternSize: 8,
    patternSpacing: 3,
    handles: true,
    handleSides: 'left-right',
    handleWidth: 60,
    handleHeight: 25,
    handleTopOffset: 10,
  },
  {
    name: 'Planter',
    width: 110,
    height: 85,
    length: 110,
    wallThickness: 2.5,
    cornerRadius: 18,
    pattern: 'holes',
    patternSize: 6,
    patternSpacing: 3,
    handles: false,
  },
  {
    name: 'Bathroom',
    width: 130,
    height: 45,
    length: 95,
    wallThickness: 2,
    cornerRadius: 10,
    pattern: 'none',
    handles: true,
    handleSides: 'front-back',
    handleWidth: 62,
    handleHeight: 18,
    handleTopOffset: 8,
  },
  {
    name: 'Garden',
    width: 220,
    height: 95,
    length: 280,
    wallThickness: 3,
    cornerRadius: 16,
    pattern: 'holes',
    patternSize: 9,
    patternSpacing: 4,
    handles: true,
    handleSides: 'all',
    handleWidth: 78,
    handleHeight: 28,
    handleTopOffset: 12,
  },
  {
    name: 'First Aid',
    width: 200,
    height: 35,
    length: 120,
    wallThickness: 2,
    cornerRadius: 6,
    pattern: 'none',
    handles: false,
  },
];

const HANDLE_SIDE_OPTIONS: { value: HandleSides; label: string }[] = [
  { value: 'front-back', label: 'Front & Back' },
  { value: 'left-right', label: 'Left & Right' },
  { value: 'all', label: 'All Sides' },
];

const PALETTE = [
  '#b8b8b8',
  '#e8e8e8',
  '#4a4a4a',
  '#1a1a1a',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#92400e',
  '#365314',
  '#1e3a5f',
  '#581c87',
];

const SLIDER_DEFS: Record<
  SliderKey,
  { label: string; mm: { min: number; max: number; step: number }; in: { min: number; max: number; step: number } }
> = {
  width: { label: 'Width', mm: { min: 40, max: 300, step: 1 }, in: { min: 1.5, max: 12, step: 0.1 } },
  height: { label: 'Height', mm: { min: 20, max: 200, step: 1 }, in: { min: 0.8, max: 8, step: 0.1 } },
  length: { label: 'Length', mm: { min: 40, max: 300, step: 1 }, in: { min: 1.5, max: 12, step: 0.1 } },
  cornerRadius: {
    label: 'Corner Radius',
    mm: { min: 0, max: 60, step: 1 },
    in: { min: 0, max: 2.4, step: 0.05 },
  },
  wallThickness: {
    label: 'Wall Thickness',
    mm: { min: 1, max: 8, step: 0.5 },
    in: { min: 0.04, max: 0.31, step: 0.01 },
  },
  patternSize: {
    label: 'Size',
    mm: { min: 3, max: 20, step: 0.5 },
    in: { min: 0.12, max: 0.8, step: 0.02 },
  },
  patternSpacing: {
    label: 'Spacing',
    mm: { min: 1, max: 10, step: 0.5 },
    in: { min: 0.04, max: 0.4, step: 0.02 },
  },
  handleWidth: {
    label: 'Width',
    mm: { min: 20, max: 200, step: 1 },
    in: { min: 0.8, max: 8, step: 0.1 },
  },
  handleHeight: {
    label: 'Height',
    mm: { min: 10, max: 60, step: 1 },
    in: { min: 0.4, max: 2.4, step: 0.1 },
  },
  handleTopOffset: {
    label: 'Top Offset',
    mm: { min: 5, max: 60, step: 1 },
    in: { min: 0.2, max: 2.4, step: 0.1 },
  },
};

const GRIP_ICON = `<svg class="drag-handle" width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
  <circle cx="2.5" cy="2" r="1.2"/><circle cx="7.5" cy="2" r="1.2"/>
  <circle cx="2.5" cy="7" r="1.2"/><circle cx="7.5" cy="7" r="1.2"/>
  <circle cx="2.5" cy="12" r="1.2"/><circle cx="7.5" cy="12" r="1.2"/>
</svg>`;

const CHEVRON_ICON = `<svg class="section-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

function toDisplay(mmVal: number, isFreedom: boolean): number {
  if (!isFreedom) return mmVal;
  return Math.round((mmVal / MM_PER_INCH) * 100) / 100;
}

function toMM(displayVal: number, isFreedom: boolean): number {
  if (!isFreedom) return displayVal;
  return Math.round(displayVal * MM_PER_INCH * 100) / 100;
}

export function createPanel(
  container: HTMLElement,
  config: BasketConfig,
  onChange: () => void,
  onColorChange?: (hex: string) => void,
): void {
  let isFreedom = false;
  let sectionOrder = ['presets', 'units', 'shape', 'structure', 'pattern', 'handles', 'color'];
  const collapsedSections = new Set<string>();

  function emit(): void {
    onChange();
  }

  function sliderHTML(id: SliderKey): string {
    const def = SLIDER_DEFS[id];
    const u = isFreedom ? 'in' : 'mm';
    const r = isFreedom ? def.in : def.mm;
    const displayVal = toDisplay(config[id], isFreedom);
    return `
      <div class="mb-3 last:mb-0">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-xs text-muted">${def.label}</span>
          <div class="flex items-center gap-1">
            <input type="number" data-num="${id}" class="w-16 bg-input border border-input-border rounded px-2 py-0.5 text-xs text-txt text-right outline-none focus:border-accent transition-colors" min="${r.min}" max="${r.max}" step="${r.step}" value="${displayVal}" />
            <span class="text-[10px] text-dim w-6">${u}</span>
          </div>
        </div>
        <input type="range" class="w-full" data-slider="${id}" min="${r.min}" max="${r.max}" step="${r.step}" value="${displayVal}" />
      </div>`;
  }

  function sectionHeader(title: string, sectionId: string): string {
    const isCollapsed = collapsedSections.has(sectionId);
    return `<div class="section-header flex items-center gap-2 cursor-pointer select-none" data-toggle-section="${sectionId}">
      ${GRIP_ICON}
      <span class="text-[11px] font-medium uppercase tracking-wider text-dim flex-1">${title}</span>
      <span class="section-chevron-wrap ${isCollapsed ? 'collapsed' : ''}">${CHEVRON_ICON}</span>
    </div>`;
  }

  function segmentedControl(name: string, options: { value: string; label: string }[], current: string): string {
    const btns = options
      .map(
        (o) =>
          `<button class="seg-btn toggle-btn flex-1 py-1.5 text-[11px] font-medium rounded cursor-pointer text-center
        ${current === o.value ? 'bg-accent text-white' : 'text-muted hover:text-txt'}"
        data-seg="${name}" data-val="${o.value}">${o.label}</button>`,
      )
      .join('');
    return `<div class="flex gap-1 mb-3 bg-input rounded-md p-0.5 border border-input-border">${btns}</div>`;
  }

  function buildSections(): Record<string, string> {
    const presetButtons = PRESETS.map(
      (p) =>
        `<button class="toggle-btn px-3 py-1.5 text-[11px] rounded-md border border-input-border bg-input text-muted hover:border-accent hover:text-txt cursor-pointer whitespace-nowrap" data-preset="${p.name}">${p.name}</button>`,
    ).join('');

    const paletteSwatches = PALETTE.map(
      (c) =>
        `<button class="color-swatch w-7 h-7 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
        data-color="${c}" style="background:${c}; border-color: ${c === (config.color || '#b8b8b8') ? 'white' : 'transparent'}"></button>`,
    ).join('');

    function body(id: string, content: string): string {
      const hidden = collapsedSections.has(id) ? 'section-body-collapsed' : '';
      return `<div class="section-body ${hidden}">${content}</div>`;
    }

    return {
      presets: `${sectionHeader('Presets', 'presets')}
        ${body('presets', `<div class="flex flex-wrap gap-1.5">${presetButtons}</div>`)}`,

      units: `${sectionHeader('Units', 'units')}
        ${body(
          'units',
          segmentedControl(
            'units',
            [
              { value: 'metric', label: 'Metric (mm)' },
              { value: 'freedom', label: 'Freedom (in)' },
            ],
            isFreedom ? 'freedom' : 'metric',
          ),
        )}`,

      shape: `${sectionHeader('Shape', 'shape')}
        ${body(
          'shape',
          `
          ${sliderHTML('width')}
          ${sliderHTML('height')}
          ${sliderHTML('length')}
          ${sliderHTML('cornerRadius')}`,
        )}`,

      structure: `${sectionHeader('Structure', 'structure')}
        ${body('structure', sliderHTML('wallThickness'))}`,

      pattern: `${sectionHeader('Wall Pattern', 'pattern')}
        ${body(
          'pattern',
          `
          ${segmentedControl(
            'pattern',
            [
              { value: 'none', label: 'Solid' },
              { value: 'holes', label: 'Circles' },
              { value: 'hexagons', label: 'Hexagons' },
            ],
            config.pattern,
          )}
          <div class="${config.pattern === 'none' ? 'hidden' : ''}" data-section="patternOptions">
            ${sliderHTML('patternSize')}
            ${sliderHTML('patternSpacing')}
          </div>`,
        )}`,

      handles: `${sectionHeader('Handles', 'handles')}
        ${body(
          'handles',
          `
          <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" data-check="handles" ${config.handles ? 'checked' : ''} />
            <span class="text-xs text-muted group-hover:text-txt transition-colors">Enable handles</span>
          </label>
          <div class="mt-3 ${config.handles ? '' : 'hidden'}" data-section="handleOptions">
            <div class="mb-3">
              <span class="text-xs text-muted block mb-1.5">Placement</span>
              ${segmentedControl('handleSides', HANDLE_SIDE_OPTIONS, config.handleSides)}
            </div>
            ${sliderHTML('handleWidth')}
            ${sliderHTML('handleHeight')}
            ${sliderHTML('handleTopOffset')}
          </div>`,
        )}`,

      color: `${sectionHeader('Color', 'color')}
        ${body(
          'color',
          `
          <div class="grid grid-cols-8 gap-2">${paletteSwatches}</div>
          <div class="flex items-center gap-2 mt-3">
            <label class="text-xs text-muted">Custom</label>
            <input type="color" data-custom-color value="${config.color || '#b8b8b8'}"
              class="w-8 h-8 rounded cursor-pointer border border-input-border bg-transparent p-0" />
          </div>`,
        )}`,
    };
  }

  function render(): void {
    const sections = buildSections();
    const sectionsHTML = sectionOrder
      .map((id) => `<div class="panel-section" draggable="false" data-section-id="${id}">${sections[id]}</div>`)
      .join('');

    container.innerHTML = `
      <div class="px-5 py-4 border-b border-border">
        <h1 class="text-base font-semibold tracking-tight">Basket Configurator</h1>
        <p class="text-[11px] text-dim mt-0.5">Design and export for 3D printing</p>
      </div>

      <div class="flex-1 overflow-y-auto px-5 py-4 sections-container" data-sections>
        ${sectionsHTML}
      </div>

      <div class="px-5 py-4 border-t border-border">
        <button class="w-full py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all
          bg-accent text-white hover:bg-accent-hover active:scale-[0.98]" data-export="stl">
          Export STL
        </button>
      </div>
    `;

    bindEvents();
    bindDragAndDrop();
  }

  function bindEvents(): void {
    const patternOpts = container.querySelector('[data-section="patternOptions"]');
    const handleOpts = container.querySelector('[data-section="handleOptions"]');

    container.querySelectorAll<HTMLInputElement>('input[data-slider]').forEach((s) => {
      const id = s.dataset.slider as SliderKey;
      const num = container.querySelector<HTMLInputElement>(`[data-num="${id}"]`);
      if (!num) return;

      s.addEventListener('input', () => {
        const displayVal = parseFloat(s.value);
        config[id] = toMM(displayVal, isFreedom);
        num.value = String(displayVal);
        emit();
      });

      num.addEventListener('change', () => {
        let val = parseFloat(num.value);
        const min = parseFloat(num.min);
        const max = parseFloat(num.max);
        if (Number.isNaN(val)) val = min;
        val = Math.min(max, Math.max(min, val));
        num.value = String(val);
        s.value = String(val);
        config[id] = toMM(val, isFreedom);
        emit();
      });
    });

    function bindSegmented(name: string, configKey: keyof BasketConfig | null): void {
      const btns = container.querySelectorAll<HTMLButtonElement>(`[data-seg="${name}"]`);
      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          btns.forEach((b) => {
            b.classList.remove('bg-accent', 'text-white');
            b.classList.add('text-muted');
          });
          btn.classList.remove('text-muted');
          btn.classList.add('bg-accent', 'text-white');
          if (name === 'units') {
            isFreedom = btn.dataset.val === 'freedom';
            render();
            return;
          }
          if (configKey) {
            const val = btn.dataset.val;
            if (configKey === 'pattern' && (val === 'none' || val === 'holes' || val === 'hexagons')) {
              config.pattern = val;
              if (patternOpts) patternOpts.classList.toggle('hidden', config.pattern === 'none');
            } else if (
              configKey === 'handleSides' &&
              (val === 'front-back' || val === 'left-right' || val === 'all')
            ) {
              config.handleSides = val;
            }
          }
          emit();
        });
      });
    }

    bindSegmented('pattern', 'pattern');
    bindSegmented('handleSides', 'handleSides');
    bindSegmented('units', null);

    const handleCheck = container.querySelector<HTMLInputElement>('[data-check="handles"]');
    if (handleCheck && handleOpts) {
      handleCheck.addEventListener('change', () => {
        config.handles = handleCheck.checked;
        handleOpts.classList.toggle('hidden', !config.handles);
        emit();
      });
    }

    container.querySelectorAll<HTMLElement>('[data-toggle-section]').forEach((header) => {
      header.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.drag-handle')) return;
        const id = header.dataset.toggleSection;
        if (!id) return;
        const section = header.closest('.panel-section');
        const bodyEl = section?.querySelector('.section-body');
        const chevron = header.querySelector('.section-chevron-wrap');
        if (!bodyEl) return;

        if (collapsedSections.has(id)) {
          collapsedSections.delete(id);
          bodyEl.classList.remove('section-body-collapsed');
          chevron?.classList.remove('collapsed');
        } else {
          collapsedSections.add(id);
          bodyEl.classList.add('section-body-collapsed');
          chevron?.classList.add('collapsed');
        }
      });
    });

    container.querySelectorAll<HTMLButtonElement>('.color-swatch').forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        if (color) selectColor(color);
      });
    });

    const customColorInput = container.querySelector<HTMLInputElement>('[data-custom-color]');
    if (customColorInput) {
      customColorInput.addEventListener('input', () => selectColor(customColorInput.value));
    }

    container.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const preset = PRESETS.find((p) => p.name === btn.dataset.preset);
        if (!preset) return;
        Object.assign(config, {
          width: preset.width,
          height: preset.height,
          length: preset.length,
          wallThickness: preset.wallThickness,
          cornerRadius: preset.cornerRadius || 0,
          pattern: (preset.pattern || 'none') as PatternType,
          patternSize: preset.patternSize ?? 8,
          patternSpacing: preset.patternSpacing ?? 3,
          handles: preset.handles ?? false,
          handleSides: (preset.handleSides || 'front-back') as HandleSides,
          handleWidth: preset.handleWidth ?? 60,
          handleHeight: preset.handleHeight ?? 20,
          handleTopOffset: preset.handleTopOffset ?? 8,
        });
        render();
        emit();
      });
    });
  }

  function bindDragAndDrop(): void {
    const sectionsContainer = container.querySelector('[data-sections]');
    if (!(sectionsContainer instanceof HTMLElement)) return;

    let draggedId: string | null = null;
    let handleGrabbed = false;

    sectionsContainer.addEventListener('mousedown', (e) => {
      const handle = (e.target as HTMLElement).closest('.drag-handle');
      if (handle) {
        handleGrabbed = true;
        const section = handle.closest('.panel-section');
        if (section instanceof HTMLElement) section.setAttribute('draggable', 'true');
      }
    });

    const onMouseUp = (): void => {
      handleGrabbed = false;
      container.querySelectorAll('.panel-section').forEach((s) => {
        if (s instanceof HTMLElement) s.setAttribute('draggable', 'false');
      });
    };
    document.addEventListener('mouseup', onMouseUp);

    sectionsContainer.addEventListener('dragstart', (e) => {
      if (!handleGrabbed) {
        e.preventDefault();
        return;
      }
      const section = (e.target as HTMLElement).closest('.panel-section');
      if (!(section instanceof HTMLElement)) return;
      draggedId = section.dataset.sectionId ?? null;
      e.dataTransfer!.effectAllowed = 'move';
      e.dataTransfer!.setData('text/plain', draggedId || '');
      requestAnimationFrame(() => section.classList.add('dragging'));
    });

    sectionsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'move';

      clearDropIndicators();

      const target = (e.target as HTMLElement).closest('.panel-section');
      if (!(target instanceof HTMLElement) || target.dataset.sectionId === draggedId) return;

      const rect = target.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;

      if (e.clientY < midY) {
        target.classList.add('drag-over-top');
      } else {
        target.classList.add('drag-over-bottom');
      }
    });

    sectionsContainer.addEventListener('dragleave', (e) => {
      const target = (e.target as HTMLElement).closest('.panel-section');
      if (target) {
        target.classList.remove('drag-over-top', 'drag-over-bottom');
      }
    });

    sectionsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      clearDropIndicators();

      const target = (e.target as HTMLElement).closest('.panel-section');
      if (!(target instanceof HTMLElement) || !draggedId) return;

      const targetId = target.dataset.sectionId;
      if (!targetId || targetId === draggedId) return;

      const fromIdx = sectionOrder.indexOf(draggedId);
      const toIdx = sectionOrder.indexOf(targetId);
      if (fromIdx === -1 || toIdx === -1) return;

      sectionOrder.splice(fromIdx, 1);

      const rect = target.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const insertIdx =
        e.clientY < midY ? sectionOrder.indexOf(targetId) : sectionOrder.indexOf(targetId) + 1;

      sectionOrder.splice(insertIdx, 0, draggedId);
      render();
    });

    sectionsContainer.addEventListener('dragend', () => {
      draggedId = null;
      handleGrabbed = false;
      clearDropIndicators();
      container.querySelectorAll('.panel-section').forEach((s) => {
        s.classList.remove('dragging');
        if (s instanceof HTMLElement) s.setAttribute('draggable', 'false');
      });
    });

    function clearDropIndicators(): void {
      container.querySelectorAll('.panel-section').forEach((s) => {
        s.classList.remove('drag-over-top', 'drag-over-bottom');
      });
    }
  }

  function selectColor(hex: string): void {
    config.color = hex;
    container.querySelectorAll<HTMLButtonElement>('.color-swatch').forEach((s) => {
      s.style.borderColor = s.dataset.color === hex ? 'white' : 'transparent';
    });
    const customColorInput = container.querySelector<HTMLInputElement>('[data-custom-color]');
    if (customColorInput) customColorInput.value = hex;
    onColorChange?.(hex);
  }

  render();
}
