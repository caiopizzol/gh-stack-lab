import { expect, test } from "bun:test";

import { executeWithRetries } from "./retry-executor";

test("returns immediately after the first successful attempt", async () => {
  let calls = 0;
  const waits: number[] = [];

  const result = await executeWithRetries(
    async () => {
      calls += 1;
      return "ok";
    },
    [100],
    async (delay) => {
      waits.push(delay);
    },
  );

  expect(result).toBe("ok");
  expect(calls).toBe(1);
  expect(waits).toEqual([]);
});

test("waits before retrying a transient failure", async () => {
  let calls = 0;
  const events: string[] = [];

  const result = await executeWithRetries(
    async () => {
      calls += 1;
      events.push(`attempt:${calls}`);
      if (calls === 1) throw new Error("transient");
      return "ok";
    },
    [250],
    async (delay) => {
      events.push(`wait:${delay}`);
    },
  );

  expect(result).toBe("ok");
  expect(calls).toBe(2);
  expect(events).toEqual(["attempt:1", "wait:250", "attempt:2"]);
});

test("rethrows the last error after exhausting every retry", async () => {
  const errors = [new Error("first"), new Error("second"), new Error("last")];
  let calls = 0;
  const waits: number[] = [];

  const execution = executeWithRetries(
    async () => {
      const error = errors[calls]!;
      calls += 1;
      throw error;
    },
    [100, 200],
    async (delay) => {
      waits.push(delay);
    },
  );

  await expect(execution).rejects.toBe(errors[2]);
  expect(calls).toBe(3);
  expect(waits).toEqual([100, 200]);
});

test("makes one attempt when there are no retry delays", async () => {
  const error = new Error("failed");
  let calls = 0;
  const waits: number[] = [];

  const execution = executeWithRetries(
    async () => {
      calls += 1;
      throw error;
    },
    [],
    async (delay) => {
      waits.push(delay);
    },
  );

  await expect(execution).rejects.toBe(error);
  expect(calls).toBe(1);
  expect(waits).toEqual([]);
});
