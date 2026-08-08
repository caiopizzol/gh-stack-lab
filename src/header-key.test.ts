/// <reference types="bun" />

import { expect, test } from "bun:test";

import { normalizeHeaderKey } from "./header-key";

test("trims surrounding whitespace from header keys", () => {
  expect(normalizeHeaderKey("  X-Retry-Limit  ")).toBe("X-Retry-Limit");
});
