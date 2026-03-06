// Delay and distortion effect demo sequences
import type { SequenceEvent } from '../../demo-types.js';
import type { SequenceDefinition } from '../../sequenceLoader.js';

export const sequenceDefinitions: SequenceDefinition[] = [
  {
    name: "FeedbackDelay",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "FeedbackDelay",
        "args": ["8n", 0.5]
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
        "args": ["E4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+576i"]
      }
    ]
  },
  {
    name: "PingPongDelay",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PingPongDelay",
        "args": ["8n", 0.3]
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
        "args": ["E4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+576i"]
      }
    ]
  },
  {
    name: "Distortion",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Distortion",
        "args": [0.8]
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
    ]
  },
  {
    name: "BitCrusher",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "BitCrusher",
        "args": [4]
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
    ]
  },
  {
    name: "Chebyshev",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chebyshev",
        "args": [50]
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
    ]
  },
  {
    name: "PitchShift",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PitchShift",
        "args": [4]
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
    ]
  },
  {
    name: "FrequencyShifter",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "FrequencyShifter",
        "args": [42]
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
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "StereoWidener",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "StereoWidener",
        "args": [0.5]
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
    ]
  },
] as SequenceDefinition[];
