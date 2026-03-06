// Tone.js JSON Sequencer - Event Prediction Manager
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

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
export class PredictionManager {
  private predictions: Map<string, EventPrediction> = new Map();

  /**
   * Retrieve a prediction by its key ("loopIteration-eventIndex")
   */
  get(key: string): EventPrediction | undefined {
    return this.predictions.get(key);
  }

  /**
   * Generate event scheduling predictions.
   * Creates predictions for the first loop and the first event of the next loop.
   */
  generate(
    events: SequenceEvent[],
    startTime: number,
    sequenceDuration: number,
    loopEnabled: boolean,
    loopWaitSeconds: number,
    deps: PredictionManagerDeps
  ): void {
    this.predictions.clear();
    const predictionList: EventPrediction[] = [];

    // Generate predictions for first loop (loop 0)
    events.forEach((event, index) => {
      if (!deps.isSchedulableEvent(event)) {
        return;
      }

      const eventTime = deps.getEventTime(event);
      if (eventTime === null) return;

      const prediction: EventPrediction = {
        eventIndex: index,
        eventType: event.eventType,
        timeNotation: deps.getTimeNotation(event),
        timeSeconds: eventTime,
        expectedScheduleTime: startTime + eventTime,
        loopIteration: 0
      };

      predictionList.push(prediction);
      this.predictions.set(`0-${index}`, prediction);
    });

    // Add prediction for first event of next loop (if loop mode enabled)
    if (loopEnabled && events.length > 0) {
      const firstSchedulableEvent = events.find(e => deps.isSchedulableEvent(e));

      if (firstSchedulableEvent) {
        const firstEventIndex = events.indexOf(firstSchedulableEvent);
        const eventTime = deps.getEventTime(firstSchedulableEvent);

        if (eventTime !== null) {
          const loopOffset = sequenceDuration + loopWaitSeconds;
          const prediction: EventPrediction = {
            eventIndex: firstEventIndex,
            eventType: firstSchedulableEvent.eventType,
            timeNotation: deps.getTimeNotation(firstSchedulableEvent),
            timeSeconds: eventTime,
            expectedScheduleTime: startTime + loopOffset + eventTime,
            loopIteration: 1
          };

          predictionList.push(prediction);
          this.predictions.set(`1-${firstEventIndex}`, prediction);
        }
      }
    }

    // Log predictions
    if (predictionList.length > 0) {
      deps.debug('📋 === Event Scheduling Predictions ===');
      deps.debug(`t0 (playback start + lookahead) = ${startTime.toFixed(3)}s`);
      deps.debug('');
      deps.debug('Expected schedule times:');

      predictionList.forEach(pred => {
        const loopLabel = pred.loopIteration > 0 ? ` [Loop ${pred.loopIteration}]` : '';
        deps.debug(
          `  Event #${pred.eventIndex} (${pred.eventType})${loopLabel}: ${pred.timeNotation} → ${pred.timeSeconds.toFixed(3)}s → t0+${pred.timeSeconds.toFixed(3)}s = ${pred.expectedScheduleTime.toFixed(3)}s`
        );
      });
      deps.debug('');
    }
  }
}
