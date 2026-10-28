export function timeIt(fn: () => any, { runs, warmup }?: {
    runs?: number;
    warmup?: number;
}): number;
export function timeItAsync(fn: () => Promise<any>, { runs, warmup }?: {
    runs?: number;
    warmup?: number;
}): Promise<number>;
export function measureRetainedHeap<T>(fn: () => T): {
    result: T;
    heapMB: number;
    externalMB: number;
    totalMB: number;
};
//# sourceMappingURL=measure.d.ts.map