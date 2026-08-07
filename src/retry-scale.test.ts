import { describe, expect, test } from "bun:test";

import { doubleRetryDelay } from "./retry-scale";

describe("doubleRetryDelay", () => {
  test("doubles the delay", () => {
    expect(doubleRetryDelay(250)).toBe(500);
  });
});
