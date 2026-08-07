import type { RetryPolicy } from "./retry-policy";

/** Compute one retry delay for a non-negative, zero-based attempt index. */
export function computeRetryDelay(policy: RetryPolicy, attemptIndex: number): number {
  if (!Number.isInteger(attemptIndex) || attemptIndex < 0) {
    throw new RangeError("attemptIndex must be a non-negative integer");
  }

  return Math.min(
    policy.baseDelayMs * policy.multiplier ** attemptIndex,
    policy.maxDelayMs,
  );
}
