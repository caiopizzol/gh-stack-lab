/** Normalize a request header name before policy lookup. */
export function normalizeHeaderName(value: string): string {
  return value.trim().toLowerCase();
}

/** Parse an exact positive retry limit. */
export function parseRetryLimit(value: string): number {
  const limit = Number.parseInt(value, 10);
  if (!Number.isInteger(limit) || limit < 1 || limit > 10) {
    throw new RangeError(`Invalid retry limit: ${value}`);
  }
  return limit;
}
