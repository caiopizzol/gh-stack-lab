import { expect, test } from "bun:test";

import { buildJitterRange } from "./retry-jitter";

test("builds a symmetric jitter range", () => {
  expect(buildJitterRange(1_000, 0.2)).toEqual({
    minDelayMs: 800,
    maxDelayMs: 1_200,
  });
});
