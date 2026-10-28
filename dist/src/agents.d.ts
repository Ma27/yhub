export function agentTask<R>(yhub: import("./index.js").YHub, docRef: import("./types.js").DocRef, { clearAwareness, author, displayedAuthor, promptBy, customAttributions }: AgentTaskOptions | undefined, handler: (ydoc: Y.Doc, awareness: awarenessProtocol.Awareness) => Promise<R> | R): Promise<R>;
export type AgentTaskOptions = {
    /**
     * Seconds to wait after the handler resolves before broadcasting an awareness
     * disconnect for this agent. `0` (default) clears immediately on exit.
     * `false` leaves awareness in place on success; the caller is then responsible
     * for the agent's awareness lifecycle. Errors always clear immediately.
     */
    clearAwareness?: number | false | undefined;
    /**
     * user-id attributed to inserts/deletes via the standard `insert` / `delete`
     * content attributes. Should normally be a stable user-id, not a display name.
     */
    author?: string | undefined;
    /**
     * Human-readable display name pre-seeded into the agent's awareness state as
     * `{ user: { name: displayedAuthor } }`, so other connected clients can render
     * the agent (cursor labels, presence panels). Used only by awareness — never
     * by attribution. Defaults to `author`. The handler can replace this by
     * calling `awareness.setLocalState(...)`.
     */
    displayedAuthor?: string | undefined;
    /**
     * Optional custom attribution recording who prompted the agent. Stored as
     * `insert:promptBy` / `delete:promptBy` via the same customAttributions
     * convention used by the WS and REST update paths. Equivalent to passing
     * `customAttributions: [{ k: 'promptBy', v: promptBy }]`; merged with any
     * explicit `customAttributions`.
     */
    promptBy?: string | undefined;
    /**
     * Arbitrary custom attribution entries, matching the `customAttributions`
     * shape accepted by the REST PATCH and WS upgrade query param. Each entry
     * produces `insert:${k}` / `delete:${k}` content attributes on the agent's
     * inserts and deletes.
     */
    customAttributions?: {
        k: string;
        v: string;
    }[] | undefined;
};
import * as Y from '@y/y';
import * as awarenessProtocol from '@y/protocols/awareness';
//# sourceMappingURL=agents.d.ts.map