export const name = "SuperSaw";
export const sequence = [
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
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+3840i"]
    },
];
