import type * as ToneTypes from 'tone';
import type { SequenceEvent } from '../types.js';
import type { SequencerNodes } from '../sequencer-nodes.js';
import type { TimeParser } from '../utils/time-parser.js';
/**
 * Processes events for the streaming player
 */
export declare class EventProcessor {
    private Tone;
    private nodes;
    private timeParser;
    constructor(Tone: typeof ToneTypes, nodes: SequencerNodes, timeParser: TimeParser);
    /**
     * Create nodes and connections from events
     */
    createNodesAndConnections(events: SequenceEvent[], createdNodeIds: Set<number>): Promise<void>;
    /**
     * Process new node creation and connection events (for live editing)
     */
    processNewCreateAndConnectEvents(events: SequenceEvent[], createdNodeIds: Set<number>): void;
    /**
     * Schedule an event at a specific time
     */
    scheduleEvent(event: SequenceEvent, absoluteTime: number): void;
    /**
     * Adjust event time to absolute time
     */
    private adjustEventTime;
    /**
     * Get event time in seconds
     */
    getEventTime(event: SequenceEvent): number | null;
    /**
     * Calculate the total duration of the sequence
     * @param events - Array of sequence events
     * @param endBufferSeconds - Buffer time to add after sequence
     * @param isLoopMode - Whether the sequence will be looped (affects duration calculation)
     */
    calculateSequenceDuration(events: SequenceEvent[], endBufferSeconds: number, isLoopMode?: boolean): number;
}
