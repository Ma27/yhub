export function resolveCors(serverCors: import("./types.js").CorsConfig | null | undefined, endpointCors: Partial<import("./types.js").CorsConfig> | null | undefined): ResolvedCors | null;
export function originAllowed(cors: ResolvedCors | null, origin: string, host: string, secFetchSite: string): boolean;
export function writeCorsResponse(cors: ResolvedCors | null, res: import("uws").HttpResponse, origin: string, skip?: Set<string>): void;
export function writeCorsPreflight(cors: ResolvedCors | null, res: import("uws").HttpResponse, origin: string, methods: string): boolean;
export type ResolvedCors = {
    /**
     * whether every origin is allowed (`origin: '*'`)
     */
    originAll: boolean;
    /**
     * lowercased exact allowlist, null when `originAll`
     */
    origins: Set<string> | null;
    /**
     * lowercased wildcard entries, split at the `*`
     */
    originPatterns: Array<{
        prefix: string;
        suffix: string;
    }> | null;
    credentials: boolean;
    trustSameOrigin: boolean;
    allowHeaders: string | null;
    exposeHeaders: string | null;
    maxAge: string;
};
//# sourceMappingURL=cors.d.ts.map