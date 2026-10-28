export function runY11(): {
    [k: string]: string | number;
}[];
export function runY14(): {
    [k: string]: string | number;
}[];
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
//# sourceMappingURL=y1-primitives.d.ts.map