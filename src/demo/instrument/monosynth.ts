// MonoSynth demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "MonoSynth";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "MonoSynth",
        "args": {
          "oscillator": {
            "type": "square"
          },
          "envelope": {
            "attack": 0.1,
            "decay": 0.3,
            "sustain": 0.4,
            "release": 0.8
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
        "args": ["C3", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E3", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G3", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "2n", "+576i"]
      }
];
