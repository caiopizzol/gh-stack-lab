/// <reference types="bun" />

import { expect, test } from "bun:test";

import { parsePort } from "./parse-port";

test("parses a valid TCP port", () => {
  expect(parsePort("443")).toBe(443);
});

test("rejects values outside the TCP port range", () => {
  expect(() => parsePort("0")).toThrow(RangeError);
  expect(() => parsePort("65536")).toThrow(RangeError);
});

test("rejects non-numeric values", () => {
  expect(() => parsePort("https")).toThrow(RangeError);
});

test("rejects values with a partially numeric prefix", () => {
  expect(() => parsePort("443https")).toThrow(RangeError);
  expect(() => parsePort("80.5")).toThrow(RangeError);
  expect(() => parsePort("1e2")).toThrow(RangeError);
});
