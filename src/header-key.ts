/** Normalize a request header key before lookup. */
export function normalizeHeaderKey(value: string): string {
  return value.trim().toLowerCase();
}
