export class UIManager {
    constructor(onPlay, onSequenceChange) {
        this.onPlay = onPlay;
        this.onSequenceChange = onSequenceChange;
        this.textarea = document.querySelector('textarea');
        this.sequenceSelector = document.getElementById('sequenceSelector');
        this.playButton = document.querySelector('button');
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.sequenceSelector.addEventListener('change', () => {
            const selectedName = this.sequenceSelector.value;
            this.onSequenceChange(selectedName);
        });
        this.playButton.onclick = async () => {
            await this.onPlay();
        };
    }
    populateSequenceSelector(sequences) {
        this.sequenceSelector.innerHTML = '';
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Demoを選んでください';
        placeholderOption.selected = true;
        this.sequenceSelector.appendChild(placeholderOption);
        sequences.forEach(seq => {
            const option = document.createElement('option');
            option.value = seq.name;
            option.textContent = seq.name;
            this.sequenceSelector.appendChild(option);
        });
    }
    getTextareaValue() {
        return this.textarea.value;
    }
    setTextareaValue(value) {
        this.textarea.value = value;
    }
    getSelectedSequenceName() {
        return this.sequenceSelector.value;
    }
}
