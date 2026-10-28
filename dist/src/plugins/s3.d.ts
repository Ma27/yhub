/**
 * @typedef {{ bucket: string, endPoint: string, port: number, useSSL: boolean, accessKey: string, secretKey: string, enable?: boolean, branches?: true | Array<string>, deleteVersions?: boolean, retryDelay?: number, deleteDelay?: number, requestTimeout?: number }} S3Conf
 */
export const $retrievableS3Asset: s.Schema<{
    versionId?: string | undefined;
    type: "asset:retrievable:v1";
    plugin: "S3Persistence:v1";
}>;
/**
 * @implements {t.PersistencePlugin}
 */
export class S3PersistenceV1 implements t.PersistencePlugin {
    /**
     * @param {S3Conf} s3conf
     */
    constructor(s3conf: S3Conf);
    bucket: string;
    enable: boolean;
    branches: true | string[];
    deleteVersions: boolean;
    retryDelay: number;
    deleteDelay: number;
    _agent: http.Agent;
    s3client: S3Client;
    /**
     * @return {'S3Persistence:v1'}
     */
    get pluginid(): "S3Persistence:v1";
    init(): Promise<void>;
    /**
     * @param {t.AssetId} assetId
     * @param {t.Asset} asset
     * @return {Promise<RetrievableS3Asset?>}
     */
    store(assetId: t.AssetId, asset: t.Asset): Promise<RetrievableS3Asset | null>;
    /**
     * @param {t.AssetId} assetId
     * @param {t.Asset} assetInfo
     * @return {Promise<t.Asset?>}
     */
    retrieve(assetId: t.AssetId, assetInfo: t.Asset): Promise<t.Asset | null>;
    /**
     * The erase is deferred by `deleteDelay` so that a reader that already resolved the reference
     * can still fetch the object. Keep it at 10 seconds or more - a shorter window races those
     * in-flight reads, which then fail to retrieve a document they were legitimately handed.
     *
     * @param {t.AssetId} assetId
     * @param {t.Asset} assetInfo
     * @return {Promise<boolean>}
     */
    delete(assetId: t.AssetId, assetInfo: t.Asset): Promise<boolean>;
    /**
     * Remove the object at `path`, retrying once on a transient error - the erase is deferred and
     * unobserved, so a dropped connection would otherwise orphan the object. With `deleteVersions`
     * (the default) the version recorded on the reference is deleted directly; unrecorded versions
     * and the delete markers plain deletes leave on a versioned bucket are the operator's cleanup,
     * e.g. via bucket lifecycle rules.
     *
     * @param {string} path
     * @param {string} [versionId]
     */
    _erase(path: string, versionId?: string): Promise<void>;
}
export type S3Conf = {
    bucket: string;
    endPoint: string;
    port: number;
    useSSL: boolean;
    accessKey: string;
    secretKey: string;
    enable?: boolean;
    branches?: true | Array<string>;
    deleteVersions?: boolean;
    retryDelay?: number;
    deleteDelay?: number;
    requestTimeout?: number;
};
export type RetrievableS3Asset = s.Unwrap<typeof $retrievableS3Asset>;
import * as s from 'lib0/schema';
import * as t from '../types.js';
import http from 'http';
import { Client as S3Client } from 'minio';
//# sourceMappingURL=s3.d.ts.map