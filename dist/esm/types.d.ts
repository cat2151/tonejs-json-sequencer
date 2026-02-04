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
export interface SetEvent {
    eventType: 'set';
    nodeId: number;
    nodeType: string;
    args: number[];
}
export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent | SetEvent;
