import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
/**
 * Configuration for offline renderer
 */
export interface OfflineRendererConfig {
    /** Ticks per quarter note for timing calculations (default: 480) */
    ticksPerQuarter?: number;
    /** Beats per minute for timing calculations (default: 120) */
    beatsPerMinute?: number;
    /** Beats per bar for time signature (default: 4) */
    beatsPerBar?: number;
    /** Subdivisions per beat (default: 4) */
    subdivisionsPerBeat?: number;
    /** Buffer time in seconds to add after last event (default: 1) */
    endBufferSeconds?: number;
    /** Sample rate for rendering (default: 44100) */
    sampleRate?: number;
    /** Number of channels (default: 2 for stereo) */
    channels?: number;
    /**
     * Callback for progress updates (0-100)
     * Note: Due to Tone.Offline's faster-than-realtime rendering, only start (0)
     * and completion (100) progress states are reported
     */
    onProgress?: (progress: number) => void;
}
/**
 * Result of offline rendering
 */
export interface OfflineRenderResult {
    /** The rendered audio buffer */
    buffer: AudioBuffer;
    /** Duration of the rendered audio in seconds */
    duration: number;
}
/**
 * Offline Renderer
 * Renders sequences offline using Tone.Offline and exports to WAV
 */
export declare class OfflineRenderer {
    private Tone;
    private config;
    private timeParser;
    constructor(Tone: typeof ToneTypes, config?: OfflineRendererConfig);
    /**
     * Render a sequence offline
     * @param eventsOrNDJSON - Array of events or NDJSON string
     * @returns Promise that resolves with the rendered audio buffer
     */
    render(eventsOrNDJSON: SequenceEvent[] | string): Promise<OfflineRenderResult>;
    /**
     * Calculate the total duration of the sequence
     */
    private calculateSequenceDuration;
    /**
     * Parse Tone.js duration notation to seconds
     * Supports: 1n, 2n, 4n, 8n, 16n, 32n, 64n (with dots and triplets)
     * Examples: "4n" = quarter note, "8n." = dotted eighth, "4t" = quarter triplet
     */
    private parseDurationToSeconds;
    /**
     * Get event time in seconds
     */
    private getEventTime;
}
/**
 * Convert AudioBuffer to WAV format
 * Based on audiobuffer-to-wav (https://github.com/Jam3/audiobuffer-to-wav)
 * @param buffer - The AudioBuffer to convert
 * @returns ArrayBuffer containing WAV data
 */
export declare function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer;
/**
 * Download AudioBuffer as WAV file
 * Note: This function is browser-only and requires DOM access
 * @param buffer - The AudioBuffer to download
 * @param filename - The filename for the download (default: 'output.wav')
 * @throws Error if not running in a browser environment
 */
export declare function downloadWav(buffer: AudioBuffer, filename?: string): void;
