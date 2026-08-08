import { expect, test } from "bun:test";

import { normalizeKey } from "./normalize-key";

test("normalizes keys for case-insensitive lookup", () => {
  expect(normalizeKey("  Retry-After  ")).toBe("retry-after");
});
