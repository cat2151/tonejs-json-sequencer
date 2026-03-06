import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
import type { NDJSONStreamingConfig } from './streaming/streaming-types.js';
export { parseNDJSON } from './streaming/ndjson-parser.js';
export type { EventPrediction, EventScheduledInfo, DebugCallback, NDJSONStreamingConfig } from './streaming/streaming-types.js';
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
    private predictionManager;
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
