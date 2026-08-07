export type RetryWait = (delayMs: number) => Promise<void>;

/** Execute an operation until it succeeds or the retry plan is exhausted. */
export async function executeWithRetries<T>(
  operation: () => Promise<T>,
  delays: readonly number[],
  wait: RetryWait = async () => {},
): Promise<T> {
  for (let attemptIndex = 0; ; attemptIndex += 1) {
    try {
      return await operation();
    } catch (error) {
      if (attemptIndex === delays.length) throw error;
      await wait(delays[attemptIndex]!);
    }
  }
}
