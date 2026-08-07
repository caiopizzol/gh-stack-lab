/// <reference types="bun" />

import { expect, test } from "bun:test";

import { parseRetryDelay } from "./retry-delay";

test("parses a retry delay in seconds", () => {
  expect(parseRetryDelay("30")).toBe(30);
});

test("rejects delays outside the supported range", () => {
  expect(() => parseRetryDelay("0")).toThrow(RangeError);
  expect(() => parseRetryDelay("301")).toThrow(RangeError);
});

test("rejects non-numeric delays", () => {
  expect(() => parseRetryDelay("fast")).toThrow(RangeError);
});
