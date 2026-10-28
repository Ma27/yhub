export function stats(samples: Array<number>): {
    p50: number;
    p95: number;
    p99: number;
    max: number;
    mean: number;
    n: number;
};
export function median(samples: Array<number>): number;
export function fmtNumber(n: number): string;
export function renderTable(rows: Array<Row>): string;
export function freeDiskGiB(): number | null;
export function machineInfo(): {
    date: string;
    freeDisk: string;
    commit: string;
    yhub: string;
    node: string;
    platform: string;
    cpu: string;
    memory: string;
};
export class Reporter {
    /**
     * @param {typeof import('./config.js').config} config
     */
    constructor(config: typeof import("./config.js").config);
    config: {
        dbs: {
            redis: string;
            postgres: string;
            redisPrefix: string;
            s3: {
                bucket: string;
                endPoint: string;
                port: number;
                useSSL: boolean;
                accessKey: string;
                secretKey: string;
            };
        };
        hub: {
            taskDebounce: number;
            minMessageLifetime: number;
            cacheTtl: number;
            taskConcurrency: number;
            computePoolSize: number;
            basePort: number;
            servers: number;
            workers: number;
            org: string;
        };
        scale: {
            connections: number[];
            joinStormMax: number;
            rampMax: number;
            docSizes: number[];
            primitiveDocSizes: number[];
            pendingUpdates: number[];
            observers: number[];
            joinRates: number[];
            batchCells: number[];
            singleEdits: number;
            writers: number[];
            writeRate: number;
            awarenessRate: number;
            growthTarget: number;
            growthChunk: number;
            taskDebounces: number[];
            taskConcurrencies: number[];
            holdMs: number;
            scenario: {
                users: number;
                docSize: number;
                docCounts: number[];
                editRounds: number;
                cellsPerEdit: number;
                agents: number;
            };
        };
        fixtures: {
            seed: number;
            cellChars: number;
            cols: number;
            churnFactor: number;
            rowChurnRatio: number;
            churnTarget: number;
        };
        trace: {
            file: string;
            users: number[];
            joinRateAbove: number;
            joinRate: number;
            writers: number[];
            replays: number;
        };
        run: {
            suites: string[];
            warmupRuns: number;
            runs: number;
            sampleIntervalMs: number;
            outFile: string;
            useYNative: boolean;
            benchmarkTimeoutMs: number;
        };
    };
    /**
     * Insertion-ordered benchmark results.
     * @type {Array<{ suite: string, suiteTitle: string, id: string, name: string, note: string|null, warning: string|null, rows: Array<Row> }>}
     */
    results: Array<{
        suite: string;
        suiteTitle: string;
        id: string;
        name: string;
        note: string | null;
        warning: string | null;
        rows: Array<Row>;
    }>;
    /** @type {{ suite: string, suiteTitle: string, id: string, name: string, note: string|null, warning: string|null, rows: Array<Row> }|null} */
    current: {
        suite: string;
        suiteTitle: string;
        id: string;
        name: string;
        note: string | null;
        warning: string | null;
        rows: Array<Row>;
    } | null;
    machine: {
        date: string;
        freeDisk: string;
        commit: string;
        yhub: string;
        node: string;
        platform: string;
        cpu: string;
        memory: string;
    };
    /**
     * @param {{ suite: string, suiteTitle: string, id: string, name: string }} bench
     */
    begin(bench: {
        suite: string;
        suiteTitle: string;
        id: string;
        name: string;
    }): {
        /** @param {Row} row */
        row: (row: Row) => void;
        /** @param {string} text */
        note: (text: string) => void;
        /** @param {string} text */
        warn: (text: string) => void;
        close: () => void;
    };
    /**
     * Record and immediately print one row, so a long run stays watchable.
     * @param {Row} row
     */
    row(row: Row): void;
    /**
     * Attach a one-line remark shown under the benchmark's table.
     * @param {string} text
     */
    note(text: string): void;
    /**
     * @param {string} id
     */
    rowsOf(id: string): Row[];
    /**
     * @param {string} outPath
     * @param {string} derivedSection
     */
    write(outPath: string, derivedSection: string): void;
}
/**
 * Collects benchmark rows, prints them as they arrive, and renders RESULTS.md.
 *
 * A row is a flat object of column name -> number|string. Columns carry their
 * unit in the name (`time (ms)`, `serverMem (MB)`), so no formatting metadata
 * has to travel with the value and the rendered table documents itself.
 */
export type Row = {
    [key: string]: number | string;
};
//# sourceMappingURL=report.d.ts.map