export interface RetryPolicy {
  baseDelayMs: number;
  maxDelayMs: number;
  multiplier: number;
}

/** Default policy triples the delay after every failed attempt. */
export const DEFAULT_RETRY_POLICY: RetryPolicy = {
  baseDelayMs: 100,
  maxDelayMs: 5_000,
  multiplier: 3,
};
