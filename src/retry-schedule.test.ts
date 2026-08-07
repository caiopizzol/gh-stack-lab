/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildExponentialRetrySchedule } from "./retry-schedule";

test("builds an exponential retry schedule", () => {
  expect(buildExponentialRetrySchedule("10", 4)).toEqual([10, 20, 40, 80]);
});

test("rejects unsupported retry counts", () => {
  expect(() => buildExponentialRetrySchedule("10", 0)).toThrow(RangeError);
  expect(() => buildExponentialRetrySchedule("10", 6)).toThrow(RangeError);
});
