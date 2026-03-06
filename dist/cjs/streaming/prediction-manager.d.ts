import type { SequenceEvent } from '../types.js';
import type { EventPrediction } from './streaming-types.js';
/**
 * Dependencies required by PredictionManager to inspect events
 */
export interface PredictionManagerDeps {
    isSchedulableEvent: (event: SequenceEvent) => boolean;
    getTimeNotation: (event: SequenceEvent) => string;
    getEventTime: (event: SequenceEvent) => number | null;
    debug: (message: string, data?: any) => void;
}
/**
 * Manages event scheduling predictions for the streaming player.
 * Generates predictions before playback starts and allows looking them up
 * during scheduling to detect timing mismatches.
 */
export declare class PredictionManager {
    private predictions;
    /**
     * Retrieve a prediction by its key ("loopIteration-eventIndex")
     */
    get(key: string): EventPrediction | undefined;
    /**
     * Generate event scheduling predictions.
     * Creates predictions for the first loop and the first event of the next loop.
     */
    generate(events: SequenceEvent[], startTime: number, sequenceDuration: number, loopEnabled: boolean, loopWaitSeconds: number, deps: PredictionManagerDeps): void;
}
