import type * as ToneTypes from 'tone';
export interface CreateNodeEvent {
    eventType: 'createNode';
    nodeId: number;
    nodeType: string;
    args?: any;
}
export interface ConnectEvent {
    eventType: 'connect';
    nodeId: number;
    connectTo: number | 'toDestination';
}
export interface TriggerAttackReleaseEvent {
    eventType: 'triggerAttackRelease';
    nodeId: number;
    args: string[];
}
export interface DepthRampToEvent {
    eventType: 'depth.rampTo';
    nodeId: number;
    args: string[];
}
export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent;
/**
 * Manages Tone.js nodes for the sequencer
 */
export declare class SequencerNodes {
    private nodes;
    get(nodeId: number): any;
    set(nodeId: number, node: any): void;
    disposeAll(): void;
}
/**
 * Schedule or execute a sequence event
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param element - Event to process
 */
export declare function scheduleOrExecuteEvent(Tone: typeof ToneTypes, nodes: SequencerNodes, element: SequenceEvent): void;
/**
 * Play a JSON sequence
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param sequence - Array of sequence events
 */
export declare function playSequence(Tone: typeof ToneTypes, nodes: SequencerNodes, sequence: SequenceEvent[]): Promise<void>;
