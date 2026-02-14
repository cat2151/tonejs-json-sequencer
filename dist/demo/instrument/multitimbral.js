export const name = "マルチティンバー";
export const sequence = [
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
    },
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+4224i"]
    }
];
