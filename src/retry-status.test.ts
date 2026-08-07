import { expect, test } from "bun:test";

import { shouldRetryStatus } from "./retry-status";

test("classifies transient HTTP responses", () => {
  expect(shouldRetryStatus(200)).toBe(false);
  expect(shouldRetryStatus(404)).toBe(false);
  expect(shouldRetryStatus(408)).toBe(true);
  expect(shouldRetryStatus(429)).toBe(true);
  expect(shouldRetryStatus(500)).toBe(true);
  expect(shouldRetryStatus(599)).toBe(true);
  expect(shouldRetryStatus(600)).toBe(false);
});
