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
 * Debug information for a single event
 */
export interface DebugEventInfo {
    eventIndex: number;
    eventType: string;
    scheduledTime: number;
    currentTime: number;
    timeDelta: number;
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
    private Tone;
    private nodes;
    private config;
    private playbackState;
    private timeParser;
    private eventProcessor;
    private animationFrameId;
    constructor(Tone: typeof ToneTypes, nodes: SequencerNodes, config?: NDJSONStreamingConfig);
    /**
     * Log debug message if debug mode is enabled
     */
    private debug;
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
     *
     * TIMING SPECIFICATION:
     * This loop runs continuously via requestAnimationFrame (~60fps, every ~16ms).
     * For each iteration:
     * 1. Calculate current time and lookahead window (current + 50ms)
     * 2. For each event, calculate its absolute playback time (startTime + eventTime)
     * 3. If the event's absolute time falls within the lookahead window:
     *    - Schedule the event to play at its absolute time
     *    - Mark it as processed to prevent duplicate scheduling
     *
     * This ensures events are scheduled ~50ms before they need to play,
     * compensating for jitter and providing the audio context with advance notice.
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
