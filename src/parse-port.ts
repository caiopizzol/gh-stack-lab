/** Parse a decimal TCP port and reject values outside the valid range. */
export function parsePort(value: string): number {
  if (!/^[0-9]+$/.test(value)) {
    throw new RangeError(`Invalid TCP port: ${value}`);
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new RangeError(`Invalid TCP port: ${value}`);
  }

  return port;
}
