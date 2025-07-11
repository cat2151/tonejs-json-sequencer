# tonejs-json-sequencer

[Japanese README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-json-sequencer/src/index.html)

# Summary (in 3 lines)
- Lightweight library enabling JSON-based description of Tone.js instruments, effects, and playback.
- Enables data-driven sound control without writing code, facilitating seamless integration with UIs and streaming.
- Treats time-ordered events as data, allowing for precise musical expression.

# Why
- *Note: This section was initially generated using ChatGPT and may be revised in the future.*
- *In reality, most features are planned for future implementation.*

Tone.js is a library that enables rich musical expression on the web.  It allows for sophisticated sound design in JavaScript, including synth construction, effect chains, and trigger scheduling.

However, this flexibility can lead to sound colors and patterns being deeply embedded in the program, making reuse and integration difficult.

`tonejs-json-sequencer` leverages Tone.js while externalizing instrument definitions, playback details, and timing information as JSON, enabling data-driven music playback.

Sequences are structured like SMF, explicitly listing all events in chronological order.

Instrument sounds can be flexibly defined in JSON using Tone.js's synth/chain/params.

Dynamically changing instrument parameters during playback is possible, enabling expressive techniques like delay vibrato and filter sweeps.

It can directly receive NDJSON streams from external tools or live generation engines for real-time playback.

This simplifies the process of manipulating, playing, and exchanging structured musical data across UIs and networks within the Tone.js environment.

# Design Philosophy
- *Note: This section was initially generated using ChatGPT and may be revised in the future.*

`tonejs-json-sequencer` uses a direct approach:  Tone.js components (synths, effect chains, parameter changes) are described directly in JSON.

It avoids introducing a custom music description language or abstract layer.  Such advanced logic is left to higher-level program layers.

Instrument definitions specify constructor names like `Tone.Synth` or `Tone.FMSynth` along with argument objects.

Event definitions mirror the structure of Tone.js calls like `triggerAttackRelease`.

Parameter changes during playback list function names and arguments along with event timestamps.

This achieves the goal of shifting playback logic to data, making it externally configurable without sacrificing Tone.js's expressive capabilities.

The core `scheduleOrExecuteEvent` function is a simple source file accepting a single element, allowing higher layers to handle sequencing and NDJSON streaming.

This enables flexible development by separating the low-level Tone.js integration from higher-level sequencing and streaming concerns.


# Roadmap
- *Items are not in order.*
- *This will be split into two types of samples: simple samples focusing on usability, and more comprehensive samples showcasing the strengths.*
- Programming
  - NDJSON streaming (details below)
- Structure
  - Complete: Multi-timbral, FM Bass, and Saw Chord
- Playing Techniques
  - Complete: Delay vibrato
  - Pitch envelope: -200 cents on attack, then changing to 0 cents.  (Independent of attack, similar to delay vibrato)
  - Sequence phrase dynamically changing panpot to L/R
  - Phrase dynamically changing expression
  - Phrase dynamically changing LPF
- Effects
  - Reverb
  - Chorus
  - Delay
  - Phaser (long sweep on synth pad; indicate limitations in title if necessary)
  - EQ
  - Compressor
- Lead
  - Complete: SuperSaw sound (FatOscillator)
  - Distortion (preferably with Pluck for guitar sound)
  - Overdrive-style WaveShaper (preferably with Pluck for guitar sound)
  - Aggressive Chebyshev synth lead
  - FM lead with long decay and evolving overtones; a typical bright FM lead (try pulse for both modulator and carrier; indicate limitations in title if necessary)
  - Ambient lead (pulse sound, subtly fluctuating pitch randomly)
  - Quirky lead (attack-linked pitch envelope: -200 cents on attack, then changing to 0 cents)
  - Lead with constant portamento
- Sequence Instruments
  - PulseOscillator sound (12.5% pulse)
  - PluckSynth sound (acoustic guitar or harp)
  - NoiseSynth with filter for melodic phrases
- Drums
  - Tone.js built-in Kick, Snare, Tom, Hi-Hat (indicate limitations if 909 Kick is unavailable)
- Pads
  - Complete: Thick synth pad with FatOscillator
  - FM electric piano
- Bass
  - Hard FM bass
  - Synth bass with constant attack-linked filter envelope
  - Overdrive-style Saw synth bass with filter envelope and long filter sweep
- Others:  Will add more examples from Tone.js as suitable sounds are found.  For now, the above is sufficient.

# Development Notes (Updated Regularly)
- Integration with `tonejs-mml-to-json`
  - Postponed. Will be considered after organizing the test data for `tonejs-json-sequencer`.
- NDJSON streaming
  - Goal:
    - Live editing: Editing a textarea should reflect changes without restarting playback.
    - Loop playback: Playback should restart from the beginning after reaching the end.
  - Method:
    - Stream events to be played within the next 50ms via NDJSON.
    - Set 50ms after the play button press as 0 tick.  Sequencer adds 50ms to event timestamps.  Further addition for looping.
    - Planned separation into a different HTML source file.
- Not using `Tone.Transport.schedule` yet.
  - Code generation attempts with an agent resulted in complex code with no noticeable improvement in sound naturalness.
  - This is premature; it's better to wait until test data is available.
  - Future outlook:
    - Implement higher-level layer (`tonejs-mml-to-json`)
    - Create test data:
      - JSON with clearly noticeable rhythm issues (e.g., arpeggios, chords, bass in high-tempo phrases)
    - Perform the following:
      - Play the JSON using `tonejs-json-sequencer` and confirm the rhythm issues.
      - Implement `Tone.Transport.schedule` and test for rhythm improvement.
      - Implement and test the successful method used in `postmate-midi`:
        - Process JSON timestamps in the higher layer for real-time specification and play using NDJSON streaming.
        - Specify +50ms in the future as described above.

# Issues Under Consideration
- Manually writing `switch case` statements is cumbersome.
  - Approach:  Direct function calls within `switch case` is safe and simple; this will be the primary approach.
    - Concern:  However, large `switch case` statements might negatively impact performance, contradicting the lightweight library concept.
      - Consideration:  A whitelist mechanism for function names is an option, but adds complexity and security risks.
        - Postponed:  This is a non-functional requirement; it's better to evaluate after dogfooding reveals performance issues.
  - Analysis:  Agent-generated `switch case` statements lack sufficient context.
    - Example:  It's unclear if methods like `depth.rampTo` can be comprehensively generated.
    - Example:  Whether `depth.rampTo` is sufficient and what method chains exist for other playing techniques and sounds needs dogfooding.
    - Consideration:  Even if generation covers everything, testing would be laborious (due to large source code).
  - Solution:  Maintain the current implementation approach and proceed with dogfooding.

# Priorities
- Implement features with clear effects (e.g., delay vibrato, multi-timbral).
- Safety and security.  Prevent injection attacks.  Avoid using `eval`.

# Out of Scope
- nodeId generation → Handled by the higher layer (e.g., `tonejs-mml-to-json` or a lower-layer JSON post-processor)
- Generating `on` and `off` for delay vibrato for all notes → Same as nodeId generation.
- Other JSON data processing → Same as nodeId generation.
- Complete coverage:  Completely covering all Tone.js classes, methods, and method chain combinations, and all possible function calls via JSON.
- High performance:  Avoid using hard-to-maintain logic to minimize processing time and source file size.

# Automatic Translation
The `README.md` file is automatically generated via GitHub Actions using Gemini translation based on `README.ja.md`.
