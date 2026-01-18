// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
import { scheduleOrExecuteEvent } from './event-scheduler.js';

/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export function parseNDJSON(ndjson: string): SequenceEvent[] {
  const lines = ndjson.split('\n');
  const events: SequenceEvent[] = [];

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    // Skip empty or whitespace-only lines
    if (line.length === 0) {
      return;
    }

    try {
      const parsed = JSON.parse(line) as SequenceEvent;
      events.push(parsed);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Log detailed information for debugging
      console.error('Failed to parse NDJSON line:', {
        lineNumber: index + 1,
        lineContent: line,
        error,
      });

      // Surface a clear, user-facing error so invalid NDJSON can be fixed
      throw new Error(
        `Failed to parse NDJSON input at line ${index + 1}: ${errorMessage}`,
      );
    }
  });

  return events;
}

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
}

/**
 * NDJSON Streaming Player
 * Processes events with lookahead timing and supports live editing and loop playback
 */
export class NDJSONStreamingPlayer {
  private Tone: typeof ToneTypes;
  private nodes: SequencerNodes;
  private config: Required<NDJSONStreamingConfig>;
  private isPlaying: boolean = false;
  private startTime: number = 0;
  private currentEvents: SequenceEvent[] = [];
  private processedEventIndices: Set<number> = new Set();
  private animationFrameId: number | null = null;
  private loopCount: number = 0;
  private cachedSequenceDuration: number = 0;
  private createdNodeIds: Set<number> = new Set();

  constructor(
    Tone: typeof ToneTypes,
    nodes: SequencerNodes,
    config: NDJSONStreamingConfig = {}
  ) {
    this.Tone = Tone;
    this.nodes = nodes;
    this.config = {
      lookaheadMs: config.lookaheadMs ?? 50,
      loop: config.loop ?? false,
      onLoopComplete: config.onLoopComplete ?? (() => {}),
      ticksPerQuarter: config.ticksPerQuarter ?? 480,
      beatsPerMinute: config.beatsPerMinute ?? 120,
      beatsPerBar: config.beatsPerBar ?? 4,
      subdivisionsPerBeat: config.subdivisionsPerBeat ?? 4,
      endBufferSeconds: config.endBufferSeconds ?? 1
    };
  }

  /**
   * Start or update the streaming playback
   * @param eventsOrNDJSON - Array of events or NDJSON string
   */
  async start(eventsOrNDJSON: SequenceEvent[] | string): Promise<void> {
    // Parse events if NDJSON string is provided
    const events = typeof eventsOrNDJSON === 'string'
      ? parseNDJSON(eventsOrNDJSON)
      : eventsOrNDJSON;

    // If not playing, initialize playback
    if (!this.isPlaying) {
      await this.initializePlayback(events);
    } else {
      // If already playing, update events for live editing
      this.updateEvents(events);
    }
  }

  /**
   * Initialize playback
   */
  private async initializePlayback(events: SequenceEvent[]): Promise<void> {
    // Handle empty events array
    if (events.length === 0) {
      console.warn('No events to play');
      return;
    }

    this.isPlaying = true;
    this.currentEvents = events;
    this.processedEventIndices.clear();
    this.loopCount = 0;
    this.createdNodeIds.clear();
    
    // Set start time as current time + lookahead
    this.startTime = this.Tone.now() + this.config.lookaheadMs / 1000;

    // Create nodes and connections first
    await this.createNodesAndConnections();

    // Cache sequence duration
    this.cachedSequenceDuration = this.calculateSequenceDuration();

    // Start processing loop
    this.processEvents();
  }

