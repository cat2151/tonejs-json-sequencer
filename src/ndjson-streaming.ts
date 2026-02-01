// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
import { TimeParser, type TimeParserConfig } from './utils/time-parser.js';
import { PlaybackState } from './streaming/playback-state.js';
import { EventProcessor } from './streaming/event-processor.js';

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
export class NDJSONStreamingPlayer {
  private Tone: typeof ToneTypes;
  private nodes: SequencerNodes;
  private config: Required<NDJSONStreamingConfig>;
  private playbackState: PlaybackState;
  private timeParser: TimeParser;
  private eventProcessor: EventProcessor;
  private animationFrameId: number | null = null;

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
      loopWaitSeconds: config.loopWaitSeconds ?? 0.5,
      onLoopComplete: config.onLoopComplete ?? (() => {}),
      ticksPerQuarter: config.ticksPerQuarter ?? 480,
      beatsPerMinute: config.beatsPerMinute ?? 120,
      beatsPerBar: config.beatsPerBar ?? 4,
      subdivisionsPerBeat: config.subdivisionsPerBeat ?? 4,
      endBufferSeconds: config.endBufferSeconds ?? 1,
      debug: config.debug ?? false,
      onDebug: config.onDebug ?? ((msg, data) => console.log(`[DEBUG] ${msg}`, data ?? ''))
    };

    this.playbackState = new PlaybackState();
    this.timeParser = new TimeParser({
      ticksPerQuarter: this.config.ticksPerQuarter,
      beatsPerMinute: this.config.beatsPerMinute,
      beatsPerBar: this.config.beatsPerBar,
      subdivisionsPerBeat: this.config.subdivisionsPerBeat
    });
    this.eventProcessor = new EventProcessor(this.Tone, this.nodes, this.timeParser);
  }

  /**
   * Log debug message if debug mode is enabled
   */
  private debug(message: string, data?: any): void {
    if (this.config.debug) {
      this.config.onDebug(message, data);
    }
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
    if (!this.playbackState.isPlaying) {
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

    this.debug('=== Initializing Playback ===');
    this.debug('Total events', events.length);

    // Set start time as current time + lookahead
    const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
    this.playbackState.start(events, startTime);

    this.debug('Start time', { 
      startTime: startTime.toFixed(3),
      currentTime: this.Tone.now().toFixed(3),
      lookaheadMs: this.config.lookaheadMs
    });

    // Create nodes and connections first
    await this.eventProcessor.createNodesAndConnections(
      events,
      this.playbackState.createdNodeIds
    );

    // Cache sequence duration
    // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
    const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
    this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(
      events,
      endBuffer
    );

    this.debug('Sequence duration', {
      duration: this.playbackState.cachedSequenceDuration.toFixed(3),
      loopEnabled: this.config.loop
    });

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

    this.debug('=== Live Editing: Updating Events ===', { 
      previousCount: this.playbackState.currentEvents.length,
      newCount: events.length
    });

    // Process any new node creation or connection events (idempotent)
    this.eventProcessor.processNewCreateAndConnectEvents(
      events,
      this.playbackState.createdNodeIds
    );
    
    // Store previous values before updating
    const previousEvents = this.playbackState.currentEvents;
    const previousDuration = this.playbackState.cachedSequenceDuration;
    
    // Recalculate sequence duration with new events
    // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
    const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
    this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(
      events,
      endBuffer
    );

    this.debug('Updated sequence duration', {
      previous: previousDuration.toFixed(3),
      new: this.playbackState.cachedSequenceDuration.toFixed(3)
    });

    // Get current time to determine which events have already been scheduled
    const currentTime = this.Tone.now();
    
    // Clear and rebuild processed events set
    // Mark events as processed if their scheduled time has already passed
    // IMPORTANT: Use previous duration and previous array length for calculations
    // because that's what was used when events were actually scheduled
    this.playbackState.resetProcessedEvents();
    
    events.forEach((event, index) => {
      // Skip createNode and connect events
      if (event.eventType === 'createNode' || event.eventType === 'connect') {
        return;
      }

      const eventTime = this.eventProcessor.getEventTime(event);
      if (eventTime === null) return;

      // Check all loop iterations that may have occurred
      for (let loop = 0; loop <= this.playbackState.loopCount; loop++) {
        // Use previous duration for loop offset calculation
        // because that's what was used when events were originally scheduled
        // Wait time is only added between loops (not for the first iteration)
        const loopWaitOffset = loop > 0 ? loop * this.config.loopWaitSeconds : 0;
        const loopOffset = loop * previousDuration + loopWaitOffset;
        const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
        
        // If this event's scheduled time has passed, mark it as processed
        if (absoluteTime <= currentTime) {
          // Use previous array length for event key calculation
          // because that's what was used when events were originally scheduled
          const eventKey = index + loop * previousEvents.length;
          this.playbackState.markEventAsProcessed(eventKey);
        }
      }
    });
    
    // Update current events after rebuilding processed indices
    this.playbackState.currentEvents = events;

    this.debug('Live editing: rebuilt processed events based on time', {
      processedCount: this.playbackState.processedEventIndices.size,
      currentTime: currentTime.toFixed(3),
      timeSinceStart: (currentTime - this.playbackState.startTime).toFixed(3)
    });
  }

  /**
   * Main event processing loop
   */
  private processEvents(): void {
    if (!this.playbackState.isPlaying) return;

    const processStartTime = performance.now();
    this.playbackState.incrementProcessLoopCount();

    const currentTime = this.Tone.now();
    const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;

    // Use cached sequence duration
    const sequenceDuration = this.playbackState.cachedSequenceDuration;

    // Debug: Log processing loop info periodically (every 60 loops, ~1 second)
    if (this.config.debug && this.playbackState.processLoopCount % 60 === 0) {
      const timeSinceStart = currentTime - this.playbackState.startTime;
      this.debug('=== Processing Loop Status ===', {
        loopIteration: this.playbackState.loopCount,
        processLoopCount: this.playbackState.processLoopCount,
        currentTime: currentTime.toFixed(3),
        lookaheadTime: lookaheadTime.toFixed(3),
        timeSinceStart: timeSinceStart.toFixed(3),
        processedEvents: this.playbackState.processedEventIndices.size,
        totalEvents: this.playbackState.currentEvents.length
      });
    }

    let scheduledInThisLoop = 0;

    // Process events within lookahead window
    this.playbackState.currentEvents.forEach((event, index) => {
      // Skip createNode and connect events
      if (event.eventType === 'createNode' || event.eventType === 'connect') {
        return;
      }

      // Get event time from args (last argument is time)
      const eventTime = this.eventProcessor.getEventTime(event);
      if (eventTime === null) return;

      // Calculate absolute time with loop offset
      // Wait time is only added between loops (not for the first iteration)
      const loopWaitOffset = this.playbackState.loopCount > 0 ? this.playbackState.loopCount * this.config.loopWaitSeconds : 0;
      const loopOffset = this.playbackState.loopCount * sequenceDuration + loopWaitOffset;
      const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;

      // Check if event should be scheduled
      const eventKey = index + this.playbackState.loopCount * this.playbackState.currentEvents.length;
      if (absoluteTime <= lookaheadTime && !this.playbackState.processedEventIndices.has(eventKey)) {
        const timeDelta = absoluteTime - currentTime;
        
        if (this.config.debug) {
          // Calculate relative time from playback start (where start = 0)
          const relativeTime = currentTime - this.playbackState.startTime;
          
          const debugInfo: DebugEventInfo = {
            eventIndex: index,
            eventType: event.eventType,
            scheduledTime: absoluteTime,
            currentTime: currentTime,
            timeDelta: timeDelta,
            loopIteration: this.playbackState.loopCount
          };
          this.debug(`Scheduling event #${index} (${event.eventType}): relative=${relativeTime.toFixed(3)}s, scheduled=${absoluteTime.toFixed(3)}s`, {
            relativeTimeFromStart: relativeTime.toFixed(3),
            rowIndex: index,
            eventContent: event,
            scheduledRealTime: absoluteTime.toFixed(3),
            ...debugInfo
          });
        }

        this.eventProcessor.scheduleEvent(event, absoluteTime);
        this.playbackState.processedEventIndices.add(eventKey);
        scheduledInThisLoop++;
      }
    });

    // Check if we need to loop
    if (this.config.loop && sequenceDuration > 0) {
      const timeSinceStart = currentTime - this.playbackState.startTime;
      
      // Calculate which loop we should be on
      // The first loop has no wait, subsequent loops have wait time added
      let completedLoops = 0;
      
      if (timeSinceStart > sequenceDuration) {
        // First loop is complete
        completedLoops = 1;
        
        // Calculate additional completed loops after the first one
        const timeAfterFirstLoop = timeSinceStart - sequenceDuration;
        const subsequentLoopDuration = sequenceDuration + this.config.loopWaitSeconds;
        
        if (subsequentLoopDuration > 0) {
          completedLoops += Math.floor(timeAfterFirstLoop / subsequentLoopDuration);
        }
      }
      
      // Guard against multiple increments due to processing delays
      if (completedLoops > this.playbackState.loopCount) {
        const previousLoopCount = this.playbackState.loopCount;
        this.playbackState.loopCount = completedLoops;
        
        this.debug('=== Loop Completed ===', {
          previousLoop: previousLoopCount,
          currentLoop: this.playbackState.loopCount,
          timeSinceStart: timeSinceStart.toFixed(3),
          sequenceDuration: sequenceDuration.toFixed(3),
          loopWaitSeconds: this.config.loopWaitSeconds
        });
        
        this.config.onLoopComplete();
      }
    }

    // Track processing time
    const processEndTime = performance.now();
    const processingTime = processEndTime - processStartTime;
    
    if (this.config.debug && scheduledInThisLoop > 0) {
      this.debug('Scheduled events in this loop', {
        count: scheduledInThisLoop,
        processingTimeMs: processingTime.toFixed(2)
      });
    }

    // Continue processing
    this.animationFrameId = requestAnimationFrame(() => this.processEvents());
  }

  /**
   * Stop playback
   */
  stop(): void {
    this.debug('=== Stopping Playback ===', {
      processedEvents: this.playbackState.processedEventIndices.size,
      loopCount: this.playbackState.loopCount,
      processLoopCount: this.playbackState.processLoopCount
    });

    this.playbackState.stop();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    // Don't dispose nodes here - let the caller manage node lifecycle
    // this.nodes.disposeAll();
  }

  /**
   * Check if player is currently playing
   */
  get playing(): boolean {
    return this.playbackState.isPlaying;
  }
}
