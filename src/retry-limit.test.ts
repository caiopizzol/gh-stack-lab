/// <reference types="bun" />

import { expect, test } from "bun:test";

import { parseRetryLimit } from "./retry-limit";

test("reads a retry limit from request headers", () => {
  expect(parseRetryLimit({ "X-Retry-Limit": "3" })).toBe(3);
});

test("rejects retry limits above the supported maximum", () => {
  expect(() => parseRetryLimit({ "X-Retry-Limit": "6" })).toThrow(RangeError);
});
