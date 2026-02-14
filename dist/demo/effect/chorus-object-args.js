export const name = "Chorus (alternate settings)";
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
    },
    {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chorus",
        "args": { "wet": 0.7, "feedback": 0.2, "frequency": 0.8, "delayTime": 8, "depth": 0.7, "type": "triangle", "spread": 120 }
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
