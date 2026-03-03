"use strict";
// Tone.js JSON Sequencer - Node Manager
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequencerNodes = void 0;
/**
 * Manages Tone.js nodes for the sequencer
 */
class SequencerNodes {
    constructor() {
        this.nodes = [];
    }
    get(nodeId) {
        return this.nodes[nodeId];
    }
    set(nodeId, node) {
        this.nodes[nodeId] = node;
    }
    disposeSingle(node) {
        const lfos = node?.__sequencerLFOs;
        if (Array.isArray(lfos)) {
            lfos.forEach(lfo => {
                try {
                    lfo.dispose?.();
                }
                catch (error) {
                    console.warn('Failed to dispose LFO:', error);
                }
            });
            delete node.__sequencerLFOs;
        }
        if (node && typeof node.dispose === 'function') {
            try {
                node.dispose();
            }
            catch (error) {
                console.warn('Failed to dispose node:', error);
            }
        }
    }
    disposeNode(nodeId) {
        const node = this.nodes[nodeId];
        if (!node)
            return;
        this.disposeSingle(node);
        this.nodes[nodeId] = undefined;
    }
    disposeAll() {
        this.nodes.forEach(node => this.disposeSingle(node));
        this.nodes = [];
    }
}
exports.SequencerNodes = SequencerNodes;
