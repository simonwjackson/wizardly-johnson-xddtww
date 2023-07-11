import { isObjectEmpty, KtoF } from "./utils";

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

describe("KtoF", () => {
  it("should correctly convert 0 Kelvin to -459.67 Fahrenheit", () => {
    const result = KtoF(0);

    expect(result).toBeCloseTo(-459.67, 2);
  });

  it("should correctly convert 273.15 Kelvin to 32 Fahrenheit", () => {
    const result = KtoF(273.15);

    expect(result).toBeCloseTo(32, 2);
  });

  it("should correctly convert 373.15 Kelvin to 212 Fahrenheit", () => {
    const result = KtoF(373.15);

    expect(result).toBeCloseTo(212, 2);
  });
});
