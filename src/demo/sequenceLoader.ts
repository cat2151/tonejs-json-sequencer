// Sequence data loader for Tone.js JSON Sequencer
import type { SequenceEvent } from './demo-types.js';

// Import all instrument demos
import * as minimal from './instrument/minimal.js';
import * as tempoTest from './instrument/tempo-test.js';
import * as streamingTestDoremi from './instrument/streaming-test-doremi.js';
import * as loopendTest from './instrument/loopend-test.js';
import * as delayVibrato from './instrument/delay-vibrato.js';
import * as multitimbral from './instrument/multitimbral.js';
import * as supersaw from './instrument/supersaw.js';
import * as samplerPiano from './instrument/sampler-piano.js';
import * as polysynthFm from './instrument/polysynth-fm.js';
import * as monosynth from './instrument/monosynth.js';
import * as amsynth from './instrument/amsynth.js';
import * as duosynth from './instrument/duosynth.js';
import * as metalsynth from './instrument/metalsynth.js';
import * as membranesynth from './instrument/membranesynth.js';
import * as plucksynth from './instrument/plucksynth.js';
import * as noisesynth from './instrument/noisesynth.js';
import * as portamento from './instrument/portamento.js';
import * as volumeControl from './instrument/volume-control.js';

// Import all effect demos
import * as reverb from './effect/reverb.js';
import * as freeverb from './effect/freeverb.js';
import * as jcreverb from './effect/jcreverb.js';
import * as chorus from './effect/chorus.js';
import * as chorusObjectArgs from './effect/chorus-object-args.js';
import * as phaser from './effect/phaser.js';
import * as tremolo from './effect/tremolo.js';
import * as vibrato from './effect/vibrato.js';
import * as autofilter from './effect/autofilter.js';
import * as autopanner from './effect/autopanner.js';
import * as autowah from './effect/autowah.js';
import * as feedbackdelay from './effect/feedbackdelay.js';
import * as pingpongdelay from './effect/pingpongdelay.js';
import * as distortion from './effect/distortion.js';
import * as bitcrusher from './effect/bitcrusher.js';
import * as chebyshev from './effect/chebyshev.js';
import * as pitchshift from './effect/pitchshift.js';
import * as frequencyshifter from './effect/frequencyshifter.js';
import * as stereowidener from './effect/stereowidener.js';

export interface SequenceDefinition {
  name: string;
  data: SequenceEvent[];
}

// Aggregate all sequences
const allSequenceModules = [
  // Instrument demos
  minimal,
  tempoTest,
  streamingTestDoremi,
  loopendTest,
  delayVibrato,
  multitimbral,
  supersaw,
  samplerPiano,
  polysynthFm,
  monosynth,
  amsynth,
  duosynth,
  metalsynth,
  membranesynth,
  plucksynth,
  noisesynth,
  portamento,
  volumeControl,
  // Effect demos
  reverb,
  freeverb,
  jcreverb,
  chorus,
  chorusObjectArgs,
  phaser,
  tremolo,
  vibrato,
  autofilter,
  autopanner,
  autowah,
  feedbackdelay,
  pingpongdelay,
  distortion,
  bitcrusher,
  chebyshev,
  pitchshift,
  frequencyshifter,
  stereowidener
];

export function loadAllSequences(): SequenceDefinition[] {
  return allSequenceModules.map(module => ({
    name: module.name,
    data: module.sequence
  }));
}
