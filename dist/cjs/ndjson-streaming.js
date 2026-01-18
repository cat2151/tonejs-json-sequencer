"use strict";
// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.NDJSONStreamingPlayer = void 0;
exports.parseNDJSON = parseNDJSON;
const event_scheduler_js_1 = require("./event-scheduler.js");
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
        this.isPlaying = false;
        this.startTime = 0;
        this.currentEvents = [];
        this.processedEventIndices = new Set();
        this.animationFrameId = null;
        this.loopCount = 0;
        this.cachedSequenceDuration = 0;
        this.createdNodeIds = new Set();
        this.processLoopCount = 0;
        this.lastProcessTime = 0;
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
        if (!this.isPlaying) {
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
        this.isPlaying = true;
        this.currentEvents = events;
        this.processedEventIndices.clear();
        this.loopCount = 0;
        this.createdNodeIds.clear();
        this.processLoopCount = 0;
        this.lastProcessTime = 0;
        // Set start time as current time + lookahead
        this.startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
        this.debug('Start time', {
            startTime: this.startTime.toFixed(3),
            currentTime: this.Tone.now().toFixed(3),
            lookaheadMs: this.config.lookaheadMs
        });
        // Create nodes and connections first
        await this.createNodesAndConnections();
        // Cache sequence duration
        this.cachedSequenceDuration = this.calculateSequenceDuration();
        this.debug('Sequence duration', {
            duration: this.cachedSequenceDuration.toFixed(3),
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
            previousCount: this.currentEvents.length,
            newCount: events.length
        });
        // Find events that need to be created/connected
        const newCreateAndConnectEvents = events.filter(e => e.eventType === 'createNode' || e.eventType === 'connect');
        this.debug('Processing new node/connection events', newCreateAndConnectEvents.length);
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
                (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, this.nodes, event);
            }
            catch (error) {
                console.error('Error processing new node/connection:', error);
            }
        });
        // Update current events
        this.currentEvents = events;
        // Reset processed indices so that edited events can be scheduled
        this.processedEventIndices.clear();
        // Recalculate sequence duration
        const previousDuration = this.cachedSequenceDuration;
        this.cachedSequenceDuration = this.calculateSequenceDuration();
        this.debug('Updated sequence duration', {
            previous: previousDuration.toFixed(3),
            new: this.cachedSequenceDuration.toFixed(3)
        });
    }
    /**
     * Create nodes and connections from events
     */
    async createNodesAndConnections() {
        this.currentEvents.forEach(event => {
            try {
                if (event.eventType === 'createNode' || event.eventType === 'connect') {
                    if (event.eventType === 'createNode') {
                        this.createdNodeIds.add(event.nodeId);
                    }
                    (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, this.nodes, event);
                }
            }
            catch (error) {
                console.error('Error creating node or connection:', error);
            }
        });
        // Wait for audio buffers to load
        await this.Tone.loaded();
    }
    /**
     * Main event processing loop
     */
    processEvents() {
        if (!this.isPlaying)
            return;
        const processStartTime = performance.now();
        this.processLoopCount++;
        const currentTime = this.Tone.now();
        const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
        // Use cached sequence duration
        const sequenceDuration = this.cachedSequenceDuration;
        // Debug: Log processing loop info periodically (every 60 loops, ~1 second)
        if (this.config.debug && this.processLoopCount % 60 === 0) {
            const timeSinceStart = currentTime - this.startTime;
            this.debug('=== Processing Loop Status ===', {
                loopIteration: this.loopCount,
                processLoopCount: this.processLoopCount,
                currentTime: currentTime.toFixed(3),
                lookaheadTime: lookaheadTime.toFixed(3),
                timeSinceStart: timeSinceStart.toFixed(3),
                processedEvents: this.processedEventIndices.size,
                totalEvents: this.currentEvents.length
            });
        }
        let scheduledInThisLoop = 0;
        // Process events within lookahead window
        this.currentEvents.forEach((event, index) => {
            // Skip createNode and connect events
            if (event.eventType === 'createNode' || event.eventType === 'connect') {
                return;
            }
            // Get event time from args (last argument is time)
            const eventTime = this.getEventTime(event);
            if (eventTime === null)
                return;
            // Calculate absolute time with loop offset
            const loopOffset = this.loopCount * sequenceDuration;
            const absoluteTime = this.startTime + eventTime + loopOffset;
            // Check if event should be scheduled
            if (absoluteTime <= lookaheadTime && !this.processedEventIndices.has(index + this.loopCount * this.currentEvents.length)) {
                const timeDelta = absoluteTime - currentTime;
                if (this.config.debug) {
                    const debugInfo = {
                        eventIndex: index,
                        eventType: event.eventType,
                        scheduledTime: absoluteTime,
                        currentTime: currentTime,
                        timeDelta: timeDelta,
                        loopIteration: this.loopCount
                    };
                    this.debug(`Scheduling event #${index} (${event.eventType})`, {
                        scheduledAt: absoluteTime.toFixed(3),
                        timeDelta: timeDelta.toFixed(3),
                        eventTime: eventTime.toFixed(3),
                        loopOffset: loopOffset.toFixed(3)
                    });
                }
                this.scheduleEvent(event, absoluteTime);
                this.processedEventIndices.add(index + this.loopCount * this.currentEvents.length);
                scheduledInThisLoop++;
            }
        });
        // Check if we need to loop
        if (this.config.loop && sequenceDuration > 0) {
            const timeSinceStart = currentTime - this.startTime;
            const completedLoops = Math.floor(timeSinceStart / sequenceDuration);
            // Guard against multiple increments due to processing delays
            if (completedLoops > this.loopCount) {
                const previousLoopCount = this.loopCount;
                this.loopCount = completedLoops;
                this.debug('=== Loop Completed ===', {
                    previousLoop: previousLoopCount,
                    currentLoop: this.loopCount,
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
     * Schedule an event at a specific time
     */
    scheduleEvent(event, absoluteTime) {
        try {
            // Create a modified event with adjusted time
            const modifiedEvent = this.adjustEventTime(event, absoluteTime);
            (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, this.nodes, modifiedEvent);
        }
        catch (error) {
            console.error('Error scheduling event:', error, event);
        }
    }
    /**
     * Adjust event time to absolute time
     */
    adjustEventTime(event, absoluteTime) {
        const modifiedEvent = { ...event };
        if ('args' in modifiedEvent && Array.isArray(modifiedEvent.args)) {
            const args = [...modifiedEvent.args];
            // Last argument is typically the time
            if (args.length > 0) {
                args[args.length - 1] = absoluteTime.toString();
            }
            modifiedEvent.args = args;
        }
        return modifiedEvent;
    }
    /**
     * Get event time in seconds
     */
    getEventTime(event) {
        if (!('args' in event) || !Array.isArray(event.args) || event.args.length === 0) {
            return null;
        }
        const timeArg = event.args[event.args.length - 1];
        return this.parseTimeToSeconds(timeArg);
    }
    /**
     * Parse time string to seconds
     */
    parseTimeToSeconds(timeStr) {
        // Handle different time formats
        if (timeStr.startsWith('+')) {
            // Relative time with tick notation (e.g., "+0i")
            return this.parseTickTime(timeStr.substring(1));
        }
        else if (timeStr.includes(':')) {
            // Bar:beat:subdivision format (e.g., "0:0:2")
            return this.parseBarBeatTime(timeStr);
        }
        else {
            // Direct number or tick notation
            return this.parseTickTime(timeStr);
        }
    }
    /**
     * Parse tick time (e.g., "48i" or "0i")
     */
    parseTickTime(timeStr) {
        const match = timeStr.match(/^(\d+(?:\.\d+)?)(i)?$/);
        if (!match)
            return 0;
        const value = parseFloat(match[1]);
        const ticksPerQuarter = this.config.ticksPerQuarter;
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        return (value / ticksPerQuarter) * secondsPerBeat;
    }
    /**
     * Parse bar:beat:subdivision time
     */
    parseBarBeatTime(timeStr) {
        const parts = timeStr.split(':').map(Number);
        if (parts.length !== 3)
            return 0;
        // Validate that all parts are valid numbers
        if (parts.some(isNaN)) {
            console.error('Invalid bar:beat:subdivision format:', timeStr);
            return 0;
        }
        const [bars, beats, subdivisions] = parts;
        const beatsPerBar = this.config.beatsPerBar;
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        const subdivisionsPerBeat = this.config.subdivisionsPerBeat;
        return (bars * beatsPerBar * secondsPerBeat +
            beats * secondsPerBeat +
            subdivisions * (secondsPerBeat / subdivisionsPerBeat));
    }
    /**
     * Calculate the total duration of the sequence (called once and cached)
     */
    calculateSequenceDuration() {
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
    stop() {
        this.debug('=== Stopping Playback ===', {
            processedEvents: this.processedEventIndices.size,
            loopCount: this.loopCount,
            processLoopCount: this.processLoopCount
        });
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
        this.processLoopCount = 0;
        this.lastProcessTime = 0;
    }
    /**
     * Check if player is currently playing
     */
    get playing() {
        return this.isPlaying;
    }
}
exports.NDJSONStreamingPlayer = NDJSONStreamingPlayer;
