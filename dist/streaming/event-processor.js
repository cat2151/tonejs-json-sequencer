"use strict";
// Tone.js JSON Sequencer - Event Processor
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventProcessor = void 0;
const event_scheduler_js_1 = require("../event-scheduler.js");
/**
 * Processes events for the streaming player
 */
class EventProcessor {
    constructor(Tone, nodes, timeParser) {
        this.Tone = Tone;
        this.nodes = nodes;
        this.timeParser = timeParser;
    }
    /**
     * Create nodes and connections from events
     */
    async createNodesAndConnections(events, createdNodeIds) {
        events.forEach(event => {
            try {
                if (event.eventType === 'createNode' || event.eventType === 'connect') {
                    if (event.eventType === 'createNode') {
                        createdNodeIds.add(event.nodeId);
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
     * Process new node creation and connection events (for live editing)
     */
    processNewCreateAndConnectEvents(events, createdNodeIds) {
        const newCreateAndConnectEvents = events.filter(e => e.eventType === 'createNode' || e.eventType === 'connect');
        newCreateAndConnectEvents.forEach(event => {
            try {
                // Check if node already exists for createNode events
                if (event.eventType === 'createNode') {
                    if (createdNodeIds.has(event.nodeId)) {
                        return; // Skip if node already created
                    }
                    createdNodeIds.add(event.nodeId);
                }
                (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, this.nodes, event);
            }
            catch (error) {
                console.error('Error processing new node/connection:', error);
            }
        });
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
        return this.timeParser.parseTimeToSeconds(timeArg);
    }
    /**
     * Calculate the total duration of the sequence
     */
    calculateSequenceDuration(events, endBufferSeconds) {
        let maxEndTime = 0;
        events.forEach(event => {
            if (event.eventType === 'createNode' || event.eventType === 'connect') {
                return;
            }
            const eventTime = this.getEventTime(event);
            if (eventTime === null)
                return;
            // Calculate the end time of this event (start time + duration)
            let eventEndTime = eventTime;
            // For triggerAttackRelease events, add the note duration to get the actual end time
            if (event.eventType === 'triggerAttackRelease' && 'args' in event && Array.isArray(event.args)) {
                // args format: [note, duration, time]
                // duration is the second argument (index 1)
                if (event.args.length >= 2) {
                    const durationArg = event.args[1];
                    const duration = this.timeParser.parseTimeToSeconds(durationArg);
                    eventEndTime = eventTime + duration;
                }
            }
            if (eventEndTime > maxEndTime) {
                maxEndTime = eventEndTime;
            }
        });
        // Add buffer after the last event ends
        return maxEndTime + endBufferSeconds;
    }
}
exports.EventProcessor = EventProcessor;
