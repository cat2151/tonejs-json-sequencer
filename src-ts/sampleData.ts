// Tone.js JSON Sequencer Data
import type { SequenceEvent } from './demo-types.js';

export interface SequenceDefinition {
  name: string;
  data: SequenceEvent[];
}

// シーケンスの定義
export const sequenceDefinitions: SequenceDefinition[] = [
  {
    name: "最小構成",
    data: [
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
        "args": ["C5", "48i", "+0i"]
      }
    ]
  },
  {
    name: "ディレイビブラート",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "FMSynth",
        "args": {
          "harmonicity": 7,
          "modulationIndex": 20,
          "modulationEnvelope": {
            "attack": 0.001,
            "decay": 0.5,
            "sustain": 0.3,
            "release": 0.3
          },
          "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.3,
            "release": 0.5
          },
          "portamento": 0
        }
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Vibrato",
        "args": [7, 0]
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
        "args": ["C4", "758i", "+0i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0.2", "192i", "+192i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0", "10i", "+758i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "758i", "+768i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0.2", "192i", "+960i"]
      }
    ]
  },
  {
    name: "マルチティンバー",
    data: [
      { // Bass
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "FMSynth",
        "args": {
          "harmonicity": 1,
          "modulationIndex": 40,
          "modulationEnvelope": {
            "attack": 0.001,
            "decay": 3,
            "sustain": 0,
            "release": 10
          },
        }
      },
      { // Lead or Chord
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PolySynth",
        "args": {
          options: {
            "oscillator": {
              "type": "sawtooth"
            },
          }
        }
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": "toDestination"
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C2", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 1,
        "args": ["E5", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 1,
        "args": ["G5", "4n", "+0i"]
      }
    ]
  },
  {
    name: "SuperSaw",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "PolySynth",
        "args": {
          options: {
            "oscillator": {
              "type": "fatsawtooth"
            },
            "envelope": {
              "attack": 0.1,
              "decay": 0.05,
              "sustain": 0.8,
              "release": 9999999999
            },
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
        "args": ["C2", "288i", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "192i", "+24i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "192i", "+48i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E5", "192i", "+72i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["B5", "192i", "+96i"]
      },
    ]
  },
  {
    name: "Sampler (Piano)",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Sampler",
        "args": {
          "urls": {
            "C4": "https://tonejs.github.io/audio/salamander/C4.mp3",
            "D#4": "https://tonejs.github.io/audio/salamander/Ds4.mp3",
            "F#4": "https://tonejs.github.io/audio/salamander/Fs4.mp3",
            "A4": "https://tonejs.github.io/audio/salamander/A4.mp3",
          },
          "release": 1,
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
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["B4", "1n", "+288i"]
      }
    ]
  },
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
  // === Effect Demos ===
  {
    name: "Reverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Reverb",
        "args": [2]
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
    name: "Freeverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Freeverb",
        "args": [0.8, 5000]
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
    name: "JCReverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "JCReverb",
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
    name: "Chorus",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chorus",
        "args": [4, 2.5, 0.5]
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
    ]
  },
  {
    name: "Phaser",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Phaser",
        "args": [0.5, 3, 350]
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
    ]
  },
  {
    name: "Tremolo",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Tremolo",
        "args": [9, 0.75]
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
    name: "Vibrato",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Vibrato",
        "args": [5, 0.1]
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
    name: "AutoFilter",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoFilter",
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
    name: "AutoPanner",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoPanner",
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
    name: "AutoWah",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoWah",
        "args": [50, 6, -30]
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
];
