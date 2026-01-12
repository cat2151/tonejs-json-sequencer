// AMSynth demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "AMSynth";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "AMSynth",
        "args": {
          "harmonicity": 3,
          "oscillator": {
            "type": "sine"
          },
          "envelope": {
            "attack": 0.01,
            "decay": 0.2,
            "sustain": 0.3,
            "release": 0.4
          },
          "modulation": {
            "type": "square"
          },
          "modulationEnvelope": {
            "attack": 0.5,
            "decay": 0.01,
            "sustain": 1,
            "release": 0.5
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
        "args": ["E4", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "2n", "+576i"]
      }
];
