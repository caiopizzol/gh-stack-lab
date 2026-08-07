/// <reference types="bun" />

import { expect, test } from "bun:test";

import { averageTokens, formatThrottleSteps } from "./throttle-report";

test("formats steps with one-based attempt labels", () => {
  expect(
    formatThrottleSteps([
      { attempt: 0, tokens: 1 },
      { attempt: 1, tokens: 2.25 },
    ]),
  ).toBe("#1: 1.0, #2: 2.3");
});

test("averages the token levels of a plan", () => {
  expect(
    averageTokens([
      { attempt: 0, tokens: 2 },
      { attempt: 1, tokens: 4 },
    ]),
  ).toBe(3);
});
