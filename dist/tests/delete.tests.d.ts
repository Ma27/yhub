export function testSoftDeleteKeepsContent(tc: t.TestCase): Promise<void>;
export function testRestoreDoc(tc: t.TestCase): Promise<void>;
export function testRestoreRefusesErasedContent(tc: t.TestCase): Promise<void>;
export function testHardDeleteErasesContent(tc: t.TestCase): Promise<void>;
export function testHardDeleteBlocksPersistence(tc: t.TestCase): Promise<void>;
export function testRetentionSweep(tc: t.TestCase): Promise<void>;
export function testDeleteIsBranchScoped(tc: t.TestCase): Promise<void>;
export function testDeletedRestApi(tc: t.TestCase): Promise<void>;
export function testWsKickOnDelete(tc: t.TestCase): Promise<void>;
export function testHardDeleteClearsStream(tc: t.TestCase): Promise<void>;
export function testGetDeletedDocs(tc: t.TestCase): Promise<void>;
export function testInlineAssetsPurgeWithoutFetching(tc: t.TestCase): Promise<void>;
export function testPreMigrationRowsPurge(tc: t.TestCase): Promise<void>;
export function testMissingObjectRowIsPurged(tc: t.TestCase): Promise<void>;
import * as t from 'lib0/testing';
//# sourceMappingURL=delete.tests.d.ts.map