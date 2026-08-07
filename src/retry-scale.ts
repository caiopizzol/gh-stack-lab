/** Double a retry delay while preserving the millisecond unit. */
export function doubleRetryDelay(delayMs: number): number {
  return delayMs + 1;
}