  /**
   * Update events during playback (for live editing)
   */
  private updateEvents(events: SequenceEvent[]): void {
    // Handle empty events array
    if (events.length === 0) {
      console.warn('No events to update');
      return;
    }

    // Find events that need to be created/connected
    const newCreateAndConnectEvents = events.filter(
      e => e.eventType === 'createNode' || e.eventType === 'connect'
    );
    
    // Process any new node creation or connection events (idempotent)
    newCreateAndConnectEvents.forEach(event => {
      try {
        // Check if node already exists for createNode events
        if (event.eventType === 'createNode') {
          if (this.createdNodeIds.has(event.nodeId)) {
            return; // Skip if node already created
          }
          this.createdNodeIds.add(event.nodeId);
        }
        scheduleOrExecuteEvent(this.Tone, this.nodes, event);
      } catch (error) {
        console.error('Error processing new node/connection:', error);
      }
    });

    // Update current events
    this.currentEvents = events;
    
    // Reset processed indices so that edited events can be scheduled
    this.processedEventIndices.clear();
    
    // Recalculate sequence duration
    this.cachedSequenceDuration = this.calculateSequenceDuration();
  }

  /**
   * Create nodes and connections from events
   */
  private async createNodesAndConnections(): Promise<void> {
    this.currentEvents.forEach(event => {
      try {
        if (event.eventType === 'createNode' || event.eventType === 'connect') {
          if (event.eventType === 'createNode') {
            this.createdNodeIds.add(event.nodeId);
          }
          scheduleOrExecuteEvent(this.Tone, this.nodes, event);
        }
      } catch (error) {
        console.error('Error creating node or connection:', error);
      }
    });

    // Wait for audio buffers to load
    await this.Tone.loaded();
  }

  /**
   * Main event processing loop
   */
  private processEvents(): void {
    if (!this.isPlaying) return;

    const currentTime = this.Tone.now();
    const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;

    // Use cached sequence duration
    const sequenceDuration = this.cachedSequenceDuration;

    // Process events within lookahead window
    this.currentEvents.forEach((event, index) => {
      // Skip createNode and connect events
      if (event.eventType === 'createNode' || event.eventType === 'connect') {
        return;
      }

      // Get event time from args (last argument is time)
      const eventTime = this.getEventTime(event);
      if (eventTime === null) return;

      // Calculate absolute time with loop offset
      const loopOffset = this.loopCount * sequenceDuration;
      const absoluteTime = this.startTime + eventTime + loopOffset;

      // Check if event should be scheduled
      if (absoluteTime <= lookaheadTime && !this.processedEventIndices.has(index + this.loopCount * this.currentEvents.length)) {
        this.scheduleEvent(event, absoluteTime);
        this.processedEventIndices.add(index + this.loopCount * this.currentEvents.length);
      }
    });

    // Check if we need to loop
    if (this.config.loop && sequenceDuration > 0) {
      const timeSinceStart = currentTime - this.startTime;
      const completedLoops = Math.floor(timeSinceStart / sequenceDuration);
      
      // Guard against multiple increments due to processing delays
      if (completedLoops > this.loopCount) {
        this.loopCount = completedLoops;
        this.config.onLoopComplete();
      }
    }

    // Continue processing
    this.animationFrameId = requestAnimationFrame(() => this.processEvents());
  }

  /**
   * Schedule an event at a specific time
   */
  private scheduleEvent(event: SequenceEvent, absoluteTime: number): void {
    try {
      // Create a modified event with adjusted time
      const modifiedEvent = this.adjustEventTime(event, absoluteTime);
      
      // Debug logging for timing issues
      if (typeof window !== 'undefined' && (window as any).DEBUG_TIMING) {
        console.log('[NDJSONStreaming] Scheduling event:', {
          eventType: event.eventType,
          originalArgs: 'args' in event ? event.args : undefined,
          modifiedArgs: 'args' in modifiedEvent ? modifiedEvent.args : undefined,
          absoluteTime,
          now: this.Tone.now(),
          startTime: this.startTime,
          loopCount: this.loopCount
        });
      }
      
      scheduleOrExecuteEvent(this.Tone, this.nodes, modifiedEvent);
    } catch (error) {
      console.error('Error scheduling event:', error, event);
    }
  }

