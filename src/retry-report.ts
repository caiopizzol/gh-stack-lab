export interface RetryOutcome {
  success: boolean;
  attemptsUsed: number;
}

/** Format the exact number of operation attempts that were executed. */
export function formatRetryOutcome(outcome: RetryOutcome): string {
  const status = outcome.success ? "succeeded" : "failed";
  const attempts = outcome.attemptsUsed;
  return `${status} after ${attempts} attempt${attempts === 1 ? "" : "s"}`;
}
