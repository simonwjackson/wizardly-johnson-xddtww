export type PlainObject = { [k: string]: any };

export const isObjectEmpty = (objectName: PlainObject) =>
  Object.keys(objectName).length === 0 &&
  objectName.constructor === Object;
