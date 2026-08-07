import { describe, expect, test } from "bun:test";
import { summarizeExecutions } from "./execution-report";

describe("summarizeExecutions", () => {
  test("returns a defined cache hit rate when there are no executions", () => {
    expect(summarizeExecutions([])).toEqual({
      total: 0,
      operations: 0,
      cacheHits: 0,
      cacheHitRate: 0,
    });
  });

  test("reports operation and cache totals", () => {
    expect(
      summarizeExecutions([
        { key: "request-1", source: "operation" },
        { key: "request-1", source: "cache" },
        { key: "request-2", source: "operation" },
        { key: "request-2", source: "cache" },
      ]),
    ).toEqual({
      total: 4,
      operations: 2,
      cacheHits: 2,
      cacheHitRate: 0.5,
    });
  });
});
