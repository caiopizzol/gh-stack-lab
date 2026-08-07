/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildEndpoint } from "./endpoint";

test("builds an HTTPS endpoint from a host and port", () => {
  expect(buildEndpoint("api.example.com", "8443").toString()).toBe(
    "https://api.example.com:8443/",
  );
});
