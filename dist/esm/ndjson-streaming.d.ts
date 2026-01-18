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
    private isPlaying;
    private startTime;
    private currentEvents;
    private processedEventIndices;
    private animationFrameId;
    private loopCount;
    private cachedSequenceDuration;
    private createdNodeIds;
    private processLoopCount;
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
     * Create nodes and connections from events
     */
    private createNodesAndConnections;
    /**
     * Main event processing loop
     */
    private processEvents;
    /**
     * Schedule an event at a specific time
     */
    private scheduleEvent;
    /**
     * Adjust event time to absolute time
     */
    private adjustEventTime;
    /**
     * Get event time in seconds
     */
    private getEventTime;
    /**
     * Parse time string to seconds
     */
    private parseTimeToSeconds;
    /**
     * Parse tick time (e.g., "48i" or "0i")
     */
    private parseTickTime;
    /**
     * Parse bar:beat:subdivision time
     */
    private parseBarBeatTime;
    /**
     * Calculate the total duration of the sequence (called once and cached)
     */
    private calculateSequenceDuration;
    /**
     * Stop playback
     */
    stop(): void;
    /**
     * Check if player is currently playing
     */
    get playing(): boolean;
}
