/**
 * # Asset
 *
 * Types of content we deal with (v1 encoded ydocs, v2 encoded ydocs, v1 encoded contentmaps, ..)
 *
 * # AssetIds
 *
 * Describe how to retrieve any asset.
 */
export const $ydocAssetId: s.Schema<{
    type: "id:ydoc:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
    gc: boolean;
}>;
export const $contentMapAssetId: s.Schema<{
    type: "id:contentmap:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
}>;
export const $contentidsAssetId: s.Schema<{
    type: "id:contentids:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
}>;
export const $contentMapAsset: s.Schema<{
    type: "asset:contentmap:v1";
    contentmap: Uint8Array<ArrayBuffer>;
}>;
export const $contentidsAsset: s.Schema<{
    type: "asset:contentids:v1";
    contentids: Uint8Array<ArrayBuffer>;
}>;
export const $ydocAsset: s.Schema<{
    type: "asset:ydoc:v1";
    update: Uint8Array<ArrayBuffer>;
}>;
export const $retrievableAsset: s.Schema<{
    type: "asset:retrievable:v1";
    plugin: string;
}>;
export const $assetId: s.Schema<{
    type: "id:ydoc:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
    gc: boolean;
} | {
    type: "id:contentmap:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
} | {
    type: "id:contentids:v1";
    org: string;
    docid: string;
    branch: string;
    t: string;
}>;
export const $asset: s.Schema<{
    type: "asset:contentmap:v1";
    contentmap: Uint8Array<ArrayBuffer>;
} | {
    type: "asset:contentids:v1";
    contentids: Uint8Array<ArrayBuffer>;
} | {
    type: "asset:ydoc:v1";
    update: Uint8Array<ArrayBuffer>;
} | {
    type: "asset:retrievable:v1";
    plugin: string;
}>;
export function assetIdToString(assetId: AssetId): string;
export function assetIdFromString(assetIdString: string): AssetId;
export const $updateMessage: s.Schema<{
    type: "ydoc:update:v1";
    update: Uint8Array<ArrayBuffer>;
    contentmap: Uint8Array<ArrayBuffer>;
}>;
export const $awarenessMessage: s.Schema<{
    type: "awareness:v1";
    update: Uint8Array<ArrayBuffer>;
}>;
/**
 * Directive to permanently prune churned history. `prune` is an `IdSet` (serialized with
 * `Y.encodeIdSet`) of content that was inserted and later deleted; it is garbage-collected
 * from the nongc doc and removed from the contentmap when documents are merged.
 */
export const $pruneMessage: s.Schema<{
    type: "prune:v1";
    prune: Uint8Array<ArrayBuffer>;
}>;
/**
 * Directive to re-check permissions of the websocket connections of a document (see
 * `YHub.recheckAuth`). `users` is an array of authInfo matchers — `null` matches every
 * connection. `forceDisconnect` disconnects matching connections without re-checking access.
 */
export const $authCheckMessage: s.Schema<{
    type: "auth:check:v1";
    users: (string | {
        [key: string]: any;
    })[] | null;
    forceDisconnect: boolean;
}>;
/**
 * Directive that a document was deleted (see `YHub.deleteDoc`). Payload-free: connections are
 * kicked identically for hard and soft deletions, and anything that needs the distinction reads
 * the deletion record from postgres. That also makes it replay-idempotent, so - unlike
 * `auth:check:v1` - it survives `unquarantine` re-injection without a special case.
 */
export const $tombstoneMessage: s.Schema<{
    type: "ydoc:tombstone:v1";
}>;
/**
 * A Message contains information w want to distribute to clients. They are usually put on the
 * distribution stream.
 */
export const $message: s.Schema<{
    type: "ydoc:update:v1";
    update: Uint8Array<ArrayBuffer>;
    contentmap: Uint8Array<ArrayBuffer>;
} | {
    type: "awareness:v1";
    update: Uint8Array<ArrayBuffer>;
} | {
    type: "prune:v1";
    prune: Uint8Array<ArrayBuffer>;
} | {
    type: "auth:check:v1";
    users: (string | {
        [key: string]: any;
    })[] | null;
    forceDisconnect: boolean;
} | {
    type: "ydoc:tombstone:v1";
}>;
export function isContentMessage(type: Message["type"]): type is "ydoc:update:v1" | "prune:v1" | "ydoc:tombstone:v1";
export const $docRef: s.Schema<{
    org: string;
    docid: string;
    branch: string;
}>;
/**
 * A named version: the annotation of a point `t` in the history of a document (unix ms - an
 * `activity.to`), stored in `yhub_ydoc_versions_v1`. The client supplies `name` (`''` = unnamed)
 * and `custom`, any lib0-any value; the rest is the server's. Unknown keys are refused.
 * `updatedAt` strictly increases with every write - a write in the millisecond of the previous one
 * lands a millisecond later - so it identifies the state a client read (see `$versionPatch`).
 */
