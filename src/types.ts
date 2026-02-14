// Tone.js JSON Sequencer - Type Definitions
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

// JSON sequence event types
export interface CreateNodeEvent {
  eventType: 'createNode';
  nodeId: number;
  nodeType: string;
  args?: any; // Can be object (for instruments) or array (for effects)
}

export interface ConnectEvent {
  eventType: 'connect';
  nodeId: number;
  connectTo: number | 'toDestination';
}

export interface TriggerAttackReleaseEvent {
  eventType: 'triggerAttackRelease';
  nodeId: number;
  args: string[]; // [note, duration, time]
}

export interface DepthRampToEvent {
  eventType: 'depth.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface VolumeRampToEvent {
  eventType: 'volume.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface FrequencyRampToEvent {
  eventType: 'frequency.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface QRampToEvent {
  eventType: 'Q.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface FilterFrequencyRampToEvent {
  eventType: 'filter.frequency.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface FilterQRampToEvent {
  eventType: 'filter.Q.rampTo';
  nodeId: number;
  args: string[]; // [value, rampTime, time]
}

export interface SetEvent {
  eventType: 'set';
  nodeId: number;
  nodeType: string; // e.g., 'Transport.bpm.value'
  args: number[]; // [value] - e.g., [120] for BPM
}

export interface LoopEndEvent {
  eventType: 'loopEnd';
  nodeId: number;
  args: string[]; // [time] - e.g., ["+384i"] for 384 ticks
}

export interface LFOEvent {
  eventType: 'LFO';
  nodeId: number;
  /**
   * Arguments for the LFO event: [options, targetPath, time?]
   * - options: Tone.LFO options object (Tone time values are relative to Transport start)
   * - targetPath: dot-delimited string (e.g., "filter.Q") or string[]
   * - time: optional start time for the LFO
   */
  args: any[];
}

export type SequenceEvent =
  | CreateNodeEvent
  | ConnectEvent
  | TriggerAttackReleaseEvent
  | DepthRampToEvent
  | VolumeRampToEvent
  | FrequencyRampToEvent
  | QRampToEvent
  | FilterFrequencyRampToEvent
  | FilterQRampToEvent
  | SetEvent
  | LoopEndEvent
  | LFOEvent;
