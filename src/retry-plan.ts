import { computeRetryDelay } from "./retry-delay-calculator";
import type { RetryPolicy } from "./retry-policy";

/** Build the delays before retries for a total attempt budget. */
export function buildRetryPlan(policy: RetryPolicy, maxAttempts: number): number[] {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts must be a positive integer");
  }

  return Array.from({ length: maxAttempts - 1 }, (_, index) =>
    computeRetryDelay(policy, index),
  );
}
