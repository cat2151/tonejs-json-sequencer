# Demo Sequence Extraction Process

## TDD-Based Extraction Script

Following the Test-Driven Development (TDD) methodology, we created `scripts/extract-sequences.js` to extract 31 individual demo sequences from 3 combined files.

### Script Design

The script follows TDD principles:

1. **Tests First**: Runs comprehensive tests before any extraction
2. **Validation**: Ensures parsing logic works correctly
3. **Execution**: Only proceeds with extraction if all tests pass
4. **Verification**: Confirms all 31 sequences were extracted

### Tests Implemented

```javascript
✓ Test 1: Parse single sequence
✓ Test 2: Name to filename conversion  
✓ Test 3: Category determination (instrument vs effect)
✓ Test 4: Generate file content
```

### Extraction Results

Successfully extracted 31 sequences:

**Instruments (13 files):**
- minimal.ts (最小構成)
- delay-vibrato.ts (ディレイビブラート)
- multitimbral.ts (マルチティンバー)
- supersaw.ts (SuperSaw)
- sampler-piano.ts (Sampler Piano)
- polysynth-fm.ts (PolySynth FM Synth)
- monosynth.ts
- amsynth.ts
- duosynth.ts
- metalsynth.ts
- membranesynth.ts
- plucksynth.ts
- noisesynth.ts

**Effects (18 files):**
- reverb.ts, freeverb.ts, jcreverb.ts
- chorus.ts, phaser.ts, tremolo.ts, vibrato.ts
- autofilter.ts, autopanner.ts, autowah.ts
- feedbackdelay.ts, pingpongdelay.ts
- distortion.ts, bitcrusher.ts, chebyshev.ts
- pitchshift.ts, frequencyshifter.ts
- stereowidener.ts

### File Structure

Each extracted file follows a consistent pattern:

```typescript
// {Name} demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "{Name}";

export const sequence: SequenceEvent[] = [
  // Sequence events...
];
```

### Why TDD Approach?

1. **Reliability**: Tests catch errors before extraction
2. **Maintainability**: Easy to verify logic works correctly
3. **Scalability**: Can be reused if source files change
4. **Best Practice**: Avoids anti-pattern of LLM processing large data directly

### Usage

To re-run extraction (if source files change):

```bash
node scripts/extract-sequences.js
```

The script will:
1. Run all tests
2. Parse source files
3. Extract sequences
4. Generate individual TypeScript files
5. Report success/failure

### Integration

The extraction script integrated seamlessly with the build process:
- Source TypeScript in `src/demo/instrument/` and `src/demo/effect/`
- Compiled JavaScript in `dist/demo/instrument/` and `dist/demo/effect/`
- `sequenceLoader.ts` imports all individual files
- All builds pass successfully
