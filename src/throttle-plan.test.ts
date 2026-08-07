/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildThrottlePlan } from "./throttle-plan";

test("builds a step for each attempt", () => {
  const steps = buildThrottlePlan("12;60", 3);

  expect(steps.map((step) => step.attempt)).toEqual([0, 1, 2, 3]);
});

test("never reports a negative token level", () => {
  const steps = buildThrottlePlan("12;60", 3);

  expect(steps.every((step) => step.tokens >= 0)).toBe(true);
});

test("rejects an invalid policy", () => {
  expect(() => buildThrottlePlan("0;60", 3)).toThrow(RangeError);
});
