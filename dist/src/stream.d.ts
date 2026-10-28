export function uriEncode(str: string): string;
export function uriDecode(str: string): string;
export function encodeRoomName(docRef: t.DocRef, prefix: string): string;
export function decodeRoomName(rediskey: string, expectedPrefix: string): {
    org: string;
    docid: string;
    branch: string;
};
export function encodeQuarantineName(docRef: t.DocRef, prefix: string, qid: string): string;
export function encodeDocUpdatedKey(org: string, prefix: string): string;
export function encodeDocUpdatedMember(docRef: t.DocRef): string;
export function decodeDocUpdatedMember(member: string): {
    docid: string;
    branch: string;
};
export function sanitizeRedisClock(clock: string): string;
export function isSmallerRedisClock(a: string, b: string): boolean;
export function maxRedisClock(a: string, b: string): string;
export function redisClockToMs(clock: string): number;
export function minRedisClock(a: string, b: string): string;
export class Stream {
    /**
     * @param {import('./types.js').YHubConfig} config
     */
    constructor(config: import("./types.js").YHubConfig);
    redisConfig: {
        taskDebounce?: number | undefined;
        minMessageLifetime?: number | undefined;
        cacheTtl?: number | undefined;
        clientOptions?: Omit<redis.RedisClientOptions<redis.RedisModules, redis.RedisFunctions, redis.RedisScripts, redis.RespVersions, redis.TypeMapping, import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions>, "url"> | undefined;
        socket?: import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions | undefined;
        url: string;
        prefix: string;
    };
    prefix: string;
    consumername: string;
    /**
     * After this timeout, a worker will pick up a task and clean up a stream. (default: 120 seconds)
     */
    taskDebounce: number;
    /**
     * Minimum lifetime of y* update messages in redis streams. (default: 60 seconds)
     */
    minMessageLifetime: number;
    /**
     * TTL for cached API responses in seconds. (default: 5 seconds)
     * Results are cached for `cacheTtl + computeTime * 2`.
     */
    cacheTtl: number;
    workerStreamName: string;
    workerGroupName: string;
    compactionDisabledSetName: string;
    _destroyed: boolean;
    /**
     * lastReceivedId: the last id we received. Next time we fetch we will request lastReceivedId+1.
     * A sub doesn't receive subs that are smaller/equal to lastReceivedId.
     *
     * @type {Map<string, { lastReceivedClock: string, subs: Set<StreamSubscriber> }>}
     */
    subs: Map<string, {
        lastReceivedClock: string;
        subs: Set<StreamSubscriber>;
    }>;
    /**
     * Will be merged into subs on the next sub iteration.
     *
     * @type {Map<string, { lastReceivedClock: string, subs: Set<StreamSubscriber> }>}
     */
    subUpdates: Map<string, {
        lastReceivedClock: string;
        subs: Set<StreamSubscriber>;
    }>;
    redisClientConf: redis.RedisClientOptions<redis.RedisModules, redis.RedisFunctions, redis.RedisScripts, redis.RespVersions, redis.TypeMapping, import("@redis/client/dist/lib/client/socket.js").RedisSocketOptions>;
    redis: import("@redis/client").RedisClientType<{
        json: {
            ARRAPPEND: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, ...jsons: import("@redis/json").RedisJSON[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            arrAppend: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, ...jsons: import("@redis/json").RedisJSON[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            ARRINDEX: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, options?: import("@redis/json/dist/lib/commands/ARRINDEX.js").JsonArrIndexOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            arrIndex: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, options?: import("@redis/json/dist/lib/commands/ARRINDEX.js").JsonArrIndexOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            ARRINSERT: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, index: number, json: import("@redis/json").RedisJSON, ...jsons: import("@redis/json").RedisJSON[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            arrInsert: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, index: number, json: import("@redis/json").RedisJSON, ...jsons: import("@redis/json").RedisJSON[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            ARRLEN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/ARRLEN.js").JsonArrLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            arrLen: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/ARRLEN.js").JsonArrLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            ARRPOP: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/ARRPOP.js").RedisArrPopOptions | undefined) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => string | number | boolean | Date | import("@redis/client/dist/lib/RESP/types.js").NullReply | {
                    [key: string]: import("@redis/json").RedisJSON;
                    [key: number]: import("@redis/json").RedisJSON;
                } | (import("@redis/json").RedisJSON | import("@redis/client/dist/lib/RESP/types.js").NullReply)[] | null;
            };
            arrPop: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/ARRPOP.js").RedisArrPopOptions | undefined) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => string | number | boolean | Date | import("@redis/client/dist/lib/RESP/types.js").NullReply | (import("@redis/json").RedisJSON | import("@redis/client/dist/lib/RESP/types.js").NullReply)[] | {
                    [key: string]: import("@redis/json").RedisJSON;
                    [key: number]: import("@redis/json").RedisJSON;
                } | null;
            };
            ARRTRIM: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, start: number, stop: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            arrTrim: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, start: number, stop: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            CLEAR: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/CLEAR.js").JsonClearOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            clear: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/CLEAR.js").JsonClearOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            DEBUG_MEMORY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/DEBUG_MEMORY.js").JsonDebugMemoryOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            debugMemory: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/DEBUG_MEMORY.js").JsonDebugMemoryOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            DEL: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/DEL.js").JsonDelOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            del: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/DEL.js").JsonDelOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            FORGET: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/FORGET.js").JsonForgetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            forget: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/FORGET.js").JsonForgetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            GET: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/GET.js").JsonGetOptions | undefined) => void;
                readonly transformReply: typeof import("@redis/client/dist/lib/commands/generic-transformers.js").transformRedisJsonNullReply;
            };
            get: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/GET.js").JsonGetOptions | undefined) => void;
                readonly transformReply: typeof import("@redis/client/dist/lib/commands/generic-transformers.js").transformRedisJsonNullReply;
            };
            MERGE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, value: import("@redis/json").RedisJSON) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            merge: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, value: import("@redis/json").RedisJSON) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            MGET: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, keys: import("@redis/client").RedisArgument[], path: import("@redis/client").RedisArgument) => void;
                readonly transformReply: (this: void, reply: (import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>)[]) => (import("@redis/json").RedisJSON | import("@redis/client/dist/lib/RESP/types.js").NullReply)[];
            };
            mGet: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, keys: import("@redis/client").RedisArgument[], path: import("@redis/client").RedisArgument) => void;
                readonly transformReply: (this: void, reply: (import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>)[]) => (import("@redis/json").RedisJSON | import("@redis/client/dist/lib/RESP/types.js").NullReply)[];
            };
            MSET: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, items: import("@redis/json/dist/lib/commands/MSET.js").JsonMSetItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            mSet: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, items: import("@redis/json/dist/lib/commands/MSET.js").JsonMSetItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            NUMINCRBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, by: number) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => number | (number | null)[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            numIncrBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, by: number) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => number | (number | null)[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            NUMMULTBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, by: number) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => number | (number | null)[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            numMultBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, by: number) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>) => number | (number | null)[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            OBJKEYS: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/OBJKEYS.js").JsonObjKeysOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
            };
            objKeys: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/OBJKEYS.js").JsonObjKeysOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
            };
            OBJLEN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/OBJLEN.js").JsonObjLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            objLen: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/OBJLEN.js").JsonObjLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            SET: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, options?: import("@redis/json/dist/lib/commands/SET.js").JsonSetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            set: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument, json: import("@redis/json").RedisJSON, options?: import("@redis/json/dist/lib/commands/SET.js").JsonSetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            STRAPPEND: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, append: string, options?: import("@redis/json/dist/lib/commands/STRAPPEND.js").JsonStrAppendOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            strAppend: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, append: string, options?: import("@redis/json/dist/lib/commands/STRAPPEND.js").JsonStrAppendOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            STRLEN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/STRLEN.js").JsonStrLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            strLen: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/STRLEN.js").JsonStrLenOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            TOGGLE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            toggle: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, path: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            TYPE: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/TYPE.js").JsonTypeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: (reply: (import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>)[]) => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            type: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/json/dist/lib/commands/TYPE.js").JsonTypeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: (reply: (import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>)[]) => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
        };
        ft: {
            _LIST: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            _list: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            ALTER: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, schema: import("@redis/search").RediSearchSchema) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            alter: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, schema: import("@redis/search").RediSearchSchema) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            AGGREGATE_WITHCURSOR: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").FtAggregateWithCursorOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [result: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], cursor: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>]) => import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").AggregateWithCursorReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            aggregateWithCursor: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").FtAggregateWithCursorOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [result: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], cursor: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>]) => import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").AggregateWithCursorReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            AGGREGATE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/AGGREGATE.js").FtAggregateOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (rawReply: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/search/dist/lib/commands/AGGREGATE.js").AggregateReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            aggregate: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/AGGREGATE.js").FtAggregateOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (rawReply: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/search/dist/lib/commands/AGGREGATE.js").AggregateReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            ALIASADD: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            aliasAdd: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            ALIASDEL: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            aliasDel: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            ALIASUPDATE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            aliasUpdate: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, alias: import("@redis/client").RedisArgument, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            CONFIG_GET: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, option: string) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").TuplesReply<[import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]) => Record<string, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            configGet: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, option: string) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").TuplesReply<[import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]) => Record<string, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            CONFIG_SET: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, property: Buffer | (string & {}) | "a" | "b", value: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            configSet: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, property: Buffer | (string & {}) | "a" | "b", value: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            CREATE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, schema: import("@redis/search").RediSearchSchema, options?: import("@redis/search/dist/lib/commands/CREATE.js").CreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            create: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, schema: import("@redis/search").RediSearchSchema, options?: import("@redis/search/dist/lib/commands/CREATE.js").CreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            CURSOR_DEL: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, cursorId: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            cursorDel: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, cursorId: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            CURSOR_READ: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, cursor: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, options?: import("@redis/search/dist/lib/commands/CURSOR_READ.js").FtCursorReadOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [result: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], cursor: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>]) => import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").AggregateWithCursorReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            cursorRead: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, cursor: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, options?: import("@redis/search/dist/lib/commands/CURSOR_READ.js").FtCursorReadOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [result: [total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], cursor: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>]) => import("@redis/search/dist/lib/commands/AGGREGATE_WITHCURSOR.js").AggregateWithCursorReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            DICTADD: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument, term: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            dictAdd: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument, term: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            DICTDEL: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument, term: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            dictDel: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument, term: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            DICTDUMP: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            dictDump: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, dictionary: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            DROPINDEX: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/DROPINDEX.js").FtDropIndexOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                };
            };
            dropIndex: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/DROPINDEX.js").FtDropIndexOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                };
            };
            EXPLAIN: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/EXPLAIN.js").FtExplainOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>;
            };
            explain: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/EXPLAIN.js").FtExplainOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>;
            };
            EXPLAINCLI: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/EXPLAINCLI.js").FtExplainCLIOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            explainCli: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/EXPLAINCLI.js").FtExplainCLIOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            HYBRID: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, options: import("@redis/search/dist/lib/commands/HYBRID.js").FtHybridOptions) => void;
                readonly transformReply: {
                    readonly 2: (reply: any) => import("@redis/search/dist/lib/commands/HYBRID.js").HybridSearchResult;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            hybrid: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, options: import("@redis/search/dist/lib/commands/HYBRID.js").FtHybridOptions) => void;
                readonly transformReply: {
                    readonly 2: (reply: any) => import("@redis/search/dist/lib/commands/HYBRID.js").HybridSearchResult;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            INFO: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: any[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/search/dist/lib/commands/INFO.js").InfoReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            info: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: any[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/search/dist/lib/commands/INFO.js").InfoReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            PROFILESEARCH: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: (import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileOptions & import("@redis/search").FtSearchOptions) | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").ReplyUnion>]) => import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileReplyResp2;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").ReplyUnion) => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            profileSearch: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: (import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileOptions & import("@redis/search").FtSearchOptions) | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").ReplyUnion>]) => import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileReplyResp2;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").ReplyUnion) => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            PROFILEAGGREGATE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: string, query: string, options?: (import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileOptions & import("@redis/search/dist/lib/commands/AGGREGATE.js").FtAggregateOptions) | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [[total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").ReplyUnion>]) => import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileReplyResp2;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").ReplyUnion) => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            profileAggregate: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: string, query: string, options?: (import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileOptions & import("@redis/search/dist/lib/commands/AGGREGATE.js").FtAggregateOptions) | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: [[total: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>, ...results: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>[]], import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").ReplyUnion>]) => import("@redis/search/dist/lib/commands/PROFILE_SEARCH.js").ProfileReplyResp2;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").ReplyUnion) => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            SEARCH_NOCONTENT: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search").FtSearchOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply) => import("@redis/search/dist/lib/commands/SEARCH_NOCONTENT.js").SearchNoContentReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            searchNoContent: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search").FtSearchOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply) => import("@redis/search/dist/lib/commands/SEARCH_NOCONTENT.js").SearchNoContentReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            SEARCH: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search").FtSearchOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply) => import("@redis/search").SearchReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            search: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search").FtSearchOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/search/dist/lib/commands/SEARCH.js").SearchRawReply) => import("@redis/search").SearchReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            SPELLCHECK: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SPELLCHECK.js").FtSpellCheckOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (rawReply: [_: string, term: string, suggestions: [score: string, suggestion: string][]][]) => {
                        term: string;
                        suggestions: {
                            score: number;
                            suggestion: string;
                        }[];
                    }[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            spellCheck: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, query: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SPELLCHECK.js").FtSpellCheckOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (rawReply: [_: string, term: string, suggestions: [score: string, suggestion: string][]][]) => {
                        term: string;
                        suggestions: {
                            score: number;
                            suggestion: string;
                        }[];
                    }[];
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            SUGADD: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, string: import("@redis/client").RedisArgument, score: number, options?: import("@redis/search/dist/lib/commands/SUGADD.js").FtSugAddOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            sugAdd: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, string: import("@redis/client").RedisArgument, score: number, options?: import("@redis/search/dist/lib/commands/SUGADD.js").FtSugAddOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            SUGDEL: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, string: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>;
            };
            sugDel: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, string: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>;
            };
            SUGGET_WITHPAYLOADS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[]) => {
                    suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                }[] | null;
            };
            sugGetWithPayloads: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[]) => {
                    suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                }[] | null;
            };
            SUGGET_WITHSCORES_WITHPAYLOADS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    }[] | null;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>)[]) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    }[] | null;
                };
            };
            sugGetWithScoresWithPayloads: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    }[] | null;
                    readonly 3: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>)[]) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        payload: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    }[] | null;
                };
            };
            SUGGET_WITHSCORES: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[] | null;
                    readonly 3: (reply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>)[]) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[] | null;
                };
            };
            sugGetWithScores: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (reply: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[] | null;
                    readonly 3: (reply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>)[]) => {
                        suggestion: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                        score: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[] | null;
                };
            };
            SUGGET: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            sugGet: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, prefix: import("@redis/client").RedisArgument, options?: import("@redis/search/dist/lib/commands/SUGGET.js").FtSugGetOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            SUGLEN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            sugLen: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            SYNDUMP: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>)[]) => Record<string, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
                };
            };
            synDump: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>)[]) => Record<string, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>>;
                };
            };
            SYNUPDATE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, groupId: import("@redis/client").RedisArgument, terms: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/search/dist/lib/commands/SYNUPDATE.js").FtSynUpdateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            synUpdate: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, groupId: import("@redis/client").RedisArgument, terms: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/search/dist/lib/commands/SYNUPDATE.js").FtSynUpdateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            TAGVALS: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, fieldName: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            tagVals: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, index: import("@redis/client").RedisArgument, fieldName: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
        };
        ts: {
            readonly ADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, timestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, value: number, options?: import("@redis/time-series/dist/lib/commands/ADD.js").TsAddOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly add: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, timestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, value: number, options?: import("@redis/time-series/dist/lib/commands/ADD.js").TsAddOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly ALTER: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/ALTER.js").TsAlterOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly alter: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/ALTER.js").TsAlterOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly CREATE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/CREATE.js").TsCreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly create: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/CREATE.js").TsCreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly CREATERULE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, sourceKey: import("@redis/client").RedisArgument, destinationKey: import("@redis/client").RedisArgument, aggregationType: import("@redis/time-series").TimeSeriesAggregationType, bucketDuration: number, alignTimestamp?: number | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly createRule: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, sourceKey: import("@redis/client").RedisArgument, destinationKey: import("@redis/client").RedisArgument, aggregationType: import("@redis/time-series").TimeSeriesAggregationType, bucketDuration: number, alignTimestamp?: number | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly DECRBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, value: number, options?: import("@redis/time-series/dist/lib/commands/INCRBY.js").TsIncrByOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly decrBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, value: number, options?: import("@redis/time-series/dist/lib/commands/INCRBY.js").TsIncrByOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly DEL: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly del: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly DELETERULE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, sourceKey: import("@redis/client").RedisArgument, destinationKey: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly deleteRule: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, sourceKey: import("@redis/client").RedisArgument, destinationKey: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly GET: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/GET.js").TsGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").RespType<42, [], never, []> | import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    } | null;
                    readonly 3: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/time-series/dist/lib/commands/GET.js").TsGetReply>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    } | null;
                };
            };
            readonly get: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/time-series/dist/lib/commands/GET.js").TsGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/client/dist/lib/RESP/types.js").RespType<42, [], never, []> | import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    } | null;
                    readonly 3: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").UnwrapReply<import("@redis/time-series/dist/lib/commands/GET.js").TsGetReply>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    } | null;
                };
            };
            readonly INCRBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, value: number, options?: import("@redis/time-series/dist/lib/commands/INCRBY.js").TsIncrByOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly incrBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, value: number, options?: import("@redis/time-series/dist/lib/commands/INCRBY.js").TsIncrByOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly INFO_DEBUG: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: string) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [...import("@redis/time-series/dist/lib/commands/INFO.js").InfoRawReplyTypes[], "keySelfName", import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, "Chunks", ["startTimestamp", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "endTimestamp", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "samples", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "size", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "bytesPerSample", import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>][]], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/time-series/dist/lib/commands/INFO_DEBUG.js").InfoDebugReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            readonly infoDebug: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: string) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [...import("@redis/time-series/dist/lib/commands/INFO.js").InfoRawReplyTypes[], "keySelfName", import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, "Chunks", ["startTimestamp", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "endTimestamp", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "samples", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "size", import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, "bytesPerSample", import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>][]], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/time-series/dist/lib/commands/INFO_DEBUG.js").InfoDebugReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: string) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/INFO.js").InfoRawReply, _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/time-series/dist/lib/commands/INFO.js").InfoReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: string) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/INFO.js").InfoRawReply, _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/time-series/dist/lib/commands/INFO.js").InfoReply;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").ReplyUnion;
                };
                readonly unstableResp3: true;
            };
            readonly MADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, toAdd: import("@redis/time-series/dist/lib/commands/MADD.js").TsMAddSample[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").SimpleErrorReply>;
            };
            readonly mAdd: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, toAdd: import("@redis/time-series/dist/lib/commands/MADD.js").TsMAddSample[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number> | import("@redis/client/dist/lib/RESP/types.js").SimpleErrorReply>;
            };
            readonly MGET_SELECTED_LABELS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET.js").TsMGetOptions | undefined) => void;
                readonly transformReply: {
                    2(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply2<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>, _: any, typeMapping?: redis.TypeMapping | undefined): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    3(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply3<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly mGetSelectedLabels: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET.js").TsMGetOptions | undefined) => void;
                readonly transformReply: {
                    2(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply2<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>, _: any, typeMapping?: redis.TypeMapping | undefined): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    3(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply3<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly MGET_WITHLABELS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").TsMGetWithLabelsOptions | undefined) => void;
                readonly transformReply: {
                    2(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply2<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>, _: any, typeMapping?: redis.TypeMapping | undefined): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    3(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply3<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly mGetWithLabels: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").TsMGetWithLabelsOptions | undefined) => void;
                readonly transformReply: {
                    2(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply2<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>, _: any, typeMapping?: redis.TypeMapping | undefined): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    3(this: void, reply: import("@redis/time-series/dist/lib/commands/MGET_WITHLABELS.js").MGetLabelsRawReply3<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>): import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly MGET: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET.js").TsMGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MGET.js").MGetRawReply2, _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MGET.js").MGetRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly mGet: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/MGET.js").TsMGetOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MGET.js").MGetRawReply2, _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        };
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MGET.js").MGetRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sample: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        };
                    }>;
                };
            };
            readonly MRANGE_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRangeGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MRANGE_SELECTED_LABELS_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRangeSelectedLabelsGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MRANGE_SELECTED_LABELS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: never;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRangeSelectedLabels: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: never;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MRANGE_WITHLABELS_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: string[] | Buffer[];
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRangeWithLabelsGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: string[] | Buffer[];
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MRANGE_WITHLABELS: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: Record<string, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRangeWithLabels: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: Record<string, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MRANGE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[]>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[]>;
                };
            };
            readonly mRange: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[]>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[]>;
                };
            };
            readonly MREVRANGE_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRevRangeGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MREVRANGE_SELECTED_LABELS_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRevRangeSelectedLabelsGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MREVRANGE_SELECTED_LABELS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: never;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRevRangeSelectedLabels: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, selectedLabels: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_SELECTED_LABELS.js").TsMRangeSelectedLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: never;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MREVRANGE_WITHLABELS_GROUPBY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: string[] | Buffer[];
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRevRangeWithLabelsGroupBy: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, groupBy: import("@redis/time-series/dist/lib/commands/MRANGE_GROUPBY.js").TsMRangeGroupBy, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: string[] | Buffer[];
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS_GROUPBY.js").TsMRangeWithLabelsGroupByRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        sources: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MREVRANGE_WITHLABELS: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: Record<string, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly mRevRangeWithLabels: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: Record<string, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: number;
                        }[];
                    }>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE_WITHLABELS.js").TsMRangeWithLabelsRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        labels: import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                        samples: {
                            timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                            value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                        }[];
                    }>;
                };
            };
            readonly MREVRANGE: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[]>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[]>;
                };
            };
            readonly mRevRange: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (parser: import("@redis/client").CommandParser, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply2, _?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[]>;
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/MRANGE.js").TsMRangeRawReply3) => import("@redis/client/dist/lib/RESP/types.js").MapReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[]>;
                };
            };
            readonly QUERYINDEX: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            readonly queryIndex: {
                readonly NOT_KEYED_COMMAND: true;
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, filter: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    readonly 2: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                    readonly 3: () => import("@redis/client/dist/lib/RESP/types.js").SetReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
                };
            };
            readonly RANGE: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").RespType<42, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[], never, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[];
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/helpers.js").SamplesRawReply) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[];
                };
            };
            readonly range: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").RespType<42, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[], never, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[];
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/helpers.js").SamplesRawReply) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[];
                };
            };
            readonly REVRANGE: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").RespType<42, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[], never, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[];
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/helpers.js").SamplesRawReply) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[];
                };
            };
            readonly revRange: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, fromTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, toTimestamp: import("@redis/time-series/dist/lib/commands/helpers.js").Timestamp, options?: import("@redis/time-series/dist/lib/commands/RANGE.js").TsRangeOptions | undefined) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: import("@redis/client/dist/lib/RESP/types.js").RespType<42, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[], never, import("@redis/client/dist/lib/RESP/types.js").RespType<42, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], never, [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]>[]>) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: number;
                    }[];
                    readonly 3: (this: void, reply: import("@redis/time-series/dist/lib/commands/helpers.js").SamplesRawReply) => {
                        timestamp: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                        value: import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    }[];
                };
            };
        };
        bf: {
            readonly ADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly add: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly CARD: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly card: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly EXISTS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly exists: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Capacity">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of filters">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items inserted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Expansion rate">, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/bloom/INFO.js").BfInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/bloom/INFO.js").BfInfoReplyMap;
                };
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Capacity">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of filters">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items inserted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Expansion rate">, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/bloom/INFO.js").BfInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/bloom/INFO.js").BfInfoReplyMap;
                };
            };
            readonly INSERT: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/bloom/INSERT.js").BfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly insert: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/bloom/INSERT.js").BfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly LOADCHUNK: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number, chunk: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly loadChunk: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number, chunk: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly MADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly mAdd: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly MEXISTS: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly mExists: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly RESERVE: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, errorRate: number, capacity: number, options?: import("@redis/bloom/dist/lib/commands/bloom/RESERVE.js").BfReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly reserve: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, errorRate: number, capacity: number, options?: import("@redis/bloom/dist/lib/commands/bloom/RESERVE.js").BfReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly SCANDUMP: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number) => void;
                readonly transformReply: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]) => {
                    iterator: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                    chunk: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                };
            };
            readonly scanDump: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number) => void;
                readonly transformReply: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]) => {
                    iterator: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                    chunk: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                };
            };
        };
        cms: {
            readonly INCRBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/bloom/dist/lib/commands/count-min-sketch/INCRBY.js").BfIncrByItem | import("@redis/bloom/dist/lib/commands/count-min-sketch/INCRBY.js").BfIncrByItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly incrBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/bloom/dist/lib/commands/count-min-sketch/INCRBY.js").BfIncrByItem | import("@redis/bloom/dist/lib/commands/count-min-sketch/INCRBY.js").BfIncrByItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"width">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"depth">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"count">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/count-min-sketch/INFO.js").CmsInfoReply;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/count-min-sketch/INFO.js").CmsInfoReply;
                };
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"width">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"depth">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"count">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/count-min-sketch/INFO.js").CmsInfoReply;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/count-min-sketch/INFO.js").CmsInfoReply;
                };
            };
            readonly INITBYDIM: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, width: number, depth: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly initByDim: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, width: number, depth: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly INITBYPROB: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, error: number, probability: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly initByProb: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, error: number, probability: number) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly MERGE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, destination: import("@redis/client").RedisArgument, source: import("@redis/bloom/dist/lib/commands/count-min-sketch/MERGE.js").BfMergeSketches) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly merge: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, destination: import("@redis/client").RedisArgument, source: import("@redis/bloom/dist/lib/commands/count-min-sketch/MERGE.js").BfMergeSketches) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly QUERY: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly query: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
        };
        cf: {
            readonly ADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly add: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly ADDNX: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly addNX: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly COUNT: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly count: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
            };
            readonly DEL: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly del: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly EXISTS: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly exists: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, item: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>) => boolean;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>;
                };
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of buckets">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of filters">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items inserted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items deleted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Bucket size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Expansion rate">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Max iterations">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/cuckoo/INFO.js").CfInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/cuckoo/INFO.js").CfInfoReplyMap;
                };
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of buckets">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of filters">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items inserted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Number of items deleted">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Bucket size">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Expansion rate">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Max iterations">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/cuckoo/INFO.js").CfInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/cuckoo/INFO.js").CfInfoReplyMap;
                };
            };
            readonly INSERT: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/cuckoo/INSERT.js").CfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly insert: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/cuckoo/INSERT.js").CfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly INSERTNX: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/cuckoo/INSERT.js").CfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly insertNX: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/cuckoo/INSERT.js").CfInsertOptions | undefined) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly LOADCHUNK: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number, chunk: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly loadChunk: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number, chunk: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly RESERVE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, capacity: number, options?: import("@redis/bloom/dist/lib/commands/cuckoo/RESERVE.js").CfReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly reserve: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, capacity: number, options?: import("@redis/bloom/dist/lib/commands/cuckoo/RESERVE.js").CfReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly SCANDUMP: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number) => void;
                readonly transformReply: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]) => {
                    iterator: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                    chunk: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                };
            };
            readonly scanDump: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, iterator: number) => void;
                readonly transformReply: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>]) => {
                    iterator: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                    chunk: import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                };
            };
        };
        tDigest: {
            readonly ADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly add: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly BYRANK: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, ranks: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly byRank: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, ranks: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly BYREVRANK: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, ranks: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly byRevRank: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, ranks: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly CDF: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly cdf: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly CREATE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/bloom/dist/lib/commands/t-digest/CREATE.js").TDigestCreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly create: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, options?: import("@redis/bloom/dist/lib/commands/t-digest/CREATE.js").TDigestCreateOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Compression">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Capacity">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Merged nodes">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Unmerged nodes">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Merged weight">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Unmerged weight">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Observations">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Total compressions">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Memory usage">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/t-digest/INFO.js").TdInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/t-digest/INFO.js").TdInfoReplyMap;
                };
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (this: void, reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Compression">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Capacity">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Merged nodes">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Unmerged nodes">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Merged weight">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Unmerged weight">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Observations">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Total compressions">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"Memory usage">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>], _: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/t-digest/INFO.js").TdInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/t-digest/INFO.js").TdInfoReplyMap;
                };
            };
            readonly MAX: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
            readonly max: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
            readonly MERGE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, destination: import("@redis/client").RedisArgument, source: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/t-digest/MERGE.js").TDigestMergeOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly merge: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, destination: import("@redis/client").RedisArgument, source: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument, options?: import("@redis/bloom/dist/lib/commands/t-digest/MERGE.js").TDigestMergeOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly MIN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
            readonly min: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
            readonly QUANTILE: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, quantiles: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly quantile: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, quantiles: number[]) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>[], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>>;
                };
            };
            readonly RANK: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly rank: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly RESET: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly reset: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly REVRANK: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly revRank: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, values: number[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly TRIMMED_MEAN: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, lowCutPercentile: number, highCutPercentile: number) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
            readonly trimmedMean: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, lowCutPercentile: number, highCutPercentile: number) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>, preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                    3: () => import("@redis/client/dist/lib/RESP/types.js").DoubleReply<number>;
                };
            };
        };
        topK: {
            readonly ADD: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            readonly add: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            readonly COUNT: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly count: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>>;
            };
            readonly INCRBY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/bloom/dist/lib/commands/top-k/INCRBY.js").TopKIncrByItem | import("@redis/bloom/dist/lib/commands/top-k/INCRBY.js").TopKIncrByItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>>;
            };
            readonly incrBy: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/bloom/dist/lib/commands/top-k/INCRBY.js").TopKIncrByItem | import("@redis/bloom/dist/lib/commands/top-k/INCRBY.js").TopKIncrByItem[]) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NullReply | import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<string>>;
            };
            readonly INFO: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"k">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"width">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"depth">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"decay">, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/top-k/INFO.js").TopKInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/top-k/INFO.js").TopKInfoReplyMap;
                };
            };
            readonly info: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: {
                    readonly 2: (reply: [import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"k">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"width">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"depth">, import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>, import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"decay">, import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>], preserve?: any, typeMapping?: redis.TypeMapping | undefined) => import("@redis/bloom/dist/lib/commands/top-k/INFO.js").TopKInfoReplyMap;
                    readonly 3: () => import("@redis/bloom/dist/lib/commands/top-k/INFO.js").TopKInfoReplyMap;
                };
            };
            readonly LIST_WITHCOUNT: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: (this: void, rawReply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>)[]) => {
                    item: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    count: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                }[];
            };
            readonly listWithCount: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: (this: void, rawReply: (import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string> | import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>)[]) => {
                    item: import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>;
                    count: import("@redis/client/dist/lib/RESP/types.js").NumberReply<number>;
                }[];
            };
            readonly LIST: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            readonly list: {
                readonly IS_READ_ONLY: true;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BlobStringReply<string>>;
            };
            readonly QUERY: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly query: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, items: import("@redis/client/dist/lib/commands/generic-transformers.js").RedisVariadicArgument) => void;
                readonly transformReply: {
                    2: (reply: import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").NumberReply<0 | 1>>) => boolean[];
                    3: () => import("@redis/client/dist/lib/RESP/types.js").ArrayReply<import("@redis/client/dist/lib/RESP/types.js").BooleanReply<boolean>>;
                };
            };
            readonly RESERVE: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, topK: number, options?: import("@redis/bloom/dist/lib/commands/top-k/RESERVE.js").TopKReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
            readonly reserve: {
                readonly IS_READ_ONLY: false;
                readonly parseCommand: (this: void, parser: import("@redis/client").CommandParser, key: import("@redis/client").RedisArgument, topK: number, options?: import("@redis/bloom/dist/lib/commands/top-k/RESERVE.js").TopKReserveOptions | undefined) => void;
                readonly transformReply: () => import("@redis/client/dist/lib/RESP/types.js").SimpleStringReply<"OK">;
            };
        };
    } & redis.RedisModules, redis.RedisFunctions, {
        addMessage: {
            NUMBER_OF_KEYS: number;
            SCRIPT: string;
            /**
             * @param {import('@redis/client').CommandParser} parser
             * @param {string} key
             * @param {string} docUpdatedKey
             * @param {string} member
             * @param {boolean} isContent
             * @param {Buffer} message
             */
            parseCommand(this: void, parser: import("@redis/client").CommandParser, key: string, docUpdatedKey: string, member: string, isContent: boolean, message: Buffer): void;
            transformReply(this: void, reply: any): any;
        } & import("@redis/client/dist/lib/lua-script.js").SHA1;
        trimMessages: {
            NUMBER_OF_KEYS: number;
            SCRIPT: string;
            /**
             * @param {import('@redis/client').CommandParser} parser
             * @param {string} streamName
             * @param {string} docUpdatedKey
             * @param {string} minId
             * @param {number} maxAgeMs - in milliseconds
             * @param {string} taskId
             * @param {string} member
             */
            parseCommand(this: void, parser: import("@redis/client").CommandParser, streamName: string, docUpdatedKey: string, minId: string, maxAgeMs: number, taskId: string, member: string): void;
            transformReply(this: void, reply: any): any;
        } & import("@redis/client/dist/lib/lua-script.js").SHA1;
        disableCompaction: {
            NUMBER_OF_KEYS: number;
            SCRIPT: string;
            /**
             * @param {import('@redis/client').CommandParser} parser
             * @param {string} streamName
             */
            parseCommand(this: void, parser: import("@redis/client").CommandParser, streamName: string): void;
            transformReply(this: void, reply: any): any;
        } & import("@redis/client/dist/lib/lua-script.js").SHA1;
        enableCompaction: {
            NUMBER_OF_KEYS: number;
            SCRIPT: string;
            /**
             * @param {import('@redis/client').CommandParser} parser
             * @param {string} streamName
             */
            parseCommand(this: void, parser: import("@redis/client").CommandParser, streamName: string): void;
            transformReply(this: void, reply: any): any;
        } & import("@redis/client/dist/lib/lua-script.js").SHA1;
    }, 2 | 3, redis.TypeMapping>;
    /**
     * Second instance to fetch things concurrent to the other connection.
     *
     * @type {ReturnType<typeof redis.createClient> | null}
     */
    redisSubscriptions: ReturnType<typeof redis.createClient> | null;
    _subRunning: boolean;
    /**
     * The current unix time in milliseconds, read from redis so that timestamps minted on
     * different servers are comparable regardless of their local clock skew. Same clock domain as
     * the stream ids, and therefore as `yhub_ydoc_v1.created`.
     *
     * @return {Promise<number>}
     */
    getTime(): Promise<number>;
    getPendingTasksSize(): Promise<number>;
    getActiveStreams(): Promise<string[]>;
    /**
     * The documents of `org` with live stream content whose last change has a stream clock in
     * `[from, to]` (unix ms, inclusive), oldest first - see `encodeDocUpdatedKey`.
     *
     * @param {string} org
     * @param {object} range
     * @param {number} range.from
     * @param {number} range.to
     * @param {number} [range.limit]
     * @return {Promise<Array<{ docid: string, branch: string, t: number }>>}
     */
    getUpdatedDocs(org: string, { from, to, limit }: {
        from: number;
        to: number;
        limit?: number | undefined;
    }): Promise<Array<{
        docid: string;
        branch: string;
        t: number;
    }>>;
    /**
     * Pull messages for all subscribed streams until no subscriber is left.
     *
     * `_subRunning` must be released on *every* exit path. A throw that left it set (a failing
     * `connect()`, most likely) would make every later `subscribe` believe a loop is already
     * running, and the process would silently stop delivering stream messages.
     */
    _runSub(): Promise<void>;
    /**
     * @param {Array<{docRef: t.DocRef|string, clock: string}>} docRefs docRef-clock pairs
     * @param {object} opts
     * @param {RedisReadClient} [opts.redisClient]
     * @param {boolean} [opts.blocking]
     * @return {Promise<Array<{ docRef: t.DocRef, messages: Array<t.Message & { redisClock: string }>, lastClock: string, streamName: string }>>}
     */
    getMessages(docRefs: Array<{
        docRef: t.DocRef | string;
        clock: string;
    }>, { redisClient, blocking }?: {
        redisClient?: RedisReadClient | undefined;
        blocking?: boolean | undefined;
    }): Promise<Array<{
        docRef: t.DocRef;
        messages: Array<t.Message & {
            redisClock: string;
        }>;
        lastClock: string;
        streamName: string;
    }>>;
    /**
     * @param {t.DocRef} docRef
     * @param {t.Message} m
     */
    addMessage(docRef: t.DocRef, m: t.Message): Promise<any>;
    /**
     * Move the live stream for `docRef` into a quarantine key with a fresh qid.
     *
     * Atomically renames the live stream and inserts a NOP entry into the (now empty) live
     * key. The NOP uses field `nop` (not `m`), so every read path — which filters on
     * `.message.m != null` — ignores it. The reason to leave a NOP behind is that any compact
     * task enqueued before the quarantine is still pending in the worker queue; a fresh write
     * after quarantine would otherwise see `EXISTS(live) == 0` and enqueue a second compact
     * task, causing two workers to persist the same `lastClock` concurrently (duplicate PK).
     *
     * @param {t.DocRef} docRef
     * @returns {Promise<string | null>} the qid of the created quarantine, or null if nothing to quarantine
     */
    quarantine(docRef: t.DocRef): Promise<string | null>;
    /**
     * List the qids of all quarantine streams for `docRef`.
     *
     * @param {t.DocRef} docRef
     * @returns {Promise<string[]>}
     */
    getQuarantineStreams(docRef: t.DocRef): Promise<string[]>;
    /**
     * List every quarantine stream across all documents.
     *
     * @returns {Promise<Array<{ docRef: t.DocRef, qid: string }>>}
     */
    getAllQuarantineStreams(): Promise<Array<{
        docRef: t.DocRef;
        qid: string;
    }>>;
    /**
     * Re-inject a quarantined stream back into the live stream for `docRef`, then delete the
     * quarantine key. Each stored message is re-XADD'd to the live stream (with a fresh redis
     * clock), which re-enqueues the compact worker task if the live stream was empty.
     *
     * @param {t.DocRef} docRef
     * @param {string} qid
     * @returns {Promise<number>} number of messages re-injected
     */
    unquarantine(docRef: t.DocRef, qid: string): Promise<number>;
    /**
     * Drop every message from `docRef`'s stream, without removing the key.
     *
     * XTRIM, not DEL. DEL resets the stream's `last_id`, so the next entry can be assigned an id
     * that sorts *below* the clock a subscriber already advanced past within the same millisecond
     * - the connections a deletion most needs to reach are exactly the ones that were writing
     * just now, and they would silently never see it. DEL would also flip `EXISTS` to 0, letting
     * the next write enqueue a second compact task alongside the one already pending, which is
     * the same invariant `quarantine` protects with its NOP entry. Redis keeps a stream key alive
     * with zero entries, which is why `trimMessages` has to DEL explicitly.
     *
     * @param {t.DocRef} docRef
     */
    clearMessages(docRef: t.DocRef): Promise<void>;
    /**
     * Delete every quarantined backlog of `docRef`. Nothing else ever removes these keys - they are
     * not trimmed and not listed by `getActiveStreams` - so a purge that skipped them would leave
     * the document's content sitting in redis indefinitely.
     *
     * @param {t.DocRef} docRef
     * @return {Promise<number>} the number of deleted quarantine streams
     */
    deleteQuarantineStreams(docRef: t.DocRef): Promise<number>;
    /**
     * Stop workers from compacting `docRef`. Atomically removes the pending compact task from the
     * worker queue and adds the docRef to the disabled set. While disabled, no new compact task is
     * enqueued for the document (addMessage checks the set), so its stream is neither persisted nor
     * trimmed until compaction is enabled again.
     *
     * @param {t.DocRef} docRef
     */
    disableCompaction(docRef: t.DocRef): Promise<void>;
    /**
     * Re-enable compaction for `docRef`. Removes the docRef from the disabled set and re-enqueues a
     * compact task if its stream exists. No-op if the document wasn't disabled.
     *
     * @param {t.DocRef} docRef
     */
    enableCompaction(docRef: t.DocRef): Promise<void>;
    /**
     * List all docRefs with disabled compaction.
     *
     * @return {Promise<Array<t.DocRef>>}
     */
    getDisabledCompactionDocRefs(): Promise<Array<t.DocRef>>;
    /**
     * Close both redis clients. Commands in flight are answered first, so the messages the closing
     * connections just added still reach redis. The subscription loop exits after its current read.
     */
    destroy(): Promise<void>;
    /**
     * @param {t.DocRef} docRef
     * @param {StreamSubscriber} subscriber
     */
    subscribe(docRef: t.DocRef, subscriber: StreamSubscriber): void;
    /**
     * @param {t.DocRef} docRef
     * @param {StreamSubscriber} subscriber
     */
    unsubscribe(docRef: t.DocRef, subscriber: StreamSubscriber): void;
    /**
     * @param {number} count
     * @return {Promise<Array<t.Task & { redisClock: string }>>}
     */
    claimTasks(count: number): Promise<Array<t.Task & {
        redisClock: string;
    }>>;
    /**
     * Reset the idle time of the tasks we are still working on, so that neither another worker nor
     * our own `claimTasks` reclaims them. `JUSTID` keeps the delivery counter intact.
     *
     * A min-idle-time of `0` claims regardless of the current owner - so this also steals back a
     * task that another worker took over while we were computing. That is intentional: compaction
     * results are idempotent (both workers write the same assets and the row insert is
     * `ON CONFLICT DO NOTHING`), and whichever `trimMessages` loses the ack is a no-op anyway.
     *
     * @param {Array<string>} taskIds
     * @return {Promise<Array<string>>} the ids that are still pending - a missing id was already
     * completed or was cancelled by `disableCompaction`.
     */
    renewTasks(taskIds: Array<string>): Promise<Array<string>>;
    /**
     * Trim messages with minId. Also ensure that we only trim messages that are older than maxAgeMs.
     *
     * @param {t.DocRef} docRef
     * @param {string} minId
     * @param {number} maxAgeMs
     * @param {string?} taskid
     */
    trimMessages(docRef: t.DocRef, minId: string, maxAgeMs: number, taskid: string | null): Promise<void>;
    /**
     * Key prefix of every cached response of `docRef`, terminated by its separator so that it cannot
     * also match a document whose docid merely starts with these characters.
     *
     * @param {t.DocRef} docRef
     */
    _cachePrefix(docRef: t.DocRef): string;
    /**
     * Drop every cached response of `docRef`. A cache hit never reaches `getDoc`, so without this a
     * response cached just before a deletion would keep being served until it expired.
     *
     * @param {t.DocRef} docRef
     * @return {Promise<number>} the number of dropped entries
     */
    deleteCachedResponses(docRef: t.DocRef): Promise<number>;
    /**
     * Cache results for `cacheTtl + computeTime * 2`.
     *
     * The docRef leads the key so that `deleteCachedResponses` can drop everything cached for a
     * document with an exact prefix match. Every component is `uriEncode`d: they are user-controlled, and a
     * raw join would let org='a:b',docid='c' collide with org='a',docid='b:c'.
     *
     * @param {t.DocRef} docRef
     * @param {string} endpoint
     * @param {Array<string>} args
     * @param {() => Promise<Uint8Array>} computeResult
     * @return {Promise<Uint8Array | Buffer>}
     */
    cachedGet(docRef: t.DocRef, endpoint: string, args: Array<string>, computeResult: () => Promise<Uint8Array>): Promise<Uint8Array | Buffer>;
}
export function createStream(config: import("./types.js").YHubConfig): Promise<Stream>;
export type StreamSubscriber = {
    onStreamMessage: (docRef: t.DocRef, ms: Array<t.Message & {
        redisClock: string;
    }>) => any;
    destroy: () => void;
    closeWithError: (code: number, message: string) => void;
    lastReceivedClock: string;
};
export type RedisReadClient = Pick<ReturnType<typeof redis.createClient>, "withTypeMapping">;
import * as t from './types.js';
import * as redis from 'redis';
//# sourceMappingURL=stream.d.ts.map