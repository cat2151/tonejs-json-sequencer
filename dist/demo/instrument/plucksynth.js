export const name = "PluckSynth";
export const sequence = [
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
];
