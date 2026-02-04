// Tempo test demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "Tempo test (BPM 180)";

export const sequence: SequenceEvent[] = [
  {
    "eventType": "set",
    "nodeId": 0,
    "nodeType": "Transport.bpm.value",
    "args": [180]
  },
  {
    "eventType": "createNode",
    "nodeId": 0,
    "nodeType": "Synth",
  },
  {
    "eventType": "connect",
    "nodeId": 0,
    "connectTo": "toDestination"
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C5", "8n", "+0i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["E5", "8n", "+96i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["G5", "8n", "+192i"]
  },
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C6", "8n", "+288i"]
  }
];
