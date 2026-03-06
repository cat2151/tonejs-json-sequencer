export const sequenceDefinitions = [
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
];
