/**
 * The permissions framework (see proposals/permissions.md). A permission object describes what a
 * subject may do with one resource, per scope:
 *
 *   'permissions:document:v1' - the sync unit: a document on a branch, addressed
 *                               {org, docid, branch}: full facet vocabulary
 *   'permissions:branch:v1'   - {org, branch}: a branch spans documents; endpoint-only in v1
 *   'permissions:org:v1'      - {org}: endpoint-only in v1
 *   'permissions:global:v1'   - {}: endpoint-only in v1
 *
 * Access is encoded as positional CRUD masks ('cr--', '-r--', ..): a fixed position per verb, so
 * checks are single char compares and every mask has exactly one spelling. `'----'` is the
 * canonical denial for crud-valued keys; `false` is accepted as input sugar for it and
 * normalized away. Absent means unspecified - it grants nothing, but merges treat it as "no
 * statement" (identity in a union) while `false`/`'----'` is an explicit denial (absorbing in an
 * intersection).
 *
 * On `ydoc` and `awareness` the `c` and `d` positions are inert for now - they grant nothing.
 * `c` is reserved: "may populate the initial content" (future create-document helpers that seed
 * an initial structure/schema). Deletion is granted solely through the `delete` facet.
 *
 * The input form is what plugins/config write (schema `$permissions`). Input read from
 * *external* sources (json bodies, tokens, http responses) must pass through
 * `sanitizePermissions` first - the merges and `normalizeDocumentPermissions` explicitly do not
 * repeat that work. `normalizeDocumentPermissions` validates (invalid answers throw) and returns the
 * normalized view - a prototype-less plain object, fully materialized, one spelling per denial -
 * which enforcement and recheck comparison read.
 */
/**
 * The scope of an `authorize` question - the first argument of the plugin hook. The ladder orders
 * global → org → branch → document (see naming.md): a branch spans many documents, and the leaf a
 * permission check cares about is a document on a branch.
 *
 * @typedef {'global'|'org'|'branch'|'document'} PermissionScope
 */
/**
 * The resource an `authorize` call addresses - the shape follows the scope.
 *
 * @template {PermissionScope} [S=PermissionScope]
 * @typedef {S extends 'document' ? import('./types.js').DocRef
 *   : S extends 'branch' ? { org: string, branch: string }
 *   : S extends 'org' ? { org: string }
 *   : {}} PermissionResourceId
 */
/**
 * The input-form permission type answering an `authorize` question of scope `S`. The returned
 * object's `type` literal must match the scope (`'document'` → `'permissions:document:v1'`, ..) -
 * a mismatch throws at the normalize boundary, a loud validation error rather than a silent
 * denial.
 *
 * @template {PermissionScope} [S=PermissionScope]
 * @typedef {S extends 'document' ? DocumentPermissionsV1
 *   : S extends 'branch' ? BranchPermissionsV1
 *   : S extends 'org' ? OrgPermissionsV1
 *   : GlobalPermissionsV1} ToPermissionType
 */
/**
 * Permission levels: create | read | update | delete - efficiently encoded into a single string.
 *
 * The crud permission-check doesn't need a helper function:
 *
 * @example js
 *     if (perm[1] === 'r') {
 *       // user has read-access
 *     }
 *
 * @typedef {'crud'
 *   | '-rud' | 'c-ud' | 'cr-d' | 'cru-'
 *   | '--ud' | '-r-d' | '-ru-'
 *   | 'c--d' | 'c-u-'
 *   | 'cr--'
 *   | 'c---' | '-r--' | '--u-' | '---d'
 *   | '----'
 * } CRUD
 */
export const $crud: s.Schema<CRUD>;
export function crudUnion(...cruds: CRUD[]): CRUD;
export function crudIntersect(...cruds: CRUD[]): CRUD;
/**
 * Defines document-editing permissions.
 *
 * Note: optional fields may stay unspecified (by either not defining them or setting them to
 * undefined). They don't grant access, but merges treat unspecified as "no statement" while
 * `false` is an explicit denial.
 */
