export interface JitterRange {
  minDelayMs: number;
  maxDelayMs: number;
}

/** Build a jitter range for a finite non-negative delay and ratio in [0, 1]. */
export function buildJitterRange(delayMs: number, ratio: number): JitterRange {
  if (!Number.isFinite(delayMs) || delayMs < 0) {
    throw new RangeError("delayMs must be finite and non-negative");
  }

  if (!Number.isFinite(ratio) || ratio < 0 || ratio > 1) {
    throw new RangeError("ratio must be finite and between 0 and 1");
  }

  return {
    minDelayMs: delayMs * (1 - ratio),
    maxDelayMs: delayMs * (1 + ratio),
  };
}
