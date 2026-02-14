export const name = "Portamento";
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "MonoSynth",
        "args": {
            "oscillator": {
                "type": "sawtooth"
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.3,
                "sustain": 0.7,
                "release": 0.5
            },
            "portamento": 0.1
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
        "args": ["C4", "4n", "+576i"]
    },
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G3", "4n", "+768i"]
    },
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E3", "4n", "+960i"]
    },
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C3", "2n", "+1152i"]
    },
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+1536i"]
    }
];
