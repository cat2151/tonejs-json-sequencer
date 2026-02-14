export const name = "Generic rampTo Wet Sweep";
const phrase = ["C4", "E4", "G4", "B4", "A4", "G4", "E4", "D4"];
const ticksPerSixteenth = 48;
const totalNotes = phrase.length * 2;
const triggerEvents = Array.from({ length: totalNotes }, (_value, index) => ({
    eventType: "triggerAttackRelease",
    nodeId: 0,
    args: [phrase[index % phrase.length], "16n", `+${index * ticksPerSixteenth}i`]
}));
const wetAutomation = [
    {
        eventType: "rampTo",
        nodeId: 1,
        args: [0.75, "768i", "wet", "+0i"]
    },
    {
        eventType: "rampTo",
        nodeId: 1,
        args: [0.2, "768i", "wet", "+768i"]
    }
];
export const sequence = [
    {
        eventType: "set",
        nodeId: 0,
        nodeType: "Transport.bpm.value",
        args: [110]
    },
    {
        eventType: "createNode",
        nodeId: 0,
        nodeType: "Synth",
        args: {
            oscillator: { type: "sawtooth" },
            envelope: { attack: 0.01, decay: 0.08, sustain: 0.5, release: 0.3 }
        }
    },
    {
        eventType: "createNode",
        nodeId: 1,
        nodeType: "Reverb",
        args: { wet: 0.2, decay: 2.5, preDelay: 0.02 }
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
    ...wetAutomation,
    ...triggerEvents
];
