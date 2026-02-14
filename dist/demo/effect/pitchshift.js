export const name = "PitchShift";
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
    },
    {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PitchShift",
        "args": { "wet": 1, "feedback": 0, "pitch": 4, "windowSize": 0.1, "delayTime": 0 }
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
    },
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+960i"]
    }
];
