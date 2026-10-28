export function statusLine(code: number, reason?: string): string;
export function apiError(status: number, message: string, extra?: {
    [key: string]: any;
}): Error & {
    status: number;
    extra: {
        [key: string]: any;
    } | undefined;
    [apiErrorBrand]: boolean;
};
export function isApiError(err: any): err is Error & {
    status: number;
    extra?: {
        [key: string]: any;
    };
};
export function checkPermissions<P extends import("./permissions.js").NormalizedPermissions | null>(permissions: P, required: import("./permissions.js").RequiredPermissions<P>): void;
export class EncodedAny {
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes: Uint8Array);
    bytes: Uint8Array<ArrayBufferLike>;
}
export function encodedAny(bytes: Uint8Array): EncodedAny;
export function withAuthTimeout<T>(yhub: import("./index.js").YHub, hook: "authenticate" | "authorize", p: Promise<T>): Promise<T>;
export function runAuthHook<T>(yhub: import("./index.js").YHub, hook: "authenticate" | "authorize", run: () => Promise<T>): Promise<T>;
export function normalizeAuthorizeAnswer<S extends perm.PermissionScope>(scope: S, answer: any): perm.ToNormalizedPermissionType<S> | null;
export function resolvePermissions<S extends perm.PermissionScope>(yhub: import("./index.js").YHub, req: import("uws").HttpRequest, scope: S, resourceId: perm.PermissionResourceId<S>): Promise<{
    authInfo: t.UserAuthInfo | null;
    permissions: perm.ToNormalizedPermissionType<S> | null;
}>;
export function resolveApiPrefix(yhub: import("./index.js").YHub): string;
export function registerApi(yhub: import("./index.js").YHub, app: import("uws").TemplatedApp): void;
declare const apiErrorBrand: unique symbol;
import * as perm from './permissions.js';
import * as t from './types.js';
export {};
//# sourceMappingURL=api.d.ts.map