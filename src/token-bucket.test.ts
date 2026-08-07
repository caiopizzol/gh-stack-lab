/// <reference types="bun" />

import { expect, test } from "bun:test";

import { createBucket, refill } from "./token-bucket";

test("creates a full bucket for a valid window", () => {
  expect(createBucket(10, "60")).toEqual({ capacity: 10, tokens: 10 });
});

test("rejects a bucket with an invalid window", () => {
  expect(() => createBucket(10, "0")).toThrow(RangeError);
});

test("refills proportionally to the elapsed ratio", () => {
  expect(refill({ capacity: 10, tokens: 0 }, 0.5)).toEqual({
    capacity: 10,
    tokens: 5,
  });
});

test("never refills beyond capacity", () => {
  expect(refill({ capacity: 10, tokens: 9 }, 0.5)).toEqual({
    capacity: 10,
    tokens: 10,
  });
});
