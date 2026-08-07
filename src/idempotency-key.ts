export function normalizeIdempotencyKey(value: string): string {
  const normalized = value.trim();

  if (normalized.length === 0) {
    throw new TypeError("An idempotency key cannot be empty");
  }

  return normalized;
}
