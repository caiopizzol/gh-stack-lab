/// <reference types="bun" />

import { expect, test } from "bun:test";

import { calculateBackoffDelay } from "./retry-backoff";

test("calculates a capped exponential backoff", () => {
  const policy = { baseDelayMs: 100, multiplier: 2, maxDelayMs: 250 };

  expect(calculateBackoffDelay(policy, 0)).toBe(100);
  expect(calculateBackoffDelay(policy, 1)).toBe(200);
  expect(calculateBackoffDelay(policy, 2)).toBe(250);
});

test("accepts finite policy boundaries", () => {
  expect(
    calculateBackoffDelay(
      { baseDelayMs: 0, multiplier: 1, maxDelayMs: 0 },
      0,
    ),
  ).toBe(0);
  expect(
    calculateBackoffDelay(
      { baseDelayMs: 0, multiplier: 2, maxDelayMs: 250 },
      Number.MAX_SAFE_INTEGER,
    ),
  ).toBe(0);
});

test("rejects invalid backoff policies", () => {
  const invalidPolicies = [
    { baseDelayMs: -1, multiplier: 2, maxDelayMs: 250 },
    { baseDelayMs: Number.POSITIVE_INFINITY, multiplier: 2, maxDelayMs: 250 },
    { baseDelayMs: 100, multiplier: 2, maxDelayMs: -1 },
    { baseDelayMs: 100, multiplier: 2, maxDelayMs: Number.NaN },
    { baseDelayMs: 100, multiplier: 0.5, maxDelayMs: 250 },
    { baseDelayMs: 100, multiplier: Number.NaN, maxDelayMs: 250 },
  ];

  for (const policy of invalidPolicies) {
    expect(() => calculateBackoffDelay(policy, 1)).toThrow(RangeError);
  }
});
