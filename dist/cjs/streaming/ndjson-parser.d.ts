import type { SequenceEvent } from '../types.js';
/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export declare function parseNDJSON(ndjson: string): SequenceEvent[];
