/** Return whether a valid HTTP status represents a transient response. */
export function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}
