"use strict";
// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.NDJSONStreamingPlayer = void 0;
exports.parseNDJSON = parseNDJSON;
const time_parser_js_1 = require("./utils/time-parser.js");
const playback_state_js_1 = require("./streaming/playback-state.js");
const event_processor_js_1 = require("./streaming/event-processor.js");
/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
function parseNDJSON(ndjson) {
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
class NDJSONStreamingPlayer {
    constructor(Tone, nodes, config = {}) {
        this.animationFrameId = null;
        this.eventPredictions = new Map(); // key: "loopIteration-eventIndex"
        this.Tone = Tone;
        this.nodes = nodes;
        this.config = {
            lookaheadMs: config.lookaheadMs ?? 50,
            loop: config.loop ?? false,
            loopWaitSeconds: config.loopWaitSeconds ?? 0.5,
            onLoopComplete: config.onLoopComplete ?? (() => { }),
            ticksPerQuarter: config.ticksPerQuarter ?? 480,
            beatsPerMinute: config.beatsPerMinute ?? 120,
            beatsPerBar: config.beatsPerBar ?? 4,
            subdivisionsPerBeat: config.subdivisionsPerBeat ?? 4,
            endBufferSeconds: config.endBufferSeconds ?? 1,
            debug: config.debug ?? false,
            onDebug: config.onDebug ?? ((msg, data) => console.log(`[DEBUG] ${msg}`, data ?? ''))
        };
        this.playbackState = new playback_state_js_1.PlaybackState();
        this.timeParser = new time_parser_js_1.TimeParser({
            ticksPerQuarter: this.config.ticksPerQuarter,
            beatsPerMinute: this.config.beatsPerMinute,
            beatsPerBar: this.config.beatsPerBar,
            subdivisionsPerBeat: this.config.subdivisionsPerBeat
        });
        this.eventProcessor = new event_processor_js_1.EventProcessor(this.Tone, this.nodes, this.timeParser);
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
     * Check if an event is schedulable (i.e., not a setup/metadata event)
     */
    isSchedulableEvent(event) {
        return event.eventType !== 'createNode' &&
            event.eventType !== 'connect' &&
            event.eventType !== 'set' &&
            event.eventType !== 'loopEnd';
    }
    /**
     * Extract time notation from event args
     */
    getTimeNotation(event) {
        if ('args' in event && Array.isArray(event.args) && event.args.length > 0) {
            return String(event.args[event.args.length - 1]);
        }
        return 'unknown';
    }
    /**
     * Generate event scheduling predictions
     * Creates predictions for the first loop and the first event of the next loop
     */
    generatePredictions(events, startTime, sequenceDuration) {
        this.eventPredictions.clear();
        const predictions = [];
        // Generate predictions for first loop (loop 0)
        events.forEach((event, index) => {
            // Skip non-schedulable events
            if (!this.isSchedulableEvent(event)) {
                return;
            }
            const eventTime = this.eventProcessor.getEventTime(event);
            if (eventTime === null)
                return;
            const prediction = {
                eventIndex: index,
                eventType: event.eventType,
                timeNotation: this.getTimeNotation(event),
                timeSeconds: eventTime,
                expectedScheduleTime: startTime + eventTime,
                loopIteration: 0
            };
            predictions.push(prediction);
            this.eventPredictions.set(`0-${index}`, prediction);
        });
        // Add prediction for first event of next loop (if loop mode enabled)
        if (this.config.loop && events.length > 0) {
            const firstSchedulableEvent = events.find(e => this.isSchedulableEvent(e));
            if (firstSchedulableEvent) {
                const firstEventIndex = events.indexOf(firstSchedulableEvent);
                const eventTime = this.eventProcessor.getEventTime(firstSchedulableEvent);
                if (eventTime !== null) {
                    const loopOffset = sequenceDuration + this.config.loopWaitSeconds;
                    const prediction = {
                        eventIndex: firstEventIndex,
                        eventType: firstSchedulableEvent.eventType,
                        timeNotation: this.getTimeNotation(firstSchedulableEvent),
                        timeSeconds: eventTime,
                        expectedScheduleTime: startTime + loopOffset + eventTime,
                        loopIteration: 1
                    };
                    predictions.push(prediction);
                    this.eventPredictions.set(`1-${firstEventIndex}`, prediction);
                }
            }
        }
        // Log predictions
        if (this.config.debug && predictions.length > 0) {
            this.debug('📋 === Event Scheduling Predictions ===');
            this.debug(`t0 (playback start + lookahead) = ${startTime.toFixed(3)}s`);
            this.debug('');
            this.debug('Expected schedule times:');
            predictions.forEach(pred => {
                const loopLabel = pred.loopIteration > 0 ? ` [Loop ${pred.loopIteration}]` : '';
                this.debug(`  Event #${pred.eventIndex} (${pred.eventType})${loopLabel}: ${pred.timeNotation} → ${pred.timeSeconds.toFixed(3)}s → t0+${pred.timeSeconds.toFixed(3)}s = ${pred.expectedScheduleTime.toFixed(3)}s`);
            });
            this.debug('');
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
        this.debug('🎵 === Initializing Playback ===');
        this.debug('📊 Total events', events.length);
        // Set start time as current time + lookahead
        const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
        this.playbackState.start(events, startTime);
        this.debug('⏰ Start time', {
            startTime: startTime.toFixed(3),
            currentTime: this.Tone.now().toFixed(3),
            lookaheadMs: this.config.lookaheadMs
        });
        // Create nodes and connections first
        await this.eventProcessor.createNodesAndConnections(events, this.playbackState.createdNodeIds);
        // Cache sequence duration
        // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
        const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
        this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(events, endBuffer, this.config.loop);
        this.debug('📏 Sequence duration', {
            duration: this.playbackState.cachedSequenceDuration.toFixed(3),
            loopEnabled: this.config.loop,
            loopWaitSeconds: this.config.loop ? this.config.loopWaitSeconds : 'N/A'
        });
        // Generate event scheduling predictions
        this.generatePredictions(events, startTime, this.playbackState.cachedSequenceDuration);
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
        // Store previous values before updating
        const previousEvents = this.playbackState.currentEvents;
        const previousDuration = this.playbackState.cachedSequenceDuration;
        // Recalculate sequence duration with new events
        // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
        const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
        this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(events, endBuffer, this.config.loop);
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
            // Skip createNode, connect, and set events
            if (event.eventType === 'createNode' || event.eventType === 'connect' || event.eventType === 'set') {
                return;
            }
            const eventTime = this.eventProcessor.getEventTime(event);
            if (eventTime === null)
                return;
            // Check all loop iterations that may have occurred
            for (let loop = 0; loop <= this.playbackState.loopCount; loop++) {
                // Use previous duration for loop offset calculation
                // because that's what was used when events were originally scheduled
                // Wait time is only added between loops (not for the first iteration)
                const loopWaitOffset = Math.max(0, loop - 1) * this.config.loopWaitSeconds;
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
            this.debug('⚙️ === Processing Loop Status ===', {
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
        const lookaheadMs = this.config.lookaheadMs;
        // Process events within lookahead window
        this.playbackState.currentEvents.forEach((event, index) => {
            // Skip createNode, connect, and set events
            if (event.eventType === 'createNode' || event.eventType === 'connect' || event.eventType === 'set') {
                return;
            }
            // Get event time from args (last argument is time)
            const eventTime = this.eventProcessor.getEventTime(event);
            if (eventTime === null)
                return;
            // Calculate absolute time with loop offset
            // Wait time is only added between loops (not for the first iteration)
            const loopWaitOffset = Math.max(0, this.playbackState.loopCount - 1) * this.config.loopWaitSeconds;
            const loopOffset = this.playbackState.loopCount * sequenceDuration + loopWaitOffset;
            const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
            // Check if event should be scheduled
            const eventKey = index + this.playbackState.loopCount * this.playbackState.currentEvents.length;
            if (absoluteTime <= lookaheadTime && !this.playbackState.processedEventIndices.has(eventKey)) {
                if (this.config.debug) {
                    // Look up prediction for this event
                    const predictionKey = `${this.playbackState.loopCount}-${index}`;
                    const prediction = this.eventPredictions.get(predictionKey);
                    if (prediction) {
                        // Compare actual scheduled time with prediction
                        const expectedTime = prediction.expectedScheduleTime;
                        const actualTime = absoluteTime;
                        const mismatch = Math.abs(actualTime - expectedTime);
                        if (mismatch > NDJSONStreamingPlayer.SCHEDULE_TIME_TOLERANCE_SECONDS) {
                            // Mismatch detected - highlight in red
                            this.debug(`🔴 MISMATCH Event #${index} (${event.eventType}) Loop:${this.playbackState.loopCount}`, {
                                timeNotation: prediction.timeNotation,
                                expectedScheduleTime: expectedTime.toFixed(3) + 's',
                                actualScheduleTime: actualTime.toFixed(3) + 's',
                                mismatch: (mismatch * 1000).toFixed(1) + 'ms'
                            });
                        }
                        else {
                            // Matches prediction - simple confirmation
                            this.debug(`✓ Event #${index} (${event.eventType}) Loop:${this.playbackState.loopCount}: ${prediction.timeNotation} → scheduled at ${actualTime.toFixed(3)}s (expected ${expectedTime.toFixed(3)}s)`);
                        }
                    }
                    else {
                        // No prediction available (e.g., loop iterations beyond first two)
                        this.debug(`Event #${index} (${event.eventType}) Loop:${this.playbackState.loopCount}: scheduled at ${absoluteTime.toFixed(3)}s`);
                    }
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
                this.debug(`🔄 === Loop #${previousLoopCount} → #${this.playbackState.loopCount} ===`, {
                    previousLoop: previousLoopCount,
                    currentLoop: this.playbackState.loopCount,
                    timeSinceStart: timeSinceStart.toFixed(3),
                    sequenceDuration: sequenceDuration.toFixed(3),
                    loopWaitSeconds: this.config.loopWaitSeconds
                });
                this.config.onLoopComplete();
            }
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
exports.NDJSONStreamingPlayer = NDJSONStreamingPlayer;
NDJSONStreamingPlayer.SCHEDULE_TIME_TOLERANCE_SECONDS = 0.001; // 1ms tolerance for schedule time comparison
