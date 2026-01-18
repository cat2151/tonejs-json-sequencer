"use strict";
// Tone.js JSON Sequencer - Main Entry Point
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadWav = exports.audioBufferToWav = exports.OfflineRenderer = exports.parseNDJSON = exports.NDJSONStreamingPlayer = exports.playSequence = exports.scheduleOrExecuteEvent = exports.SequencerNodes = void 0;
// Export node manager
var sequencer_nodes_js_1 = require("./sequencer-nodes.js");
Object.defineProperty(exports, "SequencerNodes", { enumerable: true, get: function () { return sequencer_nodes_js_1.SequencerNodes; } });
// Export main functions
var event_scheduler_js_1 = require("./event-scheduler.js");
Object.defineProperty(exports, "scheduleOrExecuteEvent", { enumerable: true, get: function () { return event_scheduler_js_1.scheduleOrExecuteEvent; } });
Object.defineProperty(exports, "playSequence", { enumerable: true, get: function () { return event_scheduler_js_1.playSequence; } });
// Export NDJSON streaming functionality
var ndjson_streaming_js_1 = require("./ndjson-streaming.js");
Object.defineProperty(exports, "NDJSONStreamingPlayer", { enumerable: true, get: function () { return ndjson_streaming_js_1.NDJSONStreamingPlayer; } });
Object.defineProperty(exports, "parseNDJSON", { enumerable: true, get: function () { return ndjson_streaming_js_1.parseNDJSON; } });
// Export offline rendering functionality
var offline_renderer_js_1 = require("./offline-renderer.js");
Object.defineProperty(exports, "OfflineRenderer", { enumerable: true, get: function () { return offline_renderer_js_1.OfflineRenderer; } });
Object.defineProperty(exports, "audioBufferToWav", { enumerable: true, get: function () { return offline_renderer_js_1.audioBufferToWav; } });
Object.defineProperty(exports, "downloadWav", { enumerable: true, get: function () { return offline_renderer_js_1.downloadWav; } });
