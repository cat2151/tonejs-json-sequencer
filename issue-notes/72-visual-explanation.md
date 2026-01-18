# Streaming 50ms Lookahead - Visual Explanation

## The Question

Does the streaming implementation follow this specification?

> "For each line (event), calculate the scheduled playback time and schedule it 50ms before that time."

## The Answer: ✅ YES

## Visual Timeline

```
Time (seconds):
0.000   0.016   0.032   0.048   0.500   1.000
|-------|-------|-------|-------|-------|-------|
^       ^               ^                       ^
|       |               |                       |
|       |               |                       Event 2
|       |               Event 0 plays           should play
|       |               here                    here
|       |
|       Processing loop
|       iteration 2
|
Play button pressed
- Capture time: 0.000s
- Set startTime: 0.050s
- Event 0 scheduled to play at 0.050s
- Event 1 scheduled to play at 0.550s
```

## How It Works

### Step 1: Play Button Press
```
Real Time: 0.000s
↓
Capture time with Tone.now()
↓
Add 50ms buffer
↓
startTime = 0.050s
```

**Why add 50ms?**
- Compensates for JavaScript execution jitter
- Gives audio context time to prepare
- Ensures smooth playback

### Step 2: Continuous Processing Loop

The `processEvents()` function runs every ~16ms (60fps):

```
Loop Iteration at time T:
├── currentTime = Tone.now()
├── lookaheadTime = currentTime + 50ms
└── For each event:
    ├── Calculate: absoluteTime = startTime + eventTime
    └── If absoluteTime <= lookaheadTime:
        └── Schedule event (once only)
```

### Step 3: Event Scheduling

```
Event at 0:0:0 (first beat):
eventTime = 0.000s
absoluteTime = 0.050s + 0.000s = 0.050s

Processing loop at T=0.000s:
lookaheadTime = 0.000s + 0.050s = 0.050s
Check: 0.050s <= 0.050s? ✓ YES
→ Schedule event to play at 0.050s
```

```
Event at 0:0:2 (second beat):
eventTime = 0.500s
absoluteTime = 0.050s + 0.500s = 0.550s

Processing loop at T=0.000s:
lookaheadTime = 0.000s + 0.050s = 0.050s
Check: 0.550s <= 0.050s? ✗ NO
→ Not yet, wait for next iteration

Processing loop at T=0.500s:
lookaheadTime = 0.500s + 0.050s = 0.550s
Check: 0.550s <= 0.550s? ✓ YES
→ Schedule event to play at 0.550s
```

## The 50ms Buffer in Action

```
Without 50ms buffer:
Time: 0.000s - Need to play note NOW
Problem: Jitter might cause delays
Result: ❌ Timing instability

With 50ms buffer:
Time: 0.000s - Schedule note to play at 0.050s
Time: 0.000s to 0.050s - Audio context prepares
Time: 0.050s - Note plays precisely
Result: ✅ Smooth, accurate playback
```

## Key Points

### ✅ Correct Behavior

1. **Captures actual time**: When play button pressed
2. **Adds 50ms buffer**: For jitter compensation
3. **Schedules in advance**: Events scheduled ~50ms before they play
4. **Single scheduling**: Each event scheduled exactly once
5. **Precise playback**: Audio context handles exact timing

### 📊 Real Numbers

```
Play button pressed at: 10.000s
Start time set to:      10.050s (+50ms)

Event 1 (time 0:0:0):
  Scheduled at:         10.000s
  To play at:          10.050s
  Time delta:          +50ms ✓

Event 2 (time 0:0:2 @ 120 BPM):
  Scheduled at:         10.500s
  To play at:          10.550s
  Time delta:          +50ms ✓
```

## Code Locations

### Start Time Calculation
**File:** `src/ndjson-streaming.ts`, line 192
```typescript
const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
```

### Processing Loop
**File:** `src/ndjson-streaming.ts`, lines 277-394
```typescript
private processEvents(): void {
  const currentTime = this.Tone.now();
  const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
  // ... schedule events within lookahead window
}
```

### Event Scheduling
**File:** `src/ndjson-streaming.ts`, line 327
```typescript
const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
if (absoluteTime <= lookaheadTime && !alreadyScheduled) {
  scheduleEvent(event, absoluteTime);
}
```

## Verification

### Console Demo
```bash
node examples/timing-verification.js
```

Output shows:
- ✓ Play button press time
- ✓ Start time calculation
- ✓ Event scheduling decisions
- ✓ Lookahead window behavior

### Interactive Demo
1. Open `demo/streaming.html`
2. Enable "Debug Mode"
3. Click "Play"
4. Watch console output

You'll see:
```
[DEBUG] Start time { 
  startTime: '10.050', 
  currentTime: '10.000', 
  lookaheadMs: 50 
}
[DEBUG] Scheduling event #0 (triggerAttackRelease) { 
  scheduledAt: '10.050', 
  timeDelta: '+50.0',
  ... 
}
```

## Conclusion

✅ **The implementation is correct**

The streaming player properly schedules events 50ms before they play, exactly as specified. The lookahead buffer compensates for jitter and provides smooth, precise playback.

**No code changes needed** - only documentation improvements to clarify the existing correct behavior.

---

## Related Documents

- Detailed analysis: `issue-notes/72-investigation.md`
- Comprehensive summary: `issue-notes/72-summary.md`
- Issue notes: `issue-notes/72.md`
- Examples: `examples/README.md`
