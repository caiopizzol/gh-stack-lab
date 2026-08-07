import { expect, test } from "bun:test";

import { buildRetryPlan } from "./retry-plan";
import { DEFAULT_RETRY_POLICY } from "./retry-policy";

test("builds one delay per retry", () => {
  const plan = buildRetryPlan(DEFAULT_RETRY_POLICY, 4);

  expect(plan).toHaveLength(3);
  expect(plan.every((delay) => delay <= DEFAULT_RETRY_POLICY.maxDelayMs)).toBe(true);
});

test("rejects an empty attempt budget", () => {
  expect(() => buildRetryPlan(DEFAULT_RETRY_POLICY, 0)).toThrow(RangeError);
});
