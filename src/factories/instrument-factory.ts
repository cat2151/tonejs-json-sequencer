// Tone.js JSON Sequencer - Instrument Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';

// Whitelist of allowed voice types for PolySynth security
const POLYSYNTH_ALLOWED_VOICES = new Set<string>([
  'AMSynth',
  'DuoSynth',
  'FMSynth',
  'MembraneSynth',
  'MetalSynth',
  'MonoSynth',
  'NoiseSynth',
  'PluckSynth',
  'Synth',
]);

/**
 * Create an instrument node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of instrument to create
 * @param args - Arguments for the instrument constructor
 * @returns Created instrument node or null if unknown type
 */
export function createInstrument(
  Tone: typeof ToneTypes,
  nodeType: string,
  args?: any
): any {
  switch (nodeType) {
    case 'AMSynth':
      return new Tone.AMSynth(args);
    case 'DuoSynth':
      return new Tone.DuoSynth(args);
    case 'FMSynth':
      return new Tone.FMSynth(args);
    case 'MembraneSynth':
      return new Tone.MembraneSynth(args);
    case 'MetalSynth':
      return new Tone.MetalSynth(args);
    case 'MonoSynth':
      return new Tone.MonoSynth(args);
    case 'NoiseSynth':
      return new Tone.NoiseSynth(args);
    case 'PluckSynth':
      return new Tone.PluckSynth(args);
    case 'PolySynth':
      return createPolySynth(Tone, args);
    case 'Sampler':
      return createSampler(Tone, args);
    case 'Synth':
      return new Tone.Synth(args);
    default:
      return null;
  }
}

/**
 * Create a PolySynth with specified voice
 */
function createPolySynth(Tone: typeof ToneTypes, args?: any): any {
  // PolySynth can be created with a voice parameter
  // Format 1 (with voice): { voice: 'FMSynth', options: {...} }
  // Format 2 (default Synth): { options: {...} } or just {...}
  if (args && args.voice) {
    // Get the voice constructor from Tone, only if the voice type is allowed
    const voiceType = args.voice;
    if (typeof voiceType === 'string' && POLYSYNTH_ALLOWED_VOICES.has(voiceType)) {
      const voiceConstructor = (Tone as any)[voiceType];
      if (voiceConstructor) {
        return new Tone.PolySynth(voiceConstructor, args.options);
      } else {
        console.warn(`Unknown voice type for PolySynth: ${voiceType}`);
        // Fallback to default Synth voice with options
        if (args.options) {
          return new Tone.PolySynth(Tone.Synth, args.options);
        } else {
          return new Tone.PolySynth(args ? args : {});
        }
      }
    } else {
      console.warn(`Disallowed or invalid voice type for PolySynth: ${String(voiceType)}`);
      // Fallback to default Synth voice with options
      if (args.options) {
        return new Tone.PolySynth(Tone.Synth, args.options);
      } else {
        return new Tone.PolySynth(args ? args : {});
      }
    }
  } else {
    // Use default Synth voice
    // When options are provided, explicitly pass Tone.Synth as the voice parameter
    if (args?.options) {
      return new Tone.PolySynth(Tone.Synth, args.options);
    } else {
      // Backward compatibility: pass args directly (might be options or empty)
      return new Tone.PolySynth(args ? args : {});
    }
  }
}

/**
 * Create a Sampler with callbacks
 */
function createSampler(Tone: typeof ToneTypes, args?: any): any {
  // Preserve user-provided callbacks while adding default logging
  const userOnload = args?.onload;
  const userOnerror = args?.onerror;
  
  return new Tone.Sampler({
    ...args,
    onload: () => {
      console.log('Sampler loaded successfully');
      if (userOnload) {
        userOnload();
      }
    },
    onerror: (error: Error) => {
      console.error('Sampler loading error:', error);
      if (userOnerror) {
        userOnerror(error);
      }
    }
  });
}
