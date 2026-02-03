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
     * Check if string is Tone.js notation (e.g., "4n", "8n", "2n")
     */
    isToneNotation(timeStr) {
        return /^\d+n$/.test(timeStr);
    }
    /**
     * Parse Tone.js notation to seconds
     * @param timeStr - Tone.js notation (e.g., "4n" for quarter note, "8n" for eighth note)
     */
    parseToneNotation(timeStr) {
        const match = timeStr.match(/^(\d+)n$/);
        if (!match)
            return 0;
        const value = parseFloat(match[1]);
        // In Tone.js, "4n" means a quarter note (1/4 of a whole note)
        // A whole note = 4 beats, so a quarter note = 1 beat
        // value "n" represents 1/value of a whole note
        const beatsPerWholeNote = 4; // In 4/4 time
        const secondsPerBeat = 60 / this.config.beatsPerMinute;
        const beatsInNote = beatsPerWholeNote / value;
        return beatsInNote * secondsPerBeat;
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
