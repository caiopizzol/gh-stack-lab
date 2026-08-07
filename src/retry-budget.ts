/** Parse a whole-number retry budget from 1 through 100. */
export function parseRetryBudget(value: string): number {
  const budget = Number.parseInt(value, 10);

  if (!/^\d+$/.test(value) || !Number.isInteger(budget) || budget < 1 || budget > 100) {
    throw new RangeError("retry budget must be a whole number from 1 through 100");
  }

  return budget;
}
