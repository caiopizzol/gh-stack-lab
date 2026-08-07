import { parsePort } from "./parse-port";

export function buildEndpoint(host: string, portValue: string): URL {
  const endpoint = new URL("https://localhost");
  endpoint.hostname = host;
  endpoint.port = String(parsePort(portValue));
  return endpoint;
}
