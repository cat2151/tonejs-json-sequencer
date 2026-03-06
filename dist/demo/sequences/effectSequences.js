import { sequenceDefinitions as reverbSequences } from './effect-sequences/reverb-sequences.js';
import { sequenceDefinitions as modulationSequences } from './effect-sequences/modulation-sequences.js';
import { sequenceDefinitions as delayDistortionSequences } from './effect-sequences/delay-distortion-sequences.js';
export const sequenceDefinitions = [
    ...reverbSequences,
    ...modulationSequences,
    ...delayDistortionSequences,
];
