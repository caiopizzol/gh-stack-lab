/// <reference types="bun" />

import { expect, test } from "bun:test";

import { buildEndpoint } from "./endpoint";

test("builds an HTTPS endpoint from a host and port", () => {
  expect(buildEndpoint("api.example.com", "8443").toString()).toBe(
    "https://api.example.com:8443/",
  );
});

test("rejects invalid endpoint hosts", () => {
  expect(() => buildEndpoint("bad host", "8443")).toThrow(RangeError);
  expect(() => buildEndpoint("", "8443")).toThrow(RangeError);
  expect(() => buildEndpoint("api.example.com:9000", "8443")).toThrow(RangeError);
});

test("canonicalizes internationalized endpoint hosts", () => {
  expect(buildEndpoint("bücher.de", "8443").toString()).toBe(
    "https://xn--bcher-kva.de:8443/",
  );
});

test("rejects host controls that URL parsing would discard", () => {
  expect(() => buildEndpoint("api.exa\tmple.com", "8443")).toThrow(RangeError);
  expect(() => buildEndpoint("api.example.com\n", "8443")).toThrow(RangeError);
});
