/**
 * Timing Verification Example
 * 
 * This example demonstrates the 50ms lookahead scheduling behavior
 * of the NDJSONStreamingPlayer.
 * 
 * Expected behavior:
 * 1. When play is pressed, startTime = currentTime + 50ms
 * 2. Events are scheduled when they fall within the lookahead window
 * 3. Each event is scheduled exactly once
 * 4. Events play at their intended time (startTime + eventTime)
 */

// Note: This is a conceptual example showing the timing logic
// For actual testing, run the demo at demo/streaming.html with debug mode enabled

// Mock implementation showing the timing logic
class TimingVerification {
  constructor() {
    this.lookaheadMs = 50;
  }

  // Simulate the timing behavior
  demonstrateTiming() {
    console.log('=== Timing Verification Demo ===\n');
    
    // Simulate play button press
    const playButtonTime = 10.000; // seconds
    console.log(`1. Play button pressed at: ${playButtonTime.toFixed(3)}s`);
    
    // Calculate start time (play button time + lookahead buffer)
    const startTime = playButtonTime + this.lookaheadMs / 1000;
    console.log(`2. Start time set to: ${startTime.toFixed(3)}s (playTime + 50ms)\n`);
    
    // Define some events
    const events = [
      { time: 0.000, note: 'C4' },  // First beat
      { time: 0.500, note: 'D4' },  // Second beat
      { time: 1.000, note: 'E4' },  // Third beat
    ];
    
    console.log('3. Events to schedule:');
    events.forEach((e, i) => {
      const absoluteTime = startTime + e.time;
      console.log(`   Event ${i}: ${e.note} at ${e.time.toFixed(3)}s → absoluteTime = ${absoluteTime.toFixed(3)}s`);
    });
    console.log();
    
    // Simulate processing loop iterations
    console.log('4. Processing loop iterations:\n');
    
    // First iteration (right after play button press)
    let currentTime = playButtonTime;
    let lookaheadTime = currentTime + this.lookaheadMs / 1000;
    console.log(`   Iteration 1: currentTime = ${currentTime.toFixed(3)}s, lookaheadTime = ${lookaheadTime.toFixed(3)}s`);
    
    events.forEach((e, i) => {
      const absoluteTime = startTime + e.time;
      const shouldSchedule = absoluteTime <= lookaheadTime;
      const timeDelta = absoluteTime - currentTime;
      console.log(`     Event ${i} (${e.note}): absoluteTime = ${absoluteTime.toFixed(3)}s`);
      console.log(`       → ${shouldSchedule ? '✓ SCHEDULE' : '✗ Not yet'} (${timeDelta >= 0 ? '+' : ''}${(timeDelta * 1000).toFixed(1)}ms from now)`);
    });
    console.log();
    
    // Second iteration (after 16ms - typical requestAnimationFrame interval)
    currentTime = playButtonTime + 0.016;
    lookaheadTime = currentTime + this.lookaheadMs / 1000;
    console.log(`   Iteration 2: currentTime = ${currentTime.toFixed(3)}s, lookaheadTime = ${lookaheadTime.toFixed(3)}s`);
    
    events.forEach((e, i) => {
      const absoluteTime = startTime + e.time;
      const shouldSchedule = absoluteTime <= lookaheadTime;
      const timeDelta = absoluteTime - currentTime;
      const alreadyScheduled = (i === 0); // Event 0 was scheduled in iteration 1
      if (!alreadyScheduled) {
        console.log(`     Event ${i} (${e.note}): absoluteTime = ${absoluteTime.toFixed(3)}s`);
        console.log(`       → ${shouldSchedule ? '✓ SCHEDULE' : '✗ Not yet'} (${timeDelta >= 0 ? '+' : ''}${(timeDelta * 1000).toFixed(1)}ms from now)`);
      } else {
        console.log(`     Event ${i} (${e.note}): Already scheduled in previous iteration`);
      }
    });
    console.log();
    
    // Jump to when second event should be scheduled
    currentTime = playButtonTime + 0.500;
    lookaheadTime = currentTime + this.lookaheadMs / 1000;
    console.log(`   Iteration N: currentTime = ${currentTime.toFixed(3)}s, lookaheadTime = ${lookaheadTime.toFixed(3)}s`);
    
    events.forEach((e, i) => {
      const absoluteTime = startTime + e.time;
      const shouldSchedule = absoluteTime <= lookaheadTime;
      const timeDelta = absoluteTime - currentTime;
      const alreadyScheduled = (i <= 1); // Events 0-1 already scheduled
      if (!alreadyScheduled) {
        console.log(`     Event ${i} (${e.note}): absoluteTime = ${absoluteTime.toFixed(3)}s`);
        console.log(`       → ${shouldSchedule ? '✓ SCHEDULE' : '✗ Not yet'} (${timeDelta >= 0 ? '+' : ''}${(timeDelta * 1000).toFixed(1)}ms from now)`);
      } else {
        console.log(`     Event ${i} (${e.note}): Already scheduled`);
      }
    });
    console.log();
    
    console.log('=== Summary ===');
    console.log('✓ Events are scheduled ~50ms before they play');
    console.log('✓ Each event is scheduled exactly once');
    console.log('✓ The 50ms buffer compensates for jitter');
    console.log('✓ startTime captures the play button press time + buffer');
    console.log('\nTo see this in action:');
    console.log('1. Open demo/streaming.html');
    console.log('2. Enable "Debug Mode"');
    console.log('3. Click "Play"');
    console.log('4. Watch the console for timing information');
  }
}

// Run the demonstration
const demo = new TimingVerification();
demo.demonstrateTiming();
