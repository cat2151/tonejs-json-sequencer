export const name = "NoiseSynth";
export const sequence = [
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
];
