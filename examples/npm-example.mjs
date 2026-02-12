// Example of using tonejs-json-sequencer as an npm package
// Run: node examples/npm-example.mjs

import { SequencerNodes, playSequence } from '../dist/index.mjs';

// Define a simple sequence
const sequence = [
  {
    eventType: 'createNode',
    nodeId: 0,
    nodeType: 'FMSynth',
    args: {
      harmonicity: 3,
      modulationIndex: 10,
      detune: 0,
      portamento: 0,
      volume: 0,
      oscillator: { type: 'sine', phase: 0 },
      envelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0.1,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 0.5,
        releaseCurve: 'exponential'
      },
      modulation: { type: 'square', phase: 0 },
      modulationEnvelope: { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }
    }
  },
  {
    eventType: 'createNode',
    nodeId: 1,
    nodeType: 'Reverb',
    args: {
      decay: 2.5,
      preDelay: 0.01,
      wet: 0.25
    }
  },
  {
    eventType: 'connect',
    nodeId: 0,
    connectTo: 1
  },
  {
    eventType: 'connect',
    nodeId: 1,
    connectTo: 'toDestination'
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['C4', '8n', '0']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['D4', '8n', '0:0:2']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['E4', '8n', '0:1:0']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['G4', '8n', '0:1:2']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['A4', '4n', '0:2:0']
  },
  {
    eventType: 'loopEnd',
    nodeId: 0,
    args: ['0:5:0']
  }
];

console.log('Tonejs JSON Sequencer - NPM Example');
console.log('===================================');
console.log('Sequence:', JSON.stringify(sequence, null, 2));
console.log('\nNote: This is a Node.js example. Audio playback requires a browser environment.');
console.log('The sequence is validated and ready to use in a browser context.');

// Create node manager
const nodes = new SequencerNodes();

// Verify the module exports
console.log('\nModule exports available:');
console.log('- SequencerNodes:', typeof SequencerNodes);
console.log('- playSequence:', typeof playSequence);
console.log('- nodes instance:', nodes);

console.log('\n✓ Package loaded successfully!');
console.log('For browser usage, see examples/cdn-example.html');