export const $version: s.Schema<{
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
}>;
/**
 * What a client writes to create a named version: the client's part of `$version`. Without `t`,
 * the version names the last update of the document.
 */
export const $versionCreate: s.Schema<{
    t?: number | undefined;
    custom?: any;
    published?: boolean | undefined;
    type: "version:v1";
    name: string;
}>;
/**
 * What a client writes to create or replace the named version at `t`.
 */
export const $versionPut: s.Schema<{
    custom?: any;
    published?: boolean | undefined;
    t: number;
    type: "version:v1";
    name: string;
}>;
/**
 * What a client writes to replace the named version at `t` - only while it is still the state
 * the client read, the one with this `updatedAt`.
 */
export const $versionPatch: s.Schema<{
    custom?: any;
    published?: boolean | undefined;
    t: number;
    updatedAt: number;
    type: "version:v1";
    name: string;
}>;
/**
 * Thrown at a callsite that read a deleted document (see `YHub.deleteDoc`). `getDoc` itself never
 * throws it - it reports the deletion as `tombstone` and each caller decides. Most refuse; the
 * compact worker is the one that carries on, because it still has to trim the stream.
 */
export class DocDeletedError extends Error {
    /**
     * @param {DocRef} docRef
     * @param {Tombstone} tombstone
     */
    constructor(docRef: DocRef, tombstone: Tombstone);
    docRef: {
        org: string;
        docid: string;
        branch: string;
    };
    tombstone: Tombstone;
}
export const $compactTask: s.Schema<{
    type: "compact";
    docRef: {
        org: string;
        docid: string;
        branch: string;
    };
}>;
export const $task: s.Schema<{
    type: "compact";
    docRef: {
        org: string;
        docid: string;
        branch: string;
    };
}>;
/**
 * @typedef {s.Unwrap<typeof $task>} Task
 */
/**
 * @template {{[K:string]:any}} Conf
 * @template {string} Key
 * @template Result
 * @typedef {(Conf[Key] extends true ? Result : (Conf[Key] extends boolean ? (Result|null) : null))} IfHasConf
 */
/**
 * @template {{ gc?: boolean, nongc?: boolean, contentmap?: boolean, references?: boolean, contentids?: boolean, awareness?: boolean }} [Include=any]
 * @typedef {import('lib0/ts').Prettify<{
 *   lastClock: string,
 *   streamClock: string,
 *   lastPersistedClock: string,
 *   tombstone: Tombstone|null,
 *   gcDoc: IfHasConf<Include, 'gc', Uint8Array<ArrayBuffer>>,
 *   nongcDoc: IfHasConf<Include, 'nongc', Uint8Array<ArrayBuffer>>,
 *   contentmap: IfHasConf<Include, 'contentmap', Uint8Array<ArrayBuffer>>,
 *   references: IfHasConf<Include, 'references', Array<{ assetId: AssetId, asset: Asset|null }>>,
 *   contentids: IfHasConf<Include, 'contentids', Uint8Array<ArrayBuffer>>,
 *   awareness: IfHasConf<Include, 'awareness', Uint8Array<ArrayBuffer>>,
 *   authChecks: Array<s.Unwrap<typeof $authCheckMessage>>
 * }, 1>} DocTable
 */
/**
 * `delete` removes a single asset that is no longer referenced - a superseded version during
 * compaction, or every version of a document during `YHub.purgeDoc`. Both reach it through
 * `Persistence.deleteReferences`, which drops the referencing row first, so an asset deletion
 * that is delayed or lost leaks an orphaned object rather than leaving a row pointing at
 * nothing.
 *
 * @typedef {object} PersistencePlugin
 * @property {null|((api: import('./index.js').YHub)=>Promise<any>?)} [PersistPlugin.init]
 * @property {null|((assetId: AssetId, asset: Asset)=>Promise<RetrievableAsset?>)} [PersistPlugin.store]
 * @property {null|((assetId: AssetId, assetInfo: Asset)=>Promise<Asset?>)} [PersistPlugin.retrieve]
 * @property {null|((assetId: AssetId, assetInfo: Asset)=>Promise<boolean>)} [PersistPlugin.delete]
 */
