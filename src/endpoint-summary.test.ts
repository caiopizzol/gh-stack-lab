/// <reference types="bun" />

import { expect, test } from "bun:test";

import { summarizeEndpoint } from "./endpoint-summary";

test("summarizes a validated endpoint", () => {
  expect(summarizeEndpoint("api.example.com", "8443")).toBe(
    "Connect to https://api.example.com:8443/",
  );
});
