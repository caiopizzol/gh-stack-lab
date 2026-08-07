import { parsePort } from "./parse-port";

export function buildEndpoint(host: string, portValue: string): URL {
  const port = parsePort(portValue);

  try {
    const endpoint = new URL(`https://${host}:${port}`);
    if (endpoint.hostname !== host.toLowerCase()) throw new TypeError();
    return endpoint;
  } catch {
    throw new RangeError(`Invalid endpoint host: ${host}`);
  }
}
