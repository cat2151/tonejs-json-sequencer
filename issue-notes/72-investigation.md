# Investigation: 50ms Lookahead Scheduling Specification

## Issue
Investigate whether the streaming implementation follows the specification:
"For each line (event), calculate the scheduled playback time and schedule it 50ms before that time."

## Current Implementation Analysis

### Key Timing Points

1. **Play Button Press (Playback Start)**
   - When play is pressed, the actual time is captured
   - File: `src/ndjson-streaming.ts`, line 186
   ```typescript
   const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
   ```
   - `startTime` = current audio context time + 50ms
   - This is the reference point for all event scheduling

2. **Event Processing Loop**
   - Runs continuously via `requestAnimationFrame`
   - File: `src/ndjson-streaming.ts`, lines 259-365
   
3. **Lookahead Window Calculation**
   - Line 266:
   ```typescript
   const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
   ```
   - Creates a 50ms window into the future

4. **Event Time Calculation**
   - Line 300:
   ```typescript
   const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
   ```
   - `eventTime` = the time specified in the event (e.g., "0:0:0", "0:1:0")
   - `absoluteTime` = when this event should actually play in audio context time

5. **Scheduling Decision**
   - Line 304:
   ```typescript
   if (absoluteTime <= lookaheadTime && !this.playbackState.processedEventIndices.has(eventKey)) {
   ```
   - Events are scheduled when they fall within the 50ms lookahead window
   - Each event is only scheduled once (tracked by `processedEventIndices`)

## Specification Compliance

### The Specification States:
"For each line, calculate the scheduled playback time and schedule it 50ms before that time."

### How the Implementation Works:

1. **At Play Button Press:**
   - Real time T0 = Tone.now()
   - Start time = T0 + 50ms
   - This means the "first beat" (time 0:0:0) will play at T0 + 50ms

2. **During Processing Loop (at time T):**
   - Lookahead window = [T, T + 50ms]
   - For each event with scheduled time S:
     - Calculate absolute time A = startTime + S
     - If A <= T + 50ms and not yet scheduled:
       - Schedule event to play at time A

3. **Example Timeline:**
   ```
   T0 = 10.000s (play button pressed)
   startTime = 10.050s (T0 + 50ms)
   
   Event 1: time = 0s (0:0:0)
     absoluteTime = 10.050s
     Will be scheduled during first processing loop when:
       currentTime ≈ 10.000s, lookaheadTime ≈ 10.050s
       10.050 <= 10.050 ✓
     
   Event 2: time = 0.5s (0:0:2 at 120 BPM)
     absoluteTime = 10.550s
     Will be scheduled when:
       currentTime ≈ 10.500s, lookaheadTime ≈ 10.550s
       10.550 <= 10.550 ✓
   ```

## Buffer Time and Jitter

### Purpose of 50ms Buffer:
- **Jitter Compensation**: Accounts for JavaScript timing variability
- **Processing Time**: Allows time for Tone.js to schedule the event
- **Audio Context Scheduling**: Tone.js can precisely schedule events in the audio context

### How It Handles Jitter:
1. Events are scheduled in advance (not at the exact moment they play)
2. Once scheduled with Tone.js, the audio context handles precise timing
3. The 50ms buffer ensures events are scheduled before they need to play
4. `requestAnimationFrame` runs at ~60fps (every ~16ms), well within the 50ms buffer

## Conclusion

### ✅ The Implementation IS Correct

The current implementation correctly follows the specification:

1. **Captures the actual time at play button press** (`this.Tone.now()`)
2. **Adds 50ms buffer for jitter compensation** (startTime = now + 50ms)
3. **Uses this startTime for all scheduling calculations**
4. **Schedules events 50ms before they need to play** (via the lookahead window)
5. **Each event is processed exactly once** (tracked by Set)

### Key Points:

- The startTime is set once when playback begins (line 186)
- This creates a stable reference point for all event timing
- The 50ms lookahead window continuously checks which events need scheduling
- Events are scheduled at their absolute time (startTime + eventTime)
- The scheduling happens ~50ms before the event actually plays

### No Issues Found

The implementation correctly implements the specification. The 50ms lookahead:
- Compensates for jitter
- Provides processing time
- Ensures smooth, precise playback
- Is correctly applied to all events

## Recommendations

1. **Add clarifying comments** to the timing-critical sections
2. **Add timing diagram** to documentation
3. **Keep the existing implementation** - it's correct!
