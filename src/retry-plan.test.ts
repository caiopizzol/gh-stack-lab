import { expect, test } from "bun:test";

import { buildRetryPlan } from "./retry-plan";
import { DEFAULT_RETRY_POLICY } from "./retry-policy";

test("builds one delay per retry", () => {
  const plan = buildRetryPlan(DEFAULT_RETRY_POLICY, 4);

  expect(plan).toEqual([100, 300, 900]);
});

test("rejects an empty attempt budget", () => {
  expect(() => buildRetryPlan(DEFAULT_RETRY_POLICY, 0)).toThrow(RangeError);
});
