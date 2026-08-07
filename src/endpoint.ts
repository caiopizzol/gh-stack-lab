import { parsePort } from "./parse-port";

export function buildEndpoint(host: string, portValue: string): URL {
  const port = parsePort(portValue);
  if (/[\u0000-\u0020\u007f]/.test(host)) {
    throw new RangeError(`Invalid endpoint host: ${host}`);
  }

  const bracketedIpv6 = host.startsWith("[") && host.endsWith("]");
  if (host.includes(":") && !bracketedIpv6) {
    throw new RangeError(`Invalid endpoint host: ${host}`);
  }

  let hostUrl: URL;

  try {
    hostUrl = new URL(`https://${host}`);
  } catch {
    throw new RangeError(`Invalid endpoint host: ${host}`);
  }

  if (
    hostUrl.username ||
    hostUrl.password ||
    hostUrl.port ||
    hostUrl.pathname !== "/" ||
    hostUrl.search ||
    hostUrl.hash
  ) {
    throw new RangeError(`Invalid endpoint host: ${host}`);
  }

  return new URL(`https://${hostUrl.hostname}:${port}`);
}
