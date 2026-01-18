"use strict";
// Tone.js JSON Sequencer - Offline Renderer
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineRenderer = void 0;
exports.audioBufferToWav = audioBufferToWav;
exports.downloadWav = downloadWav;
const sequencer_nodes_js_1 = require("./sequencer-nodes.js");
const event_scheduler_js_1 = require("./event-scheduler.js");
const time_parser_js_1 = require("./utils/time-parser.js");
const ndjson_streaming_js_1 = require("./ndjson-streaming.js");
/**
 * Offline Renderer
 * Renders sequences offline using Tone.Offline and exports to WAV
 */
class OfflineRenderer {
    constructor(Tone, config = {}) {
        this.Tone = Tone;
        this.config = {
            ticksPerQuarter: config.ticksPerQuarter ?? 480,
            beatsPerMinute: config.beatsPerMinute ?? 120,
            beatsPerBar: config.beatsPerBar ?? 4,
            subdivisionsPerBeat: config.subdivisionsPerBeat ?? 4,
            endBufferSeconds: config.endBufferSeconds ?? 1,
            sampleRate: config.sampleRate ?? 44100,
            channels: config.channels ?? 2,
            onProgress: config.onProgress ?? (() => { })
        };
        this.timeParser = new time_parser_js_1.TimeParser({
            ticksPerQuarter: this.config.ticksPerQuarter,
            beatsPerMinute: this.config.beatsPerMinute,
            beatsPerBar: this.config.beatsPerBar,
            subdivisionsPerBeat: this.config.subdivisionsPerBeat
        });
    }
    /**
     * Render a sequence offline
     * @param eventsOrNDJSON - Array of events or NDJSON string
     * @returns Promise that resolves with the rendered audio buffer
     */
    async render(eventsOrNDJSON) {
        // Parse events if NDJSON string is provided
        const events = typeof eventsOrNDJSON === 'string'
            ? (0, ndjson_streaming_js_1.parseNDJSON)(eventsOrNDJSON)
            : eventsOrNDJSON;
        if (events.length === 0) {
            throw new Error('No events to render');
        }
        // Calculate sequence duration
        const duration = this.calculateSequenceDuration(events);
        // Report initial progress
        this.config.onProgress(0);
        // Render offline
        const toneBuffer = await this.Tone.Offline(async ({ transport }) => {
            // Create a new nodes instance for this offline context
            const nodes = new sequencer_nodes_js_1.SequencerNodes();
            // First pass: create nodes and connections
            for (const event of events) {
                if (event.eventType === 'createNode' || event.eventType === 'connect') {
                    (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, nodes, event);
                }
            }
            // Wait for all audio buffers to load
            await this.Tone.loaded();
            // Second pass: schedule playback events
            for (const event of events) {
                if (event.eventType !== 'createNode' && event.eventType !== 'connect') {
                    (0, event_scheduler_js_1.scheduleOrExecuteEvent)(this.Tone, nodes, event);
                }
            }
            // Start the transport
            transport.start();
        }, duration, this.config.channels, this.config.sampleRate);
        // Extract the raw AudioBuffer from ToneAudioBuffer
        const buffer = toneBuffer.get();
        if (!buffer) {
            throw new Error('Failed to extract AudioBuffer from rendered audio');
        }
        // Report completion
        this.config.onProgress(100);
        return {
            buffer,
            duration
        };
    }
    /**
     * Calculate the total duration of the sequence
     */
    calculateSequenceDuration(events) {
        let maxTime = 0;
        events.forEach(event => {
            if (event.eventType === 'createNode' || event.eventType === 'connect') {
                return;
            }
            const eventTime = this.getEventTime(event);
            if (eventTime !== null && eventTime > maxTime) {
                maxTime = eventTime;
            }
        });
        // Add buffer for the last note's duration
        return maxTime + this.config.endBufferSeconds;
    }
    /**
     * Get event time in seconds
     */
    getEventTime(event) {
        if (!('args' in event) || !Array.isArray(event.args) || event.args.length === 0) {
            return null;
        }
        const timeArg = event.args[event.args.length - 1];
        return this.timeParser.parseTimeToSeconds(timeArg);
    }
}
exports.OfflineRenderer = OfflineRenderer;
/**
 * Convert AudioBuffer to WAV format
 * Based on audiobuffer-to-wav (https://github.com/Jam3/audiobuffer-to-wav)
 * @param buffer - The AudioBuffer to convert
 * @returns ArrayBuffer containing WAV data
 */
function audioBufferToWav(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;
    const data = new Float32Array(buffer.length * numberOfChannels);
    // Interleave channels
    for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < buffer.length; i++) {
            data[i * numberOfChannels + channel] = channelData[i];
        }
    }
    const dataLength = data.length * bytesPerSample;
    const headerLength = 44;
    const totalLength = headerLength + dataLength;
    const arrayBuffer = new ArrayBuffer(totalLength);
    const view = new DataView(arrayBuffer);
    // Write WAV header
    // "RIFF" chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, totalLength - 8, true); // File size - 8
    writeString(view, 8, 'WAVE');
    // "fmt " sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, format, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numberOfChannels, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * blockAlign, true); // ByteRate
    view.setUint16(32, blockAlign, true); // BlockAlign
    view.setUint16(34, bitDepth, true); // BitsPerSample
    // "data" sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true); // Subchunk2Size
    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
    }
    return arrayBuffer;
}
/**
 * Helper function to write string to DataView
 */
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}
/**
 * Download AudioBuffer as WAV file
 * @param buffer - The AudioBuffer to download
 * @param filename - The filename for the download (default: 'output.wav')
 */
function downloadWav(buffer, filename = 'output.wav') {
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
