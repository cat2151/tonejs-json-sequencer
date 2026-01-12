import type * as ToneTypes from 'tone';
import type { CreateNodeEvent, ConnectEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
/**
 * Create a Tone.js node based on the event
 */
export declare function createNode(Tone: typeof ToneTypes, nodes: SequencerNodes, element: CreateNodeEvent): void;
/**
 * Connect a node to another node or destination
 */
export declare function connectNode(nodes: SequencerNodes, element: ConnectEvent): void;
