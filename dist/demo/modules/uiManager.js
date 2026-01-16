export class UIManager {
    constructor(onPlay, onSequenceChange) {
        this.onPlay = onPlay;
        this.onSequenceChange = onSequenceChange;
        this.debounceTimer = null;
        this.isProgrammaticChange = false;
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
        this.textarea.addEventListener('input', async () => {
            // Skip if this is a programmatic change
            if (this.isProgrammaticChange) {
                return;
            }
            // Clear existing timer
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            // Set new timer to trigger play after user stops typing
            this.debounceTimer = setTimeout(async () => {
                await this.onPlay();
            }, 500);
        });
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
        this.isProgrammaticChange = true;
        this.textarea.value = value;
        // Reset flag after a short delay to ensure input event has been processed
        setTimeout(() => {
            this.isProgrammaticChange = false;
        }, 0);
    }
    getSelectedSequenceName() {
        return this.sequenceSelector.value;
    }
}
