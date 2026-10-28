export function traceAvailable(): boolean;
export function loadTrace(): Trace | null;
export function splitTrace(): {
    trace: Trace;
    baseline: TraceStep;
    edits: TraceStep[];
} | null;
/**
 * Loader for a supplied editing trace.
 *
 * The format is documented in `TRACE-FORMAT.md`: a single lib0 `writeAny` value
 * holding the document's full history as an ordered list of Yjs v1 updates,
 * each tagged with when it happened, who made it, and whether it inserted or
 * deleted. Update 0 is the server-side import that carries essentially the whole
 * document; the rest are individual human edits.
 *
 * The trace is customer data and is gitignored. Everything here returns `null`
 * when the file is absent, and Y7 skips itself — the rest of the suite is
 * unaffected either way.
 */
export type TraceStep = {
    update: Uint8Array<ArrayBuffer>;
    time: number;
    user: string;
    kind: string;
    ranges: number;
};
/**
 * Loader for a supplied editing trace.
 *
 * The format is documented in `TRACE-FORMAT.md`: a single lib0 `writeAny` value
 * holding the document's full history as an ordered list of Yjs v1 updates,
 * each tagged with when it happened, who made it, and whether it inserted or
 * deleted. Update 0 is the server-side import that carries essentially the whole
 * document; the rest are individual human edits.
 *
 * The trace is customer data and is gitignored. Everything here returns `null`
 * when the file is absent, and Y7 skips itself — the rest of the suite is
 * unaffected either way.
 */
export type Trace = {
    type: string;
    updateFormat: string;
    gc: boolean;
    source: any;
    users: Array<string>;
    totalBytes: number;
    updates: Array<TraceStep>;
};
//# sourceMappingURL=trace.d.ts.map