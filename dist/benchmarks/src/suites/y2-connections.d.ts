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
//# sourceMappingURL=y2-connections.d.ts.map