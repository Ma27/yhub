export function sizeLabel(bytes: number): string;
export function toGcUpdate(nongcUpdate: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer>;
export function getFixture({ variant, targetBytes }: {
    variant?: "fresh" | "churned" | "rowChurn" | undefined;
    targetBytes: number;
}): Fixture;
export function makeCellUpdates(count: number, { seed, cellsPerUpdate }?: {
    seed?: number | undefined;
    cellsPerUpdate?: number | undefined;
}): Array<Uint8Array<ArrayBuffer>>;
export function makeNonceUpdate(nonce: string): Uint8Array<ArrayBuffer>;
export function makeBatchUpdate(cellCount: number, seed?: number): Uint8Array<ArrayBuffer>;
export function usedFixtures(): {
    variant: "fresh" | "churned" | "rowChurn";
    targetBytes: number;
}[];
export function generateAll(): {
    variant: "fresh" | "churned" | "rowChurn";
    target: string;
    cells: number;
    'gc (MB)': number;
    'nongc (MB)': number;
    'cells/MB': number;
}[];
export type Fixture = {
    update: Uint8Array<ArrayBuffer>;
    gcUpdate: Uint8Array<ArrayBuffer>;
    gcBytes: number;
    nongcBytes: number;
    cells: number;
    variant: string;
    targetBytes: number;
};
//# sourceMappingURL=fixtures.d.ts.map