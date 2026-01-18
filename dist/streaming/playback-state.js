"use strict";
// Tone.js JSON Sequencer - Playback State Manager
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackState = void 0;
/**
 * Manages playback state for the streaming player
 */
class PlaybackState {
    constructor() {
        this._isPlaying = false;
        this._startTime = 0;
        this._currentEvents = [];
        this._processedEventIndices = new Set();
        this._loopCount = 0;
        this._cachedSequenceDuration = 0;
        this._createdNodeIds = new Set();
        this._processLoopCount = 0;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    get startTime() {
        return this._startTime;
    }
    set startTime(value) {
        this._startTime = value;
    }
    get currentEvents() {
        return this._currentEvents;
    }
    set currentEvents(events) {
        this._currentEvents = events;
    }
    get processedEventIndices() {
        return this._processedEventIndices;
    }
    get loopCount() {
        return this._loopCount;
    }
    set loopCount(value) {
        this._loopCount = value;
    }
    get cachedSequenceDuration() {
        return this._cachedSequenceDuration;
    }
    set cachedSequenceDuration(value) {
        this._cachedSequenceDuration = value;
    }
    get createdNodeIds() {
        return this._createdNodeIds;
    }
    get processLoopCount() {
        return this._processLoopCount;
    }
    incrementProcessLoopCount() {
        this._processLoopCount++;
    }
    /**
     * Start playback
     */
    start(events, startTime) {
        this._isPlaying = true;
        this._currentEvents = events;
        this._startTime = startTime;
        this._processedEventIndices.clear();
        this._loopCount = 0;
        this._createdNodeIds.clear();
        this._processLoopCount = 0;
    }
    /**
     * Stop playback
     */
    stop() {
        this._isPlaying = false;
        this._processedEventIndices.clear();
        this._loopCount = 0;
        this._createdNodeIds.clear();
        this._cachedSequenceDuration = 0;
        this._processLoopCount = 0;
    }
    /**
     * Mark an event as processed
     * @param eventKey - The event key to mark as processed
     */
    markEventAsProcessed(eventKey) {
        this._processedEventIndices.add(eventKey);
    }
    /**
     * Reset all processed events (used for complete reset)
     */
    resetProcessedEvents() {
        this._processedEventIndices.clear();
    }
}
exports.PlaybackState = PlaybackState;
