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
