// MembraneSynth demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "MembraneSynth";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "MembraneSynth",
        "args": {
          "pitchDecay": 0.05,
          "octaves": 10,
          "oscillator": {
            "type": "sine"
          },
          "envelope": {
            "attack": 0.001,
            "decay": 0.4,
            "sustain": 0.01,
            "release": 1.4
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
        "args": ["C2", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C2", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G2", "8n", "+288i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C2", "4n", "+384i"]
      },
      {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+576i"]
      }
];
