export const name = "LPF Q & Cutoff Sweep";
const bassPattern = ["C2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2", "A#1"];
const totalNotes = 160;
const ticksPerSixteenth = 48;
const triggerEvents = Array.from({ length: totalNotes }, (_value, index) => ({
    eventType: "triggerAttackRelease",
    nodeId: 0,
    args: [bassPattern[index % bassPattern.length], "16n", `+${index * ticksPerSixteenth}i`]
}));
const qCycleStarts = [0, 1536, 3072, 4608, 6144];
const qRampEvents = qCycleStarts.flatMap((start) => ([
    {
        eventType: "Q.rampTo",
        nodeId: 1,
        args: ["12", "768i", `+${start}i`]
    },
    {
        eventType: "Q.rampTo",
        nodeId: 1,
        args: ["0.7", "768i", `+${start + 768}i`]
    }
]));
const cutoffCycleStarts = [0, 1920, 3840, 5760];
const cutoffRampEvents = cutoffCycleStarts.flatMap((start) => ([
    {
        eventType: "frequency.rampTo",
        nodeId: 1,
        args: ["2000", "960i", `+${start}i`]
    },
    {
        eventType: "frequency.rampTo",
        nodeId: 1,
        args: ["120", "960i", `+${start + 960}i`]
    }
]));
export const sequence = [
    {
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth",
        args: {
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.005, decay: 0.05, sustain: 0.5, release: 0.1 }
        }
    },
    {
        eventType: "createNode",
        nodeId: 1,
        nodeType: "Filter",
        args: { type: "lowpass", frequency: 120, Q: 0.7, rolloff: -24 }
    },
    {
        eventType: "connect",
        nodeId: 0,
        connectTo: 1
    },
    {
        eventType: "connect",
        nodeId: 1,
        connectTo: "toDestination"
    },
    ...qRampEvents,
    ...cutoffRampEvents,
    ...triggerEvents
];
