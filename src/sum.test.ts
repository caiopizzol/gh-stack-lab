/// <reference types="bun" />

import { expect, test } from "bun:test";

import { sum } from "./sum";

test("adds two numbers", () => {
  expect(sum(20, 22)).toBe(42);
});
