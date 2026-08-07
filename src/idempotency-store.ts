import { normalizeIdempotencyKey } from "./idempotency-key";

interface StoredResult<T> {
  readonly value: T;
  readonly expiresAt: number;
}

export class IdempotencyStore<T> {
  readonly #records = new Map<string, StoredResult<T>>();

  constructor(
    private readonly ttlMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  remember(key: string, value: T): T {
    const normalizedKey = normalizeIdempotencyKey(key);
    const existing = this.#records.get(normalizedKey);

    if (existing && existing.expiresAt > this.now()) {
      return existing.value;
    }

    this.#records.set(normalizedKey, {
      value,
      expiresAt: this.now() + this.ttlMs,
    });
    return value;
  }

  get(key: string): T | undefined {
    const normalizedKey = normalizeIdempotencyKey(key);
    const record = this.#records.get(normalizedKey);

    if (!record) return undefined;
    if (record.expiresAt <= this.now()) {
      this.#records.delete(normalizedKey);
      return undefined;
    }

    return record.value;
  }
}
