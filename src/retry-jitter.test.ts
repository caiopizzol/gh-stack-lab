import { expect, test } from "bun:test";

import { buildJitterRange } from "./retry-jitter";

test("builds a symmetric jitter range", () => {
  expect(buildJitterRange(1_000, 0.2)).toEqual({
    minDelayMs: 800,
    maxDelayMs: 1_200,
  });
});

test("rejects invalid delays", () => {
  for (const delayMs of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => buildJitterRange(delayMs, 0.2)).toThrow(RangeError);
  }
});

test("rejects invalid ratios", () => {
  for (const ratio of [-0.1, 1.1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => buildJitterRange(1_000, ratio)).toThrow(RangeError);
  }
});
