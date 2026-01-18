/**
 * Configuration for time parsing
 */
export interface TimeParserConfig {
    /** Ticks per quarter note for timing calculations (default: 480) */
    ticksPerQuarter: number;
    /** Beats per minute for timing calculations (default: 120) */
    beatsPerMinute: number;
    /** Beats per bar for time signature (default: 4) */
    beatsPerBar: number;
    /** Subdivisions per beat (default: 4) */
    subdivisionsPerBeat: number;
}
/**
 * Time parser for converting various time formats to seconds
 */
export declare class TimeParser {
    private config;
    constructor(config: TimeParserConfig);
    /**
     * Parse time string to seconds
     */
    parseTimeToSeconds(timeStr: string): number;
    /**
     * Parse tick time (e.g., "48i" or "0i")
     */
    private parseTickTime;
    /**
     * Parse bar:beat:subdivision time
     */
    private parseBarBeatTime;
}
