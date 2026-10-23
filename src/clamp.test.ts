import { expect, test } from "bun:test";
import { clamp } from "./clamp";

test("clamps into range", () => {
  expect(clamp(5, 0, 3)).toBe(3);
  expect(clamp(-1, 0, 3)).toBe(0);
  expect(clamp(2, 0, 3)).toBe(2);
});
