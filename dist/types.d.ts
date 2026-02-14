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
     * Arguments for the LFO event: [...Tone.LFO constructor args, targetPath, time]
     * targetPath can be a dot-delimited string (e.g., "filter.Q") or string[]
     */
    args: any[];
}
export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent | VolumeRampToEvent | FrequencyRampToEvent | QRampToEvent | FilterFrequencyRampToEvent | FilterQRampToEvent | SetEvent | LoopEndEvent | LFOEvent;
