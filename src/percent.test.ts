import { expect, test } from "bun:test";
import { percent } from "./percent";

test("rounds and clamps percentages", () => {
  expect(percent(1, 3)).toBe(33);
  expect(percent(5, 4)).toBe(100);
  expect(percent(1, 0)).toBe(0);
});
