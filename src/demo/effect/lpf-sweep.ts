// LPF cutoff/Q async modulation demo sequence
import type { SequenceEvent } from '../demo-types.js';

export const name = "LPF Q & Cutoff Sweep";

const bassPattern = ["C2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2", "C2", "G1", "A#1", "C2", "D2", "F2", "G2", "A#1"];
const totalNotes = 160;
const ticksPerSixteenth = 24;

const triggerEvents: SequenceEvent[] = Array.from({ length: totalNotes }, (_value, index) => ({
  eventType: "triggerAttackRelease",
  nodeId: 0,
  args: [bassPattern[index % bassPattern.length], "16n", `+${index * ticksPerSixteenth}i`]
}));

const qCycleStarts = [0, 768, 1536, 2304, 3072];
const qRampEvents: SequenceEvent[] = qCycleStarts.flatMap((start) => ([
  {
    eventType: "Q.rampTo",
    nodeId: 1,
    args: ["12", "384i", `+${start}i`]
  },
  {
    eventType: "Q.rampTo",
    nodeId: 1,
    args: ["0.7", "384i", `+${start + 384}i`]
  }
]));

const cutoffCycleStarts = [0, 960, 1920, 2880];
const cutoffRampEvents: SequenceEvent[] = cutoffCycleStarts.flatMap((start) => ([
  {
    eventType: "frequency.rampTo",
    nodeId: 1,
    args: ["2000", "480i", `+${start}i`]
  },
  {
    eventType: "frequency.rampTo",
    nodeId: 1,
    args: ["120", "480i", `+${start + 480}i`]
  }
]));

export const sequence: SequenceEvent[] = [
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
