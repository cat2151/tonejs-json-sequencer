// AutoWah demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "AutoWah";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoWah",
        "args": {"wet": 1, "baseFrequency": 50, "octaves": 6, "sensitivity": -30, "Q": 2, "gain": 2, "follower": 0.2}
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
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
      }
];
