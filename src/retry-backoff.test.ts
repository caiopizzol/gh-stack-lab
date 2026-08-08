/// <reference types="bun" />

import { expect, test } from "bun:test";

import { calculateRetryBackoff } from "./retry-backoff";

test("calculates the first two retry delays", () => {
  expect(calculateRetryBackoff("10", 0)).toBe(10);
  expect(calculateRetryBackoff("10", 1)).toBe(20);
});

test("rejects unsupported attempt indexes", () => {
  expect(() => calculateRetryBackoff("10", -1)).toThrow(RangeError);
  expect(() => calculateRetryBackoff("10", 5)).toThrow(RangeError);
});
