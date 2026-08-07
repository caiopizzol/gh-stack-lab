import { expect, test } from "bun:test";

import { parseRetryBudget } from "./retry-budget";

test("parses retry budgets", () => {
  expect(parseRetryBudget("1")).toBe(1);
  expect(parseRetryBudget("100")).toBe(100);
  expect(parseRetryBudget(" 25 ")).toBe(25);
});

for (const malformed of ["50ms", "1.5", "2e1"]) {
  test(`rejects malformed retry budget ${malformed}`, () => {
    expect(() => parseRetryBudget(malformed)).toThrow(RangeError);
  });
}
