// DuoSynth demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "DuoSynth";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "DuoSynth",
        "args": {
          "voice0": {
            "oscillator": {
              "type": "sawtooth"
            },
            "envelope": {
              "attack": 0.01,
              "decay": 0.2,
              "sustain": 0.3,
              "release": 0.6
            }
          },
          "voice1": {
            "oscillator": {
              "type": "sine"
            },
            "envelope": {
              "attack": 0.01,
              "decay": 0.2,
              "sustain": 0.3,
              "release": 0.6
            }
          },
          "vibratoRate": 5,
          "vibratoAmount": 0.1
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
      },
      {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+960i"]
      }
];
