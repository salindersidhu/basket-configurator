const MM_PER_INCH = 25.4;

export function toDisplay(mmVal: number, isImperial: boolean): number {
  if (!isImperial) {
    return Math.round(mmVal);
  }

  const inches = mmVal / MM_PER_INCH;
  return Math.round((inches + Number.EPSILON) * 100) / 100;
}

export function toMM(displayVal: number, isImperial: boolean): number {
  if (!isImperial) {
    return Math.round(displayVal);
  }

  const mm = displayVal * MM_PER_INCH;
  return Math.round((mm + Number.EPSILON) * 100) / 100;
}
