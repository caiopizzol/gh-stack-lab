import { parseWindow } from "./parse-window";

export interface BudgetPlan {
  key: string;
  limit: number;
}

export function createBudgetPlan(key: string, window: string): BudgetPlan {
  return {
    key: key.trim(),
    limit: parseWindow(window),
  };
}
