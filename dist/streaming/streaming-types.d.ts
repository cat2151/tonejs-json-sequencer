import type { SequenceEvent } from '../types.js';
/**
 * Predicted scheduling information for an event
 */
export interface EventPrediction {
    eventIndex: number;
    eventType: string;
    timeNotation: string;
    timeSeconds: number;
    expectedScheduleTime: number;
    loopIteration: number;
}
/**
 * Information about a scheduled event
 */
export interface EventScheduledInfo {
    eventIndex: number;
    loopIteration: number;
    absoluteTime: number;
    event: SequenceEvent;
}
/**
 * Debug callback function type
 */
export type DebugCallback = (message: string, data?: any) => void;
/**
 * Configuration for NDJSON streaming player
 *
 * Note: Timing-related properties (beatsPerMinute, ticksPerQuarter, etc.) are used
 * only for internal time format parsing (converting tick notation and bar:beat:subdivision
 * format to seconds). These do not affect global Tone.Transport settings.
 */
export interface NDJSONStreamingConfig {
    /** Lookahead time in milliseconds (default: 50ms) */
    lookaheadMs?: number;
    /** Whether to loop playback (default: false) */
    loop?: boolean;
    /** Wait time in seconds between loop iterations (default: 0.5) */
    loopWaitSeconds?: number;
    /** Callback when playback completes a loop iteration */
    onLoopComplete?: () => void;
    /** Ticks per quarter note for timing calculations (default: 192, Tone.js standard) */
    ticksPerQuarter?: number;
    /** Beats per minute for timing calculations (default: 120) */
    beatsPerMinute?: number;
    /** Beats per bar for time signature (default: 4) */
    beatsPerBar?: number;
    /** Subdivisions per beat (default: 4) */
    subdivisionsPerBeat?: number;
    /** Buffer time in seconds to add after last event (default: 1) */
    endBufferSeconds?: number;
    /** Enable debug mode for detailed logging (default: false) */
    debug?: boolean;
    /** Callback for debug messages (default: console.log) */
    onDebug?: DebugCallback;
    /** Callback when an event is scheduled (default: no-op) */
    onEventScheduled?: (info: EventScheduledInfo) => void;
}
