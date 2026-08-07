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
