# tonejs-json-sequencer

[Japanese README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-json-sequencer/src/index.html)

# Summary (in 3 lines)

- A lightweight library that allows you to define Tone.js instruments, effects, and performances using JSON.
- Enables data-driven sound control without writing code, facilitating seamless integration with UIs and streaming.
- Treats time-ordered events as data, enabling precise musical expression.

# Why

- *Note: This section was initially generated using ChatGPT and may be revised in the future.*
- *In reality, most features are planned for future implementation.*

Tone.js is a powerful library enabling rich musical expression on the web.  It allows for sophisticated sound design in JavaScript, including synth construction, effect chains, and trigger scheduling.

However, this flexibility can lead to instrument and pattern structures deeply embedded within the program, hindering reusability and integration.

`tonejs-json-sequencer` leverages the power of Tone.js while externalizing instrument definitions, performance details, and timing information as JSON, enabling data-driven music playback.

Sequences are structured like SMF, explicitly listing all events in chronological order.

Instrument definitions flexibly utilize Tone.js synths/chains/parameters defined in JSON.

Dynamic parameter changes during playback are possible, enabling expressive techniques like delay vibrato and filter sweeps.

Real-time playback is possible by directly receiving NDJSON streams from external tools or live generation engines.

This simplifies the process of manipulating, playing, and exchanging structured musical data via UIs and networks within the Tone.js environment.


# Design Philosophy

- *Note: This section was initially generated using ChatGPT and may be revised in the future.*

`tonejs-json-sequencer` employs a straightforward approach: directly describing Tone.js components (synths, effect chains, parameter changes) in JSON.

It avoids introducing a custom music description language or abstract layer, delegating sophisticated logic to higher-level program layers.

Instrument definitions specify constructor names (like `Tone.Synth` or `Tone.FMSynth`) and argument objects.

Event definitions mirror the structure of Tone.js calls like `triggerAttackRelease`.

Runtime parameter changes list function names, arguments, and timestamps.

This preserves Tone.js's expressive capabilities while shifting playback logic to data, making it configurable externally.

The core `scheduleOrExecuteEvent` function is a simple source file accepting single elements, allowing for separate handling of sequences and NDJSON streaming at higher layers.

This enables flexible development by separating the low-level Tone.js integration from higher-level sequence and streaming management.


# Roadmap

- *Items are not in order.*
- *Two types of samples will be created: simple samples prioritizing ease of use, and more complex samples showcasing advanced features.*
- **Programming:**
  - NDJSON streaming (details below)
- **Structure:**
  - Completed: Multi-timbral, FM Bass, and Saw Chord
- **Playing Techniques:**
  - Completed: Delay vibrato
  - Pitch envelope: -200 cents on attack, then transitioning to 0 cents. (Independent of attack, similar to delay vibrato)
  - Sequence phrase dynamically changing panpot between left and right channels.
  - Phrase dynamically adjusting expression.
  - Phrase dynamically adjusting low-pass filter.
- **Effects:**
  - Reverb
  - Chorus
  - Delay
  - Phaser (long sweep on synth pad; indicate limitations if necessary in the title)
  - EQ
  - Compressor
- **Lead Sounds:**
  - Completed: SuperSaw sound (FatOscillator)
  - Distortion (preferably with Pluck for guitar sound)
  - Overdrive-style WaveShaper (preferably with Pluck for guitar sound)
  - Aggressive Chebyshev synth lead
  - FM lead with long decay and evolving overtones; a typical bright FM lead (using pulse wave for both modulator and carrier; indicate limitations if necessary in the title)
  - Ambient lead with pulse wave and slightly random pitch variation.
  - Quirky lead with attack-linked pitch envelope (-200 cents on attack, transitioning to 0 cents)
  - Lead with constant portamento.
- **Sequence Instruments:**
  - PulseOscillator (12.5% pulse width)
  - PluckSynth (acoustic guitar or harp)
  - NoiseSynth with filter for melodic phrases.
- **Drums:**
  - Tone.js built-in Kick, Snare, Tom, Hi-Hat (indicate limitations if 909 Kick is unavailable in the title)
- **Pads:**
  - Completed: Thick synth pad with FatOscillator
  - FM electric piano
- **Bass:**
  - Hard FM bass
  - Synth bass with constant attack-linked filter envelope.
  - Overdrive-style Saw synth bass with filter envelope and long filter sweep.
- Other:  More samples will be added as suitable sounds are found within Tone.js.  The above list currently represents the main focus.

# Development Notes (Updated Regularly)

- Integration with `tonejs-mml-to-json`
  - Postponed.  Will be reviewed after organizing the test data for `tonejs-json-sequencer`.
- NDJSON Streaming
  - Goals:
    - Live editing:  Updates are reflected in real-time without interrupting playback.
    - Loop playback:  Continues from the beginning after reaching the end.
  - Approach:
    - Stream events scheduled within the next 50ms via NDJSON.
    - Treat 50ms after play button press as 0 tick; add 50ms to event timestamps in the sequencer.  Further additions for loops.
    - Separate HTML source file planned.
