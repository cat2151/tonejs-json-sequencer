# Examples

This directory contains example code demonstrating various features of tonejs-json-sequencer.

## Files

### timing-verification.js
A console-based demonstration of the 50ms lookahead scheduling behavior.

**Purpose:** Shows how the streaming player schedules events 50ms before they play.

**How to run:**
```bash
node examples/timing-verification.js
```

**What it demonstrates:**
- Play button press captures the current time
- startTime is set to current time + 50ms buffer
- Events are scheduled when they fall within the lookahead window
- Each event is scheduled exactly once
- The 50ms buffer compensates for JavaScript execution jitter

**Related issue:** [#72 - Streaming scheduling specification investigation](https://github.com/cat2151/tonejs-json-sequencer/issues/72)

### cdn-example.html
Basic example using the library via CDN.

### npm-example.mjs
Example showing how to use the library when installed via npm.

### offline-rendering-example.html
Example demonstrating offline audio rendering.

## Interactive Demo

For an interactive demonstration of the streaming features:

1. Open `demo/streaming.html` in a web browser
2. Enable "Debug Mode" checkbox
3. Click "Play"
4. Watch the browser console for detailed timing information

The debug output shows:
- Event scheduling times
- Time deltas (how far ahead events are scheduled)
- Loop iterations
- Processing loop statistics
