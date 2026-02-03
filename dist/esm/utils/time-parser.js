// Tone.js JSON Sequencer - Time Parser Utility
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer
/**
 * Time parser for converting various time formats to seconds
 */
export class TimeParser {
    constructor(config) {
        this.config = config;
    }
    /**
     * Parse time string to seconds
     */
    parseTimeToSeconds(timeStr) {
        // Handle different time formats
        if (timeStr.startsWith('+')) {
            // Relative time with tick notation (e.g., "+0i")
            return this.parseTickTime(timeStr.substring(1));
        }
        else if (timeStr.includes(':')) {
            // Bar:beat:subdivision format (e.g., "0:0:2")
            return this.parseBarBeatTime(timeStr);
        }
        else if (this.isToneNotation(timeStr)) {
            // Tone.js notation (e.g., "4n", "8n", "2n", "16n")
            return this.parseToneNotation(timeStr);
        }
        else {
            // Direct number or tick notation
            return this.parseTickTime(timeStr);
        }
    }
    /**
     * Parse tick time (e.g., "48i" or "0i")
     */
    parseTickTime(timeStr) {
        const match = timeStr.match(/^(\d+(?:\.\d+)?)(i)?$/);
        if (!match)
            return 0;
        const value = parseFloat(match[1]);
        const ticksPerQuarter = this.config.ticksPerQuarter;
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        return (value / ticksPerQuarter) * secondsPerBeat;
    }
    /**
     * Check if string is Tone.js notation (e.g., "4n", "8n.", "4t")
     */
    isToneNotation(timeStr) {
        return /^\d+(n[.]?|t)$/.test(timeStr);
    }
    /**
     * Parse Tone.js notation to seconds
     * Supports: 1n, 2n, 4n, 8n, 16n, 32n, 64n (with dots and triplets)
     * Examples: "4n" = quarter note, "8n." = dotted eighth, "4t" = quarter triplet
     * @param timeStr - Tone.js notation (e.g., "4n" for quarter note, "8n." for dotted eighth)
     */
    parseToneNotation(timeStr) {
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        // Handle triplet notation (e.g., "4t")
        const isTriplet = timeStr.endsWith('t') && !timeStr.includes('n');
        // Handle dotted notes (e.g., "4n.")
        const isDotted = timeStr.endsWith('.');
        // Extract note value
        let match;
        let noteValue;
        if (isTriplet) {
            // For triplets like "4t", extract the number directly
            match = timeStr.match(/^(\d+)t$/);
            if (!match)
                return 0;
            noteValue = parseFloat(match[1]);
        }
        else {
            // For regular notes like "4n" or "8n.", extract from "n" notation
            const cleanStr = isDotted ? timeStr.slice(0, -1) : timeStr;
            match = cleanStr.match(/^(\d+)n$/);
            if (!match)
                return 0;
            noteValue = parseFloat(match[1]);
        }
        // Calculate base duration (4n = 1 beat, 8n = 0.5 beat, etc.)
        // In Tone.js, "4n" means a quarter note (1/4 of a whole note)
        // A whole note = 4 beats in 4/4 time
        let duration = (4 / noteValue) * secondsPerBeat;
        // Apply dotted note multiplier (1.5x)
        if (isDotted) {
            duration *= 1.5;
        }
        // Apply triplet multiplier (2/3x)
        if (isTriplet) {
            duration *= 2 / 3;
        }
        return duration;
    }
    /**
     * Parse bar:beat:subdivision time
     */
    parseBarBeatTime(timeStr) {
        const parts = timeStr.split(':').map(Number);
        if (parts.length !== 3)
            return 0;
        // Validate that all parts are valid numbers
        if (parts.some(isNaN)) {
            console.error('Invalid bar:beat:subdivision format:', timeStr);
            return 0;
        }
        const [bars, beats, subdivisions] = parts;
        const beatsPerBar = this.config.beatsPerBar;
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        const subdivisionsPerBeat = this.config.subdivisionsPerBeat;
        return (bars * beatsPerBar * secondsPerBeat +
            beats * secondsPerBeat +
            subdivisions * (secondsPerBeat / subdivisionsPerBeat));
    }
}
