// Tone.js JSON Sequencer - Node Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';
import type { CreateNodeEvent, ConnectEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';

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
 * Create a Tone.js node based on the event
 */
export function createNode(
  Tone: typeof ToneTypes,
  nodes: SequencerNodes,
  element: CreateNodeEvent
): void {
  switch (element.nodeType) {
    // Instruments
    case 'AMSynth':
      nodes.set(element.nodeId, new Tone.AMSynth(element.args));
      break;
    case 'DuoSynth':
      nodes.set(element.nodeId, new Tone.DuoSynth(element.args));
      break;
    case 'FMSynth':
      nodes.set(element.nodeId, new Tone.FMSynth(element.args));
      break;
    case 'MembraneSynth':
      nodes.set(element.nodeId, new Tone.MembraneSynth(element.args));
      break;
    case 'MetalSynth':
      nodes.set(element.nodeId, new Tone.MetalSynth(element.args));
      break;
    case 'MonoSynth':
      nodes.set(element.nodeId, new Tone.MonoSynth(element.args));
      break;
    case 'NoiseSynth':
      nodes.set(element.nodeId, new Tone.NoiseSynth(element.args));
      break;
    case 'PluckSynth':
      nodes.set(element.nodeId, new Tone.PluckSynth(element.args));
      break;
    case 'PolySynth': {
      // PolySynth can be created with a voice parameter
      // Format 1 (with voice): { voice: 'FMSynth', options: {...} }
      // Format 2 (default Synth): { options: {...} } or just {...}
      if (element.args && element.args.voice) {
        // Get the voice constructor from Tone, only if the voice type is allowed
        const voiceType = element.args.voice;
        if (typeof voiceType === 'string' && POLYSYNTH_ALLOWED_VOICES.has(voiceType)) {
          const voiceConstructor = (Tone as any)[voiceType];
          if (voiceConstructor) {
            nodes.set(element.nodeId, new Tone.PolySynth(voiceConstructor, element.args.options));
          } else {
            console.warn(`Unknown voice type for PolySynth: ${voiceType}`);
            nodes.set(element.nodeId, new Tone.PolySynth(element.args.options || element.args || {}));
          }
        } else {
          console.warn(`Disallowed or invalid voice type for PolySynth: ${String(voiceType)}`);
          nodes.set(element.nodeId, new Tone.PolySynth(element.args.options || element.args || {}));
        }
      } else {
        // Backward compatibility: use default Synth voice
        nodes.set(element.nodeId, new Tone.PolySynth(element.args?.options || element.args || {}));
      }
      break;
    }
    case 'Sampler':
      nodes.set(element.nodeId, new Tone.Sampler({
        ...element.args,
        onload: () => {
          console.log('Sampler loaded successfully');
        },
        onerror: (error: Error) => {
          console.error('Sampler loading error:', error);
        }
      }));
      break;
    case 'Synth':
      nodes.set(element.nodeId, new Tone.Synth(element.args));
      break;
    // Effects
    case 'AutoFilter':
      nodes.set(element.nodeId, new Tone.AutoFilter(...(element.args || [])));
      break;
    case 'AutoPanner':
      nodes.set(element.nodeId, new Tone.AutoPanner(...(element.args || [])));
      break;
    case 'AutoWah':
      nodes.set(element.nodeId, new Tone.AutoWah(...(element.args || [])));
      break;
    case 'BitCrusher':
      nodes.set(element.nodeId, new Tone.BitCrusher(...(element.args || [])));
      break;
    case 'Chebyshev':
      nodes.set(element.nodeId, new Tone.Chebyshev(...(element.args || [])));
      break;
    case 'Chorus':
      nodes.set(element.nodeId, new Tone.Chorus(...(element.args || [])));
      break;
    case 'Distortion':
      nodes.set(element.nodeId, new Tone.Distortion(...(element.args || [])));
      break;
    case 'FeedbackDelay':
      nodes.set(element.nodeId, new Tone.FeedbackDelay(...(element.args || [])));
      break;
    case 'Freeverb':
      nodes.set(element.nodeId, new Tone.Freeverb(...(element.args || [])));
      break;
    case 'FrequencyShifter':
      nodes.set(element.nodeId, new Tone.FrequencyShifter(...(element.args || [])));
      break;
    case 'JCReverb':
      nodes.set(element.nodeId, new Tone.JCReverb(...(element.args || [])));
      break;
    case 'Phaser':
      nodes.set(element.nodeId, new Tone.Phaser(...(element.args || [])));
      break;
    case 'PingPongDelay':
      nodes.set(element.nodeId, new Tone.PingPongDelay(...(element.args || [])));
      break;
    case 'PitchShift':
      nodes.set(element.nodeId, new Tone.PitchShift(...(element.args || [])));
      break;
    case 'Reverb':
      nodes.set(element.nodeId, new Tone.Reverb(...(element.args || [])));
      break;
    case 'StereoWidener':
      nodes.set(element.nodeId, new Tone.StereoWidener(...(element.args || [])));
      break;
    case 'Tremolo':
      nodes.set(element.nodeId, new Tone.Tremolo(...(element.args || [])));
      break;
    case 'Vibrato':
      nodes.set(element.nodeId, new Tone.Vibrato(...(element.args || [])));
      break;
    default:
      console.warn(`Unknown node type: ${element.nodeType}`);
  }
}

/**
 * Connect a node to another node or destination
 */
export function connectNode(nodes: SequencerNodes, element: ConnectEvent): void {
  const node = nodes.get(element.nodeId);
  if (!node) {
    console.warn(`Node ${element.nodeId} not found for connection`);
    return;
  }

  if (element.connectTo === 'toDestination') {
    node.toDestination();
  } else {
    const targetNode = nodes.get(element.connectTo as number);
    if (targetNode) {
      node.connect(targetNode);
    } else {
      console.warn(`Target node ${element.connectTo} not found`);
    }
  }
}
