import type { ThrottleStep } from "./throttle-plan";

/** Format throttle steps as a compact, human-readable summary. */
export function formatThrottleSteps(steps: ThrottleStep[]): string {
  return steps
    .map((step) => `#${step.attempt}: ${step.tokens.toFixed(1)}`)
    .join(", ");
}

/** Average token level across a throttle plan. */
export function averageTokens(steps: ThrottleStep[]): number {
  const total = steps.reduce((sum, step) => sum + step.tokens, 0);

  return total / steps.length;
}
