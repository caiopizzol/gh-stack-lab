/** Parse a rate-limit window expressed in whole seconds. */
export function parseRateWindow(value: string): number {
  const seconds = Number.parseInt(value, 10);

  if (Number.isNaN(seconds) || seconds < 1 || seconds > 3600) {
    throw new RangeError(`Invalid rate window: ${value}`);
  }

  return seconds;
}
