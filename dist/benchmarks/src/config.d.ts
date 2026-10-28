export namespace config {
    namespace dbs {
        let redis: string;
        let postgres: string;
        let redisPrefix: string;
        namespace s3 {
            let bucket: string;
            let endPoint: string;
            let port: number;
            let useSSL: boolean;
            let accessKey: string;
            let secretKey: string;
        }
    }
    namespace hub {
        let taskDebounce: number;
        let minMessageLifetime: number;
        let cacheTtl: number;
        let taskConcurrency: number;
        let computePoolSize: number;
        let basePort: number;
        let servers: number;
        let workers: number;
        let org: string;
    }
    namespace scale {
        let connections: number[];
        let joinStormMax: number;
        let rampMax: number;
        let docSizes: number[];
        let primitiveDocSizes: number[];
        let pendingUpdates: number[];
        let observers: number[];
        let joinRates: number[];
        let batchCells: number[];
        let singleEdits: number;
        let writers: number[];
        let writeRate: number;
        let awarenessRate: number;
        let growthTarget: number;
        let growthChunk: number;
        let taskDebounces: number[];
        let taskConcurrencies: number[];
        let holdMs: number;
        namespace scenario {
            let users: number;
            let docSize: number;
            let docCounts: number[];
            let editRounds: number;
            let cellsPerEdit: number;
            let agents: number;
        }
    }
    namespace fixtures {
        let seed: number;
        let cellChars: number;
        let cols: number;
        let churnFactor: number;
        let rowChurnRatio: number;
        let churnTarget: number;
    }
    namespace trace {
        export let file: string;
        let users_1: number[];
        export { users_1 as users };
        export let joinRateAbove: number;
        export let joinRate: number;
        let writers_1: number[];
        export { writers_1 as writers };
        export let replays: number;
    }
    namespace run {
        let suites: string[];
        let warmupRuns: number;
        let runs: number;
        let sampleIntervalMs: number;
        let outFile: string;
        let useYNative: boolean;
        let benchmarkTimeoutMs: number;
    }
}
export default config;
//# sourceMappingURL=config.d.ts.map