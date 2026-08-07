import { parseRateWindow } from "./rate-window";

export interface BucketState {
  readonly capacity: number;
  readonly tokens: number;
}

/** Create a full bucket that refills `capacity` tokens over the given window. */
export function createBucket(
  capacity: number,
  windowValue: string,
): BucketState {
  parseRateWindow(windowValue);

  return { capacity, tokens: capacity };
}

/** Refill a bucket by the elapsed fraction of its window. */
export function refill(state: BucketState, ratio: number): BucketState {
  return {
    ...state,
    tokens: Math.max(0, state.tokens + state.capacity * ratio),
  };
}
