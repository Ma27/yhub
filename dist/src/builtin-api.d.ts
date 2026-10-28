export function parseCustomAttributionsParam(param: string | undefined): Array<{
    k: string;
    v: string;
}>;
/**
 * The built-in rest endpoints, registered by default ahead of `conf.server.api` (see registerApi).
 *
 * @type {Array<import('./types.js').ApiEndpoint>}
 */
export const builtinApi: Array<import("./types.js").ApiEndpoint>;
//# sourceMappingURL=builtin-api.d.ts.map