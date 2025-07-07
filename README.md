# tonejs-json-sequencer

[Japanese README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-json-sequencer/src/index.html)

# Why
- *This README was initially generated using ChatGPT and may be rewritten in the future.*
- *Most features are planned for future implementation.*

Tone.js is a library that enables rich musical expression on the web.  It allows for sophisticated sound design in JavaScript, including synth construction, effect chains, and trigger scheduling.

However, this flexibility can lead to sound colors and pattern structures being deeply embedded in the program, making reuse and integration difficult.

`tonejs-json-sequencer` is a small mechanism that leverages Tone.js while externalizing sound definitions, playback content, and timing information as JSON, enabling data-driven music playback.

Sequences are structured similarly to SMF, explicitly listing all events in chronological order.

Sound colors can be flexibly defined in JSON using Tone.js synths/chains/parameters.

Sound parameters can be dynamically changed during playback, enabling expressive techniques like delay vibrato and filter sweeps.

It can directly receive NDJSON streams from external tools or live generation engines for real-time playback.

This allows for simple implementation on Tone.js of a workflow where structured musical data is manipulated, played back, and exchanged via UI or network.

# Design Philosophy
- *This section was initially generated using ChatGPT and may be rewritten in the future.*

`tonejs-json-sequencer` uses an approach where Tone.js components (synths, effect chains, parameter changes, etc.) are directly described in JSON.

It avoids introducing a proprietary music description language or abstraction layer; such advanced logic is left to higher-level program layers.

Sound definitions use a format specifying the constructor name (e.g., `Tone.Synth`, `Tone.FMSynth`) and an argument object.

Event definitions have a structure similar to Tone.js calls like `triggerAttackRelease`.

Runtime parameter changes list function names and arguments along with event timestamps.

This achieves the goal of shifting playback logic to data, making it externally configurable without sacrificing Tone.js's sound expression capabilities.

The core `scheduleOrExecuteEvent` function is a simple source file that accepts a single element, allowing higher layers to handle sequencing and NDJSON streaming.

This allows for flexible development by separating the low-level interaction with Tone.js from higher-level concerns like sequencing and streaming.

# Development Notes (Continuously Updated)
- Brainstorming from a TDD perspective:
  - Create multiple arrays of test data JSON.
  - Aurally test if each sounds as expected.
    - Examples: delay vibrato, filter sweeps, filter envelope, pitch envelope, portamento, superSaw sound, polyphonic, multitimbral, built-in drums, reverb, chorus, delay, EQ, overdrive, distortion, and other easily recognizable Tone.js samples.
    - Initially, assume a dropdown menu where the textarea is updated with the dropdown menu content.
    - Extract test data JSON to a separate src in JS, referencing the `easychord2mml` project.
    - The test data JSON will also serve as a demo.
  - Test for a while, dogfooding to get data for efficiency improvements, then use that data to improve testing efficiency.
    - For example, integration with `tonejs-mml-to-json` is planned after dogfooding.


# Issues Under Consideration
- Manually writing `switch`-`case` statements is cumbersome.
  - Approach: We will primarily use `switch`-`case` to directly write function calls because it's safe and simple.
    - Concern: However, if the `switch`-`case` becomes large in the future, there's a concern that communication speed will suffer, contradicting the lightweight library concept.
      - Consideration: Therefore, a mechanism to only use whitelisted function names is also an option, although this adds complexity and increases the risk of security errors.
        - Postponed: This is a non-functional requirement, so it's better to consider this only after dogfooding reveals performance issues.
  - Analysis: Insufficient context for an agent to generate `switch`-`case` statements.
    - Example: It's unclear if `depth.rampTo` etc., can be comprehensively covered by generation.
    - Example:  Whether `depth.rampTo` is currently sufficient, and what method chains are available for other playing techniques and timbres requires dogfooding.
    - Consideration: Even if generation could comprehensively cover everything, testing would be cumbersome (due to the massive source code).
  - Solution: Maintain the current implementation approach and proceed with dogfooding.

# Priorities
- Implement features with clear effects, such as delay vibrato and multitimbral capabilities.
- Security: Implement security measures to prevent injection attacks. Avoid using `eval` or similar functions.

# Out of Scope
- `nodeId` assignment → This will be handled by a higher-level layer, such as `tonejs-mml-to-json` or a lower-level JSON post-processor.
- Generating `on` and `off` for delay vibrato for all notes → Similar to `nodeId` assignment.
- Other JSON data processing → Similar to `nodeId` assignment.
- Exhaustive coverage:  Completely covering all Tone.js classes, methods, and method chain combinations to completely cover all possible function calls achievable in Tone.js via JSON.
- High performance:  Avoid choosing hard-to-maintain logic to minimize processing time and source file size.


# Automatic Translation
The `README.md` file is automatically generated via GitHub Actions using Gemini translation from `README.ja.md`.
