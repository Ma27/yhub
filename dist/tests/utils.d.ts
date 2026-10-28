export function testHubPort(n: number): number;
/**
 * Side channel for the custom api test endpoints defined below.
 *
 * @type {{ slowAborted: boolean|null }}
 */
export const apiTestState: {
    slowAborted: boolean | null;
};
export const yhub: import("@y/hub").YHub<{
    redis: {
        url: string;
        prefix: string;
        taskDebounce: number;
        minMessageLifetime: number;
    };
    postgres: string;
    persistence: S3PersistenceV1[];
    server: {
        port: number;
        cors: {
            origin: string;
        };
        auth: types.AuthPlugin<{
            userid: string;
        }>;
        api: types.ApiEndpoint[];
    };
    worker: {
        taskConcurrency: number;
    };
}>;
export function createTestHub(conf: Partial<import("../src/types.js").YHubConfig>): Promise<import("@y/hub").YHub<never>>;
export function wsUrlFromPort(port: number): string;
export const defaultOrg: "testOrg";
export const yhubHost: string;
export const wsUrl: string;
export function cleanPreviousClients(): void;
export function createTestCase(tc: t.TestCase): Promise<{
    defaultDocRef: {
        org: string;
        docid: string;
        branch: string;
    };
    defaultStream: string;
    yhub: import("@y/hub").YHub<{
        redis: {
            url: string;
            prefix: string;
            taskDebounce: number;
            minMessageLifetime: number;
        };
        postgres: string;
        persistence: S3PersistenceV1[];
        server: {
            port: number;
            cors: {
                origin: string;
            };
            auth: types.AuthPlugin<{
                userid: string;
            }>;
            api: types.ApiEndpoint[];
        };
        worker: {
            taskConcurrency: number;
        };
    }>;
    org: string;
    /**
     * @template {boolean} [WaitForSync=false]
     * @param {object} [params]
     * @param {string} [params.docid]
     * @param {string|null} [params.branch] - `null` omits ?branch from the url entirely
     * @param {boolean} [params.gc]
     * @param {boolean} [params.syncAwareness]
     * @param {WaitForSync} [params.waitForSync]
     * @param {string} [params.wsUrl]
     * @param {{[K:string]:any}} [params.wsParams]
     * @return {WaitForSync extends true ? Promise<{ ydoc: Y.Doc, provider: WebsocketProvider }> : { ydoc: Y.Doc, provider: WebsocketProvider }}
     */
    createWsClient: <WaitForSync extends boolean = false>(params?: {
        docid?: string | undefined;
        branch?: string | null | undefined;
        gc?: boolean | undefined;
        syncAwareness?: boolean | undefined;
        waitForSync?: WaitForSync | undefined;
        wsUrl?: string | undefined;
        wsParams?: {
            [K: string]: any;
        } | undefined;
    }) => WaitForSync extends true ? Promise<{
        ydoc: Y.Doc;
        provider: WebsocketProvider;
    }> : {
        ydoc: Y.Doc;
        provider: WebsocketProvider;
    };
}>;
export function waitDocsSynced(ydoc1: Y.Doc, ydoc2: Y.Doc): Promise<void>;
export function waitTasksProcessed(yhub: import("../src/index.js").YHub): Promise<void>;
import { S3PersistenceV1 } from '@y/hub/plugins/s3';
import * as types from '../src/types.js';
import * as t from 'lib0/testing';
import * as Y from '@y/y';
import { WebsocketProvider } from '@y/websocket';
//# sourceMappingURL=utils.d.ts.map