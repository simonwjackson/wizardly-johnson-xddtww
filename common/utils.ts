export type PlainObject = { [k: string]: any };

export const isObjectEmpty = (objectName: PlainObject) =>
  Object.keys(objectName).length === 0 &&
  objectName.constructor === Object;

export const KtoF = (tempKevlin: number) =>
  ((tempKevlin - 273.15) * 9) / 5 + 32;
