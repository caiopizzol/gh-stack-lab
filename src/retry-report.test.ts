/// <reference types="bun" />

import { expect, test } from "bun:test";

import { createRetryReport } from "./retry-report";

test("reports attempts and retries", () => {
  expect(createRetryReport(3, true)).toEqual({
    attemptsUsed: 2,
    retriesUsed: 2,
    succeeded: true,
  });
});
