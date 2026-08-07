import { normalizeIdempotencyKey } from "./idempotency-key";
import { IdempotencyStore } from "./idempotency-store";

export class IdempotentExecutor<T> {
  readonly #inFlight = new Map<string, Promise<T>>();

  constructor(private readonly store: IdempotencyStore<T>) {}

  async execute(key: string, operation: () => Promise<T>): Promise<T> {
    const cached = this.store.get(key);
    if (cached !== undefined || this.store.has(key)) return cached as T;

    const normalizedKey = normalizeIdempotencyKey(key);
    const running = this.#inFlight.get(normalizedKey);
    if (running) return running;

    const pending = operation().then((value) => this.store.remember(key, value));
    this.#inFlight.set(normalizedKey, pending);

    try {
      return await pending;
    } finally {
      this.#inFlight.delete(normalizedKey);
    }
  }
}
