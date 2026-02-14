// Streamingテスト：ドレミファソラシ demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "Streamingテスト：ドレミファソラシ";

export const sequence: SequenceEvent[] = [
  {
    "eventType": "createNode",
    "nodeId": 0,
    "nodeType": "Synth",
    "args": {
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 0.2
      }
    }
  },
  {
    "eventType": "connect",
    "nodeId": 0,
    "connectTo": "toDestination"
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C4", "4n", "+0i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["D4", "4n", "+192i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["E4", "4n", "+384i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["F4", "4n", "+576i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["G4", "4n", "+768i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["A4", "4n", "+960i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["B4", "4n", "+1152i"]
  },
  {
    "eventType": "loopEnd",
    "nodeId": 0,
    "args": ["+1344i"]
  }
];
