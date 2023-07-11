export type PlainObject = { [k: string]: any };

export const KtoF = (tempKevlin: number) =>
  ((tempKevlin - 273.15) * 9) / 5 + 32;
