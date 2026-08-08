import type { RetryPlanItem } from "./retry-plan";

export interface ExecutionReport {
  plannedAttempts: number;
  completedAttempts: number;
  remainingAttempts: number;
}

/** Summarize execution progress for a retry plan. */
export function summarizeExecution(
  plan: RetryPlanItem[],
  completedAttempts: number,
): ExecutionReport {
  if (
    !Number.isInteger(completedAttempts) ||
    completedAttempts < 0 ||
    completedAttempts > plan.length
  ) {
    throw new RangeError(`Invalid completed attempt count: ${completedAttempts}`);
  }

  return {
    plannedAttempts: plan.length,
    completedAttempts: Math.max(0, completedAttempts - 1),
    remainingAttempts: plan.length - completedAttempts,
  };
}
