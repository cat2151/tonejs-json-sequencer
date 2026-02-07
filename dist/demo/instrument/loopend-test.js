export const name = "loopEndイベントテスト：ゲートタイム50%";
// This sequence demonstrates the loopEnd event usage
// Both notes have 50% gate time (duration 96i is half of the 192i spacing)
// Without loopEnd, streaming players would incorrectly calculate loop point
// from note durations (96i + 96i = 192i) instead of the actual loop point (384i)
export const sequence = [
    {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth",
        "args": {
            "oscillator": {
                "type": "sine"
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.3,
                "release": 0.2
            }
        }
    },
    {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": "toDestination"
    },
    // C4 plays for 96 ticks (50% gate time), occupies 192 ticks of time
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "96i", "+0i"]
    },
    // D4 plays for 96 ticks (50% gate time), occupies 192 ticks of time
    {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["D4", "96i", "+192i"]
    },
    // loopEnd marks the correct loop point at 384 ticks (192i spacing × 2 notes)
    // Without this event, a streaming player might incorrectly loop at 192i (sum of durations)
    {
        "eventType": "loopEnd",
        "nodeId": 0,
        "args": ["+384i"]
    }
];
