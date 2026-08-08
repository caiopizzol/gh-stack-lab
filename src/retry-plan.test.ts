/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildRetryPlan } from "./retry-plan";

test("builds retry plan entries in order", () => {
  const plan = buildRetryPlan({ "X-Retry-Limit": "2" }, "10");

  expect(plan).toHaveLength(2);
  expect(plan).toEqual([
    { attempt: 1, delaySeconds: 10 },
    { attempt: 2, delaySeconds: 20 },
  ]);
});

test("supports the maximum retry limit", () => {
  const plan = buildRetryPlan({ "X-Retry-Limit": "5" }, "10");

  expect(plan).toHaveLength(5);
  expect(plan[4]).toEqual({ attempt: 5, delaySeconds: 160 });
});
