export function testIndexFollowsTheStream(tc: t.TestCase): Promise<void>;
export function testUnquarantineKeepsIndexing(tc: t.TestCase): Promise<void>;
export function testUpdatedListing(tc: t.TestCase): Promise<void>;
export function testPagesNeverSplitAMillisecond(tc: t.TestCase): Promise<void>;
export function testPerDocumentAuthorization(tc: t.TestCase): Promise<void>;
export type Listing = {
    docs: Array<{
        docid: string;
        branch: string;
        t: number;
    }>;
    next: number;
};
import * as t from 'lib0/testing';
//# sourceMappingURL=updated.tests.d.ts.map