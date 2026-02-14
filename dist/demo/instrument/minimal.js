export const name = "最小構成";
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth",
    },
    {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": "toDestination"
    },
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "48i", "+0i"]
    },
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+48i"]
    }
];
