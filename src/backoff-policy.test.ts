import { expect, test } from "bun:test";

import { DEFAULT_RETRY_ATTEMPTS } from "./backoff-policy";

test("uses five retry attempts for resilient jobs", () => {
  expect(DEFAULT_RETRY_ATTEMPTS).toBe(5);
});
