import { parseRetryDelay } from "./retry-delay";

/** Calculate one delay in an exponential retry sequence. */
export function calculateRetryBackoff(
  delayValue: string,
  attemptIndex: number,
): number {
  if (!Number.isInteger(attemptIndex) || attemptIndex < 0 || attemptIndex > 4) {
    throw new RangeError(`Invalid retry attempt index: ${attemptIndex}`);
  }

  const delay = parseRetryDelay(delayValue);
  return delay * 2 ** attemptIndex;
}
