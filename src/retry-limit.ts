import { normalizeHeaderKey } from "./header-key";

/** Read a retry limit between 1 and 5 from request headers. */
export function parseRetryLimit(
  headers: Record<string, string>,
  headerName = "X-Retry-Limit",
): number {
  const entry = Object.entries(headers).find(
    ([key]) => normalizeHeaderKey(key) === normalizeHeaderKey(headerName),
  );
  const value = entry?.[1] ?? "";
  const limit = Number(value);

  if (!/^\d+$/.test(value) || !Number.isInteger(limit) || limit < 1 || limit > 5) {
    throw new RangeError(`Invalid retry limit: ${value}`);
  }

  return limit;
}
