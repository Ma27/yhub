export const messageSync: 0;
export const messageAwareness: 1;
export const messageAuth: 2;
export const messageQueryAwareness: 3;
export const messageSyncStep1: 0;
export const messageSyncStep2: 1;
export const messageSyncUpdate: 2;
export function mergeAwarenessUpdates(ms: Array<Uint8Array>): Uint8Array<ArrayBuffer>;
export function encodeSyncStep1(sv: Uint8Array): Uint8Array<ArrayBuffer>;
export function encodeSyncStep2(diff: Uint8Array): Uint8Array<ArrayBuffer>;
export function writeSyncUpdate(encoder: encoding.Encoder, update: Uint8Array): void;
export function encodeSyncUpdate(update: Uint8Array): Uint8Array<ArrayBuffer>;
export function writeAwarenessUpdate(encoder: encoding.Encoder, awUpdate: Uint8Array): void;
export function encodeAwareness(awareness: awarenessProtocol.Awareness, clients: Array<number>): Uint8Array<ArrayBuffer>;
/**
 * An awareness message holding a zero-count awareness update. Receivers apply nothing, but it is
 * still a message: it resets y-websocket's `socketTimeout` (see `server.wsKeepAliveInterval`).
 */
export const awarenessKeepAliveMessage: Uint8Array<ArrayBuffer>;
export function encodeAwarenessUserDisconnected(clientid: number, lastClock: number): Uint8Array<ArrayBuffer>;
import * as encoding from 'lib0/encoding';
import * as awarenessProtocol from '@y/protocols/awareness';
//# sourceMappingURL=protocol.d.ts.map