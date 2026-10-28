export function isComputeQueueFull(err: any): boolean;
export function createComputePool(opts?: import("./types.js").YHubConfig["computePool"]): ComputePool;
export type ComputeTask = s.Unwrap<s.Schema<{
    prune?: Uint8Array<ArrayBuffer> | undefined;
    type: "mergeUpdates";
    gc: boolean;
    updates: Uint8Array<ArrayBuffer>[];
} | {
    from?: number | undefined;
    to?: number | undefined;
    by?: string | undefined;
    contentIds?: Uint8Array<ArrayBuffer> | undefined;
    withCustomAttributions?: {
        k: string;
        v: string;
    }[] | null | undefined;
    type: "computePruneSet";
    contentmapBin: Uint8Array<ArrayBuffer>;
} | {
    type: "computeStateVector";
    update: Uint8Array<ArrayBuffer>;
} | {
    type: "changeset";
    nongcDoc: Uint8Array<ArrayBuffer>;
    contentmapBin: Uint8Array<ArrayBuffer>;
    from: number | null;
    to: number | null;
    by: string;
    withCustomAttributions: {
        k: string;
        v: string;
    }[] | null;
    includeYdoc: boolean;
    includeDelta: boolean;
    includeDiff: boolean;
    includeAttributions: boolean;
    t: number;
} | {
    contentIds?: Uint8Array<ArrayBuffer> | undefined;
    versions?: {
        type: "version:v1";
        t: number;
        name: string;
        createdAt: number;
        updatedAt: number;
        createdBy: string | null;
        updatedBy: string | null;
        custom: any;
        published: boolean;
        publishedAt: number | null;
        publishedBy: string | null;
    }[] | undefined;
    type: "activity";
    nongcDoc: Uint8Array<ArrayBuffer>;
    contentmapBin: Uint8Array<ArrayBuffer>;
    from: number;
    to: number;
    by: string;
    withCustomAttributions: {
        k: string;
        v: string;
    }[] | null;
    includeCustomAttributions: boolean;
    includeDelta: boolean;
    includeYdoc: boolean;
    includeAttributions: boolean;
    limit: number;
    reverse: boolean;
    group: boolean;
    groupByUser: boolean;
    groupMaxGap: number;
    groupMaxDuration: number;
    groupExclude: string[];
} | {
    from?: number | undefined;
    to?: number | undefined;
    by?: string | undefined;
    contentIds?: Uint8Array<ArrayBuffer> | undefined;
    withCustomAttributions?: {
        k: string;
        v: string;
    }[] | null | undefined;
    type: "rollback";
    nongcDoc: Uint8Array<ArrayBuffer>;
    contentmapBin: Uint8Array<ArrayBuffer>;
    userid: string;
    customAttributions: {
        k: string;
        v: string;
    }[];
}>>;
export type QueuedTask = {
    task: ComputeTask;
    transferList: ArrayBuffer[];
    logContext: {
        [x: string]: any;
    };
    resolve: (value: any) => void;
    reject: (reason: any) => void;
    queueTimeout: NodeJS.Timeout | null;
};
declare class ComputePool {
    /**
     * @param {number} maxThreads
     * @param {number} maxQueue tasks that may wait for a thread; `run` rejects any further task
     * @param {number} taskTimeout ms after which a running task's worker thread is killed, and a queued task is rejected
     * @param {import('node:worker_threads').ResourceLimits} [resourceLimits] of each worker thread
     */
    constructor(maxThreads: number, maxQueue: number, taskTimeout: number, resourceLimits?: import("node:worker_threads").ResourceLimits);
    maxThreads: number;
    maxQueue: number;
    taskTimeout: number;
    resourceLimits: import("worker_threads").ResourceLimits | undefined;
    /**
     * @type {Array<ComputeWorker>}
     */
    workers: Array<ComputeWorker>;
    /**
     * @type {Array<QueuedTask>}
     */
    queue: Array<QueuedTask>;
    isDestroyed: boolean;
    /**
     * @returns {{ queued: number, busy: number, workers: number }} tasks waiting for a thread,
     * threads computing a task, and live threads
     */
    stats(): {
        queued: number;
        busy: number;
        workers: number;
    };
    /**
     * @param {ComputeTask} task
     * @param {Array<ArrayBuffer>} transferList
     * @param {Object<string, any>} logContext
     * @returns {Promise<any>}
     */
    run(task: ComputeTask, transferList: Array<ArrayBuffer>, logContext: {
        [x: string]: any;
    }): Promise<any>;
    /**
     * Merges updates synchronously if there are 0-1 updates or the total size
     * is <= 5kb. Otherwise offloads to a worker thread. When `gc` is `true`,
     * deleted content is garbage-collected.
     *
     * When `prune` (a serialized `IdSet`) is given, that content is
     * garbage-collected after merging (used to prune churned history).
     *
     * @param {boolean} gc
     * @param {Array<Uint8Array<ArrayBuffer>>} updates
     * @param {Object<string, any>} logContext
     * @param {Uint8Array<ArrayBuffer>} [prune]
     * @returns {Promise<Uint8Array<ArrayBuffer>>}
     */
    mergeUpdates(gc: boolean, updates: Array<Uint8Array<ArrayBuffer>>, logContext?: {
        [x: string]: any;
    }, prune?: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * Computes the prune set for a time/author/content range: the IDs that were
     * both inserted and deleted within the filtered range (`intersectSets` of the
     * in-range insertions and deletions). Returns the serialized `IdSet`, or
     * `null` if nothing matches.
     *
     * @param {object} opts
     * @param {Uint8Array<ArrayBuffer>} opts.contentmapBin
     * @param {number} [opts.from]
     * @param {number} [opts.to]
     * @param {string} [opts.by]
     * @param {Uint8Array<ArrayBuffer>} [opts.contentIds]
     * @param {Array<{k: string, v: string}>|null} [opts.withCustomAttributions]
     * @param {Object<string, any>} [logContext]
     * @returns {Promise<Uint8Array<ArrayBuffer>|null>}
     */
    computePruneSet(opts: {
        contentmapBin: Uint8Array<ArrayBuffer>;
        from?: number | undefined;
        to?: number | undefined;
        by?: string | undefined;
        contentIds?: Uint8Array<ArrayBuffer> | undefined;
        withCustomAttributions?: {
            k: string;
            v: string;
        }[] | null | undefined;
    }, logContext?: {
        [x: string]: any;
    }): Promise<Uint8Array<ArrayBuffer> | null>;
    /**
     * Computes the state vector from an encoded update.
     *
     * `encodeStateVectorFromUpdate` is a full linear scan of the update binary
     * (measured at ~30-40 MB/s), so it runs synchronously for updates < 512kb
     * (under ~15ms). Larger updates are offloaded to a worker. The buffer can't
     * be transferred (the caller reuses it for syncStep2), so the main thread
     * still pays a structured-clone copy on postMessage — but that copy is
     * ~32x cheaper than the scan (e.g. ~0.8ms vs ~25ms for a 1mb update).
     *
     * @param {Uint8Array<ArrayBuffer>} update
     * @param {Object<string, any>} logContext
     * @returns {Promise<Uint8Array<ArrayBuffer>>}
     */
    computeStateVector(update: Uint8Array<ArrayBuffer>, logContext?: {
        [x: string]: any;
    }): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * @param {object} opts
     * @param {Uint8Array<ArrayBuffer>} opts.nongcDoc
     * @param {Uint8Array<ArrayBuffer>} opts.contentmapBin
     * @param {number|null} opts.from
     * @param {number|null} opts.to
     * @param {string} opts.by
     * @param {Array<{k: string, v: string}>|null} opts.withCustomAttributions
     * @param {boolean} opts.includeYdoc
     * @param {boolean} opts.includeDelta
     * @param {boolean} opts.includeDiff
     * @param {boolean} opts.includeAttributions
     * @param {number} opts.t
     * @param {Object<string, any>} [logContext]
     * @returns {Promise<Uint8Array<ArrayBuffer>>}
     */
    changeset(opts: {
        nongcDoc: Uint8Array<ArrayBuffer>;
        contentmapBin: Uint8Array<ArrayBuffer>;
        from: number | null;
        to: number | null;
        by: string;
        withCustomAttributions: Array<{
            k: string;
            v: string;
        }> | null;
        includeYdoc: boolean;
        includeDelta: boolean;
        includeDiff: boolean;
        includeAttributions: boolean;
        t: number;
    }, logContext?: {
        [x: string]: any;
    }): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * @param {object} opts
     * @param {Uint8Array<ArrayBuffer>} opts.nongcDoc
     * @param {Uint8Array<ArrayBuffer>} opts.contentmapBin
     * @param {number} opts.from
     * @param {number} opts.to
     * @param {string} opts.by
     * @param {Uint8Array<ArrayBuffer>} [opts.contentIds]
     * @param {Array<{k: string, v: string}>|null} opts.withCustomAttributions
     * @param {boolean} opts.includeCustomAttributions
     * @param {boolean} opts.includeDelta
     * @param {boolean} opts.includeYdoc
     * @param {boolean} opts.includeAttributions
     * @param {number} opts.limit
     * @param {boolean} opts.reverse
     * @param {boolean} opts.group
     * @param {boolean} opts.groupByUser
     * @param {number} opts.groupMaxGap
     * @param {number} opts.groupMaxDuration
     * @param {Array<string>} opts.groupExclude
     * @param {Array<import('./types.js').Version>} [opts.versions] named versions in [from, to], sorted by `t` (default: none)
     * @param {Object<string, any>} [logContext]
     * @returns {Promise<Uint8Array<ArrayBuffer>>}
     */
    activity(opts: {
        nongcDoc: Uint8Array<ArrayBuffer>;
        contentmapBin: Uint8Array<ArrayBuffer>;
        from: number;
        to: number;
        by: string;
        contentIds?: Uint8Array<ArrayBuffer> | undefined;
        withCustomAttributions: Array<{
            k: string;
            v: string;
        }> | null;
        includeCustomAttributions: boolean;
        includeDelta: boolean;
        includeYdoc: boolean;
        includeAttributions: boolean;
        limit: number;
        reverse: boolean;
        group: boolean;
        groupByUser: boolean;
        groupMaxGap: number;
        groupMaxDuration: number;
        groupExclude: Array<string>;
        versions?: {
            type: "version:v1";
            t: number;
            name: string;
            createdAt: number;
            updatedAt: number;
            createdBy: string | null;
            updatedBy: string | null;
            custom: any;
            published: boolean;
            publishedAt: number | null;
            publishedBy: string | null;
        }[] | undefined;
    }, logContext?: {
        [x: string]: any;
    }): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * @param {object} opts
     * @param {Uint8Array<ArrayBuffer>} opts.nongcDoc
     * @param {Uint8Array<ArrayBuffer>} opts.contentmapBin
     * @param {number} [opts.from]
     * @param {number} [opts.to]
     * @param {string} [opts.by]
     * @param {Uint8Array<ArrayBuffer>} [opts.contentIds]
     * @param {Array<{k: string, v: string}>|null} [opts.withCustomAttributions]
     * @param {string} opts.userid
     * @param {Array<{k: string, v: string}>} opts.customAttributions
     * @param {Object<string, any>} [logContext]
     * @returns {Promise<{ update: Uint8Array<ArrayBuffer>, contentmap: Uint8Array<ArrayBuffer> }>}
     */
    rollback(opts: {
        nongcDoc: Uint8Array<ArrayBuffer>;
        contentmapBin: Uint8Array<ArrayBuffer>;
        from?: number | undefined;
        to?: number | undefined;
        by?: string | undefined;
        contentIds?: Uint8Array<ArrayBuffer> | undefined;
        withCustomAttributions?: {
            k: string;
            v: string;
        }[] | null | undefined;
        userid: string;
        customAttributions: Array<{
            k: string;
            v: string;
        }>;
    }, logContext?: {
        [x: string]: any;
    }): Promise<{
        update: Uint8Array<ArrayBuffer>;
        contentmap: Uint8Array<ArrayBuffer>;
    }>;
    /**
     * Terminate the worker threads. Running and queued tasks are rejected, and so is every task
     * submitted afterwards.
     */
    destroy(): Promise<void>;
}
import * as s from 'lib0/schema';
declare class ComputeWorker {
    /**
     * @param {ComputePool} pool
     */
    constructor(pool: ComputePool);
    pool: ComputePool;
    worker: Worker;
    isComputing: boolean;
    isDead: boolean;
    /**
     * @type {((value: any) => void) | null}
     */
    _cbResolve: ((value: any) => void) | null;
    /**
     * @type {((reason: any) => void) | null}
     */
    _cbReject: ((reason: any) => void) | null;
    /**
     * @type {Object<string, any>?}
     */
    _logContext: {
        [x: string]: any;
    } | null;
    /**
     * @type {NodeJS.Timeout?}
     */
    _taskTimeout: NodeJS.Timeout | null;
    /**
     * @param {ComputeTask} task
     * @param {Array<ArrayBuffer>} transferList
     * @param {Object<string, any>} logContext
     * @param {(value: any) => void} resolve
     * @param {(reason: any) => void} reject
     */
    run(task: ComputeTask, transferList: Array<ArrayBuffer>, logContext: {
        [x: string]: any;
    }, resolve: (value: any) => void, reject: (reason: any) => void): void;
    terminate(): Promise<number>;
}
import { Worker } from 'node:worker_threads';
export {};
//# sourceMappingURL=compute.d.ts.map