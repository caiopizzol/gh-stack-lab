export type RetryWait = (delayMs: number) => Promise<void>;

/** Execute an operation and wait between failures according to the delay plan. */
export async function runWithRetries<T>(
  operation: () => Promise<T>,
  delays: readonly number[],
  wait: RetryWait = (delayMs) =>
    new Promise((resolve) => setTimeout(resolve, delayMs)),
): Promise<T> {
  for (let attemptIndex = 0; ; attemptIndex += 1) {
    try {
      return await operation();
    } catch (error) {
      const delay = delays[attemptIndex];
      if (delay === undefined) throw error;
      await wait(delay);
    }
  }
}
