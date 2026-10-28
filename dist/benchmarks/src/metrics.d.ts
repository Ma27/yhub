export function readVmHWM(): number | null;
export function resetPeakRss(): boolean;
export function createS3Counters(): {
    gets: number;
    puts: number;
    deletes: number;
    getBytes: number;
    putBytes: number;
};
export function countS3Ops(plugin: any, counters: ReturnType<() => {
    gets: number;
    puts: number;
    deletes: number;
    getBytes: number;
    putBytes: number;
}>): any;
export function createChildMetrics({ intervalMs, queueDepth, s3 }: {
    intervalMs: number;
    queueDepth?: (() => number) | undefined;
    s3?: {
        gets: number;
        puts: number;
        deletes: number;
        getBytes: number;
        putBytes: number;
    } | undefined;
}): {
    mark(): void;
    collect(): {
        rssPeakMB: number;
        rssEndMB: number;
        heapUsedMB: number;
        externalMB: number;
        arrayBuffersMB: number;
        cpuMs: number;
        cpuUserMs: number;
        loopDelayP99Ms: number;
        loopDelayMaxMs: number;
        queueDepthMax: number;
        s3: {
            gets: number;
            puts: number;
            deletes: number;
            getBytes: number;
            putBytes: number;
        } | null;
    };
    stop(): void;
};
export function sumProcessMetrics(all: Array<ProcessMetrics>): {
    s3: {
        gets: number;
        puts: number;
        deletes: number;
        getBytes: number;
        putBytes: number;
    };
    rssPeakMB: number;
    rssEndMB: number;
    heapUsedMB: number;
    externalMB: number;
    arrayBuffersMB: number;
    cpuMs: number;
    cpuUserMs: number;
    loopDelayP99Ms: number;
    loopDelayMaxMs: number;
    queueDepthMax: number;
};
export type ProcessMetrics = ReturnType<ReturnType<({ intervalMs, queueDepth, s3 }: {
    intervalMs: number;
    queueDepth?: (() => number) | undefined;
    s3?: {
        gets: number;
        puts: number;
        deletes: number;
        getBytes: number;
        putBytes: number;
    } | undefined;
}) => {
    mark(): void;
    collect(): {
        rssPeakMB: number;
        rssEndMB: number;
        heapUsedMB: number;
        externalMB: number;
        arrayBuffersMB: number;
        cpuMs: number;
        cpuUserMs: number;
        loopDelayP99Ms: number;
        loopDelayMaxMs: number;
        queueDepthMax: number;
        s3: {
            gets: number;
            puts: number;
            deletes: number;
            getBytes: number;
            putBytes: number;
        } | null;
    };
    stop(): void;
}>["collect"]>;
//# sourceMappingURL=metrics.d.ts.map