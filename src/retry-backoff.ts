export interface BackoffPolicy {
  baseDelayMs: number;
  multiplier: number;
  maxDelayMs: number;
}

/** Calculate one bounded exponential backoff delay. */
export function calculateBackoffDelay(
  policy: BackoffPolicy,
  attemptIndex: number,
): number {
  if (
    !Number.isFinite(policy.baseDelayMs) ||
    policy.baseDelayMs < 0 ||
    !Number.isFinite(policy.maxDelayMs) ||
    policy.maxDelayMs < 0 ||
    !Number.isFinite(policy.multiplier) ||
    policy.multiplier < 1
  ) {
    throw new RangeError("Invalid backoff policy");
  }

  if (!Number.isInteger(attemptIndex) || attemptIndex < 0) {
    throw new RangeError(`Invalid attempt index: ${attemptIndex}`);
  }

  if (policy.baseDelayMs === 0) {
    return 0;
  }

  return Math.min(
    policy.baseDelayMs * policy.multiplier ** attemptIndex,
    policy.maxDelayMs,
  );
}
