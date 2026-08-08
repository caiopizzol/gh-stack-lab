/// <reference types="bun" />

import { expect, test } from "bun:test";

import { calculateRetryBackoff } from "./retry-backoff";

test("calculates exponential retry delays", () => {
  expect(calculateRetryBackoff("10", 0)).toBe(10);
  expect(calculateRetryBackoff("10", 1)).toBe(20);
  expect(calculateRetryBackoff("10", 2)).toBe(40);
});

test("rejects unsupported attempt indexes", () => {
  expect(() => calculateRetryBackoff("10", -1)).toThrow(RangeError);
  expect(() => calculateRetryBackoff("10", 5)).toThrow(RangeError);
});
