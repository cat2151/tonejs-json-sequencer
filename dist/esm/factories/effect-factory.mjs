// Tone.js JSON Sequencer - Effect Factory
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
/**
 * Create an effect node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of effect to create
 * @param args - Arguments for the effect constructor
 * @returns Created effect node or null if unknown type
 */
export function createEffect(Tone, nodeType, args) {
    // When args is a non-array object, pass it directly as options.
    // When args is an array, spread it as positional arguments (backward compatible).
    const effectArgs = args && !Array.isArray(args) ? [args] : (args || []);
    switch (nodeType) {
        case 'AutoFilter':
            return new Tone.AutoFilter(...effectArgs);
        case 'AutoPanner':
            return new Tone.AutoPanner(...effectArgs);
        case 'AutoWah':
            return new Tone.AutoWah(...effectArgs);
        case 'BitCrusher':
            return new Tone.BitCrusher(...effectArgs);
        case 'Chebyshev':
            return new Tone.Chebyshev(...effectArgs);
        case 'Chorus':
            return new Tone.Chorus(...effectArgs);
        case 'Distortion':
            return new Tone.Distortion(...effectArgs);
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
            return new Tone.Tremolo(...effectArgs);
        case 'Vibrato':
            return new Tone.Vibrato(...effectArgs);
        default:
            return null;
    }
}
