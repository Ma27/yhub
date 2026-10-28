/**
 * How long `YHub.destroy` waits for running tasks and closing connections on SIGTERM/SIGINT - an
 * upper bound, the shutdown is over as soon as they are done. 15s plus the ~13s of pending S3
 * deletes fits kubernetes' default grace period of 30s.
 */
export const shutdownDrainMs: number;
/**
 * @type {import('../src/types.js').YHubConfig}
 */
export const conf: import("../src/types.js").YHubConfig;
//# sourceMappingURL=conf.d.ts.map