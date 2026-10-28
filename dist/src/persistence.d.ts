export function createPersistence(postgresUrl: string | undefined, plugins: t.PersistencePlugin[], postgresOptions?: import("postgres").Options<{}>): Promise<Persistence>;
/**
 * A Persistence implementation that persists documents in PostgreSQL.
 */
export class Persistence {
    /**
     * @param {postgres.Sql} sql
     * @param {t.PersistencePlugin[]} plugins
     */
    constructor(sql: postgres.Sql, plugins: t.PersistencePlugin[]);
    sql: postgres.Sql<any>;
    /**
     * @type {t.PersistencePlugin[]}
     */
    plugins: t.PersistencePlugin[];
    /**
     * @param {t.DocRef} docRef
     * @param {object} content
     * @param {string} content.lastClock
     * @param {Uint8Array<ArrayBuffer>} content.gcDoc
     * @param {Uint8Array<ArrayBuffer>} content.nongcDoc
     * @param {Uint8Array<ArrayBuffer>} content.contentmap
     * @param {Uint8Array<ArrayBuffer>} content.contentids
     * @returns {Promise<void>}
     */
    store(docRef: t.DocRef, { lastClock, gcDoc, nongcDoc, contentmap, contentids }: {
        lastClock: string;
        gcDoc: Uint8Array<ArrayBuffer>;
        nongcDoc: Uint8Array<ArrayBuffer>;
        contentmap: Uint8Array<ArrayBuffer>;
        contentids: Uint8Array<ArrayBuffer>;
    }): Promise<void>;
    /**
     * @param {t.DocRef} docRef
     * @return {Promise<Y.ContentMap>}
     */
    retrieveContentmap(docRef: t.DocRef): Promise<Y.ContentMap>;
    /**
     * @template {{ gc?: boolean, nongc?: boolean, contentmap?: boolean, references?: boolean, contentids?: boolean }} Include
     * @param {t.DocRef} docRef
     * @param {Include} includeContent
     * The document's tombstone is returned unconditionally - reading a document and learning whether it
     * was deleted is one round trip, never two.
     *
     * @return {Promise<{ lastClock: string, tombstone: t.Tombstone|null, gcDoc: Include['gc'] extends true ? Array<Uint8Array<ArrayBuffer>> : null, nongcDoc: Include['nongc'] extends true ? Array<Uint8Array<ArrayBuffer>> : null, contentmap: Include['contentmap'] extends true ? Array<Uint8Array<ArrayBuffer>> : null, references: Include['references'] extends true ? Array<{ assetId: t.AssetId, asset: t.Asset|null }> : null, contentids: Include['contentids'] extends true ? Array<Uint8Array<ArrayBuffer>> : null }>}
     */
    retrieveDoc<Include extends {
        gc?: boolean;
        nongc?: boolean;
        contentmap?: boolean;
        references?: boolean;
        contentids?: boolean;
    }>(docRef: t.DocRef, includeContent: Include): Promise<{
        lastClock: string;
        tombstone: t.Tombstone | null;
        gcDoc: Include["gc"] extends true ? Array<Uint8Array<ArrayBuffer>> : null;
        nongcDoc: Include["nongc"] extends true ? Array<Uint8Array<ArrayBuffer>> : null;
        contentmap: Include["contentmap"] extends true ? Array<Uint8Array<ArrayBuffer>> : null;
        references: Include["references"] extends true ? Array<{
            assetId: t.AssetId;
            asset: t.Asset | null;
        }> : null;
        contentids: Include["contentids"] extends true ? Array<Uint8Array<ArrayBuffer>> : null;
    }>;
    /**
     * Every asset stored for `docRef` - one entry per version and column - together with the
     * document's tombstone and last clock.
     *
     * *Assets*, not references: a column holds either an `asset:retrievable:v1` pointer or the bytes
     * themselves, and this returns whichever it is, unresolved. Resolving pointers through the
     * plugins is `retrieveDoc`'s job, and it is the only resolved-content path there is.
     *
     * `onlyReferences` leaves behind the columns a row marks as inline data - nothing to retrieve,
     * nothing external to delete - reporting them as `asset: null` so their bytes never leave
     * postgres. The entry is still emitted: `deleteReferences` derives the rows to delete from these
     * `assetId`s, so dropping them would strand every row whose assets are all inline.
     *
     * @template {{ gc?: boolean, nongc?: boolean, contentmap?: boolean, contentids?: boolean }} Include
     * @param {t.DocRef} docRef
     * @param {Include} includeContent
     * @param {object} [opts]
     * @param {boolean} [opts.onlyReferences]
     * @return {Promise<{ lastClock: string, tombstone: t.Tombstone|null, assets: Array<{ assetId: t.AssetId, asset: t.Asset|null }> }>}
     */
    retrieveAssets<Include extends {
        gc?: boolean;
        nongc?: boolean;
        contentmap?: boolean;
        contentids?: boolean;
    }>(docRef: t.DocRef, includeContent: Include, { onlyReferences }?: {
        onlyReferences?: boolean | undefined;
    }): Promise<{
        lastClock: string;
        tombstone: t.Tombstone | null;
        assets: Array<{
            assetId: t.AssetId;
            asset: t.Asset | null;
        }>;
    }>;
    /**
     * @param {Array<{ assetId: t.AssetId, asset: t.Asset|null }>} references
     * @return {Promise<void>}
     */
    deleteReferences(references: Array<{
        assetId: t.AssetId;
        asset: t.Asset | null;
    }>): Promise<void>;
    /**
     * The deletion record of `docRef`, or null when it was never deleted.
     *
     * @param {t.DocRef} docRef
     * @return {Promise<t.Tombstone|null>}
     */
    retrieveTombstone(docRef: t.DocRef): Promise<t.Tombstone | null>;
    /**
     * The deletion records of `org`. `purged: false` selects the documents whose content has not
     * been erased yet - what a retention task iterates - and `before` bounds `deleted_at`.
     *
     * @param {string} org
     * @param {object} [filters]
     * @param {boolean} [filters.purged]
     * @param {number} [filters.before]
     * @return {Promise<Array<t.Tombstone>>}
     */
    retrieveTombstones(org: string, { purged, before }?: {
        purged?: boolean | undefined;
        before?: number | undefined;
    }): Promise<Array<t.Tombstone>>;
    /**
     * The documents of `org` whose persisted state or deletion has a clock in `[from, to]` (unix
     * ms, inclusive), oldest first - the persisted half of the updated-documents listing. `created`
     * is the stream clock of the last change a compaction persisted; a deletion is reported at its
     * `deleted_at`. Rows are not deduplicated: a document appears twice while the row a compaction
     * superseded is still being deleted.
     *
     * Each branch orders and limits itself: the n smallest of the union are among the n smallest of
     * each branch, and the planner (postgres 16) does not push a limit through a plain
     * `UNION ALL ... ORDER BY ... LIMIT` - it would read every row of the org in range and sort
     * them. With the inner limits each branch is an index scan that stops after n rows.
     *
     * @param {string} org
     * @param {object} range
     * @param {number} range.from
     * @param {number} range.to
     * @param {number} [range.limit]
     * @return {Promise<Array<{ docid: string, branch: string, t: number }>>}
     */
    retrieveUpdatedDocs(org: string, { from, to, limit }: {
        from: number;
        to: number;
        limit?: number | undefined;
    }): Promise<Array<{
        docid: string;
        branch: string;
        t: number;
    }>>;
    /**
     * Record that `docRef` was deleted. `deletedAt` is never moved by a repeated deletion - a client
     * retry must not extend the retention window - but a soft deletion can be upgraded to a hard
     * one, never the reverse.
     *
     * @param {t.DocRef} docRef
     * @param {object} deletion
     * @param {number} deletion.deletedAt
     * @param {boolean} deletion.hard
     * @param {string|null} deletion.by
     * @return {Promise<t.Tombstone>} the resulting record, which for a repeated deletion is the
     * one that was already there
     */
    storeTombstone(docRef: t.DocRef, { deletedAt, hard, by }: {
        deletedAt: number;
        hard: boolean;
        by: string | null;
    }): Promise<t.Tombstone>;
    /**
     * @param {t.DocRef} docRef
     * @param {number} purgedAt
     * @return {Promise<t.Tombstone>}
     */
    storeTombstonePurged(docRef: t.DocRef, purgedAt: number): Promise<t.Tombstone>;
    /**
     * Drop the deletion record of `docRef`, undeleting it (see `YHub.restoreDoc`).
     *
     * @param {t.DocRef} docRef
     * @return {Promise<void>}
     */
    deleteTombstone(docRef: t.DocRef): Promise<void>;
    /**
     * The named versions of `docRef` with `from <= t <= to`, oldest first - at most `limit` of them:
     * the oldest ones, or with `order: 'desc'` the newest ones.
     *
     * @param {t.DocRef} docRef
     * @param {object} range
     * @param {number} range.from
     * @param {number} range.to
     * @param {number} [range.limit]
     * @param {'asc'|'desc'} [range.order]
     * @return {Promise<Array<t.Version>>}
     */
    retrieveVersions(docRef: t.DocRef, { from, to, limit, order }: {
        from: number;
        to: number;
        limit?: number | undefined;
        order?: "asc" | "desc" | undefined;
    }): Promise<Array<t.Version>>;
    /**
     * Create the named version of `docRef` at `t`, or with `replace` create or replace it - a
     * replacement keeps the creation fields, and moves `updated_at` past the replaced one even
     * within its millisecond (see `updateVersion`). Refused (`null`) on a hard-deleted document: the
     * `WHERE NOT EXISTS` is the deletion barrier of `store`, so a write racing a purge can't leave a
     * row behind. Without `replace` also refused when a version exists at `t`, and without
     * `mayWritePublished` when the version to replace is published - part of the statement, so a
     * version published after the caller checked can't be overwritten.
     *
     * @param {t.DocRef} docRef
     * @param {object} version
     * @param {number} version.t
     * @param {string} version.name
     * @param {Uint8Array<ArrayBuffer>} version.custom lib0-any encoded
     * @param {boolean} [version.published] omitted, the stored flag is kept (`false` for a new version)
     * @param {number} version.at unix ms of the write
     * @param {string|null} version.by userid of the writer
     * @param {object} [opts]
     * @param {boolean} [opts.replace]
     * @param {boolean} [opts.mayWritePublished] whether a published version may be replaced
     * @return {Promise<t.Version|null>} the stored version
     */
    storeVersion(docRef: t.DocRef, { t, name, custom, published, at, by }: {
        t: number;
        name: string;
        custom: Uint8Array<ArrayBuffer>;
        published?: boolean | undefined;
        at: number;
        by: string | null;
    }, { replace, mayWritePublished }?: {
        replace?: boolean | undefined;
        mayWritePublished?: boolean | undefined;
    }): Promise<t.Version | null>;
    /**
     * Replace the named version of `docRef` at `t` - only while its `updated_at` is still
     * `updatedAt`, the state the caller read. `updated_at` strictly increases with every write (a
     * write in the millisecond of the previous one lands a millisecond later), so a match means
     * nothing was written in between. Without `mayWritePublished` also only while it isn't published.
     *
     * @param {t.DocRef} docRef
     * @param {object} version
     * @param {number} version.t
     * @param {string} version.name
     * @param {Uint8Array<ArrayBuffer>} version.custom lib0-any encoded
     * @param {boolean} [version.published] omitted, the stored flag is kept
     * @param {number} version.at unix ms of the write
     * @param {string|null} version.by userid of the writer
     * @param {number} version.updatedAt the `updatedAt` the caller read
     * @param {object} [opts]
     * @param {boolean} [opts.mayWritePublished] whether a published version may be written
     * @return {Promise<{ updated: boolean, version: t.Version|null }>} the written version - or, not
     * updated, the current one (`null` when there is none)
     */
    updateVersion(docRef: t.DocRef, { t, name, custom, published, at, by, updatedAt }: {
        t: number;
        name: string;
        custom: Uint8Array<ArrayBuffer>;
        published?: boolean | undefined;
        at: number;
        by: string | null;
        updatedAt: number;
    }, { mayWritePublished }?: {
        mayWritePublished?: boolean | undefined;
    }): Promise<{
        updated: boolean;
        version: t.Version | null;
    }>;
    /**
     * Delete the named version of `docRef` at `t` - only while its `updated_at` is still
     * `updatedAt`, the state the caller read (see `updateVersion`), and without `mayWritePublished`
     * only while it isn't published.
     *
     * @param {t.DocRef} docRef
     * @param {object} version
     * @param {number} version.t
     * @param {number} version.updatedAt the `updatedAt` the caller read
     * @param {object} [opts]
     * @param {boolean} [opts.mayWritePublished] whether a published version may be deleted
     * @return {Promise<{ deleted: boolean, version: t.Version|null }>} not deleted, the current
     * version (`null` when there is none)
     */
    deleteVersion(docRef: t.DocRef, { t, updatedAt }: {
        t: number;
        updatedAt: number;
    }, { mayWritePublished }?: {
        mayWritePublished?: boolean | undefined;
    }): Promise<{
        deleted: boolean;
        version: t.Version | null;
    }>;
    /**
     * Erase every stored version of `docRef`, through the same `deleteReferences` path compaction
     * uses to drop superseded versions - so there is one way to delete stored content, and it
     * always removes the row before the asset it points at. The reverse order would leave rows
     * referencing objects that no longer exist, which read back as silently missing content. The
     * named versions of `docRef` go with it.
     *
     * Idempotent: the reference listing covers rows whose objects are already gone, so re-running
     * this is how a compaction that was still in flight when the document was deleted gets
     * cleaned up.
     *
     * @param {t.DocRef} docRef
     * @return {Promise<number>} the number of erased references
     */
    purgeDoc(docRef: t.DocRef): Promise<number>;
    destroy(): Promise<void>;
}
import * as t from './types.js';
import postgres from 'postgres';
import * as Y from '@y/y';
//# sourceMappingURL=persistence.d.ts.map