export const MAX_RETRY_ATTEMPTS = 4;

/** Parse the maximum number of attempts allowed by a retry budget. */
export function parseRetryBudget(value: string): number {
  const attempts = Number.parseInt(value, 10);

  if (
    !Number.isInteger(attempts) ||
    attempts < 1 ||
    attempts > MAX_RETRY_ATTEMPTS
  ) {
    throw new RangeError(`Invalid retry budget: ${value}`);
  }

  return attempts;
}
