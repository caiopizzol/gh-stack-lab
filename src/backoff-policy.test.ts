import { expect, test } from "bun:test";

import { DEFAULT_RETRY_ATTEMPTS } from "./backoff-policy";

test("uses three retry attempts by default", () => {
  expect(DEFAULT_RETRY_ATTEMPTS).toBe(3);
});
