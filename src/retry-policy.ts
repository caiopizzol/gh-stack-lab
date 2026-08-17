export interface RetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
}

export const DEFAULT_RETRY_POLICY = {
  maxAttempts: 3,
  baseDelayMs: 100,
} as const satisfies RetryPolicy;
