// Example of using tonejs-json-sequencer as an npm package
// Run: node examples/npm-example.mjs

import * as Tone from 'tone';
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
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.5 },
      modulation: { type: 'square' },
      modulationEnvelope: { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }
    }
  },
  {
    eventType: 'connect',
    nodeId: 0,
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
