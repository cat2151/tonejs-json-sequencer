export const name = "Phaser";
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
    },
    {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Phaser",
        "args": { "wet": 1, "frequency": 0.5, "octaves": 3, "stages": 10, "Q": 10, "baseFrequency": 350 }
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
    },
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+1344i"]
    }
];
