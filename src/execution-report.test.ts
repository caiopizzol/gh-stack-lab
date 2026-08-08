/// <reference types="bun" />

import { expect, test } from "bun:test";

import { summarizeExecution } from "./execution-report";

const plan = [
  { attempt: 1, delaySeconds: 10 },
  { attempt: 2, delaySeconds: 20 },
];

test("reports an execution before its first attempt", () => {
  const report = summarizeExecution(plan, 0);

  expect(report).toEqual({
    plannedAttempts: 2,
    completedAttempts: 0,
    remainingAttempts: 2,
  });
});

test.each([
  [1, 1],
  [2, 0],
])(
  "reports an execution after %p completed attempts",
  (completedAttempts, remainingAttempts) => {
    expect(summarizeExecution(plan, completedAttempts)).toEqual({
      plannedAttempts: 2,
      completedAttempts,
      remainingAttempts,
    });
  },
);
