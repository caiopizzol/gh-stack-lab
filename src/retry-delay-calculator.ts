import type { RetryPolicy } from "./retry-policy";

/** Compute one retry delay for a non-negative, zero-based attempt index. */
export function computeRetryDelay(policy: RetryPolicy, attemptIndex: number): number {
  if (!Number.isInteger(attemptIndex)) {
    throw new RangeError("attemptIndex must be an integer");
  }

  const normalizedIndex = Math.max(0, attemptIndex);
  return Math.min(
    policy.baseDelayMs * policy.multiplier ** normalizedIndex,
    policy.maxDelayMs,
  );
}
