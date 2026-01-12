// Type declarations for global Tone.js loaded via script tag
import type * as ToneTypes from 'tone';

declare global {
  const Tone: typeof ToneTypes;
}

export {};
