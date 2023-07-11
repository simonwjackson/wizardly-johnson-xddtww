import { isObjectEmpty } from "./utils";

describe("isObjectEmpty", () => {
  it("returns true for an empty object", () => {
    const obj = {};
    const result = isObjectEmpty(obj);

    expect(result).toBe(true);
  });

  it("returns false for a non-empty object", () => {
    const obj = { key: "value" };
    const result = isObjectEmpty(obj);

    expect(result).toBe(false);
  });

  it("returns false for a function", () => {
    const fn = function () {};
    const result = isObjectEmpty(fn);

    expect(result).toBe(false);
  });

  it("returns false for an instance of a class", () => {
    class ExampleClass {}
    const instance = new ExampleClass();
    const result = isObjectEmpty(instance);

    expect(result).toBe(false);
  });
});
