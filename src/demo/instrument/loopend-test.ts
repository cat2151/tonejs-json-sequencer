// loopEnd event test: demonstrates explicit loop boundary marking
import type { SequenceEvent } from '../demo-types.js';

export const name = "loopEndイベントテスト：ゲートタイム50%";

// This sequence demonstrates the loopEnd event usage
// Notes have 50% gate time (duration is half of the actual time)
// Without loopEnd, streaming players would incorrectly calculate loop point
// from note durations (96i + 48i = 144i) instead of the actual loop point (288i)
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
  // C4 plays for 96 ticks (50% gate time) but occupies 192 ticks of time
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["C4", "96i", "+0i"]
  },
  // D4 plays for 48 ticks (50% gate time) but occupies 96 ticks of time
  {
    "eventType": "triggerAttackRelease",
    "nodeId": 0,
    "args": ["D4", "48i", "+192i"]
  },
  // loopEnd marks the correct loop point at 288 ticks (192 + 96)
  // Without this event, a streaming player might incorrectly loop at 144 ticks
  {
    "eventType": "loopEnd",
    "nodeId": 0,
    "args": ["", "", "+288i"]
  }
];
