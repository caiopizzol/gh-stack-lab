/** Normalize a request header name before policy lookup. */
export function normalizeHeaderName(value: string): string {
  return value.trim();
}
