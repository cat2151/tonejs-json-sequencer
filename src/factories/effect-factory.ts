// Tone.js JSON Sequencer - Effect Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';

/**
 * Create an effect node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of effect to create
 * @param args - Arguments for the effect constructor
 * @returns Created effect node or null if unknown type
 */
export function createEffect(
  Tone: typeof ToneTypes,
  nodeType: string,
  args?: any
): any {
  const startIfAvailable = (effect: any) => {
    effect.start?.();
    return effect;
  };
  // When args is a non-array value (including primitives), treat it as a single constructor argument.
  // When args is an array, spread it as positional arguments (backward compatible).
  const effectArgs = args != null && !Array.isArray(args) ? [args] : (args || []);
  switch (nodeType) {
    case 'AutoFilter':
      return startIfAvailable(new Tone.AutoFilter(...effectArgs));
    case 'AutoPanner':
      return startIfAvailable(new Tone.AutoPanner(...effectArgs));
    case 'AutoWah':
      return new Tone.AutoWah(...effectArgs);
    case 'BitCrusher':
      return new Tone.BitCrusher(...effectArgs);
    case 'Chebyshev':
      return new Tone.Chebyshev(...effectArgs);
    case 'Chorus':
      return startIfAvailable(new Tone.Chorus(...effectArgs));
    case 'Distortion':
      return new Tone.Distortion(...effectArgs);
    case 'Filter':
      return new Tone.Filter(...effectArgs);
    case 'FeedbackDelay':
      return new Tone.FeedbackDelay(...effectArgs);
    case 'Freeverb':
      return new Tone.Freeverb(...effectArgs);
    case 'FrequencyShifter':
      return new Tone.FrequencyShifter(...effectArgs);
    case 'JCReverb':
      return new Tone.JCReverb(...effectArgs);
    case 'Phaser':
      return new Tone.Phaser(...effectArgs);
    case 'PingPongDelay':
      return new Tone.PingPongDelay(...effectArgs);
    case 'PitchShift':
      return new Tone.PitchShift(...effectArgs);
    case 'Reverb':
      return new Tone.Reverb(...effectArgs);
    case 'StereoWidener':
      return new Tone.StereoWidener(...effectArgs);
    case 'Tremolo':
      return startIfAvailable(new Tone.Tremolo(...effectArgs));
    case 'Vibrato':
      return startIfAvailable(new Tone.Vibrato(...effectArgs));
    default:
      return null;
  }
}
