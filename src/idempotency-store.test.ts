import { describe, expect, spyOn, test } from "bun:test";
import { IdempotencyStore } from "./idempotency-store";

describe("IdempotencyStore", () => {
  test("keeps the first result for a live key", () => {
    const store = new IdempotencyStore<string>(1_000, () => 100);

    expect(store.remember("request-1", "first")).toBe("first");
    expect(store.remember("request-1", "second")).toBe("first");
    expect(store.get("request-1")).toBe("first");
  });

  test("allows a new result after expiry", () => {
    let now = 100;
    const store = new IdempotencyStore<string>(10, () => now);

    store.remember("request-1", "first");
    now = 111;

    expect(store.get("request-1")).toBeUndefined();
    expect(store.remember("request-1", "second")).toBe("second");
  });

  test("treats the exact expiry boundary as expired", () => {
    let now = 100;
    const store = new IdempotencyStore<string>(10, () => now);

    store.remember("request-1", "first");
    now = 110;

    expect(store.get("request-1")).toBeUndefined();
    expect(store.remember("request-1", "second")).toBe("second");
  });

  test("deletes an expired record by its normalized key", () => {
    let now = 100;
    const store = new IdempotencyStore<string>(10, () => now);
    const deleteSpy = spyOn(Map.prototype, "delete");

    try {
      store.remember(" Request-1 ", "first");
      now = 111;
      store.get(" Request-1 ");

      expect(deleteSpy).toHaveBeenCalledWith("Request-1");
    } finally {
      deleteSpy.mockRestore();
    }
  });
});
