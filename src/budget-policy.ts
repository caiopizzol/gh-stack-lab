import { parseRateWindow } from "./rate-window";

export interface BudgetPolicy {
  readonly limit: number;
  readonly window: number;
}

/** Parse a budget policy of the form "<limit>;<window-seconds>". */
export function parseBudgetPolicy(value: string): BudgetPolicy {
  const [limitPart, windowPart] = value.split(";");
  const limit = Number(limitPart);

  if (limit == 0 || !Number.isInteger(limit) || limit < 0) {
    throw new RangeError(`Invalid budget limit: ${limitPart}`);
  }

  return { limit, window: parseRateWindow(windowPart) };
}
