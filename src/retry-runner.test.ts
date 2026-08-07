/// <reference types="bun" />

import { expect, jest, test } from "bun:test";

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

test("uses real timers by default", async () => {
  jest.useFakeTimers();

  try {
    let attempts = 0;
    const result = runWithRetries(
      async () => {
        attempts += 1;
        if (attempts === 1) throw new Error("transient");
        return "ok";
      },
      [100],
    );

    await Promise.resolve();
    jest.advanceTimersByTime(99);
    expect(attempts).toBe(1);

    jest.advanceTimersByTime(1);
    await expect(result).resolves.toBe("ok");
    expect(attempts).toBe(2);
  } finally {
    jest.useRealTimers();
  }
});
