# Refactoring Summary: Single Responsibility Principle

**Date:** 2026-01-18  
**Issue:** #60 - ハルシネーション対策。単一責任の原則に従ってソースを分割する (Counter hallucination measures. Split source according to Single Responsibility Principle)

## Overview

This refactoring splits large source files into smaller, focused modules following the Single Responsibility Principle (SRP) to reduce hallucination risks when working with AI tools.

## Changes Made

### 1. node-factory.ts Refactoring

**Before:** 1 file, 192 lines
**After:** 3 files, 232 lines total

#### New Structure:
- **src/factories/instrument-factory.ts** (117 lines)
  - Responsibility: Create instrument nodes
  - Handles: Synth, PolySynth, AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth, NoiseSynth, PluckSynth, Sampler
  - Includes security: PolySynth voice whitelist validation

- **src/factories/effect-factory.ts** (59 lines)
  - Responsibility: Create effect nodes
  - Handles: All 18 effects (Reverb, Chorus, Delay, Distortion, etc.)

- **src/node-factory.ts** (56 lines - 71% reduction)
  - Responsibility: Coordinate node creation
  - Delegates to appropriate factories
  - Handles node connection logic

### 2. ndjson-streaming.ts Refactoring

**Before:** 1 file, 545 lines
**After:** 4 files, 709 lines total

#### New Structure:
- **src/utils/time-parser.ts** (79 lines)
  - Responsibility: Parse time formats
  - Handles: Tick notation (e.g., "48i"), bar:beat:subdivision format (e.g., "0:0:2")
  - Encapsulates timing configuration

- **src/streaming/event-processor.ts** (135 lines)
  - Responsibility: Process and schedule events
  - Handles: Node/connection creation, event scheduling, time adjustment, duration calculation
  - Works with TimeParser for time conversions

- **src/streaming/playback-state.ts** (103 lines)
  - Responsibility: Manage playback state
  - Tracks: Playing status, start time, current events, processed indices, loop count
  - Provides clean state management interface

- **src/ndjson-streaming.ts** (392 lines - 28% reduction)
  - Responsibility: Coordinate streaming playback
  - Orchestrates: TimeParser, EventProcessor, PlaybackState
  - Handles: Loop logic, debug output, animation frames

### 3. Build System Updates

- **scripts/copy-to-dist.js** - Updated to recursively copy all CJS files
  - Now copies entire directory structure including new subdirectories
  - Ensures `factories/`, `streaming/`, and `utils/` are included in build output

## Benefits

### 1. Reduced Hallucination Risk
- **Smaller files** are easier for AI to process without context overflow
- **Clear boundaries** between responsibilities reduce confusion
- **Focused modules** make AI suggestions more accurate

### 2. Improved Maintainability
- Each file has a **single, clear purpose**
- Related functionality is **grouped together**
- Easier to **locate specific code**
- Changes are **more isolated**

### 3. Better Testability
- Individual modules can be **tested in isolation**
- Dependencies are **explicit and clear**
- Mock objects are **easier to create**

### 4. Enhanced Readability
- **Smaller files** are less overwhelming
- **Meaningful names** indicate purpose
- **Logical organization** aids comprehension

## File Size Comparison

| File | Before | After | Change |
|------|--------|-------|--------|
| node-factory.ts | 192 lines | 56 lines | -71% |
| ndjson-streaming.ts | 545 lines | 392 lines | -28% |
| **New files added** | - | 5 files (493 lines) | - |

## Backward Compatibility

✅ **No breaking changes**
- All public exports remain unchanged
- API signatures are identical
- Existing code continues to work

## Testing Results

✅ All tests passed:
- Library builds successfully (ESM + CJS)
- Demo builds successfully
- Exports verified: SequencerNodes, scheduleOrExecuteEvent, playSequence, NDJSONStreamingPlayer, parseNDJSON
- SequencerNodes functionality verified
- parseNDJSON functionality verified
- CodeQL security scan: 0 vulnerabilities

## Module Dependencies

```
index.ts
├── sequencer-nodes.ts
├── event-scheduler.ts
│   ├── node-factory.ts
│   │   ├── factories/instrument-factory.ts
│   │   └── factories/effect-factory.ts
│   └── types.ts
└── ndjson-streaming.ts
    ├── streaming/event-processor.ts
    │   ├── utils/time-parser.ts
    │   └── event-scheduler.ts
    ├── streaming/playback-state.ts
    └── utils/time-parser.ts
```

## Lessons Learned

1. **Gradual refactoring** - Split in logical chunks (instruments/effects, then time/events/state)
2. **Build system awareness** - Required updating copy script for new directory structure
3. **Test frequently** - Caught build issues early before they propagated
4. **Preserve structure** - Kept original logic intact, just reorganized
5. **Security maintained** - PolySynth voice whitelist preserved in new location

## Next Steps (Optional Future Improvements)

1. Add unit tests for individual modules
2. Consider splitting effect-factory.ts by effect category (modulation, delay, distortion, etc.)
3. Extract debug logging to a dedicated logging utility
4. Add JSDoc documentation to new modules

## Conclusion

This refactoring successfully applies the Single Responsibility Principle to the codebase, making it more maintainable and reducing hallucination risks when working with AI tools. The changes are backward compatible and all functionality has been preserved.
