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
 */
function parseNDJSON(ndjson) {
    return ndjson
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => {
        try {
            return JSON.parse(line);
        }
        catch (error) {
            console.error('Failed to parse NDJSON line:', line, error);
            return null;
        }
    })
        .filter((event) => event !== null);
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
            endBufferSeconds: config.endBufferSeconds ?? 1
        };
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
        this.isPlaying = true;
        this.currentEvents = events;
        this.processedEventIndices.clear();
        this.loopCount = 0;
        // Set start time as current time + lookahead
        this.startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
        // Create nodes and connections first
        await this.createNodesAndConnections();
        // Start processing loop
        this.processEvents();
    }
    /**
     * Update events during playback (for live editing)
     */
    updateEvents(events) {
        // Find events that need to be created/connected
        const newCreateAndConnectEvents = events.filter(e => e.eventType === 'createNode' || e.eventType === 'connect');
        // Process any new node creation or connection events
        newCreateAndConnectEvents.forEach(event => {
            try {
                (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, this.nodes, event);
            }
            catch (error) {
                console.error('Error processing new node/connection:', error);
            }
        });
        // Update current events
        this.currentEvents = events;
        // Don't reset processedEventIndices to avoid re-processing old events
    }
    /**
     * Create nodes and connections from events
     */
    async createNodesAndConnections() {
        this.currentEvents.forEach(event => {
            try {
                if (event.eventType === 'createNode' || event.eventType === 'connect') {
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
        const currentTime = this.Tone.now();
        const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
        // Get sequence duration for loop calculation
        const sequenceDuration = this.getSequenceDuration();
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
                this.scheduleEvent(event, absoluteTime);
                this.processedEventIndices.add(index + this.loopCount * this.currentEvents.length);
            }
        });
        // Check if we need to loop
        if (this.config.loop && sequenceDuration > 0) {
            const timeSinceStart = currentTime - this.startTime;
            const loopOffset = this.loopCount * sequenceDuration;
            if (timeSinceStart >= loopOffset + sequenceDuration) {
                this.loopCount++;
                this.config.onLoopComplete();
            }
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
        const [bars, beats, subdivisions] = parts;
        const beatsPerBar = this.config.beatsPerBar;
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        const subdivisionsPerBeat = this.config.subdivisionsPerBeat;
        return (bars * beatsPerBar * secondsPerBeat +
            beats * secondsPerBeat +
            subdivisions * (secondsPerBeat / subdivisionsPerBeat));
    }
    /**
     * Get the total duration of the sequence
     */
    getSequenceDuration() {
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
        this.isPlaying = false;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.nodes.disposeAll();
        this.processedEventIndices.clear();
        this.loopCount = 0;
    }
    /**
     * Check if player is currently playing
     */
    get playing() {
        return this.isPlaying;
    }
}
exports.NDJSONStreamingPlayer = NDJSONStreamingPlayer;
