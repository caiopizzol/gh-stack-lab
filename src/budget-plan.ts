import { parseWindow } from "./parse-window";

export interface BudgetPlan {
  key: string;
  limit: number;
}

export function createBudgetPlan(key: string, window: string): BudgetPlan {
  return {
    key: key.trim().toLowerCase(),
    limit: parseWindow(window),
  };
}
