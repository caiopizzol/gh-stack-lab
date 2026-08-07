import { parseRetryDelay } from "./retry-delay";

/** Build an exponential retry schedule from a base delay. */
export function buildExponentialRetrySchedule(
  delayValue: string,
  attempts: number,
): number[] {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 5) {
    throw new RangeError(`Invalid retry attempts: ${attempts}`);
  }

  const delay = parseRetryDelay(delayValue);
  return Array.from({ length: attempts }, (_, index) => delay * (index + 1));
}
