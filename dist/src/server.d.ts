/**
 * Close code sent when a connection is disconnected because its permissions changed (see
 * `YHub.recheckAuth`). 4000-4999 is the websocket application range.
 *
 * Close codes encode retry semantics (see the Errors section in API.md): 4400-4499 are
 * permanent yhub errors - don't reconnect until the app acts - and 4500-4599 are reserved for
 * transient yhub errors. Where a standard code fits, it is preferred: 1011 internal error and
 * 1013 try again later, both transient.
 */
export const wsCloseAuthRevoked: 4401;
/**
 * Close code sent when the document was deleted (see `YHub.deleteDoc`). Permanent (4400-4499):
 * the document is not coming back and a reconnect is refused at sync time anyway, so a client
 * should stop reconnecting and drop its local copy.
 */
export const wsCloseDocDeleted: 4404;
/**
 * Close code sent to every connection when the server shuts down (see `YHub.destroy`).
 * Transient (4500-4599): the document is fine, only this server is going away - a client should
 * reconnect, and lands on another instance behind the load balancer.
 */
export const wsCloseDraining: 4503;
export function waitUntil(timeout: number, check: () => boolean): Promise<void>;
export function matchesAuthInfo(matcher: string | {
    [x: string]: any;
}, authInfo: {
    userid: string;
} | null): boolean;
export class YHubServer {
    /**
     * @param {import('./index.js').YHub} yhub
     * @param {import('./types.js').YHubConfig} conf
     * @param {uws.TemplatedApp} app
     */
    constructor(yhub: import("./index.js").YHub, conf: import("./types.js").YHubConfig, app: uws.TemplatedApp);
    yhub: import("./index.js").YHub<{
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
                docUpdate?: ((event: import("./types.js").DocTable<{
                    gc: true;
                    nongc: true;
                    contentmap: true;
                    contentids: true;
                }> & {
                    docRef: import("./types.js").DocRef;
                }) => void) | undefined;
                taskStart?: ((event: {
                    docRef: import("./types.js").DocRef;
                    timestamp: number;
                }) => void) | undefined;
                taskComplete?: ((event: {
                    docRef: import("./types.js").DocRef;
                    duration: number;
                    error: Error | null;
                }) => void) | undefined;
            } | undefined;
            taskConcurrency: number;
        } | null | undefined;
        server?: {
            api?: import("./types.js").ApiEndpoint[] | undefined;
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
            auth: import("./types.js").AuthPlugin<any>;
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
        persistence: import("./types.js").PersistencePlugin[];
    }>;
    conf: {
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
                docUpdate?: ((event: import("./types.js").DocTable<{
                    gc: true;
                    nongc: true;
                    contentmap: true;
                    contentids: true;
                }> & {
                    docRef: import("./types.js").DocRef;
                }) => void) | undefined;
                taskStart?: ((event: {
                    docRef: import("./types.js").DocRef;
                    timestamp: number;
                }) => void) | undefined;
                taskComplete?: ((event: {
                    docRef: import("./types.js").DocRef;
                    duration: number;
                    error: Error | null;
                }) => void) | undefined;
            } | undefined;
            taskConcurrency: number;
        } | null | undefined;
        server?: {
            api?: import("./types.js").ApiEndpoint[] | undefined;
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
            auth: import("./types.js").AuthPlugin<any>;
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
        persistence: import("./types.js").PersistencePlugin[];
    };
    uwsApp: uws.TemplatedApp;
    /**
     * @type {uws.us_listen_socket|null}
     */
    listenSocket: uws.us_listen_socket | null;
    /**
     * The open websocket connections - from the uws `open` event until its `close` event.
     *
     * @type {Set<WSUser>}
     */
    users: Set<WSUser>;
    isDestroyed: boolean;
    /**
     * Stop accepting connections, close every websocket with `wsCloseDraining` and wait up to
     * `drainMs` for the clients to acknowledge, then terminate whatever is left without a close
     * frame. Idempotent.
     *
     * @param {object} [opts]
     * @param {number} [opts.drainMs] (default: 0)
     */
    destroy({ drainMs }?: {
        drainMs?: number | undefined;
    }): Promise<void>;
}
export function createYHubServer(yhub: import("./index.js").YHub, conf: import("./types.js").YHubConfig): Promise<YHubServer>;
/**
 * @implements SSubscriber
 */
