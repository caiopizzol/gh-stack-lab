/// <reference types="bun" />

import { expect, test } from "bun:test";

import { normalizeHeaderName, parseRetryLimit } from "./request-policy";

test("normalizes request header names", () => {
  expect(normalizeHeaderName("  Retry-After  ")).toBe("retry-after");
});

test("parses supported retry limits", () => {
  expect(parseRetryLimit("3")).toBe(3);
  expect(() => parseRetryLimit("0")).toThrow(RangeError);
});

test.each(["3abc", "3.9", " 3 "])(
  "rejects malformed retry limit %s",
  (value) => {
    expect(() => parseRetryLimit(value)).toThrow(RangeError);
  },
);
