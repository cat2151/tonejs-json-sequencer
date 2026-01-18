// Tone.js JSON Sequencer - Node Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
import { createInstrument } from './factories/instrument-factory.mjs';
import { createEffect } from './factories/effect-factory.mjs';
/**
 * Create a Tone.js node based on the event
 */
export function createNode(Tone, nodes, element) {
    // Try to create as instrument first
    let node = createInstrument(Tone, element.nodeType, element.args);
    // If not an instrument, try as effect
    if (node === null) {
        node = createEffect(Tone, element.nodeType, element.args);
    }
    // If still null, unknown node type
    if (node === null) {
        console.warn(`Unknown node type: ${element.nodeType}`);
        return;
    }
    nodes.set(element.nodeId, node);
}
/**
 * Connect a node to another node or destination
 */
export function connectNode(nodes, element) {
    const node = nodes.get(element.nodeId);
    if (!node) {
        console.warn(`Node ${element.nodeId} not found for connection`);
        return;
    }
    if (element.connectTo === 'toDestination') {
        node.toDestination();
    }
    else {
        const targetNode = nodes.get(element.connectTo);
        if (targetNode) {
            node.connect(targetNode);
        }
        else {
            console.warn(`Target node ${element.connectTo} not found`);
        }
    }
}
