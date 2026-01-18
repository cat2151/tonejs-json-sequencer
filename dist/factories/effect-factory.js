"use strict";
// Tone.js JSON Sequencer - Effect Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEffect = createEffect;
/**
 * Create an effect node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of effect to create
 * @param args - Arguments for the effect constructor
 * @returns Created effect node or null if unknown type
 */
function createEffect(Tone, nodeType, args) {
    switch (nodeType) {
        case 'AutoFilter':
            return new Tone.AutoFilter(...(args || []));
        case 'AutoPanner':
            return new Tone.AutoPanner(...(args || []));
        case 'AutoWah':
            return new Tone.AutoWah(...(args || []));
        case 'BitCrusher':
            return new Tone.BitCrusher(...(args || []));
        case 'Chebyshev':
            return new Tone.Chebyshev(...(args || []));
        case 'Chorus':
            return new Tone.Chorus(...(args || []));
        case 'Distortion':
            return new Tone.Distortion(...(args || []));
        case 'FeedbackDelay':
            return new Tone.FeedbackDelay(...(args || []));
        case 'Freeverb':
            return new Tone.Freeverb(...(args || []));
        case 'FrequencyShifter':
            return new Tone.FrequencyShifter(...(args || []));
        case 'JCReverb':
            return new Tone.JCReverb(...(args || []));
        case 'Phaser':
            return new Tone.Phaser(...(args || []));
        case 'PingPongDelay':
            return new Tone.PingPongDelay(...(args || []));
        case 'PitchShift':
            return new Tone.PitchShift(...(args || []));
        case 'Reverb':
            return new Tone.Reverb(...(args || []));
        case 'StereoWidener':
            return new Tone.StereoWidener(...(args || []));
        case 'Tremolo':
            return new Tone.Tremolo(...(args || []));
        case 'Vibrato':
            return new Tone.Vibrato(...(args || []));
        default:
            return null;
    }
}
