import type * as ToneTypes from 'tone';
/**
 * Create an effect node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of effect to create
 * @param args - Arguments for the effect constructor
 * @returns Created effect node or null if unknown type
 */
export declare function createEffect(Tone: typeof ToneTypes, nodeType: string, args?: any): any;
