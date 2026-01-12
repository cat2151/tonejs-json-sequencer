# Tone.js Components JSON Support Roadmap

This document outlines the JSON support status and roadmap for all Tone.js components (Instrument / Source / Effect / Component).

## Implementation Status Legend

- ✅ **Implemented** - JSON description supported
- 🚧 **Planned** - Included in roadmap
- ⏳ **To Be Determined** - Under consideration for future implementation

---

## Instrument (Sound Sources)

### Monophonic Instruments

| Class Name | Status | Description |
|-----------|--------|-------------|
| Synth | ✅ | Basic oscillator + envelope |
| MonoSynth | ✅ | Oscillator + filter + dual envelopes |
| FMSynth | ✅ | Two-oscillator frequency modulation synth |
| AMSynth | ✅ | Two-oscillator amplitude modulation synth |
| MetalSynth | ✅ | Percussive metallic sounds |
| MembraneSynth | ✅ | Drum/percussion sounds |
| DuoSynth | ✅ | Dual-oscillator monophonic synth |
| PluckSynth | ✅ | Plucked sound, acoustic guitar or harp |
| NoiseSynth | ✅ | Noise-based synthesizer |

### Polyphonic Instruments

| Class Name | Status | Description |
|-----------|--------|-------------|
| PolySynth | ✅ | Polyphonic wrapper (any monophonic synth with multiple voices) |
| Sampler | ✅ | Sample-based, maps samples across keyboard |

---

## Source (Sound Generation)

Low-level sound generators providing base signals for further processing.

| Class Name | Status | Description |
|-----------|--------|-------------|
| Oscillator | ⏳ | Sine/Square/Triangle/Sawtooth/Custom waveforms |
| OmniOscillator | ⏳ | Flexible oscillator supporting multiple waveform types and periodicities |
| FatOscillator | 🚧 | Multiple detuned oscillators for thick synth pads |
| PulseOscillator | 🚧 | Pulse wave oscillator with pulse width modulation |
| PWMOscillator | ⏳ | Pulse width modulation oscillator |
| Noise | ⏳ | White/Brown/Pink noise |
| Player | ⏳ | Plays audio buffer/sample with start/stop/loop controls |
| GrainPlayer | ⏳ | Granular synthesis from audio samples |
| UserMedia | ⏳ | Microphone or other media inputs |
| BufferSource | ⏳ | Low-level sample playback |

---

## Effect (Audio Effects)

Standard audio effects and processors that modify or combine audio signals.

### Dynamics

| Class Name | Status | Description |
|-----------|--------|-------------|
| Compressor | 🚧 | Standard compressor |
| MultibandCompressor | ⏳ | Multiband compressor |
| MidSideCompressor | ⏳ | Mid/Side compressor |
| Limiter | ⏳ | Limiter |
| Gate | ⏳ | Noise gate |

### Filter

| Class Name | Status | Description |
|-----------|--------|-------------|
| Filter | ⏳ | Basic filter |
| BiquadFilter | ⏳ | Biquad filter |
| EQ3 | 🚧 | Three-band equalizer |
| LowpassCombFilter | ⏳ | Lowpass comb filter |
| FeedbackCombFilter | ⏳ | Feedback comb filter |
| OnePoleFilter | ⏳ | One-pole filter |

### Spatial

| Class Name | Status | Description |
|-----------|--------|-------------|
| Reverb | ✅ | Reverb |
| Freeverb | ✅ | Freeverb reverb algorithm |
| JCReverb | ✅ | JCReverb reverb algorithm |
| Convolver | ⏳ | Convolver using impulse response |

### Modulation

| Class Name | Status | Description |
|-----------|--------|-------------|
| Chorus | ✅ | Chorus |
| Phaser | ✅ | Phaser |
| Tremolo | ✅ | Tremolo |
| Vibrato | ✅ | Vibrato |
| AutoFilter | ✅ | Auto filter |
| AutoPanner | ✅ | Auto panner |
| AutoWah | ✅ | Auto wah |

### Delay

| Class Name | Status | Description |
|-----------|--------|-------------|
| FeedbackDelay | ✅ | Feedback delay |
| PingPongDelay | ✅ | Ping-pong delay |

### Distortion

| Class Name | Status | Description |
|-----------|--------|-------------|
| Distortion | ✅ | Distortion |
| BitCrusher | ✅ | Bit crusher |
| Chebyshev | ✅ | Chebyshev distortion (harmonic generation) |

