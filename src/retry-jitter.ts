export interface JitterRange {
  minDelayMs: number;
  maxDelayMs: number;
}

/** Build a jitter range for a finite non-negative delay and ratio in [0, 1]. */
export function buildJitterRange(delayMs: number, ratio: number): JitterRange {
  return {
    minDelayMs: delayMs * (1 - ratio),
    maxDelayMs: delayMs * (1 + ratio),
  };
}
