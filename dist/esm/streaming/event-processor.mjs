// Tone.js JSON Sequencer - Event Processor
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
import { scheduleOrExecuteEvent } from '../event-scheduler.mjs';
/**
 * Processes events for the streaming player
 */
export class EventProcessor {
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
                if (event.eventType === 'createNode' || event.eventType === 'connect' || event.eventType === 'set') {
                    if (event.eventType === 'createNode') {
                        createdNodeIds.add(event.nodeId);
                    }
                    scheduleOrExecuteEvent(this.Tone, this.nodes, event);
                }
                // loopEnd events are metadata only - skip them
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
        const newCreateAndConnectEvents = events.filter(e => e.eventType === 'createNode' || e.eventType === 'connect' || e.eventType === 'set');
        newCreateAndConnectEvents.forEach(event => {
            try {
                // Check if node already exists for createNode events
                if (event.eventType === 'createNode') {
                    if (createdNodeIds.has(event.nodeId)) {
                        return; // Skip if node already created
                    }
                    createdNodeIds.add(event.nodeId);
                }
                scheduleOrExecuteEvent(this.Tone, this.nodes, event);
            }
            catch (error) {
                console.error('Error processing new node/connection:', error);
            }
        });
        // loopEnd events are metadata only - they're not included in the filter above
    }
    /**
     * Schedule an event at a specific time
     */
    scheduleEvent(event, absoluteTime) {
        try {
            // Create a modified event with adjusted time
            const modifiedEvent = this.adjustEventTime(event, absoluteTime);
            scheduleOrExecuteEvent(this.Tone, this.nodes, modifiedEvent);
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
     * @param events - Array of sequence events
     * @param endBufferSeconds - Buffer time to add after sequence
     * @param isLoopMode - Whether the sequence will be looped (affects duration calculation)
     */
    calculateSequenceDuration(events, endBufferSeconds, isLoopMode = false) {
        // Check if there's a loopEnd event
        const loopEndEvent = events.find(e => e.eventType === 'loopEnd');
        if (loopEndEvent && loopEndEvent.args.length > 0) {
            const loopDuration = this.timeParser.parseTimeToSeconds(loopEndEvent.args[0]);
            if (loopDuration > 0) {
                // Use explicit loop duration from loopEnd event
                return loopDuration + endBufferSeconds;
            }
        }
        // Fallback: calculate duration from events
        let maxEndTime = 0;
        const eventStartTimes = [];
        events.forEach(event => {
            if (event.eventType === 'createNode' || event.eventType === 'connect' || event.eventType === 'set' || event.eventType === 'loopEnd') {
                return;
            }
            const eventTime = this.getEventTime(event);
            if (eventTime === null)
                return;
            // Collect event start times for spacing analysis
            eventStartTimes.push(eventTime);
            // Calculate the end time of this event (start time + duration)
            let eventEndTime = eventTime;
            // For triggerAttackRelease events, add the note duration to get the actual end time
            // This is the only event type that has a duration parameter
            if (event.eventType === 'triggerAttackRelease' && 'args' in event && Array.isArray(event.args)) {
                // args format: [note, duration, time]
                // duration is the second argument (index 1)
                if (event.args.length >= 2) {
                    const durationArg = event.args[1];
                    let duration = this.timeParser.parseTimeToSeconds(durationArg);
                    // Fallback: use Tone.js time parsing for notations (e.g. dotted/triplet) that
                    // TimeParser may not fully support (like "8n.", "4t", etc.).
                    if ((duration === 0 || duration < 0) && typeof durationArg === 'string') {
                        try {
                            const fallbackDuration = this.Tone.Time(durationArg).toSeconds();
                            if (fallbackDuration > 0) {
                                duration = fallbackDuration;
                            }
                        }
                        catch {
                            // Ignore errors from Tone.Time and fall through to warning below.
                        }
                    }
                    if (duration > 0) {
                        eventEndTime = eventTime + duration;
                    }
                    else {
                        // Duration parsing failed or returned 0
                        // This could happen with unsupported notation or invalid values
                        console.warn(`Failed to parse duration '${durationArg}' for event at time ${eventTime}, using event start time only`);
                    }
                }
            }
            if (eventEndTime > maxEndTime) {
                maxEndTime = eventEndTime;
            }
        });
        // Calculate sequence duration based on mode
        let sequenceDuration;
        if (isLoopMode && eventStartTimes.length >= 2) {
            // Loop mode: calculate inter-event spacing to determine when next iteration should start
            // Sort event times to calculate spacing
            eventStartTimes.sort((a, b) => a - b);
            // Calculate the spacing between the last two events
            const lastEventTime = eventStartTimes[eventStartTimes.length - 1];
            const secondLastEventTime = eventStartTimes[eventStartTimes.length - 2];
            const lastSpacing = lastEventTime - secondLastEventTime;
            // The next iteration's first event should start at: lastEventTime + lastSpacing
            // This maintains the inter-event spacing pattern
            sequenceDuration = lastEventTime + lastSpacing;
        }
        else if (isLoopMode && eventStartTimes.length === 1) {
            // Single event: fall back to maxEndTime to allow the event to complete
            sequenceDuration = maxEndTime;
        }
        else {
            // Non-loop mode: use maxEndTime to let all notes finish playing
            sequenceDuration = maxEndTime;
        }
        // Add buffer after the sequence
        return sequenceDuration + endBufferSeconds;
    }
}
