import { parseRetryBudget } from "./retry-budget";
import { DEFAULT_RETRY_POLICY } from "./retry-policy";

/** Build exponential delays for every attempt in a retry budget. */
export function buildRetryPlan(
  budgetValue: string,
  baseDelayMs = DEFAULT_RETRY_POLICY.baseDelayMs,
): number[] {
  const attempts = parseRetryBudget(budgetValue);
  return Array.from(
    { length: attempts },
    (_, index) => baseDelayMs * 2 ** index,
  );
}
