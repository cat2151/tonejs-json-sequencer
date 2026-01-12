import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
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
