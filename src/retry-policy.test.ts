/// <reference types="bun" />

import { expect, test } from "bun:test";

import { DEFAULT_RETRY_POLICY } from "./retry-policy";

test("provides a conservative default retry policy", () => {
  expect(DEFAULT_RETRY_POLICY).toEqual({
    maxAttempts: 3,
    baseDelayMs: 100,
  });
});
