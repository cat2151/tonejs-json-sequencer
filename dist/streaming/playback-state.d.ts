import type { SequenceEvent } from '../types.js';
/**
 * Manages playback state for the streaming player
 */
export declare class PlaybackState {
    private _isPlaying;
    private _startTime;
    private _currentEvents;
    private _processedEventIndices;
    private _loopCount;
    private _cachedSequenceDuration;
    private _createdNodeIds;
    private _processLoopCount;
    get isPlaying(): boolean;
    get startTime(): number;
    set startTime(value: number);
    get currentEvents(): SequenceEvent[];
    set currentEvents(events: SequenceEvent[]);
    get processedEventIndices(): Set<number>;
    get loopCount(): number;
    set loopCount(value: number);
    get cachedSequenceDuration(): number;
    set cachedSequenceDuration(value: number);
    get createdNodeIds(): Set<number>;
    get processLoopCount(): number;
    incrementProcessLoopCount(): void;
    /**
     * Start playback
     */
    start(events: SequenceEvent[], startTime: number): void;
    /**
     * Stop playback
     */
    stop(): void;
    /**
     * Mark an event as processed
     * @param eventKey - The event key to mark as processed
     */
    markEventAsProcessed(eventKey: number): void;
    /**
     * Reset all processed events (used for complete reset)
     */
    resetProcessedEvents(): void;
}
