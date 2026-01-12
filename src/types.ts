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

export type SequenceEvent =
  | CreateNodeEvent
  | ConnectEvent
  | TriggerAttackReleaseEvent
  | DepthRampToEvent;
