export function parseWindow(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    throw new Error("window must be an integer");
  }
  if (parsed < 1) {
    throw new Error("window must be positive");
  }
  return parsed;
}
