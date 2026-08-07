import { expect, test } from "bun:test";

import { computeRetryDelay } from "./retry-delay-calculator";
import { DEFAULT_RETRY_POLICY } from "./retry-policy";

test("computes capped retry delays", () => {
  expect(computeRetryDelay(DEFAULT_RETRY_POLICY, 0)).toBe(100);
  expect(computeRetryDelay(DEFAULT_RETRY_POLICY, 2)).toBe(900);
  expect(computeRetryDelay(DEFAULT_RETRY_POLICY, 10)).toBe(5_000);
});

test("rejects fractional attempt indexes", () => {
  expect(() => computeRetryDelay(DEFAULT_RETRY_POLICY, 1.5)).toThrow(RangeError);
});

test("rejects negative attempt indexes", () => {
  expect(() => computeRetryDelay(DEFAULT_RETRY_POLICY, -1)).toThrow(RangeError);
});
