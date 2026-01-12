// Synthesizer demo sequences
import type { SequenceEvent } from '../demo-types.js';
import type { SequenceDefinition } from './basicSequences.js';

export const sequenceDefinitions: SequenceDefinition[] = [
  {
    name: "PolySynth (FM Synth)",
    data: [
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
      }
    ]
  },
  // === Instrument Demos ===
  {
    name: "MonoSynth",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "MonoSynth",
        "args": {
          "oscillator": {
            "type": "square"
          },
          "envelope": {
            "attack": 0.1,
            "decay": 0.3,
            "sustain": 0.4,
            "release": 0.8
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
    name: "AMSynth",
    data: [
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
    ]
  },
  {
    name: "DuoSynth",
    data: [
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
      }
    ]
  },
  {
    name: "MetalSynth",
    data: [
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
      }
    ]
  },
  {
    name: "MembraneSynth",
    data: [
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
      }
    ]
  },
  {
    name: "PluckSynth",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "PluckSynth",
        "args": {
          "attackNoise": 1,
          "dampening": 4000,
          "resonance": 0.7
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
        "args": ["C4", "2n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "2n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "2n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "1n", "+288i"]
      }
    ]
  },
  {
    name: "NoiseSynth",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "NoiseSynth",
        "args": {
          "noise": {
            "type": "white"
          },
          "envelope": {
            "attack": 0.005,
            "decay": 0.1,
            "sustain": 0
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
        "args": ["8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["4n", "+288i"]
      }
    ]
  },

];