/**
 * @type {s.Schema<PersistencePlugin>}
 */
export const $persistencePlugin: s.Schema<PersistencePlugin>;
export const $authPlugin: s.Schema<AuthPlugin<any>>;
export function createAuthPlugin<AuthInfo extends UserAuthInfo>(authDef: AuthPlugin<AuthInfo>): AuthPlugin<AuthInfo>;
export function createAuthorize<AuthInfo extends UserAuthInfo>(handlers: { [Scope in import("./permissions.js").PermissionScope]?: (resourceId: import("./permissions.js").PermissionResourceId<Scope>, user: AuthInfo | null) => Promise<import("./permissions.js").ToPermissionType<Scope> | null>; }): AuthPlugin<AuthInfo>["authorize"];
export function createApiEndpoint<Name extends string, Scope extends "document" | "org" | "global" = "document", QGet = undefined, QPost = undefined, QPut = undefined, QPatch = undefined, QDelete = undefined, BPost = undefined, BPut = undefined, BPatch = undefined, BDelete = undefined>(name: Name, opts: {
    version?: string;
    scope?: Scope;
    path?: string;
    cors?: Partial<CorsConfig> | null;
    get?: {
        $query?: QGet;
        handler: (req: ApiScopedRequest<Scope, ApiQueryType<QGet>>) => any;
    };
    post?: {
        $query?: QPost;
        $body?: BPost;
        handler: (req: ApiScopedRequest<Scope, ApiQueryType<QPost>, ApiBodyType<BPost>>) => any;
    };
    put?: {
        $query?: QPut;
        $body?: BPut;
        handler: (req: ApiScopedRequest<Scope, ApiQueryType<QPut>, ApiBodyType<BPut>>) => any;
    };
    patch?: {
        $query?: QPatch;
        $body?: BPatch;
        handler: (req: ApiScopedRequest<Scope, ApiQueryType<QPatch>, ApiBodyType<BPatch>>) => any;
    };
    delete?: {
        $query?: QDelete;
        $body?: BDelete;
        handler: (req: ApiScopedRequest<Scope, ApiQueryType<QDelete>, ApiBodyType<BDelete>>) => any;
    };
}): ApiEndpoint & {
    name: Name;
};
export const $cors: s.Schema<{
    credentials?: boolean | undefined;
    trustSameOrigin?: boolean | undefined;
    allowHeaders?: string[] | undefined;
    exposeHeaders?: string[] | undefined;
    maxAge?: number | undefined;
    origin: string | string[];
}>;
/**
 * @typedef {s.Unwrap<typeof $cors>} CorsConfig
 */
export const $config: s.Schema<{
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
            docUpdate?: ((event: DocTable<{
                gc: true;
                nongc: true;
                contentmap: true;
                contentids: true;
            }> & {
                docRef: DocRef;
            }) => void) | undefined;
            taskStart?: ((event: {
                docRef: DocRef;
                timestamp: number;
            }) => void) | undefined;
            taskComplete?: ((event: {
                docRef: DocRef;
                duration: number;
                error: Error | null;
            }) => void) | undefined;
        } | undefined;
        taskConcurrency: number;
    } | null | undefined;
    server?: {
        api?: ApiEndpoint[] | undefined;
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
        auth: AuthPlugin<any>;
    } | null | undefined;
    redis: {
        taskDebounce?: number | undefined;
        minMessageLifetime?: number | undefined;
        cacheTtl?: number | undefined;
        clientOptions?: Omit<import("@redis/client").RedisClientOptions<import("@redis/client").RedisModules, import("@redis/client").RedisFunctions, import("@redis/client").RedisScripts, import("@redis/client").RespVersions, import("@redis/client").TypeMapping, import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions>, "url"> | undefined;
        socket?: import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions | undefined;
        url: string;
        prefix: string;
    };
    persistence: PersistencePlugin[];
}>;
export type RetrievableAsset = s.Unwrap<typeof $retrievableAsset>;
export type Asset = s.Unwrap<typeof $asset>;
export type AssetId = s.Unwrap<typeof $assetId>;
export type Message = s.Unwrap<typeof $message>;
export type DocRef = s.Unwrap<typeof $docRef>;
/**
 * The record of a deleted document (table `yhub_ydoc_tombstones_v1`), keyed by docRef. `deletedAt` and
 * `purgedAt` are unix milliseconds read from redis `TIME`, so they are free of server clock skew
 * and share the clock domain of `yhub_ydoc_v1.created`. `purgedAt` is null until the content has
 * actually been erased - immediately for a hard deletion, whenever the retention task runs for a
 * soft one.
 */
