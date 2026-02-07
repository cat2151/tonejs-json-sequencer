// Chorus with object args demo sequence (including feedback parameter)
import type { SequenceEvent } from '../demo-types.js';

export const name = "Chorus (object args)";

export const sequence: SequenceEvent[] = [
{
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chorus",
        "args": {"frequency": 4, "delayTime": 2.5, "depth": 0.5, "feedback": 0.4}
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
        "args": ["C4", "2n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "2n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "2n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "1n", "+576i"]
      }
];
