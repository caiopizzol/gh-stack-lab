/// <reference types="bun" />

import { expect, test } from "bun:test";

import { normalizeHeaderKey } from "./header-key";

test("trims surrounding whitespace from header keys", () => {
  expect(normalizeHeaderKey("  x-retry-limit  ")).toBe("x-retry-limit");
});

test("lowercases mixed-case header keys", () => {
  expect(normalizeHeaderKey("X-Retry-Limit")).toBe("x-retry-limit");
});
