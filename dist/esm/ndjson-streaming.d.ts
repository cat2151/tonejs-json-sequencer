import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export declare function parseNDJSON(ndjson: string): SequenceEvent[];
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
    /** Ticks per quarter note for timing calculations (default: 480) */
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
}
/**
 * NDJSON Streaming Player
 * Processes events with lookahead timing and supports live editing and loop playback
 */
export declare class NDJSONStreamingPlayer {
    private static readonly SCHEDULE_TIME_TOLERANCE_SECONDS;
    private Tone;
    private nodes;
    private config;
    private playbackState;
    private timeParser;
    private eventProcessor;
    private animationFrameId;
    private eventPredictions;
    constructor(Tone: typeof ToneTypes, nodes: SequencerNodes, config?: NDJSONStreamingConfig);
    /**
     * Log debug message if debug mode is enabled
     */
    private debug;
    /**
     * Check if an event is schedulable (i.e., not a setup/metadata event)
     */
    private isSchedulableEvent;
    /**
     * Extract time notation from event args
     */
    private getTimeNotation;
    /**
     * Generate event scheduling predictions
     * Creates predictions for the first loop and the first event of the next loop
     */
    private generatePredictions;
    /**
     * Start or update the streaming playback
     * @param eventsOrNDJSON - Array of events or NDJSON string
     */
    start(eventsOrNDJSON: SequenceEvent[] | string): Promise<void>;
    /**
     * Initialize playback
     */
    private initializePlayback;
    /**
     * Update events during playback (for live editing)
     */
    private updateEvents;
    /**
     * Main event processing loop
     */
    private processEvents;
    /**
     * Stop playback
     */
    stop(): void;
    /**
     * Check if player is currently playing
     */
    get playing(): boolean;
}