export type Tombstone = {
    org: string;
    docid: string;
    branch: string;
    deletedAt: number;
    hard: boolean;
    purgedAt: number | null;
    by: string | null;
};
export type Version = s.Unwrap<typeof $version>;
export type Task = s.Unwrap<typeof $task>;
export type IfHasConf<Conf extends {
    [K: string]: any;
}, Key extends string, Result> = (Conf[Key] extends true ? Result : (Conf[Key] extends boolean ? (Result | null) : null));
export type DocTable<Include extends {
    gc?: boolean;
    nongc?: boolean;
    contentmap?: boolean;
    references?: boolean;
    contentids?: boolean;
    awareness?: boolean;
} = any> = import("lib0/ts").Prettify<{
    lastClock: string;
    streamClock: string;
    lastPersistedClock: string;
    tombstone: Tombstone | null;
    gcDoc: IfHasConf<Include, "gc", Uint8Array<ArrayBuffer>>;
    nongcDoc: IfHasConf<Include, "nongc", Uint8Array<ArrayBuffer>>;
    contentmap: IfHasConf<Include, "contentmap", Uint8Array<ArrayBuffer>>;
    references: IfHasConf<Include, "references", Array<{
        assetId: AssetId;
        asset: Asset | null;
    }>>;
    contentids: IfHasConf<Include, "contentids", Uint8Array<ArrayBuffer>>;
    awareness: IfHasConf<Include, "awareness", Uint8Array<ArrayBuffer>>;
    authChecks: Array<s.Unwrap<typeof $authCheckMessage>>;
}, 1>;
/**
 * `delete` removes a single asset that is no longer referenced - a superseded version during
 * compaction, or every version of a document during `YHub.purgeDoc`. Both reach it through
 * `Persistence.deleteReferences`, which drops the referencing row first, so an asset deletion
 * that is delayed or lost leaks an orphaned object rather than leaving a row pointing at
 * nothing.
 */
export type PersistencePlugin = {
    init?: ((api: import("./index.js").YHub) => Promise<any> | null) | null | undefined;
    store?: ((assetId: AssetId, asset: Asset) => Promise<RetrievableAsset | null>) | null | undefined;
    retrieve?: ((assetId: AssetId, assetInfo: Asset) => Promise<Asset | null>) | null | undefined;
    delete?: ((assetId: AssetId, assetInfo: Asset) => Promise<boolean>) | null | undefined;
};
export type UserAuthInfo = {
    userid: string;
};
/**
 * The auth plugin (`server.auth`): `authenticate` establishes who is asking, `authorize` answers
 * what they may do with one resource - a typed permission object per scope (see
 * `@y/hub/permissions` and proposals/permissions.md).
 */
export type AuthPlugin<AuthInfo extends UserAuthInfo> = {
    /**
     * - establish who is asking: return the caller's identity (`{ userid, ... }`) or null for an anonymous caller - `authorize` is then asked with `user: null` and may still grant (public documents). Throw a branded `apiError(401, ...)` (from `@y/hub`) to reject a presented credential, `apiError(503, ...)` to signal a temporary auth-backend outage - rest requests and the websocket upgrade respond with that status. Any other throw is an infrastructure failure and answers 503.
     */
    authenticate: (req: import("uws").HttpRequest) => Promise<AuthInfo | null>;
    /**
     * - answer the input-form permissions of `user` (null: anonymous) on the addressed resource. `scope` names the tier ('document' → resourceId {org, docid, branch}, 'branch' → {org, branch}, 'org' → {org}, 'global' → {}) and the return type is forced to match it (`ToPermissionType<Scope>` from `@y/hub/permissions`) - implement via `createAuthorize` for full checking; a hand-rolled function body cannot correlate a runtime check of `scope` with its return type and needs a cast. Every answer is additionally validated against the scope's permission schema at runtime. Denial is a value: return null (or an object granting nothing) - never throw to deny. A throw is an infrastructure failure: rest requests and the websocket upgrade answer 503 (a branded apiError passes its status through), a websocket recheck disconnects 1013 (transient), never 4401. Must be deterministic per (scope, resourceId, user) between upgrade and recheck - wall-clock-relative grants (`from: now - 30d`) flap connections; compute such bounds when the grant is stored, not when it is read.
     */
    authorize: <Scope extends import("./permissions.js").PermissionScope>(scope: Scope, resourceId: import("./permissions.js").PermissionResourceId<Scope>, user: AuthInfo | null) => Promise<import("./permissions.js").ToPermissionType<Scope> | null>;
};
/**
 * The type of `req.query` when the endpoint method declares no `$query` spec.
 */
