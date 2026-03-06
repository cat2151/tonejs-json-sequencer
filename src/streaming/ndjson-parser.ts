// Tone.js JSON Sequencer - NDJSON Parser
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type { SequenceEvent } from '../types.js';

/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export function parseNDJSON(ndjson: string): SequenceEvent[] {
  const lines = ndjson.split('\n');
  const events: SequenceEvent[] = [];

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    // Skip empty or whitespace-only lines
    if (line.length === 0) {
      return;
    }

    try {
      const parsed = JSON.parse(line) as SequenceEvent;
      events.push(parsed);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Log detailed information for debugging
      console.error('Failed to parse NDJSON line:', {
        lineNumber: index + 1,
        lineContent: line,
        error,
      });

      // Surface a clear, user-facing error so invalid NDJSON can be fixed
      throw new Error(
        `Failed to parse NDJSON input at line ${index + 1}: ${errorMessage}`,
      );
    }
  });

  return events;
}
