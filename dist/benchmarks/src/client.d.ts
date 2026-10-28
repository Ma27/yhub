export class RawClient {
    /**
     * @param {object} opts
     * @param {number} opts.port
     * @param {string} opts.docid
     * @param {string} [opts.org]
     * @param {string} [opts.branch]
     * @param {boolean} [opts.gc]
     */
    constructor({ port, docid, org, branch, gc }: {
        port: number;
        docid: string;
        org?: string | undefined;
        branch?: string | undefined;
        gc?: boolean | undefined;
    });
    url: string;
    docid: string;
    /** @type {WebSocket|null} */
    ws: WebSocket | null;
    /** connect -> syncStep2 received, ms */
    syncTimeMs: number;
    /** bytes of the syncStep2 payload */
    syncBytes: number;
    /** frames received after the initial sync */
    updatesReceived: number;
    bytesReceived: number;
    awarenessReceived: number;
    /** closed by the server for backpressure, or otherwise abnormally */
    dropped: boolean;
    /** @type {Array<{ needle: Buffer, resolve: (t: number) => void }>} */
    _watchers: Array<{
        needle: Buffer;
        resolve: (t: number) => void;
    }>;
    /**
     * Resolves once syncStep2 has arrived.
     * @return {Promise<RawClient>}
     */
    connect(): Promise<RawClient>;
    /**
     * @param {Buffer} data
     */
    _matchWatchers(data: Buffer): void;
    /**
     * Resolve when a frame containing `needle` arrives. The needle is a nonce
     * embedded in the writer's update, which survives the server's per-subscriber
     * re-merge, so this measures true edit-to-observer propagation.
     *
     * @param {Buffer} needle
     * @param {number} timeoutMs
     * @return {Promise<number>} arrival timestamp, or -1 on timeout
     */
    awaitNonce(needle: Buffer, timeoutMs?: number): Promise<number>;
    /**
     * @param {Uint8Array} frame a pre-encoded protocol frame
     */
    send(frame: Uint8Array): void;
    close(): void;
}
export function updateFrame(update: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
export function awarenessUpdate(clientId: number, clock: number, state: any): Uint8Array<ArrayBuffer>;
export function awarenessFrame(clientId: number, clock: number, state: any): Uint8Array<ArrayBuffer>;
export namespace awarenessStates {
    namespace small {
        namespace cursor {
            let row: number;
            let col: number;
        }
    }
    namespace large {
        export namespace user {
            let name: string;
            let color: string;
            let colorLight: string;
            let id: string;
        }
        export namespace cursor_1 {
            namespace anchor {
                let row_1: number;
                export { row_1 as row };
                let col_1: number;
                export { col_1 as col };
            }
            namespace head {
                let row_2: number;
                export { row_2 as row };
                let col_2: number;
                export { col_2 as col };
            }
        }
        export { cursor_1 as cursor };
        export namespace selection {
            let ranges: {
                startRow: number;
                startCol: number;
                endRow: number;
                endCol: number;
            }[];
            let activeSheet: string;
        }
        export let lastActive: number;
    }
}
export function connectClients({ count, target, ratePerSecond }: {
    count: number;
    target: (i: number) => {
        port: number;
        docid: string;
    };
    ratePerSecond?: number | undefined;
}): Promise<Array<RawClient>>;
export function closeClients(clients: Array<RawClient>): void;
export function measurePropagation({ writer, observers, count, intervalMs, timeoutMs }: {
    writer: RawClient;
    observers: Array<RawClient>;
    count: number;
    intervalMs?: number | undefined;
    timeoutMs?: number | undefined;
}): Promise<{
    samples: number[];
    lost: number;
}>;
import { WebSocket } from 'ws';
//# sourceMappingURL=client.d.ts.map