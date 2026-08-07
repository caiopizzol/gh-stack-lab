import { expect, test } from "bun:test";

import { DEFAULT_RETRY_POLICY } from "./retry-policy";

test("uses exponential growth by default", () => {
  expect(DEFAULT_RETRY_POLICY).toEqual({
    baseDelayMs: 100,
    maxDelayMs: 5_000,
    multiplier: 3,
  });
});
