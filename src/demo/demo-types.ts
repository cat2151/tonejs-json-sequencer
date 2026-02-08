// Type definitions for demo files
// These types mirror the library's exported types to maintain independence
// If library types change, these should be updated accordingly

export interface CreateNodeEvent {
  eventType: 'createNode';
  nodeId: number;
  nodeType: string;
  args?: any;
}

export interface ConnectEvent {
  eventType: 'connect';
  nodeId: number;
  connectTo: number | 'toDestination';
}

export interface TriggerAttackReleaseEvent {
  eventType: 'triggerAttackRelease';
  nodeId: number;
  args: string[];
}

export interface DepthRampToEvent {
  eventType: 'depth.rampTo';
  nodeId: number;
  args: string[];
}

export interface VolumeRampToEvent {
  eventType: 'volume.rampTo';
  nodeId: number;
  args: string[];
}

export interface FrequencyRampToEvent {
  eventType: 'frequency.rampTo';
  nodeId: number;
  args: string[];
}

export interface QRampToEvent {
  eventType: 'Q.rampTo';
  nodeId: number;
  args: string[];
}

export interface FilterFrequencyRampToEvent {
  eventType: 'filter.frequency.rampTo';
  nodeId: number;
  args: string[];
}

export interface FilterQRampToEvent {
  eventType: 'filter.Q.rampTo';
  nodeId: number;
  args: string[];
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
  | LoopEndEvent;
