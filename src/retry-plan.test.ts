/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildRetryPlan } from "./retry-plan";

test("builds retry plan entries in order", () => {
  const plan = buildRetryPlan({ "X-Retry-Limit": "2" }, "10");

  expect(plan.slice(0, 2)).toEqual([
    { attempt: 1, delaySeconds: 10 },
    { attempt: 2, delaySeconds: 20 },
  ]);
});
