// Tone.js JSON Sequencer - Node Manager
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
/**
 * Manages Tone.js nodes for the sequencer
 */
export class SequencerNodes {
    constructor() {
        this.nodes = [];
    }
    get(nodeId) {
        return this.nodes[nodeId];
    }
    set(nodeId, node) {
        this.nodes[nodeId] = node;
    }
    disposeAll() {
        this.nodes.forEach(node => {
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
            }
            if (node && typeof node.dispose === 'function') {
                try {
                    node.dispose();
                }
                catch (error) {
                    console.warn('Failed to dispose node:', error);
                }
            }
        });
        this.nodes = [];
    }
}
