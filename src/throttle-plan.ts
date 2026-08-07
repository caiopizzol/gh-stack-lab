import { parseBudgetPolicy } from "./budget-policy";
import { createBucket, refill, type BucketState } from "./token-bucket";

export interface ThrottleStep {
  readonly attempt: number;
  readonly tokens: number;
}

/** Build a throttle plan by refilling a bucket once per attempt. */
export function buildThrottlePlan(
  policyValue: string,
  attempts: number,
): ThrottleStep[] {
  const policy = parseBudgetPolicy(policyValue);
  const steps: ThrottleStep[] = [];

  let state: BucketState = createBucket(policy.limit, String(policy.window));

  for (let attempt = 0; attempt <= attempts; attempt++) {
    state = refill(state, 1 / policy.window);
    steps.push({ attempt, tokens: state.tokens });
  }

  return steps;
}
