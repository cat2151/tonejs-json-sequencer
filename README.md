# tonejs-json-sequencer

[Japanese README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-json-sequencer/index.html)

# Why

- *This section was initially generated using ChatGPT and may be rewritten in the future.*
- *Most features are planned for future implementation.*

Tone.js is a library that enables rich musical expression on the web.  It allows for advanced sound design in JavaScript, including synth construction, effect chains, and trigger scheduling.

However, this flexibility can lead to instrument sounds and pattern structures being deeply embedded within the program, making reuse and collaboration difficult.

`tonejs-json-sequencer` is a small mechanism that leverages Tone.js while externalizing sound definitions, performance data, and timing information as JSON, enabling data-driven music playback.

Sequences are structured similarly to SMF, explicitly listing all events in chronological order.

Instrument sounds are defined flexibly in JSON using Tone.js' synth/chain/params.

Instrument parameters can be dynamically changed during playback, allowing for expressive techniques such as delay vibrato and filter sweeps.

It can directly receive JSON streams from external tools or live generation engines for real-time playback.

This simplifies the process of manipulating, playing, and exchanging structured musical data via UIs and networks within Tone.js.

# Design Philosophy

- *This section was initially generated using ChatGPT and may be rewritten in the future.*

`tonejs-json-sequencer` takes the approach of directly describing Tone.js components (synths, effect chains, parameter changes, etc.) in JSON.

It avoids introducing a proprietary music description language or abstract layer; such advanced logic is left to higher-level program layers.

Instrument definitions use a format specifying the constructor name (e.g., `Tone.Synth`, `Tone.FMSynth`) and an argument object.

Event definitions closely mirror the structure of Tone.js calls like `triggerAttackRelease`.

Runtime parameter changes are listed as function names and arguments along with their timestamps.

This achieves the goal of transferring playback logic to data, making it configurable externally, without sacrificing Tone.js' expressive power.

# Automatic Translation

`README.md` is automatically generated via GitHub Actions using a Gemini translation of `README.ja.md`.
