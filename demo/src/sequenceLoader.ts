// Sequence data loader for Tone.js JSON Sequencer
import type { SequenceEvent } from './demo-types.js';
import { sequenceDefinitions as basicSequences } from './sequences/basicSequences.js';
import { sequenceDefinitions as synthSequences } from './sequences/synthSequences.js';
import { sequenceDefinitions as effectSequences } from './sequences/effectSequences.js';

export interface SequenceDefinition {
  name: string;
  data: SequenceEvent[];
}

export function loadAllSequences(): SequenceDefinition[] {
  return [
    ...basicSequences,
    ...synthSequences,
    ...effectSequences
  ];
}
