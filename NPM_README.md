# tonejs-json-sequencer

A lightweight library that allows you to define Tone.js instruments, effects, and performances using JSON.

## Features

- Define Tone.js synths, effects, and event sequences in JSON format
- TypeScript support with full type definitions
- Available as both CommonJS and ES modules
- CDN-ready distribution files
- Lightweight and easy to integrate

## Installation

### NPM

```bash
npm install tonejs-json-sequencer tone
```

### CDN

```html
<!-- ES Module -->
<script type="module">
  import { SequencerNodes, scheduleOrExecuteEvent, playSequence } from 'https://cdn.jsdelivr.net/npm/tonejs-json-sequencer@1.0.0/dist/index.mjs';
</script>

<!-- Or use unpkg -->
<script type="module">
  import { SequencerNodes, scheduleOrExecuteEvent, playSequence } from 'https://unpkg.com/tonejs-json-sequencer@1.0.0/dist/index.mjs';
</script>
```

## Usage

### Basic Example

```typescript
import * as Tone from 'tone';
import { SequencerNodes, playSequence, SequenceEvent } from 'tonejs-json-sequencer';

// Define your sequence as JSON
const sequence: SequenceEvent[] = [
  {
    eventType: 'createNode',
    nodeId: 0,
    nodeType: 'Synth',
    args: { oscillator: { type: 'sine' } }
  },
  {
    eventType: 'connect',
    nodeId: 0,
    connectTo: 'toDestination'
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['C4', '8n', '0']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['E4', '8n', '0:0:2']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['G4', '8n', '0:1:0']
  }
];

// Create node manager
const nodes = new SequencerNodes();

// Play the sequence
async function play() {
  await Tone.start();
  await playSequence(Tone, nodes, sequence);
  Tone.Transport.start();
}

// Attach to button click
document.getElementById('playButton').addEventListener('click', play);
```

### Browser Example (with CDN)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tonejs JSON Sequencer Example</title>
  <script src="https://cdn.jsdelivr.net/npm/tone@15.0.4/build/Tone.js"></script>
</head>
<body>
  <button id="playButton">Play</button>
  
  <script type="module">
    import { SequencerNodes, playSequence } from 'https://cdn.jsdelivr.net/npm/tonejs-json-sequencer@1.0.0/dist/index.mjs';

    const sequence = [
      {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Synth',
        args: { oscillator: { type: 'sine' } }
      },
      {
        eventType: 'connect',
        nodeId: 0,
        connectTo: 'toDestination'
      },
      {
        eventType: 'triggerAttackRelease',
        nodeId: 0,
        args: ['C4', '4n', '0']
      }
    ];

    const nodes = new SequencerNodes();

    document.getElementById('playButton').addEventListener('click', async () => {
      await Tone.start();
      await playSequence(Tone, nodes, sequence);
    });
  </script>
</body>
</html>
```

## API

### Types

#### `SequenceEvent`

Union type of all event types:
- `CreateNodeEvent` - Create a new Tone.js node
- `ConnectEvent` - Connect nodes together
- `TriggerAttackReleaseEvent` - Trigger a note
- `DepthRampToEvent` - Ramp effect depth

#### `CreateNodeEvent`

```typescript
{
  eventType: 'createNode';
  nodeId: number;
  nodeType: string;
  args?: any;
}
```

Supported node types include:
- **Instruments**: `Synth`, `FMSynth`, `AMSynth`, `MonoSynth`, `PolySynth`, `DuoSynth`, `PluckSynth`, `NoiseSynth`, `MetalSynth`, `MembraneSynth`, `Sampler`
- **Effects**: `Reverb`, `Chorus`, `Delay`, `FeedbackDelay`, `PingPongDelay`, `Distortion`, `BitCrusher`, `Chebyshev`, `Phaser`, `Tremolo`, `Vibrato`, `AutoFilter`, `AutoPanner`, `AutoWah`, `Freeverb`, `JCReverb`, `StereoWidener`, `FrequencyShifter`, `PitchShift`

#### `ConnectEvent`

```typescript
{
  eventType: 'connect';
  nodeId: number;
  connectTo: number | 'toDestination';
}
```

### Classes

#### `SequencerNodes`

Manages Tone.js nodes for the sequencer.

**Methods:**
- `get(nodeId: number): any` - Get a node by ID
- `set(nodeId: number, node: any): void` - Set a node
- `disposeAll(): void` - Dispose all nodes

### Functions

#### `scheduleOrExecuteEvent(Tone, nodes, element)`

Process a single sequence event.

**Parameters:**
- `Tone` - Tone.js library instance
- `nodes` - SequencerNodes instance
- `element` - The event to process

#### `playSequence(Tone, nodes, sequence)`

Play a complete JSON sequence.

**Parameters:**
- `Tone` - Tone.js library instance
- `nodes` - SequencerNodes instance
- `sequence` - Array of sequence events

**Returns:** `Promise<void>`

## Examples

See the [src](./src) directory for more examples.

## License

MIT

## Repository

https://github.com/cat2151/tonejs-json-sequencer
