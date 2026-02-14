// MetalSynth demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "MetalSynth";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "MetalSynth",
        "args": {
          "frequency": 200,
          "envelope": {
            "attack": 0.001,
            "decay": 0.1,
            "release": 0.2
          },
          "harmonicity": 5.1,
          "modulationIndex": 32,
          "resonance": 4000,
          "octaves": 1.5
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
        "args": ["G4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E5", "4n", "+288i"]
      },
      {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+480i"]
      }
];
