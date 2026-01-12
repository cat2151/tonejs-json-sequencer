"use strict";
// Tone.js JSON Sequencer - Event Scheduler
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleOrExecuteEvent = scheduleOrExecuteEvent;
exports.playSequence = playSequence;
const node_factory_js_1 = require("./node-factory.js");
/**
 * Schedule or execute a sequence event
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param element - Event to process
 */
function scheduleOrExecuteEvent(Tone, nodes, element) {
    switch (element.eventType) {
        case 'createNode':
            (0, node_factory_js_1.createNode)(Tone, nodes, element);
            break;
        case 'connect':
            (0, node_factory_js_1.connectNode)(nodes, element);
            break;
        case 'triggerAttackRelease': {
            const node = nodes.get(element.nodeId);
            if (node && typeof node.triggerAttackRelease === 'function') {
                node.triggerAttackRelease(...element.args);
            }
            else {
                console.warn(`Node ${element.nodeId} not found or doesn't support triggerAttackRelease`);
            }
            break;
        }
        case 'depth.rampTo': {
            const node = nodes.get(element.nodeId);
            if (node && node.depth && typeof node.depth.rampTo === 'function') {
                node.depth.rampTo(...element.args);
            }
            else {
                console.warn(`Node ${element.nodeId} not found or doesn't support depth.rampTo`);
            }
            break;
        }
    }
}
/**
 * Play a JSON sequence
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param sequence - Array of sequence events
 */
async function playSequence(Tone, nodes, sequence) {
    // Dispose existing nodes
    nodes.disposeAll();
    // First pass: create nodes and connections
    sequence.forEach(element => {
        try {
            if (element.eventType === 'createNode' || element.eventType === 'connect') {
                scheduleOrExecuteEvent(Tone, nodes, element);
            }
        }
        catch (error) {
            console.error('Error creating node or connection:', error);
        }
    });
    // Wait for all audio buffers to load (important for Sampler)
    await Tone.loaded();
    console.log('All audio buffers loaded');
    // Second pass: schedule playback events
    sequence.forEach(element => {
        try {
            if (element.eventType !== 'createNode' && element.eventType !== 'connect') {
                scheduleOrExecuteEvent(Tone, nodes, element);
            }
        }
        catch (error) {
            console.error('Error scheduling event:', error);
        }
    });
}
