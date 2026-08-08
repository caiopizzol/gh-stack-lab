import { calculateRetryBackoff } from "./retry-backoff";
import { parseRetryLimit } from "./retry-limit";

export interface RetryPlanItem {
  attempt: number;
  delaySeconds: number;
}

/** Build the retry plan selected by request headers. */
export function buildRetryPlan(
  headers: Record<string, string>,
  delayValue: string,
): RetryPlanItem[] {
  const retryLimit = parseRetryLimit(headers);

  return Array.from({ length: retryLimit + 1 }, (_, attemptIndex) => ({
    attempt: attemptIndex + 1,
    delaySeconds: calculateRetryBackoff(delayValue, attemptIndex),
  }));
}
