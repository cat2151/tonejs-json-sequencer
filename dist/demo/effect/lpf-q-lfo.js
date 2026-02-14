export const name = "LPF Q LFO Bass";
const bassPhrase = ["C2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2"];
const totalNotes = 64; // 4 bars of 16th notes at PPQ 192 (48 ticks per 16th)
const ticksPerSixteenth = 48;
const loopLengthTicks = totalNotes * ticksPerSixteenth;
const triggerEvents = Array.from({ length: totalNotes }, (_value, index) => ({
    eventType: "triggerAttackRelease",
    nodeId: 0,
    args: [bassPhrase[index % bassPhrase.length], "16n", `+${index * ticksPerSixteenth}i`]
}));
export const sequence = [
    {
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [118]
    },
    {
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth",
        args: {
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.008, decay: 0.12, sustain: 0.45, release: 0.2 }
        }
    },
    {
        eventType: "createNode",
        nodeId: 1,
        nodeType: "Filter",
        args: { type: "lowpass", frequency: 180, Q: 0.9, rolloff: -24 }
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
    {
        eventType: "LFO",
        nodeId: 1,
        args: ["2n", 0.8, 16, "Q", "+0i"]
    },
    ...triggerEvents,
    {
        eventType: "loopEnd",
        nodeId: 0,
        args: [`+${loopLengthTicks}i`]
    }
];
