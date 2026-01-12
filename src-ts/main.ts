// Tone.js JSON Sequencer Main Script
import { sequenceDefinitions } from './sampleData.js';
import type { SequenceEvent } from './demo-types.js';
// @ts-ignore - Using built library
import { SequencerNodes, scheduleOrExecuteEvent } from '../dist/index.mjs';

interface SequenceDataCollection {
  [key: string]: SequenceEvent[];
}

let textarea1: HTMLTextAreaElement;
let sequenceSelector: HTMLSelectElement;
const nodes = new SequencerNodes();

const sequenceDataCollection: SequenceDataCollection = {};

window.addEventListener("load", () => {
  initializeSequenceDataCollection();

  const button = document.querySelector('button') as HTMLButtonElement;
  textarea1 = document.querySelector('textarea') as HTMLTextAreaElement;
  sequenceSelector = document.getElementById('sequenceSelector') as HTMLSelectElement;
  
  textarea1.addEventListener('input', play);
  sequenceSelector.addEventListener('change', () => {
    updateTextareaWithSelectedSequence();
  });
  button.onclick = async () => {
    await playWithAudioContext();
  };

  populateSequenceSelector();
  updateTextareaWithSelectedSequence();
});

function initializeSequenceDataCollection(): void {
  sequenceDefinitions.forEach(seq => {
    sequenceDataCollection[seq.name] = seq.data;
  });
}

function populateSequenceSelector(): void {
  sequenceSelector.innerHTML = '';

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = 'Demoを選んでください';
  placeholderOption.selected = true;
  sequenceSelector.appendChild(placeholderOption);

  sequenceDefinitions.forEach(seq => {
    const option = document.createElement('option');
    option.value = seq.name;
    option.textContent = seq.name;
    sequenceSelector.appendChild(option);
  });
}

function updateTextareaWithSelectedSequence(): void {
  const selectedSequenceName = sequenceSelector.value;

  const sequenceName = selectedSequenceName || sequenceDefinitions[0].name;
  const selectedSequenceData = sequenceDataCollection[sequenceName];

  textarea1.value = JSON.stringify(selectedSequenceData, null, 2);

  playWithAudioContext();
}

// Play functions for Tone.js JSON Sequencer
async function playWithAudioContext(): Promise<void> {
  try {
    if (typeof Tone === 'undefined') {
      console.log("Tone.js is not loaded");
      return;
    }

    if (Tone.context.state !== 'running') {
      console.log("Starting Tone.js AudioContext...");
      await Tone.start();
      console.log("AudioContext started successfully");
    }

    await play();
  } catch (error: any) {
    console.log("playWithAudioContext error:", error.name, error.message);

    if (error.name === 'InvalidAccessError') {
      console.log("InvalidAccessError: User interaction required before audio playback");
      alert("音声を再生するには、ページをクリックするかキーを押してください。");
      return;
    }

    try {
      await play();
    } catch (playError: any) {
      console.log("play error:", playError.name, playError.message);
    }
  }
}

async function play(): Promise<void> {
  try {
    const json = textarea1.value;
    const sequence = JSON.parse(json) as SequenceEvent[];
    
    // Dispose all existing nodes
    nodes.disposeAll();
    
    // First pass: create nodes and connections
    sequence.forEach((element: SequenceEvent) => {
      try {
        if (element.eventType === "createNode" || element.eventType === "connect") {
          scheduleOrExecuteEvent(Tone, nodes, element);
        }
      } catch (scheduleError: any) {
        console.log("schedule error:", scheduleError.name, scheduleError.message);
      }
    });
    
    // Wait for all audio buffers to load (important for Sampler)
    await Tone.loaded();
    console.log("All audio buffers loaded");
    
    // Second pass: schedule playback events
    sequence.forEach((element: SequenceEvent) => {
      try {
        if (element.eventType !== "createNode" && element.eventType !== "connect") {
          scheduleOrExecuteEvent(Tone, nodes, element);
        }
      } catch (scheduleError: any) {
        console.log("schedule error:", scheduleError.name, scheduleError.message);
      }
    });
  } catch (error: any) {
    console.log("play error:", error.name, error.message);
  }
}
