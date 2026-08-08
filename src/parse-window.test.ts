import { expect, test } from "bun:test";

import { parseWindow } from "./parse-window";

test("accepts positive windows", () => {
  expect(parseWindow("3")).toBe(3);
});

test("rejects zero windows", () => {
  expect(() => parseWindow("0")).toThrow("window must be positive");
});
