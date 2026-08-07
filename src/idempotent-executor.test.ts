import { describe, expect, test } from "bun:test";
import { IdempotentExecutor } from "./idempotent-executor";
import { IdempotencyStore } from "./idempotency-store";

describe("IdempotentExecutor", () => {
  test("coalesces concurrent work for the same key", async () => {
    const store = new IdempotencyStore<string>(1_000);
    const executor = new IdempotentExecutor(store);
    let calls = 0;
    const operation = async () => {
      calls += 1;
      await Promise.resolve();
      return "created";
    };

    const [first, second] = await Promise.all([
      executor.execute("request-1", operation),
      executor.execute("request-1", operation),
    ]);

    expect(first).toBe("created");
    expect(second).toBe("created");
    expect(calls).toBe(1);
  });

  test("returns a completed result without running again", async () => {
    const store = new IdempotencyStore<string>(1_000);
    const executor = new IdempotentExecutor(store);

    await executor.execute("request-1", async () => "created");
    const cached = await executor.execute("request-1", async () => "replaced");

    expect(cached).toBe("created");
  });

  test("retries after an operation fails", async () => {
    const store = new IdempotencyStore<string>(1_000);
    const executor = new IdempotentExecutor(store);
    let calls = 0;

    await expect(
      executor.execute("request-1", async () => {
        calls += 1;
        throw new Error("temporary failure");
      }),
    ).rejects.toThrow("temporary failure");

    const result = await executor.execute("request-1", async () => {
      calls += 1;
      return "created";
    });

    expect(result).toBe("created");
    expect(calls).toBe(2);
  });

  test("caches a completed undefined result", async () => {
    const store = new IdempotencyStore<void>(1_000);
    const executor = new IdempotentExecutor(store);
    let calls = 0;
    const operation = async () => {
      calls += 1;
    };

    await executor.execute("request-1", operation);
    await executor.execute("request-1", operation);

    expect(calls).toBe(1);
  });
});
