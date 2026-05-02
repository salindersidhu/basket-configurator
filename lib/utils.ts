const MM_PER_INCH = 25.4;

export function toDisplay(mmVal: number, isImperial: boolean): number {
  if (!isImperial) return mmVal;
  return Math.round((mmVal / MM_PER_INCH) * 100) / 100;
}

export function toMM(displayVal: number, isImperial: boolean): number {
  if (!isImperial) return displayVal;
  return Math.round(displayVal * MM_PER_INCH * 100) / 100;
}
