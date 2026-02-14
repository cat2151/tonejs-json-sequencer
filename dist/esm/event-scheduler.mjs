// Tone.js JSON Sequencer - Event Scheduler
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
import { createNode, connectNode } from './node-factory.mjs';
function resolveTarget(node, path, label, nodeId) {
    const segments = Array.isArray(path)
        ? path
        : String(path)
            .split('.')
            .filter(part => part.length > 0);
    if (segments.length === 0) {
        console.warn(`Node ${nodeId} has an empty path for ${label}; expected at least one property segment`);
        return null;
    }
    let target = node;
    for (const key of segments) {
        if (target == null) {
            console.warn(`Node ${nodeId} not found or doesn't support ${label}`);
            return null;
        }
        target = target[key];
    }
    if (target == null) {
        console.warn(`Node ${nodeId} not found or doesn't support ${label}`);
        return null;
    }
    return target;
}
function rampParameter(node, path, args, label, nodeId) {
    const target = resolveTarget(node, path, label, nodeId);
    if (!target)
        return;
    if (typeof target.rampTo === 'function') {
        target.rampTo(...args);
    }
    else {
        console.warn(`Node ${nodeId} not found or doesn't support ${label}`);
    }
}
/**
 * Schedule or execute a sequence event
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param element - Event to process
 */
export function scheduleOrExecuteEvent(Tone, nodes, element) {
    switch (element.eventType) {
        case 'createNode':
            createNode(Tone, nodes, element);
            break;
        case 'connect':
            connectNode(nodes, element);
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
            rampParameter(node, ['depth'], element.args, 'depth.rampTo', element.nodeId);
            break;
        }
        case 'volume.rampTo': {
            const node = nodes.get(element.nodeId);
            rampParameter(node, ['volume'], element.args, 'volume.rampTo', element.nodeId);
            break;
        }
        case 'frequency.rampTo': {
            const node = nodes.get(element.nodeId);
            rampParameter(node, ['frequency'], element.args, 'frequency.rampTo', element.nodeId);
            break;
        }
        case 'Q.rampTo': {
            const node = nodes.get(element.nodeId);
            rampParameter(node, ['Q'], element.args, 'Q.rampTo', element.nodeId);
            break;
        }
        case 'filter.frequency.rampTo': {
            const node = nodes.get(element.nodeId);
            rampParameter(node, ['filter', 'frequency'], element.args, 'filter.frequency.rampTo', element.nodeId);
            break;
        }
        case 'filter.Q.rampTo': {
            const node = nodes.get(element.nodeId);
            rampParameter(node, ['filter', 'Q'], element.args, 'filter.Q.rampTo', element.nodeId);
            break;
        }
        case 'LFO': {
            const node = nodes.get(element.nodeId);
            if (!node) {
                console.warn(`Node ${element.nodeId} not found for LFO event`);
                break;
            }
            const args = Array.isArray(element.args) ? element.args : [];
            if (args.length < 1) {
                console.warn(`LFO event for node ${element.nodeId} requires a target path`);
                break;
            }
            const hasStartTime = args.length >= 2;
            const targetPath = hasStartTime ? args[args.length - 2] : args[args.length - 1];
            const startTime = hasStartTime ? args[args.length - 1] : undefined;
            const lfoArgs = hasStartTime ? args.slice(0, -2) : args.slice(0, -1);
            const target = resolveTarget(node, targetPath, 'LFO target', element.nodeId);
            if (!target) {
                break;
            }
            const lfo = new Tone.LFO(...lfoArgs);
            lfo.connect(target);
            if (startTime !== undefined) {
                lfo.start(startTime);
            }
            else {
                lfo.start();
            }
            const lfoBucket = node.__sequencerLFOs;
            if (Array.isArray(lfoBucket)) {
                lfoBucket.push(lfo);
            }
            else {
                node.__sequencerLFOs = [lfo];
            }
            break;
        }
        case 'set': {
            // Handle Transport settings and other global/node property settings
            // Note: Transport settings are global and not tied to individual audio graph nodes
            if (element.nodeType === 'Transport.bpm.value') {
                if (element.args && element.args.length > 0) {
                    Tone.Transport.bpm.value = element.args[0];
                }
                else {
                    console.warn('set event for Transport.bpm.value missing value in args');
                }
            }
            else {
                console.warn(`Unsupported nodeType for set event: ${element.nodeType}`);
            }
            break;
        }
        case 'loopEnd': {
            // loopEnd is a metadata event that marks the explicit loop boundary
            // Also usable as an explicit song-end marker to leave space for effect tails (e.g., reverb decay)
            // It's used by streaming players to calculate proper loop duration
            // No action needed during scheduling - handled by EventProcessor
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
export async function playSequence(Tone, nodes, sequence) {
    // Stop and clear Transport to remove any scheduled events from previous sequences
    Tone.Transport.stop();
    Tone.Transport.cancel();
    // Dispose existing nodes
    nodes.disposeAll();
    // First pass: create nodes and connections, and set Transport settings
    sequence.forEach(element => {
        try {
            if (element.eventType === 'createNode' || element.eventType === 'connect' || element.eventType === 'set') {
                scheduleOrExecuteEvent(Tone, nodes, element);
            }
            // loopEnd events are metadata only - skip them in first pass
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
            if (element.eventType !== 'createNode' && element.eventType !== 'connect' && element.eventType !== 'set' && element.eventType !== 'loopEnd') {
                scheduleOrExecuteEvent(Tone, nodes, element);
            }
        }
        catch (error) {
            console.error('Error scheduling event:', error);
        }
    });
}
