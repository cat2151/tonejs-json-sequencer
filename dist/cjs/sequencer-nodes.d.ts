/**
 * Manages Tone.js nodes for the sequencer
 */
export declare class SequencerNodes {
    private nodes;
    get(nodeId: number): any;
    set(nodeId: number, node: any): void;
    disposeNode(nodeId: number): void;
    disposeAll(): void;
}
