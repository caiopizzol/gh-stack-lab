/// <reference types="bun" />

import { expect, test } from "bun:test";

import { calculateBackoffDelay } from "./retry-backoff";

test("calculates a capped exponential backoff", () => {
  const policy = { baseDelayMs: 100, multiplier: 2, maxDelayMs: 250 };

  expect(calculateBackoffDelay(policy, 0)).toBe(100);
  expect(calculateBackoffDelay(policy, 1)).toBe(200);
  expect(calculateBackoffDelay(policy, 2)).toBe(250);
});
