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
  if (!Number.isInteger(attemptIndex) || attemptIndex < 0) {
    throw new RangeError(`Invalid attempt index: ${attemptIndex}`);
  }

  return Math.min(
    policy.baseDelayMs * policy.multiplier ** attemptIndex,
    policy.maxDelayMs,
  );
}
