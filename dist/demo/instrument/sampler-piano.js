export const name = "Sampler (Piano)";
export const sequence = [
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
];
