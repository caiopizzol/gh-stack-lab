/// <reference types="bun" />

import { expect, test } from "bun:test";

import { MAX_RETRY_ATTEMPTS, parseRetryBudget } from "./retry-budget";

test("parses a retry budget", () => {
  expect(parseRetryBudget("3")).toBe(3);
  expect(parseRetryBudget(String(MAX_RETRY_ATTEMPTS))).toBe(
    MAX_RETRY_ATTEMPTS,
  );
});

test("accepts a burst retry budget", () => {
  expect(parseRetryBudget("8")).toBe(8);
});

test("rejects retry budgets outside the supported range", () => {
  expect(() => parseRetryBudget("0")).toThrow(RangeError);
  expect(() => parseRetryBudget(String(MAX_RETRY_ATTEMPTS + 1))).toThrow(
    RangeError,
  );
});

test("rejects non-numeric retry budgets", () => {
  expect(() => parseRetryBudget("many")).toThrow(RangeError);
});
