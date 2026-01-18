// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
import { TimeParser } from './utils/time-parser.mjs';
import { PlaybackState } from './streaming/playback-state.mjs';
import { EventProcessor } from './streaming/event-processor.mjs';
/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export function parseNDJSON(ndjson) {
    const lines = ndjson.split('\n');
    const events = [];
    lines.forEach((rawLine, index) => {
        const line = rawLine.trim();
        // Skip empty or whitespace-only lines
        if (line.length === 0) {
            return;
        }
        try {
            const parsed = JSON.parse(line);
            events.push(parsed);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            // Log detailed information for debugging
            console.error('Failed to parse NDJSON line:', {
                lineNumber: index + 1,
                lineContent: line,
                error,
            });
            // Surface a clear, user-facing error so invalid NDJSON can be fixed
            throw new Error(`Failed to parse NDJSON input at line ${index + 1}: ${errorMessage}`);
        }
    });
    return events;
}
/**
 * NDJSON Streaming Player
 * Processes events with lookahead timing and supports live editing and loop playback
 */
export class NDJSONStreamingPlayer {
    constructor(Tone, nodes, config = {}) {
        this.animationFrameId = null;
        this.Tone = Tone;
        this.nodes = nodes;
        this.config = {
            lookaheadMs: config.lookaheadMs ?? 50,
            loop: config.loop ?? false,
            onLoopComplete: config.onLoopComplete ?? (() => { }),
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
    debug(message, data) {
        if (this.config.debug) {
            this.config.onDebug(message, data);
        }
    }
    /**
     * Start or update the streaming playback
     * @param eventsOrNDJSON - Array of events or NDJSON string
     */
    async start(eventsOrNDJSON) {
        // Parse events if NDJSON string is provided
        const events = typeof eventsOrNDJSON === 'string'
            ? parseNDJSON(eventsOrNDJSON)
            : eventsOrNDJSON;
        // If not playing, initialize playback
        if (!this.playbackState.isPlaying) {
            await this.initializePlayback(events);
        }
        else {
            // If already playing, update events for live editing
            this.updateEvents(events);
        }
    }
    /**
     * Initialize playback
     */
    async initializePlayback(events) {
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
        await this.eventProcessor.createNodesAndConnections(events, this.playbackState.createdNodeIds);
        // Cache sequence duration
        this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(events, this.config.endBufferSeconds);
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
    updateEvents(events) {
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
        this.eventProcessor.processNewCreateAndConnectEvents(events, this.playbackState.createdNodeIds);
        // Update current events
        this.playbackState.currentEvents = events;
        // Reset processed indices so that edited events can be scheduled
        this.playbackState.resetProcessedEvents();
        // Recalculate sequence duration
        const previousDuration = this.playbackState.cachedSequenceDuration;
        this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(events, this.config.endBufferSeconds);
        this.debug('Updated sequence duration', {
            previous: previousDuration.toFixed(3),
            new: this.playbackState.cachedSequenceDuration.toFixed(3)
        });
    }
    /**
     * Main event processing loop
     */
    processEvents() {
        if (!this.playbackState.isPlaying)
            return;
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
            if (eventTime === null)
                return;
            // Calculate absolute time with loop offset
            const loopOffset = this.playbackState.loopCount * sequenceDuration;
            const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
            // Check if event should be scheduled
            const eventKey = index + this.playbackState.loopCount * this.playbackState.currentEvents.length;
            if (absoluteTime <= lookaheadTime && !this.playbackState.processedEventIndices.has(eventKey)) {
                const timeDelta = absoluteTime - currentTime;
                if (this.config.debug) {
                    const debugInfo = {
                        eventIndex: index,
                        eventType: event.eventType,
                        scheduledTime: absoluteTime,
                        currentTime: currentTime,
                        timeDelta: timeDelta,
                        loopIteration: this.playbackState.loopCount
                    };
                    this.debug(`Scheduling event #${index} (${event.eventType})`, {
                        ...debugInfo,
                        scheduledAt: absoluteTime.toFixed(3),
                        timeDelta: timeDelta.toFixed(3),
                        eventTime: eventTime.toFixed(3),
                        loopOffset: loopOffset.toFixed(3)
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
            const completedLoops = Math.floor(timeSinceStart / sequenceDuration);
            // Guard against multiple increments due to processing delays
            if (completedLoops > this.playbackState.loopCount) {
                const previousLoopCount = this.playbackState.loopCount;
                this.playbackState.loopCount = completedLoops;
                this.debug('=== Loop Completed ===', {
                    previousLoop: previousLoopCount,
                    currentLoop: this.playbackState.loopCount,
                    timeSinceStart: timeSinceStart.toFixed(3),
                    sequenceDuration: sequenceDuration.toFixed(3)
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
    stop() {
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
    get playing() {
        return this.playbackState.isPlaying;
    }
}