  /**
   * Adjust event time to absolute time
   */
  private adjustEventTime(event: SequenceEvent, absoluteTime: number): SequenceEvent {
    const modifiedEvent = { ...event };
    
    if ('args' in modifiedEvent && Array.isArray(modifiedEvent.args)) {
      const args = [...modifiedEvent.args];
      
      // For triggerAttackRelease, we need to convert both duration and time
      if (event.eventType === 'triggerAttackRelease' && args.length >= 3) {
        // Convert duration (second argument) from tick notation to seconds if needed
        const durationArg = args[1];
        if (typeof durationArg === 'string') {
          const durationSeconds = this.parseTickTime(durationArg);
          args[1] = durationSeconds.toString();
        }
        
        // Set absolute time (third argument) in seconds
        args[2] = absoluteTime.toString();
      } else {
        // For other events, just update the last argument (time)
        if (args.length > 0) {
          args[args.length - 1] = absoluteTime.toString();
        }
      }
      
      modifiedEvent.args = args;
    }
    
    return modifiedEvent;
  }

  /**
   * Get event time in seconds
   */
  private getEventTime(event: SequenceEvent): number | null {
    if (!('args' in event) || !Array.isArray(event.args) || event.args.length === 0) {
      return null;
    }

    const timeArg = event.args[event.args.length - 1];
    return this.parseTimeToSeconds(timeArg);
  }

  /**
   * Parse time string to seconds
   */
  private parseTimeToSeconds(timeStr: string): number {
    // Handle different time formats
    if (timeStr.startsWith('+')) {
      // Relative time with tick notation (e.g., "+0i")
      return this.parseTickTime(timeStr.substring(1));
    } else if (timeStr.includes(':')) {
      // Bar:beat:subdivision format (e.g., "0:0:2")
      return this.parseBarBeatTime(timeStr);
    } else {
      // Direct number or tick notation
      return this.parseTickTime(timeStr);
    }
  }

  /**
   * Parse tick time (e.g., "48i" or "0i")
   */
  private parseTickTime(timeStr: string): number {
    const match = timeStr.match(/^(\d+(?:\.\d+)?)(i)?$/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const ticksPerQuarter = this.config.ticksPerQuarter;
    const secondsPerBeat = 60 / this.config.beatsPerMinute;
    return (value / ticksPerQuarter) * secondsPerBeat;
  }

  /**
   * Parse bar:beat:subdivision time
   */
  private parseBarBeatTime(timeStr: string): number {
    const parts = timeStr.split(':').map(Number);
    if (parts.length !== 3) return 0;

    // Validate that all parts are valid numbers
    if (parts.some(isNaN)) {
      console.error('Invalid bar:beat:subdivision format:', timeStr);
      return 0;
    }

    const [bars, beats, subdivisions] = parts;
    const beatsPerBar = this.config.beatsPerBar;
    const secondsPerBeat = 60 / this.config.beatsPerMinute;
    const subdivisionsPerBeat = this.config.subdivisionsPerBeat;

    return (
      bars * beatsPerBar * secondsPerBeat +
      beats * secondsPerBeat +
      subdivisions * (secondsPerBeat / subdivisionsPerBeat)
    );
  }

  /**
   * Calculate the total duration of the sequence (called once and cached)
   */
  private calculateSequenceDuration(): number {
    let maxTime = 0;

    this.currentEvents.forEach(event => {
      if (event.eventType === 'createNode' || event.eventType === 'connect') {
        return;
      }

      const eventTime = this.getEventTime(event);
      if (eventTime !== null && eventTime > maxTime) {
        maxTime = eventTime;
      }
    });

    // Add buffer for the last note's duration
    return maxTime + this.config.endBufferSeconds;
  }

  /**
   * Stop playback
   */
  stop(): void {
    this.isPlaying = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    // Don't dispose nodes here - let the caller manage node lifecycle
    // this.nodes.disposeAll();
    this.processedEventIndices.clear();
    this.loopCount = 0;
    this.createdNodeIds.clear();
    this.cachedSequenceDuration = 0;
  }

  /**
   * Check if player is currently playing
   */
  get playing(): boolean {
    return this.isPlaying;
  }
}
