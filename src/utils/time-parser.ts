// Tone.js JSON Sequencer - Time Parser Utility
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

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
export class TimeParser {
  constructor(private config: TimeParserConfig) {}

  /**
   * Parse time string to seconds
   */
  parseTimeToSeconds(timeStr: string): number {
    // Handle different time formats
    if (timeStr.startsWith('+')) {
      // Relative time with tick notation (e.g., "+0i")
      return this.parseTickTime(timeStr.substring(1));
    } else if (timeStr.includes(':')) {
      // Bar:beat:subdivision format (e.g., "0:0:2")
      return this.parseBarBeatTime(timeStr);
    } else {
      // Direct number or tick notation
      return this.parseTickTime(timeStr);
    }
  }

  /**
   * Parse tick time (e.g., "48i" or "0i")
   */
  private parseTickTime(timeStr: string): number {
    const match = timeStr.match(/^(\d+(?:\.\d+)?)(i)?$/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const ticksPerQuarter = this.config.ticksPerQuarter;
    const secondsPerBeat = 60 / this.config.beatsPerMinute;
    return (value / ticksPerQuarter) * secondsPerBeat;
  }

  /**
   * Parse bar:beat:subdivision time
   */
  private parseBarBeatTime(timeStr: string): number {
    const parts = timeStr.split(':').map(Number);
    if (parts.length !== 3) return 0;

    // Validate that all parts are valid numbers
    if (parts.some(isNaN)) {
      console.error('Invalid bar:beat:subdivision format:', timeStr);
      return 0;
    }

    const [bars, beats, subdivisions] = parts;
    const beatsPerBar = this.config.beatsPerBar;
    const secondsPerBeat = 60 / this.config.beatsPerMinute;
    const subdivisionsPerBeat = this.config.subdivisionsPerBeat;

    return (
      bars * beatsPerBar * secondsPerBeat +
      beats * secondsPerBeat +
      subdivisions * (secondsPerBeat / subdivisionsPerBeat)
    );
  }
}
