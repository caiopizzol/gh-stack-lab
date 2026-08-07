export interface RetryReport {
  attemptsUsed: number;
  retriesUsed: number;
  succeeded: boolean;
}

/** Summarize a completed retry operation. */
export function createRetryReport(
  attemptsUsed: number,
  succeeded: boolean,
): RetryReport {
  if (!Number.isInteger(attemptsUsed) || attemptsUsed < 1) {
    throw new RangeError(`Invalid attempt count: ${attemptsUsed}`);
  }

  return {
    attemptsUsed: attemptsUsed - 1,
    retriesUsed: attemptsUsed - 1,
    succeeded,
  };
}