export const $documentPermissionsV1: s.Schema<{
    ydoc?: false | CRUD | undefined;
    awareness?: false | CRUD | undefined;
    history?: false | {
        rollback?: boolean | undefined;
        prune?: boolean | undefined;
        version?: false | CRUD | undefined;
        publish?: boolean | undefined;
        from: number;
    } | undefined;
    delete?: false | ("soft" | "hard")[] | undefined;
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:document:v1";
}>;
export const $branchPermissionsV1: s.Schema<{
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:branch:v1";
}>;
export const $orgPermissionsV1: s.Schema<{
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:org:v1";
}>;
export const $globalPermissionsV1: s.Schema<{
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:global:v1";
}>;
export const $permissions: s.Schema<{
    ydoc?: false | CRUD | undefined;
    awareness?: false | CRUD | undefined;
    history?: false | {
        rollback?: boolean | undefined;
        prune?: boolean | undefined;
        version?: false | CRUD | undefined;
        publish?: boolean | undefined;
        from: number;
    } | undefined;
    delete?: false | ("soft" | "hard")[] | undefined;
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:document:v1";
} | {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:branch:v1";
} | {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:org:v1";
} | {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:global:v1";
}>;
export function isKnownPermissionsType(type: string): type is "permissions:document:v1" | "permissions:branch:v1" | "permissions:org:v1" | "permissions:global:v1";
export function sanitizePermissions(permissions: any): Permissions;
export function createPermissions<S extends PermissionScope>(scope: S, p: Omit<ToPermissionType<S>, "type">): ToPermissionType<S>;
export function createDocumentPermissions(p: Omit<DocumentPermissionsV1, "type">): {
    ydoc?: false | CRUD | undefined;
    awareness?: false | CRUD | undefined;
    history?: false | {
        rollback?: boolean | undefined;
        prune?: boolean | undefined;
        version?: false | CRUD | undefined;
        publish?: boolean | undefined;
        from: number;
    } | undefined;
    delete?: false | ("soft" | "hard")[] | undefined;
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:document:v1";
};
export function createBranchPermissions(p: Omit<BranchPermissionsV1, "type">): {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:branch:v1";
};
export function createOrgPermissions(p: Omit<OrgPermissionsV1, "type">): {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:org:v1";
};
export function createGlobalPermissions(p: Omit<GlobalPermissionsV1, "type">): {
    endpoint?: false | {
        [x: string]: false | CRUD;
    } | undefined;
    type: "permissions:global:v1";
};
export function normalizeDocumentPermissions(documentPermissions: DocumentPermissionsV1): DocumentPermissionsV1Normalized;
export function normalizeBranchPermissions(permissions: BranchPermissionsV1): BranchPermissionsV1Normalized;
export function normalizeOrgPermissions(permissions: OrgPermissionsV1): OrgPermissionsV1Normalized;
export function normalizeGlobalPermissions(permissions: GlobalPermissionsV1): GlobalPermissionsV1Normalized;
export function endpointPermission(permissions: {
    endpoint: {
        [name: string]: CRUD;
    };
}, name: string): CRUD;
export function documentPermissionsUnion(docperm1: DocumentPermissionsV1, docperm2: DocumentPermissionsV1): DocumentPermissionsV1;
export function documentPermissionsIntersect(docperm1: DocumentPermissionsV1, docperm2: DocumentPermissionsV1): DocumentPermissionsV1;
export function normalizePermissions(permissions: Permissions): NormalizedPermissions;
export function hasPermissions<P extends NormalizedPermissions | null>(granted: P, required: RequiredPermissions<P>): boolean;
/**
 * The scope of an `authorize` question - the first argument of the plugin hook. The ladder orders
 * global → org → branch → document (see naming.md): a branch spans many documents, and the leaf a
 * permission check cares about is a document on a branch.
 */
export type PermissionScope = "global" | "org" | "branch" | "document";
/**
 * The resource an `authorize` call addresses - the shape follows the scope.
 */
export type PermissionResourceId<S extends PermissionScope = PermissionScope> = S extends "document" ? import("./types.js").DocRef : S extends "branch" ? {
    org: string;
    branch: string;
} : S extends "org" ? {
    org: string;
} : {};
/**
 * The input-form permission type answering an `authorize` question of scope `S`. The returned
 * object's `type` literal must match the scope (`'document'` → `'permissions:document:v1'`, ..) -
 * a mismatch throws at the normalize boundary, a loud validation error rather than a silent
 * denial.
 */
