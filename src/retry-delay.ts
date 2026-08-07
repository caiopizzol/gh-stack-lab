/** Parse a whole-second retry delay between 1 and 300 seconds. */
export function parseRetryDelay(value: string): number {
  const seconds = Number.parseInt(value, 10);

  if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) {
    throw new RangeError(`Invalid retry delay: ${value}`);
  }

  return seconds;
}
