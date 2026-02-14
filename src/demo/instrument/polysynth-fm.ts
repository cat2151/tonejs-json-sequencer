// PolySynth (FM Synth) demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "PolySynth (FM Synth)";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "PolySynth",
        "args": {
          "voice": "FMSynth",
          "options": {
            "harmonicity": 3,
            "modulationIndex": 10,
            "oscillator": {
              "type": "sine"
            },
            "envelope": {
              "attack": 0.01,
              "decay": 0.1,
              "sustain": 0.2,
              "release": 0.5
            },
            "modulation": {
              "type": "square"
            },
            "modulationEnvelope": {
              "attack": 0.5,
              "decay": 0,
              "sustain": 1,
              "release": 0.5
            }
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
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      },
      {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+480i"]
      }
];