### Pitch

| Class Name | Status | Description |
|-----------|--------|-------------|
| PitchShift | ✅ | Pitch shift |
| FrequencyShifter | ✅ | Frequency shifter |

### Stereo

| Class Name | Status | Description |
|-----------|--------|-------------|
| StereoWidener | ✅ | Stereo widener |
| Panner | ⏳ | Panner |
| Panner3D | ⏳ | 3D panner |
| PanVol | ⏳ | Pan + volume |

### Other Effects

| Class Name | Status | Description |
|-----------|--------|-------------|
| Channel | ⏳ | General signal routing/mixing/effect chaining |
| CrossFade | ⏳ | Cross fade |
| Follower | ⏳ | Envelope follower |
| Merge | ⏳ | Multi-channel signal merge |
| Mono | ⏳ | Stereo to mono conversion |
| MidSideMerge | ⏳ | Mid/Side merge |
| MidSideSplit | ⏳ | Mid/Side split |

---

## Component (Low-Level Components)

Low-level building blocks for audio synthesis, modulation, and control.

### Envelope

| Class Name | Status | Description |
|-----------|--------|-------------|
| Envelope | ⏳ | Basic envelope (ADSR) |
| AmplitudeEnvelope | ⏳ | Amplitude envelope |
| FrequencyEnvelope | ⏳ | Frequency envelope |

### Signal/Modulation

| Class Name | Status | Description |
|-----------|--------|-------------|
| Signal | ⏳ | Signal source |
| LFO | ⏳ | Low Frequency Oscillator |
| SignalOperator | ⏳ | Signal operations |

### Analysis

| Class Name | Status | Description |
|-----------|--------|-------------|
| Meter | ⏳ | Audio level meter |
| DCMeter | ⏳ | DC offset meter |
| Analyser | ⏳ | Audio analyzer |
| FFT | ⏳ | FFT analysis |
| Waveform | ⏳ | Waveform display |

### Core

| Class Name | Status | Description |
|-----------|--------|-------------|
| Param | ⏳ | Audio parameter wrapper |
| Gain | ⏳ | Basic gain control |
| Volume | ⏳ | Volume control in decibels |
| Transport | ⏳ | Timing and scheduling |
| Context | ⏳ | Audio context |
| Destination | ⏳ | Final output destination |

---

## Implementation Priority

### High Priority (Already in Roadmap)

1. **Source**
   - FatOscillator (for SuperSaw pads)
   - PulseOscillator (12.5% pulse wave)

2. **Effect**
   - EQ (Equalizer)
   - Compressor

3. **Playing Technique Methods**
   - Panpot changes
   - Expression changes
   - LPF changes
   - Portamento

### Medium Priority

1. **Filter**
   - Basic Filter
   - Various filter types

2. **Dynamics**
   - Basic Compressor
   - Limiter

3. **Other Sources**
   - Noise
   - Player

### Low Priority

1. **Advanced Components**
   - Envelope types
   - LFO
   - Signal types

2. **Analysis**
   - Meter
   - Analyser
   - FFT

3. **3D/Special**
   - Panner3D
   - Special effects

---

## Implementation Approach

### Basic Principles

1. **Safety First**
   - Do not use `eval` or similar functions
   - Continue using whitelist approach via switch-case

2. **Incremental Implementation**
   - Prioritize features mentioned in the roadmap
   - Prioritize features with clear, noticeable effects

3. **Dogfooding**
   - Test implemented features in actual use
   - Confirm practicality before moving forward

### Implementation Process

1. **Extending createNode**
   - Add new Instrument/Effect/Source types

2. **Extending Method Calls**
   - Add main methods of each node as eventType
   - Examples: `set`, `get`, `rampTo`, `linearRampTo`, `exponentialRampTo`

3. **Extending Property Access**
   - Support deep property access
   - Examples: `oscillator.frequency.value`, `filter.Q.value`

---

## References

- [Tone.js Official Documentation](https://tonejs.github.io/docs/)
- [Tone.js GitHub Repository](https://github.com/Tonejs/Tone.js)
- [Tone.js Wiki - Instruments](https://github.com/Tonejs/Tone.js/wiki/Instruments)

---

## Revision History

- 2026-01-11: Initial version, categorization and implementation status of all components
