// Tone.js JSON Sequencer Main Script
var outputArea, textarea1, sequenceSelector, nodes = [];

const sequenceDataCollection = {};
const sequenceData = sequenceDefinitions[0].data;

window.addEventListener("load", () => {
  initializeSequenceDataCollection();

  // outputArea = document.getElementById('output');
  const button = document.querySelector('button');
  textarea1 = document.querySelector('textarea');
  sequenceSelector = document.getElementById('sequenceSelector');
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

function initializeSequenceDataCollection() {
  sequenceDefinitions.forEach(seq => {
    sequenceDataCollection[seq.name] = seq.data;
  });
}

function populateSequenceSelector() {
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

function updateTextareaWithSelectedSequence() {
  const selectedSequenceName = sequenceSelector.value;

  const sequenceName = selectedSequenceName || sequenceDefinitions[0].name;
  const selectedSequenceData = sequenceDataCollection[sequenceName];

  textarea1.value = JSON.stringify(selectedSequenceData, null, 2);

  playWithAudioContext();
}

function play() {
  try {
    const json = textarea1.value;
    const j = JSON.parse(json);
    // dispose
    nodes.forEach(element => {
      try {
        element.dispose();
      } catch (disposeError) {
        console.log("dispose error:", disposeError.name, disposeError.message);
      }
    });
    // play
    j.forEach(element => {
      try {
        scheduleOrExecuteEvent(element);
      } catch (scheduleError) {
        console.log("schedule error:", scheduleError.name, scheduleError.message);
      }
    });
  } catch (error) {
    console.log("play error:", error.name, error.message);
  }
}

async function playWithAudioContext() {
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

    play();
  } catch (error) {
    console.log("playWithAudioContext error:", error.name, error.message);

    if (error.name === 'InvalidAccessError') {
      console.log("InvalidAccessError: User interaction required before audio playback");
      alert("音声を再生するには、ページをクリックするかキーを押してください。");
      return;
    }

    try {
      play();
    } catch (playError) {
      console.log("play error:", playError.name, playError.message);
    }
  }
}
