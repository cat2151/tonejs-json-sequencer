// Tone.js JSON Sequencer - Main Entry Point
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

// Export all public types
export type {
  CreateNodeEvent,
  ConnectEvent,
  TriggerAttackReleaseEvent,
  DepthRampToEvent,
  SequenceEvent
} from './types.js';

// Export node manager
export { SequencerNodes } from './sequencer-nodes.js';

// Export main functions
export { scheduleOrExecuteEvent, playSequence } from './event-scheduler.js';

// Export NDJSON streaming functionality
export { 
  NDJSONStreamingPlayer, 
  parseNDJSON,
  type NDJSONStreamingConfig,
  type DebugEventInfo,
  type DebugCallback
} from './ndjson-streaming.js';

// Export offline rendering functionality
export {
  OfflineRenderer,
  audioBufferToWav,
  downloadWav,
  type OfflineRendererConfig,
  type OfflineRenderResult
} from './offline-renderer.js';