export type ApiQueryAny = {
    [key: string]: any;
};
/**
 * The request object passed to custom api endpoint handlers (`server.api`). All properties are
 * plain snapshots taken before the handler runs - safe to access at any time. The only exception
 * is `aborted`, which flips to true once the client disconnects.
 */
export type ApiRequestBase<Query = ApiQueryAny, Body = undefined> = {
    yhub: import("./index.js").YHub;
    method: "get" | "post" | "put" | "patch" | "delete";
    /**
     * - the request path, e.g. '/api/comments/v1/acme/readme'
     */
    path: string;
    /**
     * - the named path segments declared via `path`
     */
    params: {
        [name: string]: string;
    };
    /**
     * - lowercased request headers
     */
    headers: {
        [name: string]: string;
    };
    /**
     * - what `authenticate` returned; null for an anonymous caller
     */
    authInfo: UserAuthInfo | null;
    /**
     * - true once the client disconnected. Check between expensive steps and return early.
     */
    aborted: boolean;
    /**
     * - the url query attributes as a plain object. Coerced & validated by the method's `$query` spec when declared; raw strings otherwise. Attributes not declared in the spec pass through as raw strings.
     */
    query: Query;
    /**
     * - the request body, decoded by its content type and validated (json: coerced) against the method's `$body` spec when declared; `undefined` otherwise (use `bytes()`/`any()`)
     */
    body: Body;
    /**
     * - the raw request body
     */
    bytes: () => Promise<Uint8Array<ArrayBuffer>>;
    /**
     * - the request body, lib0-any-decoded
     */
    any: () => Promise<any>;
};
export type ApiDocumentRequest<Query = ApiQueryAny, Body = undefined> = ApiRequestBase<Query, Body> & {
    org: string;
    docid: string;
    branch: string;
    docRef: DocRef;
    permissions: import("./permissions.js").DocumentPermissionsV1Normalized | null;
};
export type ApiOrgRequest<Query = ApiQueryAny, Body = undefined> = ApiRequestBase<Query, Body> & {
    org: string;
    docid: null;
    branch: null;
    docRef: null;
    permissions: import("./permissions.js").OrgPermissionsV1Normalized | null;
};
export type ApiGlobalRequest<Query = ApiQueryAny, Body = undefined> = ApiRequestBase<Query, Body> & {
    org: null;
    docid: null;
    branch: null;
    docRef: null;
    permissions: import("./permissions.js").GlobalPermissionsV1Normalized | null;
};
export type ApiRequest = ApiDocumentRequest | ApiOrgRequest | ApiGlobalRequest;
/**
 * A method definition of a custom api endpoint: the `handler` plus per-method options. `$query`
 * declares the supported query attributes as a shape object - values are schemas (`s.$number`),
 * literals (`'a'`), or arrays of those (= unions) - or a prebuilt `s.$object(..)` schema. Query
 * values arrive as strings and are coerced to number/boolean where the schema asks for it, then
 * validated before the handler runs - failing requests are answered 400.
 *
 * `$body` (not on `get`) declares the request body the same way. The body is decoded by its
 * content type and passed as `req.body`: `application/json` bodies are coerced against the schema
 * (binary fields arrive as base64 strings), lib0-any bodies express exact types and are validated
 * as-is - failing requests are answered 400 with `code: 'invalid-body'`.
 */
