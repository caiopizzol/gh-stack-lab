import { buildEndpoint } from "./endpoint";

export function summarizeEndpoint(host: string, portValue: string): string {
  const endpoint = buildEndpoint(host, portValue);
  return `Connect to ${endpoint.toString()}`;
}
