// Tone.js JSON Sequencer - Playback State Manager
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type { SequenceEvent } from '../types.js';

/**
 * Manages playback state for the streaming player
 */
export class PlaybackState {
  private _isPlaying: boolean = false;
  private _startTime: number = 0;
  private _currentEvents: SequenceEvent[] = [];
  private _processedEventIndices: Set<number> = new Set();
  private _loopCount: number = 0;
  private _cachedSequenceDuration: number = 0;
  private _createdNodeIds: Set<number> = new Set();
  private _processLoopCount: number = 0;

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get startTime(): number {
    return this._startTime;
  }

  set startTime(value: number) {
    this._startTime = value;
  }

  get currentEvents(): SequenceEvent[] {
    return this._currentEvents;
  }

  set currentEvents(events: SequenceEvent[]) {
    this._currentEvents = events;
  }

  get processedEventIndices(): Set<number> {
    return this._processedEventIndices;
  }

  get loopCount(): number {
    return this._loopCount;
  }

  set loopCount(value: number) {
    this._loopCount = value;
  }

  get cachedSequenceDuration(): number {
    return this._cachedSequenceDuration;
  }

  set cachedSequenceDuration(value: number) {
    this._cachedSequenceDuration = value;
  }

  get createdNodeIds(): Set<number> {
    return this._createdNodeIds;
  }

  get processLoopCount(): number {
    return this._processLoopCount;
  }

  incrementProcessLoopCount(): void {
    this._processLoopCount++;
  }

  /**
   * Start playback
   */
  start(events: SequenceEvent[], startTime: number): void {
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
  stop(): void {
    this._isPlaying = false;
    this._processedEventIndices.clear();
    this._loopCount = 0;
    this._createdNodeIds.clear();
    this._cachedSequenceDuration = 0;
    this._processLoopCount = 0;
  }

  /**
   * Reset all processed events (used for complete reset)
   */
  resetProcessedEvents(): void {
    this._processedEventIndices.clear();
  }
}
