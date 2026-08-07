import { describe, expect, test } from "bun:test";
import { normalizeIdempotencyKey } from "./idempotency-key";

describe("normalizeIdempotencyKey", () => {
  test("trims surrounding whitespace without changing the key", () => {
    expect(normalizeIdempotencyKey("  Order-ABC  ")).toBe("Order-ABC");
  });

  test("rejects an empty key", () => {
    expect(() => normalizeIdempotencyKey("   ")).toThrow("cannot be empty");
  });
});
