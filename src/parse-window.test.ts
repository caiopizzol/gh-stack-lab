import { expect, test } from "bun:test";

import { parseWindow } from "./parse-window";

test("accepts positive windows", () => {
  expect(parseWindow("3")).toBe(3);
});

test.each(["3.5", "3abc"])("rejects malformed integer input %s", (value) => {
  expect(() => parseWindow(value)).toThrow("window must be an integer");
});

test("rejects zero windows", () => {
  expect(() => parseWindow("0")).toThrow("window must be positive");
});

test("rejects negative windows", () => {
  expect(() => parseWindow("-1")).toThrow("window must be positive");
});
