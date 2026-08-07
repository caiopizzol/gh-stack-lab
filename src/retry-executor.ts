export type RetryWait = (delayMs: number) => Promise<void>;

/** Execute an operation until it succeeds or the retry plan is exhausted. */
export async function executeWithRetries<T>(
  operation: () => Promise<T>,
  delays: readonly number[],
  wait: RetryWait = async () => {},
): Promise<T> {
  let result: T | undefined;
  let hasResult = false;
  let lastError: unknown;

  for (let attemptIndex = 0; attemptIndex <= delays.length; attemptIndex += 1) {
    try {
      result = await operation();
      hasResult = true;
    } catch (error) {
      lastError = error;
      if (attemptIndex === delays.length) throw error;
      await wait(delays[attemptIndex]!);
    }
  }

  if (!hasResult) throw lastError;
  return result as T;
}
