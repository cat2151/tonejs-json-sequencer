export const sequenceDefinitions = [
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
            {
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
            {
                "eventType": "createNode",
                "nodeId": 1,
                "nodeType": "PolySynth",
                "args": {
                    "options": {
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
                    "options": {
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
];
