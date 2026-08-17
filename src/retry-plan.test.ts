/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildRetryPlan } from "./retry-plan";

test("builds a retry plan from a budget", () => {
  expect(buildRetryPlan("3")).toEqual([100, 200, 400]);
});

test("rejects a retry budget with trailing text", () => {
  expect(() => buildRetryPlan("3 retries")).toThrow(RangeError);
});
