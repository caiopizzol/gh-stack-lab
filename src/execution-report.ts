export interface ExecutionEvent {
  readonly key: string;
  readonly source: "operation" | "cache";
}

export interface ExecutionReport {
  readonly total: number;
  readonly operations: number;
  readonly cacheHits: number;
  readonly cacheHitRate: number;
}

export function summarizeExecutions(events: readonly ExecutionEvent[]): ExecutionReport {
  const cacheHits = events.filter((event) => event.source === "cache").length;
  const operations = events.length - cacheHits;

  return {
    total: events.length,
    operations,
    cacheHits,
    cacheHitRate: cacheHits / events.length,
  };
}
