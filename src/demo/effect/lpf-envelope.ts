// LPF per-note envelope demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "LPF Envelope Bass";

const bassPhrase = ["C2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2"];
const totalNotes = 40; // 16th notes at 120 BPM for ~5 seconds
const ticksPerSixteenth = 48;
const attackTicks = 12;
const decayTicks = 36;

const noteStarts = Array.from({ length: totalNotes }, (_value, index) => index * ticksPerSixteenth);

const triggerEvents: SequenceEvent[] = noteStarts.map((start, index) => ({
  eventType: "triggerAttackRelease",
  nodeId: 0,
  args: [bassPhrase[index % bassPhrase.length], "16n", `+${start}i`]
}));

const filterCutoffEnvelopes: SequenceEvent[] = noteStarts.flatMap((start) => ([
  {
    eventType: "frequency.rampTo",
    nodeId: 1,
    args: ["2000", `${attackTicks}i`, `+${start}i`]
  },
  {
    eventType: "frequency.rampTo",
    nodeId: 1,
    args: ["150", `${decayTicks}i`, `+${start + attackTicks}i`]
  }
]));

const filterQEnvelopes: SequenceEvent[] = noteStarts.flatMap((start) => ([
  {
    eventType: "Q.rampTo",
    nodeId: 1,
    args: ["14", `${attackTicks}i`, `+${start}i`]
  },
  {
    eventType: "Q.rampTo",
    nodeId: 1,
    args: ["0.8", `${decayTicks}i`, `+${start + attackTicks}i`]
  }
]));

export const sequence: SequenceEvent[] = [
  {
    eventType: "set",
    nodeId: 0,
    nodeType: "Transport.bpm.value",
    args: [120]
  },
  {
    eventType: "createNode",
    nodeId: 0,
    nodeType: "Synth",
    args: {
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.005, decay: 0.06, sustain: 0.4, release: 0.12 }
    }
  },
  {
    eventType: "createNode",
    nodeId: 1,
    nodeType: "Filter",
    args: { type: "lowpass", frequency: 150, Q: 0.8, rolloff: -24 }
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
  ...filterQEnvelopes,
  ...filterCutoffEnvelopes,
  ...triggerEvents,
  {
    eventType: "loopEnd",
    nodeId: 0,
    args: ["+1920i"]
  }
];
