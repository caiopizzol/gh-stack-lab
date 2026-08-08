import { expect, test } from "bun:test";

import { createBudgetPlan } from "./budget-plan";

test("creates a normalized budget plan", () => {
  expect(createBudgetPlan("  PRIMARY  ", "3")).toEqual({
    key: "primary",
    limit: 3,
  });
});