export class WSUser implements SSubscriber {
    /**
     * @param {import('./index.js').YHub} yhub
     * @param {uws.WebSocket<{ user: WSUser }>|null} ws
     * @param {import('./types.js').DocRef} docRef
     * @param {import('./permissions.js').DocumentPermissionsV1Normalized} permissions
     * @param {{ userid: string }|null} authInfo - null for an anonymous connection
     * @param {boolean} gc
     * @param {Array<{ k: string, v: string }>} customAttributions
     */
    constructor(yhub: import("./index.js").YHub, ws: uws.WebSocket<{
        user: WSUser;
    }> | null, docRef: import("./types.js").DocRef, permissions: import("./permissions.js").DocumentPermissionsV1Normalized, authInfo: {
        userid: string;
    } | null, gc: boolean, customAttributions: Array<{
        k: string;
        v: string;
    }>);
    yhub: import("./index.js").YHub<{
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
                docUpdate?: ((event: import("./types.js").DocTable<{
                    gc: true;
                    nongc: true;
                    contentmap: true;
                    contentids: true;
                }> & {
                    docRef: import("./types.js").DocRef;
                }) => void) | undefined;
                taskStart?: ((event: {
                    docRef: import("./types.js").DocRef;
                    timestamp: number;
                }) => void) | undefined;
                taskComplete?: ((event: {
                    docRef: import("./types.js").DocRef;
                    duration: number;
                    error: Error | null;
                }) => void) | undefined;
            } | undefined;
            taskConcurrency: number;
        } | null | undefined;
        server?: {
            api?: import("./types.js").ApiEndpoint[] | undefined;
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
            auth: import("./types.js").AuthPlugin<any>;
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
        persistence: import("./types.js").PersistencePlugin[];
    }>;
    /**
     * @type {uws.WebSocket<{ user: WSUser }>|null}
     */
    ws: uws.WebSocket<{
        user: WSUser;
    }> | null;
    docRef: {
        org: string;
        docid: string;
        branch: string;
    };
    /**
     * The normalized permissions this connection was authorized with. Frozen for the lifetime
     * of the connection except through `recheckAuth`, which replaces the whole object.
     */
    permissions: import("./permissions.js").DocumentPermissionsV1Normalized;
    gc: boolean;
    /**
     * @type {string}
     */
    initialRedisSubId: string;
    subs: Set<any>;
    /**
     * This is just an identifier to keep track of the user for logging purposes.
     */
    id: number;
    authInfo: {
        userid: string;
    } | null;
    /**
     * Identifies the User globally - null for an anonymous connection, which never holds ydoc
     * `u` (attributions carry the userid; see the upgrade handler).
     * Note that several clients can have the same userid (e.g. if a user opened several browser
     * windows)
     */
    userid: string | null;
    customAttributions: {
        k: string;
        v: string;
    }[];
    /**
     * @type {number|null}
     */
    awarenessId: number | null;
    awarenessLastClock: number;
    isClosed: boolean;
    isDestroyed: boolean;
    lastReceivedClock: string;
    /**
     * Unix ms of the last message sent to the client - see `keepAlive`.
     */
    lastSentAt: number;
    /**
     * @type {ReturnType<typeof setTimeout>|null}
     */
    keepAliveTimeout: ReturnType<typeof setTimeout> | null;
    log: import("pino").Logger<never, boolean>;
    /**
     * @param {import('./types.js').DocRef} _docRef
     * @param {Array<import('./types.js').Message>} ms
     */
    onStreamMessage(_docRef: import("./types.js").DocRef, ms: Array<import("./types.js").Message>): void;
    /**
     * @param {Uint8Array<ArrayBuffer>} m
     */
    sendData(m: Uint8Array<ArrayBuffer>): void;
    /**
     * Send an empty awareness message whenever nothing was sent for `server.wsKeepAliveInterval` ms
     * (see the option). Armed after the initial sync; re-arms itself until `destroy`.
     */
    keepAlive(): void;
    /**
     * Re-evaluate this connection's permissions via the auth plugin (see `YHub.recheckAuth`) and
     * compare the leaves the socket consumes: the `ydoc` mask, the `awareness` mask, the effective
     * `ws` endpoint mask, and - for `gc=false` connections - whether full history is still granted
     * (the nongc doc *is* the full history). Any difference disconnects, downgrades and upgrades
     * alike - the client reconnects, re-authenticates, and resyncs at its new access level
     * (updating the gates in place would silently drop a downgraded client's updates and diverge
     * it from the server). REST-only facets (`delete`, `history.rollback`/`prune`/`version`/`publish`, the other
     * `endpoint` entries) never bounce a live connection. Fails closed: an auth plugin error also
     * disconnects, but with the transient code 1013 instead of 4401 - the client keeps
     * reconnecting and is re-checked at upgrade, so it recovers once the auth backend does. So does
     * an answer that takes longer than `server.authTimeout`.
     */
    recheckAuth(): Promise<void>;
    /**
     * @param {number} code
     * @param {string} message
     */
    close(code: number, message: string): void;
    /**
     * Disconnect because the document was deleted. Drops `awarenessId` first: `destroy` would
     * otherwise announce this client's awareness departure, and that write would re-create the
     * stream key the deletion just cleared and enqueue another compact task for a dead document.
     */
    closeDocDeleted(): void;
    /**
     * @param {number} code
     * @param {string} message
     */
    closeWithError(code: number, message: string): void;
    destroy(): void;
}
export type SSubscriber = import("./stream.js").StreamSubscriber;
import * as uws from 'uws';
//# sourceMappingURL=server.d.ts.map