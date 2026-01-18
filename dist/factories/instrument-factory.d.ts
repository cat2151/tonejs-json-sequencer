import type * as ToneTypes from 'tone';
/**
 * Create an instrument node
 * @param Tone - Tone.js library instance
 * @param nodeType - Type of instrument to create
 * @param args - Arguments for the instrument constructor
 * @returns Created instrument node or null if unknown type
 */
export declare function createInstrument(Tone: typeof ToneTypes, nodeType: string, args?: any): any;
