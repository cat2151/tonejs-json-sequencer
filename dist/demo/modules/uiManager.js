export class UIManager {
    constructor(onPlay, onSequenceChange) {
        this.onPlay = onPlay;
        this.onSequenceChange = onSequenceChange;
        this.textarea = document.querySelector('textarea');
        this.sequenceSelector = document.getElementById('sequenceSelector');
        this.playButton = document.getElementById('playButton');
        this.errorStatus = document.getElementById('errorStatus');
        this.errorLog = document.getElementById('errorLog');
        this.errorLogToggle = document.getElementById('errorLogToggle');
        this.setupEventListeners();
        this.setErrorStatusOk(); // Initialize with OK status
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
            await this.onPlay();
        });
        this.errorLogToggle.addEventListener('click', () => {
            this.toggleErrorLog();
        });
    }
    toggleErrorLog() {
        if (this.errorLog.classList.contains('collapsed')) {
            this.errorLog.classList.remove('collapsed');
            this.errorLog.removeAttribute('hidden');
            this.errorLogToggle.setAttribute('aria-expanded', 'true');
            this.errorLogToggle.textContent = 'エラーログを非表示';
        }
        else {
            this.errorLog.classList.add('collapsed');
            this.errorLog.setAttribute('hidden', '');
            this.errorLogToggle.setAttribute('aria-expanded', 'false');
            this.errorLogToggle.textContent = 'エラーログを表示';
        }
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
    setErrorStatusOk() {
        this.errorStatus.textContent = 'OK';
        this.errorStatus.className = 'error-status ok';
        this.errorLog.textContent = '';
        this.errorLog.classList.add('collapsed');
        this.errorLog.setAttribute('hidden', '');
        this.errorLogToggle.setAttribute('aria-expanded', 'false');
        this.errorLogToggle.textContent = 'エラーログを表示';
    }
    setErrorStatusNg(errorMessage) {
        this.errorStatus.textContent = 'NG';
        this.errorStatus.className = 'error-status ng';
        this.errorLog.textContent = errorMessage;
        // Don't auto-expand the log - let user click to see it
    }
}
