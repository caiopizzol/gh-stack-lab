/// <reference types="bun" />

import { expect, test } from "bun:test";

import { summarizeExecution } from "./execution-report";

test("reports an execution before its first attempt", () => {
  const report = summarizeExecution(
    [
      { attempt: 1, delaySeconds: 10 },
      { attempt: 2, delaySeconds: 20 },
    ],
    0,
  );

  expect(report).toEqual({
    plannedAttempts: 2,
    completedAttempts: 0,
    remainingAttempts: 2,
  });
});
