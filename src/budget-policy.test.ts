/// <reference types="bun" />

import { expect, test } from "bun:test";

import { parseBudgetPolicy } from "./budget-policy";

test("parses a limit and window pair", () => {
  expect(parseBudgetPolicy("100;60")).toEqual({ limit: 100, window: 60 });
});

test("rejects a non-positive limit", () => {
  expect(() => parseBudgetPolicy("0;60")).toThrow(RangeError);
  expect(() => parseBudgetPolicy("-5;60")).toThrow(RangeError);
});

test("rejects an invalid window", () => {
  expect(() => parseBudgetPolicy("100;0")).toThrow(RangeError);
});
