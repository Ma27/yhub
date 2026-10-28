export { logger } from "./logger.js";
/**
 * @template {t.YHubConfig} [Conf=t.YHubConfig]
 */
export class YHub<Conf extends t.YHubConfig = {
    postgres?: string | undefined;
    postgresOptions?: import("postgres").Options<{}> | undefined;
    computePool?: {
        maxThreads?: number | undefined;
        maxQueue?: number | undefined;
        taskTimeout?: number | undefined;
        resourceLimits?: {
            maxYoungGenerationSizeMb?: number | undefined;
            maxOldGenerationSizeMb?: number | undefined;
            codeRangeSizeMb?: number | undefined;
            stackSizeMb?: number | undefined;
        } | undefined;
    } | undefined;
    worker?: {
        taskTimeout?: number | undefined;
        events?: {
            docUpdate?: ((event: t.DocTable<{
                gc: true;
                nongc: true;
                contentmap: true;
                contentids: true;
            }> & {
                docRef: t.DocRef;
            }) => void) | undefined;
            taskStart?: ((event: {
                docRef: t.DocRef;
                timestamp: number;
            }) => void) | undefined;
            taskComplete?: ((event: {
                docRef: t.DocRef;
                duration: number;
                error: Error | null;
            }) => void) | undefined;
        } | undefined;
        taskConcurrency: number;
    } | null | undefined;
    server?: {
        api?: t.ApiEndpoint[] | undefined;
        apiPrefix?: string | undefined;
        maxDocSize?: number | undefined;
        wsKeepAliveInterval?: number | null | undefined;
        maxVersionSize?: number | undefined;
        authTimeout?: number | undefined;
        cors?: {
            credentials?: boolean | undefined;
            trustSameOrigin?: boolean | undefined;
            allowHeaders?: string[] | undefined;
            exposeHeaders?: string[] | undefined;
            maxAge?: number | undefined;
            origin: string | string[];
        } | null | undefined;
        port: number;
        auth: t.AuthPlugin<any>;
    } | null | undefined;
    redis: {
        taskDebounce?: number | undefined;
        minMessageLifetime?: number | undefined;
        cacheTtl?: number | undefined;
        clientOptions?: Omit<import("redis").RedisClientOptions<import("redis").RedisModules, import("redis").RedisFunctions, import("redis").RedisScripts, import("redis").RespVersions, import("redis").TypeMapping, import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions>, "url"> | undefined;
        socket?: import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions | undefined;
        url: string;
        prefix: string;
    };
    persistence: t.PersistencePlugin[];
}> {
    /**
     * @param {Conf} conf
     * @param {strm.Stream} str
     * @param {p.Persistence} pers
     */
    constructor(conf: Conf, str: strm.Stream, pers: p.Persistence);
    conf: Conf;
    stream: strm.Stream;
    persistence: p.Persistence;
    /**
     * @type {Conf['server'] extends null ? null : server.YHubServer}
     */
    server: Conf["server"] extends null ? null : server.YHubServer;
    computePool: {
        maxThreads: number;
        maxQueue: number;
        taskTimeout: number;
        resourceLimits: import("worker_threads").ResourceLimits | undefined;
        workers: Array<{
            pool: /*elided*/ any;
            worker: import("worker_threads").Worker;
            isComputing: boolean;
            isDead: boolean;
            _cbResolve: ((value: any) => void) | null;
            _cbReject: ((reason: any) => void) | null;
            _logContext: {
                [x: string]: any;
            } | null;
            _taskTimeout: NodeJS.Timeout | null;
            run(task: ComputeTask, transferList: Array<ArrayBuffer>, logContext: {
                [x: string]: any;
            }, resolve: (value: any) => void, reject: (reason: any) => void): void;
            terminate(): Promise<number>;
        }>;
        queue: Array<import("./compute.js").QueuedTask>;
        isDestroyed: boolean;
        stats(): {
            queued: number;
            busy: number;
            workers: number;
        };
        run(task: ComputeTask, transferList: Array<ArrayBuffer>, logContext: {
            [x: string]: any;
        }): Promise<any>;
        mergeUpdates(gc: boolean, updates: Array<Uint8Array<ArrayBuffer>>, logContext?: {
            [x: string]: any;
        }, prune?: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>>;
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
        computeStateVector(update: Uint8Array<ArrayBuffer>, logContext?: {
            [x: string]: any;
        }): Promise<Uint8Array<ArrayBuffer>>;
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
        destroy(): Promise<void>;
    };
    /**
     * `stopped` resolves once both worker loops of this context have exited. After a stop, the
     * leases of the running tasks are renewed until `drainUntil` (unix ms) - see `stopWorker`.
     *
     * @type {{ shouldRun: boolean, drainUntil: number, stopped: Promise<unknown> }}
     */
    _workerCtx: {
        shouldRun: boolean;
        drainUntil: number;
        stopped: Promise<unknown>;
    };
    /**
     * The tasks we are currently computing. Their lease is renewed until they are done, so they
     * are neither reclaimed by another worker nor handed back to us by `claimTasks`.
     *
     * @type {Map<string, { started: number, docRef: t.DocRef }>}
     */
    _inflight: Map<string, {
        started: number;
        docRef: t.DocRef;
    }>;
    /**
     * @type {Promise<void>|null}
     */
    _destroyed: Promise<void> | null;
    /**
     * Start claiming and computing compaction tasks. Resolves once the worker was stopped again.
     *
     * @return {Promise<unknown>}
     */
    startWorker(): Promise<unknown>;
    /**
     * @param {{ shouldRun: boolean }} ctx
     * @param {number} taskConcurrency
     */
    _claimTasks(ctx: {
        shouldRun: boolean;
    }, taskConcurrency: number): Promise<void>;
    /**
     * Keep the lease on the tasks we are computing alive. Runs next to the claim loop so that a
     * slow `claimTasks` or its error backoff can't starve renewals. After a stop, it keeps running
     * while tasks are left until `ctx.drainUntil`.
     *
     * @param {{ shouldRun: boolean, drainUntil: number }} ctx
     * @param {number} taskTimeout ms after which a running task is abandoned
     */
    _renewLeases(ctx: {
        shouldRun: boolean;
        drainUntil: number;
    }, taskTimeout: number): Promise<void>;
    /**
     * @param {t.Task & { redisClock: string }} task
     */
    _runTask(task: t.Task & {
        redisClock: string;
    }): Promise<void>;
    /**
     * Stop claiming tasks. The running tasks keep their lease for up to `drainMs`; resolves once
     * they finished or `drainMs` elapsed. A task still running then is no longer renewed - it goes
     * stale and is reclaimed by another worker after `redis.taskDebounce`.
     *
     * @param {object} [opts]
     * @param {number} [opts.drainMs] (default: 0)
     * @return {Promise<unknown>}
     */
    stopWorker({ drainMs }?: {
        drainMs?: number | undefined;
    }): Promise<unknown>;
    /**
     * Shut down, releasing everything this instance holds - once this resolves, nothing it opened
     * keeps the process alive. The worker stops claiming and waits up to `drainMs` for its running
     * tasks, renewing their leases meanwhile; concurrently the server stops accepting connections, closes every websocket with
     * `wsCloseDraining` (4503, transient: clients reconnect elsewhere) and waits up to `drainMs`
     * for the clients to acknowledge. Then the compute pool, the redis clients and the postgres
     * pool are closed. A task still running at that point fails and is reclaimed by another worker
     * after `redis.taskDebounce`.
     *
     * Idempotent: later calls return the promise of the first one.
     *
     * @param {object} [opts]
     * @param {number} [opts.drainMs] (default: 0)
     * @return {Promise<void>}
     */
    destroy({ drainMs }?: {
        drainMs?: number | undefined;
    }): Promise<void>;
    /**
     * @template {{ gc?: boolean, nongc?: boolean, contentmap?: boolean, references?: boolean, contentids?: boolean, awareness?: boolean }} Include
     * @param {t.DocRef} docRef
     * @param {Include} includeContent
     * @param {object} opts
     * @param {boolean} [opts.gcOnMerge] whether to gc when merging updates. (default: true)
     * @param {{ messages: Array<t.Message & { redisClock: string }>, lastClock: string }} [opts.cachedMessages] pre-fetched stream messages, to avoid pulling the redis stream again
     * @return {Promise<t.DocTable<Include>>}
     */
    getDoc<Include extends {
        gc?: boolean;
        nongc?: boolean;
        contentmap?: boolean;
        references?: boolean;
        contentids?: boolean;
        awareness?: boolean;
    }>(docRef: t.DocRef, includeContent: Include, { gcOnMerge, cachedMessages: prefetched }?: {
        gcOnMerge?: boolean | undefined;
        cachedMessages?: {
            messages: Array<t.Message & {
                redisClock: string;
            }>;
            lastClock: string;
        } | undefined;
    }): Promise<t.DocTable<Include>>;
    /**
     * Permanently prunes churned history: content that was both inserted and deleted within the
     * filtered range is garbage-collected and removed from the activity history. This is
     * irreversible. The prune is distributed as a directive on the redis stream and baked into
     * persistence the next time the document is compacted.
     *
     * @param {t.DocRef} docRef
     * @param {object} filters
     * @param {number} [filters.from]
     * @param {number} [filters.to]
     * @param {string} [filters.by]
     * @param {Uint8Array<ArrayBuffer>} [filters.contentIds]
     * @param {Array<{k: string, v: string}>|null} [filters.withCustomAttributions]
     * @returns {Promise<void>}
     */
    pruneDoc(docRef: t.DocRef, filters: {
        from?: number | undefined;
        to?: number | undefined;
        by?: string | undefined;
        contentIds?: Uint8Array<ArrayBuffer> | undefined;
        withCustomAttributions?: {
            k: string;
            v: string;
        }[] | null | undefined;
    }): Promise<void>;
    /**
     * Force a permission re-check for the websocket connections of `docRef`, distributed via the
     * redis stream to all servers. Each matching connection re-evaluates
     * `auth.authorize('document', docRef, user)` and is disconnected (close code 4401
     * 'permission revoked') when the permissions the socket consumes changed - the `ydoc` mask,
     * the `awareness` mask, the effective `ws` endpoint mask, or (on `gc=false` connections)
     * whether full history is still granted; REST-only facets (`delete`,
     * `history.rollback`/`prune`/`version`/`publish`, the other `endpoint` entries) never bounce a live
     * connection. The client then reconnects, re-authenticates, and resyncs at its new access
     * level. A failing auth plugin fails closed with the transient close code 1013 ('auth recheck
     * failed'), so clients reconnect once the auth backend recovers. With `forceDisconnect: true`,
     * matching connections are disconnected without re-checking. Note that a disconnect cannot
     * keep users out: reconnects are re-authenticated at upgrade, so revoke access in the auth
     * plugin's authority first - a plugin deriving permissions purely from the authInfo (token
     * claims) re-derives the same answer on every re-check, so revocation there needs
     * `forceDisconnect` plus short token lifetimes, or a revocation list inside `authorize`.
     *
     * `users` is an array of matchers; `null` matches every connection in the document. A string
     * matcher matches connections with that `userid`. A plain-object matcher matches a
     * connection when each of its top-level properties deep-equals the corresponding property
     * of the connection's authInfo (the authInfo may have additional properties) — e.g.
     * `{ userid: 'X' }` matches the authInfo `{ userid: 'X', name: 'Kevin' }`. Anonymous
     * connections (authInfo `null`) are matched only by the empty object matcher.
     *
     * @param {t.DocRef} docRef
     * @param {object} opts
     * @param {Array<string|Object<string,any>>?} [opts.users]
     * @param {boolean} [opts.forceDisconnect]
     * @returns {Promise<void>}
     */
    recheckAuth(docRef: t.DocRef, { users, forceDisconnect }?: {
        users?: (string | {
            [x: string]: any;
        })[] | null | undefined;
        forceDisconnect?: boolean | undefined;
    }): Promise<void>;
    /**
     * Delete `docRef`.
     *
     * A soft deletion (the default) only records that the document is gone: reads report it as
     * deleted and every endpoint answers 404, connected clients are disconnected, but its rows and
     * assets are left alone and compaction keeps running - so nothing that was already on the
     * stream is lost before it is trimmed, and `restoreDoc` brings the document back intact.
     * Erasing the content later is a retention task's job: sweep `getTombstones` and hard-delete
     * what is due.
     *
     * A hard deletion additionally clears the stream and erases every row and asset right away,
     * and cannot be undone. Compaction never persists a hard-deleted document again.
     *
     * Tombstone is per branch - deleting a document with all of its branches means deleting each of
     * them.
     *
     * Idempotent: a repeated deletion keeps the original `deletedAt` (a retry must not
     * extend a retention window), and a soft deletion can be upgraded to a hard one, never the
     * reverse. Re-running a hard deletion re-runs the purge, which is how a compaction that was
     * still in flight the first time gets cleaned up.
     *
     * @param {t.DocRef} docRef
     * @param {object} [opts]
     * @param {boolean} [opts.hard] erase the content immediately and irreversibly. (default: false)
     * @param {string|null} [opts.by] userid recorded as the deleting user
     * @returns {Promise<t.Tombstone>}
     */
    deleteDoc(docRef: t.DocRef, { hard, by }?: {
        hard?: boolean | undefined;
        by?: string | null | undefined;
    }): Promise<t.Tombstone>;
    /**
     * Undo a soft deletion, making the document readable again. Its content was never touched, so
     * it comes back with its full history.
     *
     * Refuses a hard deletion, and a soft one whose content was already purged: in both cases
     * dropping the record would resurrect the document as a partial one, since `retrieveDoc`
     * merges every row it finds and a straggling compaction may have left some behind.
     *
     * @param {t.DocRef} docRef
     * @returns {Promise<void>}
     */
    restoreDoc(docRef: t.DocRef): Promise<void>;
    /**
     * The deletions recorded for `org` - what a retention task iterates to find the documents
     * whose content is due to be erased, hard-deleting each one it sweeps up.
     *
     * @param {string} org
     * @param {object} [filters]
     * @param {boolean} [filters.purged] `false` selects deletions whose content still exists
     * @param {number} [filters.before] only deletions whose `deletedAt` precedes this unix-ms timestamp
     * @returns {Promise<Array<t.Tombstone>>}
     */
    getTombstones(org: string, filters?: {
        purged?: boolean | undefined;
        before?: number | undefined;
    }): Promise<Array<t.Tombstone>>;
    /**
     * Attribute and persist a document directly to the database, without distributing it via redis.
     *
     * Changes won't be synced to users connected via websocket until they reconnect.
     *
     * The row is stamped with the stream id `${ms}-0`, where `ms` is the redis `TIME`. Stream entries
     * up to that id count as persisted, so a real stream entry in the same redis millisecond as the
     * `TIME` call (the one with id `${ms}-0`) would be treated as already persisted: the initial sync
     * and compaction skip it.
     *
     * @param {t.DocRef} docRef
     * @param {Uint8Array<ArrayBuffer>} ydoc
     * @param {{ by?: string }} attributions
     */
    unsafePersistDoc(docRef: t.DocRef, ydoc: Uint8Array<ArrayBuffer>, { by }: {
        by?: string;
    }): Promise<void>;
    /**
     * @template R
     * @param {t.DocRef} docRef
     * @param {import('./agents.js').AgentTaskOptions} opts
     * @param {(ydoc: Y.Doc, awareness: import('@y/protocols/awareness').Awareness) => Promise<R> | R} handler
     * @returns {Promise<R>}
     */
    agentTask<R>(docRef: t.DocRef, opts: import("./agents.js").AgentTaskOptions, handler: (ydoc: Y.Doc, awareness: import("@y/protocols/awareness").Awareness) => Promise<R> | R): Promise<R>;
}
export function createYHub<Conf extends t.YHubConfig>(conf: Conf): Promise<YHub<Conf>>;
import * as t from './types.js';
import * as strm from './stream.js';
import * as p from './persistence.js';
import * as server from './server.js';
import * as Y from '@y/y';
export { createAuthPlugin, createAuthorize, createApiEndpoint, DocDeletedError } from "./types.js";
export { apiError, checkPermissions, encodedAny } from "./api.js";
export { createPermissions, createDocumentPermissions, createBranchPermissions, createOrgPermissions, createGlobalPermissions } from "./permissions.js";
export { wsCloseAuthRevoked, wsCloseDocDeleted, wsCloseDraining } from "./server.js";
//# sourceMappingURL=index.d.ts.map