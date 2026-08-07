/// <reference types="bun" />

import { expect, test } from "bun:test";

import { runWithRetries } from "./retry-runner";

test("waits according to the retry plan before succeeding", async () => {
  const waits: number[] = [];
  let attempts = 0;

  const result = await runWithRetries(
    async () => {
      attempts += 1;
      if (attempts < 3) throw new Error("transient");
      return "ok";
    },
    [100, 200],
    async (delay) => {
      waits.push(delay);
    },
  );

  expect(result).toBe("ok");
  expect(waits).toEqual([100, 200]);
});
