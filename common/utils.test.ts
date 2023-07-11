import { KtoF } from "./utils";

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
