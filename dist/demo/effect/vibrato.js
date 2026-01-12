export const name = "Vibrato";
export const sequence = [
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
];
