/// <reference types="bun" />

import { expect, test } from "bun:test";

import { normalizeHeaderName } from "./request-policy";

test("normalizes request header names", () => {
  expect(normalizeHeaderName("  Retry-After  ")).toBe("retry-after");
});