export type ToPermissionType<S extends PermissionScope = PermissionScope> = S extends "document" ? DocumentPermissionsV1 : S extends "branch" ? BranchPermissionsV1 : S extends "org" ? OrgPermissionsV1 : GlobalPermissionsV1;
/**
 * Permission levels: create | read | update | delete - efficiently encoded into a single string.
 *
 * The crud permission-check doesn't need a helper function:
 */
export type CRUD = "crud" | "-rud" | "c-ud" | "cr-d" | "cru-" | "--ud" | "-r-d" | "-ru-" | "c--d" | "c-u-" | "cr--" | "c---" | "-r--" | "--u-" | "---d" | "----";
export type DocumentPermissionsV1 = s.Unwrap<typeof $documentPermissionsV1>;
export type BranchPermissionsV1 = s.Unwrap<typeof $branchPermissionsV1>;
export type OrgPermissionsV1 = s.Unwrap<typeof $orgPermissionsV1>;
export type GlobalPermissionsV1 = s.Unwrap<typeof $globalPermissionsV1>;
export type Permissions = s.Unwrap<typeof $permissions>;
/**
 * The normalized view on permissions allows us to avoid typechecks: every facet is present, and
 * every denial has one spelling (crud keys `'----'`, object-valued keys `false` - an empty
 * `delete` array is also `false`; the `delete` array is sorted + deduped). The endpoint map is
 * canonical: the `'*'` fallback is kept only when it grants something and a named entry only
 * when it differs from the fallback - merges may produce redundant entries (e.g. `y: '----'`
 * next to `'*': '----'`), and dropping them gives every map one spelling, so normalized views
 * compare with plain deep equality (`endpointPermission` semantics are unchanged).
 *
 * Implication normalization: `history.rollback`/`prune` are dead grants without update access on
 * the doc (their gates demand a write), so they normalize to `false` unless `ydoc` has `u`.
 */
export type DocumentPermissionsV1Normalized = {
    type: "permissions:document:v1";
    ydoc: CRUD;
    awareness: CRUD;
    history: false | {
        from: number;
        rollback: boolean;
        prune: boolean;
        version: CRUD;
        publish: boolean;
    };
    delete: false | Array<"soft" | "hard">;
    endpoint: {
        [name: string]: CRUD;
    };
};
/**
 * The normalized view of the endpoint-only scopes (branch/org/global): the type plus a canonical
 * endpoint map (see `canonicalEndpointMap`).
 */
export type EndpointPermissionsNormalized<T extends "permissions:branch:v1" | "permissions:org:v1" | "permissions:global:v1"> = {
    type: T;
    endpoint: {
        [name: string]: CRUD;
    };
};
export type BranchPermissionsV1Normalized = EndpointPermissionsNormalized<"permissions:branch:v1">;
export type OrgPermissionsV1Normalized = EndpointPermissionsNormalized<"permissions:org:v1">;
export type GlobalPermissionsV1Normalized = EndpointPermissionsNormalized<"permissions:global:v1">;
/**
 * The normalized view of any scope (the views share the `type` discriminant).
 */
export type NormalizedPermissions = DocumentPermissionsV1Normalized | BranchPermissionsV1Normalized | OrgPermissionsV1Normalized | GlobalPermissionsV1Normalized;
/**
 * The normalized view answering an `authorize` question of scope `S` - the counterpart of
 * `ToPermissionType`.
 */
export type ToNormalizedPermissionType<S extends PermissionScope = PermissionScope> = S extends "document" ? DocumentPermissionsV1Normalized : S extends "branch" ? BranchPermissionsV1Normalized : S extends "org" ? OrgPermissionsV1Normalized : GlobalPermissionsV1Normalized;
/**
 * The requirement accepted for a permission view of `P`'s scope: an input-form permission object
 * of the same scope (`createDocumentPermissions({ ydoc: '-r--' })`, `createOrgPermissions(..)`,
 * ..). Distributes over a nullable view, so `req.permissions` (possibly null) accepts its
 * scope's requirement.
 */
export type RequiredPermissions<P extends NormalizedPermissions | null> = P extends null ? Permissions : Extract<Permissions, {
    type: NonNullable<P>["type"];
}>;
import * as s from 'lib0/schema';
//# sourceMappingURL=permissions.d.ts.map