- `Tone.Transport.schedule` is not yet used.
  - Initial agent-generated code was complex but did not improve sound quality.
  - Deferred until sufficient test data is available.
  - Future Outlook:
    - Implement higher-level layer (`tonejs-mml-to-json`).
    - Create test data, including JSON with noticeable timing irregularities (e.g., high-tempo arpeggios, chords, bass lines).
    - Test the irregular JSON with `tonejs-json-sequencer` to confirm issues.
    - Implement `Tone.Transport.schedule` and test improvements.
    - Implement the successful method used in `postmate-midi`: Process JSON timestamps at a higher level for real-time specification and playback via NDJSON streaming (adding +50ms to future timestamps as mentioned above).

# Issues Under Consideration

- Manually writing `switch` cases is tedious.
  - Approach:  Directly use `switch` cases for function calls; this is the safest and simplest approach.
    - Concern:  Large `switch` cases may impact performance, contradicting the lightweight library concept.
      - Alternative:  Consider a whitelist for allowed function names (more complex, with increased security risk).
        - Postponed: This is a non-functional requirement; evaluation will be after dogfooding reveals performance issues.
  - Analysis: Agent context is insufficient for generating comprehensive `switch` cases.
    - Uncertainty:  Whether functions like `depth.rampTo` can be fully covered by code generation.
    - Evaluation needed: Whether `depth.rampTo` is appropriate; what other method chains exist for different techniques and instruments.
    - Testing: Comprehensive code generation would still require extensive testing (due to the large source code).
  - Solution: Maintain the current implementation and continue dogfooding.
- Instrument Library Consideration
  - *May be spun off into a separate project, similar to `tonejs-mml-to-json`.*
  - Existing Challenges:
    - Tone.js's potential sound capabilities are unclear.  "Mastery" here refers to using it without external waveforms (soundfonts) or AudioWorklets, focusing on low-cost implementation.
    - Examples:  The sonic character of Saw and Square waves, high-frequency aliasing noise, and their usefulness in FM synthesis are unknown.  ChatGPT suggests (unverified) that Tone.js generates waveform tables for one loop, potentially leading to aliasing noise at high frequencies.
    - FM synthesis: It uses frequency modulation (not phase modulation) without feedback, limiting the types of sounds achievable.  The potential sonic capabilities with different waveforms in modulator and carrier are unknown.
    - SuperSaw: How much processing (effects) is needed to create a typical, usable SuperSaw sound is unclear.  A clearer roadmap and workflow would be beneficial.
    - Creating a 64-sample, 8-bit waveform might require Fourier transforms to generate `partials` parameters (external waveforms or AudioWorklets would be necessary for more complex scenarios).  This is unverified.
    - The capabilities of Reverb/Chorus/Flanger/Phaser (achieving at least SC-88Pro level quality) are unknown.
    - The capabilities of Distortion/Overdrive effects (achieving at least SC-88Pro level quality) are unknown.
    - The intended use is "limited to education and experimentation"; limitations in sound quality are not necessarily critical.
    - The key focus is on understanding the potential and sweet spots of Tone.js.
    - Tone.js's position is more towards signal processing than a full-fledged instrument; a focus is on what is possible with a low-cost approach.
      - Low-cost in this context considers whether a rich ecosystem (like `tonejs-json-sequencer`) will enable lower-cost development in the future.
    - Tone.js is considered superior in terms of overall capabilities.
    - Tone.js is favored due to its status as a free, open-source, multi-platform environment for musical activities within a browser.
  - Solution:  Easy sharing of instrument libraries will make it easier to visualize the potential capabilities achievable with low-cost methods.
  - Vision: Share examples of achievable sounds, effects, and combinations to demonstrate practical sound design.
  - Benefits of Instrument Library:
    - Expected to contribute to the Tone.js ecosystem.
    - Addresses the current lack of reusability of user outputs.
    - Shared outputs can build a foundation for future users. (Applies to Web Audio in general, not just instruments)
  - Instrument Library Layer:
    - Separate project, above the `tonejs-json-sequencer` layer.
  - Focus on Instrument Library:
    - Under consideration.  Rich instrument libraries and editors would foster a thriving ecosystem.
    - Prioritizing essential functionality within `tonejs-json-sequencer` is crucial (its features are prerequisites for higher-level layers).

# Priorities

- Implementation of features with clear effects (e.g., delay vibrato, multi-timbral).
- Security:  Prevent injection vulnerabilities; avoid using `eval` or similar functions.


# Out of Scope

- nodeId generation (handled by higher-level layers like `tonejs-mml-to-json` or a lower-level JSON post-processor).
- Generating on/off events for delay vibrato for all notes (similar to nodeId generation).
- JSON data processing (similar to nodeId generation).
- Complete coverage:  Fully encompassing all Tone.js classes, methods, and method chains to cover all possible function calls via JSON.
- High performance:  Optimization of processing time and source code size is not a primary concern, even if it leads to less maintainable code.

# Automated Translation

The `README.md` file is automatically generated via GitHub Actions using Gemini translation of `README.ja.md`.
