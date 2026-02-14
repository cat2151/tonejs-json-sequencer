// Volume control demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "Volume Control (音量変化)";

export const sequence: SequenceEvent[] = [
  {
    "eventType": "createNode",
    "nodeId": 0,
    "nodeType": "Synth",
    "args": {
      "oscillator": { "type": "sine" },
      "envelope": { "attack": 0.005, "decay": 0.1, "sustain": 0.3, "release": 1 }
    }
  },
  {
    "eventType": "connect",
    "nodeId": 0,
    "connectTo": "toDestination"
  },
  // First note: normal volume
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C4", "4n", "0"]
  },
  // Second note: fade in from quiet to normal
  {
    "eventType": "volume.rampTo",
    "nodeId": 0,
    "args": ["-20", "0.01", "0:1:0"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["E4", "4n", "0:1:0"]
  },
  {
    "eventType": "volume.rampTo",
    "nodeId": 0,
    "args": ["0", "0.5", "0:1:0"]
  },
  // Third note: fade out during note
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["G4", "4n", "0:2:0"]
  },
  {
    "eventType": "volume.rampTo",
    "nodeId": 0,
    "args": ["-30", "0.5", "0:2:0"]
  },
  // Fourth note: fade back to normal
  {
    "eventType": "volume.rampTo",
    "nodeId": 0,
    "args": ["0", "0.1", "0:3:0"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C5", "4n", "0:3:0"]
  },
  {
    "eventType": "loopEnd",
    "nodeId": 0,
    "args": ["1:2:0"]
  }
];
