const MM_PER_INCH = 25.4;

export function toDisplay(mmVal: number, isFreedom: boolean): number {
  if (!isFreedom) return mmVal;
  return Math.round((mmVal / MM_PER_INCH) * 100) / 100;
}

export function toMM(displayVal: number, isFreedom: boolean): number {
  if (!isFreedom) return displayVal;
  return Math.round(displayVal * MM_PER_INCH * 100) / 100;
}
