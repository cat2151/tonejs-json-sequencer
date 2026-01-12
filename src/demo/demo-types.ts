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

export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent;
