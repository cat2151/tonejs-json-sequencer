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
export interface GenericRampToEvent {
    eventType: 'rampTo';
    nodeId: number;
    /**
     * Arguments for rampTo: [value, rampTime?, targetPath, time?]
     * - targetPath: dot-delimited string (e.g., "filter.Q") or string[]
     * - time: optional start time for rampTo
     */
    args: any[];
}
export interface SetEvent {
    eventType: 'set';
    nodeId: number;
    nodeType: string;
    args: number[];
}
export interface LoopEndEvent {
    eventType: 'loopEnd';
    nodeId: number;
    args: string[];
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
export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent | VolumeRampToEvent | FrequencyRampToEvent | QRampToEvent | FilterFrequencyRampToEvent | FilterQRampToEvent | GenericRampToEvent | SetEvent | LoopEndEvent | LFOEvent;
