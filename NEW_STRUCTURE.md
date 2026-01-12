# New Standard Directory Structure

## Overview
The project has been restructured to follow standard TypeScript project conventions:
- All TypeScript source files are in `src/`
- All compiled JavaScript output is in `dist/`

## Directory Structure

```
src/
├── index.ts                          # Library main source
└── demo/                             # Demo application sources
    ├── main.ts                       # Demo app entry point
    ├── demo-types.ts                 # Type definitions
    ├── tone-global.d.ts              # Tone.js global types
    ├── sequenceLoader.ts             # Loads all sequences
    ├── modules/
    │   ├── audioManager.ts           # Audio playback logic
    │   └── uiManager.ts              # UI interaction logic
    └── sequences/
        ├── basicSequences.ts         # 5 basic demo sequences
        ├── synthSequences.ts         # 8 synthesizer demos
        └── effectSequences.ts        # 18 effect demos

dist/
├── index.js                          # Library compiled (CommonJS)
├── index.mjs                         # Library compiled (ES Module)
├── index.d.ts                        # Library type definitions
├── cjs/                              # CommonJS build artifacts
├── esm/                              # ES Module build artifacts
└── demo/                             # Demo compiled output
    ├── main.js
    ├── modules/
    │   ├── audioManager.js
    │   └── uiManager.js
    └── sequences/
        ├── basicSequences.js
        ├── synthSequences.js
        └── effectSequences.js
```

## Build System

### Build Scripts
- `npm run build` - Builds library only (ESM + CJS)
- `npm run build:demo` - Builds demo application only
- `npm run build:all` - Builds both library and demo

### TypeScript Configurations
- `tsconfig.json` - Library build configuration
  - Source: `src/index.ts`
  - Output: `dist/`
  - Excludes: `src/demo/`

- `tsconfig.demo-new.json` - Demo build configuration
  - Source: `src/demo/**/*.ts`
  - Output: `dist/demo/`

## Migration from Old Structure

### Old Structure (Deprecated)
- `src-ts/` - Library TypeScript source
- `demo/src/` - Demo TypeScript source
- `src/` - Compiled demo JavaScript (gitignored)
- `demo/dist/` - Compiled demo JavaScript (gitignored)
- `dist/` - Compiled library JavaScript

### New Structure (Current)
- `src/` - All TypeScript sources (library + demo)
- `dist/` - All compiled JavaScript (library + demo)

### What Changed
1. Moved `src-ts/index.ts` → `src/index.ts`
2. Moved `demo/src/*` → `src/demo/*`
3. All compilation now outputs to `dist/`
4. Removed duplicate output directories

## Demo Sequences Organization

Currently, demo sequences are organized into 3 categorized files:
- **basicSequences.ts** - 5 fundamental demos (minimal, delay-vibrato, multitimbral, supersaw, sampler-piano)
- **synthSequences.ts** - 8 synthesizer demos (PolySynth, MonoSynth, AMSynth, DuoSynth, MetalSynth, MembraneSynth, PluckSynth, NoiseSynth)
- **effectSequences.ts** - 18 effect demos (reverbs, modulation, filters, delays, distortion, pitch, stereo)

### Future Organization (Planned)
The structure supports organizing demos into individual files:
```
src/demo/
├── instrument/
│   ├── minimal.ts
│   ├── polysynth-fm.ts
│   └── ... (one file per instrument demo)
└── effect/
    ├── reverb.ts
    ├── chorus.ts
    └── ... (one file per effect demo)
```

This would require extracting each of the 31 demos from the combined files, which needs careful manual work to preserve the nested JSON structure.

## Benefits of New Structure

1. **Standard Convention**: Follows typical TypeScript project layout
2. **Clear Separation**: Source and compiled code are clearly separated
3. **Single Output**: All compiled JavaScript in one location (`dist/`)
4. **User-Friendly**: Developers read TypeScript in `src/`, users consume JavaScript from `dist/`
5. **Maintainable**: Easy to understand where files belong

## Notes

- The `dist/` directory is gitignored and generated during build
- Old directories (`src-ts/`, `demo/`) are retained temporarily for compatibility
- Demo HTML updated to reference `dist/demo/main.js`
