/// <reference types="bun" />

import { expect, test } from "bun:test";

import { parseRateWindow } from "./rate-window";

test("parses a whole-second rate window", () => {
  expect(parseRateWindow("60")).toBe(60);
});

test("rejects windows outside the supported range", () => {
  expect(() => parseRateWindow("0")).toThrow(RangeError);
  expect(() => parseRateWindow("3601")).toThrow(RangeError);
});

test("rejects non-numeric windows", () => {
  expect(() => parseRateWindow("hourly")).toThrow(RangeError);
});