export type ApiMethodDef<Req> = {
    $query?: {
        [key: string]: any;
    };
    $body?: {
        [key: string]: any;
    };
    handler: (req: Req) => any;
};
/**
 * The method definitions of a custom api endpoint. Every method - builtin and custom alike - is
 * gated by the `endpoint` facet of the request's permissions before the handler runs: the mask
 * position follows the HTTP verb (`get`→`r`, `post`→`c`, `put`/`patch`→`u`, `delete`→`d`). The
 * semantic facets are the handler's business: a handler that reads or writes the document states
 * the facets it needs on `req.permissions` itself (`checkPermissions(req.permissions, createDocumentPermissions({ ydoc: '-r--' }))`
 * before calling `yhub.getDoc`; `req.permissions` is null when the auth plugin answered null).
 * Likewise identity: `req.authInfo` is null for an anonymous caller - a handler that needs one
 * answers its own 401.
 * Handler return values: a `Response` is written as-is, `null`/`undefined`
 * responds "204 No Content", a string responds as text/plain, a Uint8Array is sent raw
 * (application/octet-stream), `encodedAny(bytes)` sends pre-encoded lib0-any bytes
 * (application/x-lib0any), and anything else is lib0-any-encoded (application/x-lib0any). Object
 * and `encodedAny` results are served as json instead when the request sends
 * `Accept: application/json` - see API.md.
 */
export type ApiEndpointMethods<Req> = {
    get?: ApiMethodDef<Req> | undefined;
    post?: ApiMethodDef<Req> | undefined;
    put?: ApiMethodDef<Req> | undefined;
    patch?: ApiMethodDef<Req> | undefined;
    delete?: ApiMethodDef<Req> | undefined;
};
/**
 * A custom rest endpoint served at `/{apiPrefix}/{name}/{version}/...` (default prefix: `api`,
 * see `server.apiPrefix`) - see API.md. One name may serve
 * several routes with distinct url depths (e.g. a collection plus an item route via
 * `path: '/:commentId'`). Handlers are typed by `scope`: doc-scoped handlers receive a non-null
 * `docRef`, org-scoped handlers receive `org` only, global handlers neither.
 *
 * Fields: `version` (default: 'v1'), `scope` (default: 'document'), `path` (additional named path
 * segments, e.g. '/:commentId'), `cors` (overrides `server.cors` for this endpoint - `null`
 * disables cors on it). Each method is defined as a `{ $query?, handler }` object - see
 * `ApiMethodDef`. Names of built-in endpoints (`ydoc`, `rollback`, `prune`, `changeset`,
 * `activity`, `version`, `updated`, `ws`) are reserved and refused in any version - one name in the `endpoint`
 * permission facet must mean one route family (`ws` is the websocket route's entry: `r` opens
 * the socket, `u` admits doc updates over it).
 */
export type ApiDocumentEndpoint = {
    name: string;
    version?: string;
    scope?: "document";
    path?: string;
    cors?: Partial<CorsConfig> | null;
} & ApiEndpointMethods<ApiDocumentRequest>;
export type ApiOrgEndpoint = {
    name: string;
    version?: string;
    scope: "org";
    path?: string;
    cors?: Partial<CorsConfig> | null;
} & ApiEndpointMethods<ApiOrgRequest>;
export type ApiGlobalEndpoint = {
    name: string;
    version?: string;
    scope: "global";
    path?: string;
    cors?: Partial<CorsConfig> | null;
} & ApiEndpointMethods<ApiGlobalRequest>;
export type ApiEndpoint = ApiDocumentEndpoint | ApiOrgEndpoint | ApiGlobalEndpoint;
/**
 * The type of `req.query` for a `$query` spec `Q` - `ApiQueryAny` when no spec is declared.
 */
export type ApiQueryType<Q> = [Q] extends [undefined] ? ApiQueryAny : s.ReadSchemaUnwrapped<Q>;
/**
 * The type of `req.body` for a `$body` spec `B` - `undefined` when no spec is declared.
 */
export type ApiBodyType<B> = [B] extends [undefined] ? undefined : s.ReadSchemaUnwrapped<B>;
export type ApiScopedRequest<Scope extends "document" | "org" | "global", Query, Body = undefined> = Scope extends "document" ? ApiDocumentRequest<Query, Body> : Scope extends "org" ? ApiOrgRequest<Query, Body> : ApiGlobalRequest<Query, Body>;
export type CorsConfig = s.Unwrap<typeof $cors>;
export type YHubConfig = s.Unwrap<typeof $config>;
import * as s from 'lib0/schema';
//# sourceMappingURL=types.d.ts.map