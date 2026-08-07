import { expect, test } from "bun:test";

import { formatRetryOutcome } from "./retry-report";

test("reports the exact attempts used", () => {
  expect(formatRetryOutcome({ success: true, attemptsUsed: 2 })).toBe(
    "succeeded after 2 attempts",
  );
  expect(formatRetryOutcome({ success: false, attemptsUsed: 1 })).toBe(
    "failed after 1 attempt",
  );
});
