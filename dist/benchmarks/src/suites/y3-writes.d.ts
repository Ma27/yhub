export function propagationRow({ samples, lost }: {
    samples: Array<number>;
    lost: number;
}): {
    'propagation p50 (ms)': string;
    'propagation p95 (ms)': string;
    'propagation p99 (ms)': string;
    'propagation max (ms)': string;
    'not delivered': number;
} | {
    'propagation p50 (ms)': number;
    'propagation p95 (ms)': number;
    'propagation p99 (ms)': number;
    'propagation max (ms)': number;
    'not delivered': number;
};
declare namespace _default {
    let id: string;
    let title: string;
    let benchmarks: {
        id: string;
        name: string;
        /** @param {{ report: import('../report.js').Reporter }} ctx */
        run: ({ report }: {
            report: import("../report.js").Reporter;
        }) => Promise<void>;
    }[];
}
export default _default;
//# sourceMappingURL=y3-writes.d.ts.map