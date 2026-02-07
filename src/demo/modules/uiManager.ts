// UI management for Tone.js JSON Sequencer Demo
import type { SequenceDefinition } from '../sequenceLoader.js';

export class UIManager {
  private textarea: HTMLTextAreaElement;
  private sequenceSelector: HTMLSelectElement;
  private playButton: HTMLButtonElement;
  private errorStatus: HTMLDivElement;
  private errorLog: HTMLPreElement;
  private errorLogToggle: HTMLButtonElement;

  constructor(
    private onPlay: () => Promise<void>,
    private onSequenceChange: (sequenceName: string) => void
  ) {
    this.textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    this.sequenceSelector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    this.playButton = document.getElementById('playButton') as HTMLButtonElement;
    this.errorStatus = document.getElementById('errorStatus') as HTMLDivElement;
    this.errorLog = document.getElementById('errorLog') as HTMLPreElement;
    this.errorLogToggle = document.getElementById('errorLogToggle') as HTMLButtonElement;

    this.setupEventListeners();
    this.setErrorStatusOk(); // Initialize with OK status
  }

  private setupEventListeners(): void {
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

  private toggleErrorLog(): void {
    if (this.errorLog.classList.contains('collapsed')) {
      this.errorLog.classList.remove('collapsed');
      this.errorLog.removeAttribute('hidden');
      this.errorLogToggle.setAttribute('aria-expanded', 'true');
      this.errorLogToggle.textContent = 'エラーログを非表示';
    } else {
      this.errorLog.classList.add('collapsed');
      this.errorLog.setAttribute('hidden', '');
      this.errorLogToggle.setAttribute('aria-expanded', 'false');
      this.errorLogToggle.textContent = 'エラーログを表示';
    }
  }

  populateSequenceSelector(sequences: SequenceDefinition[]): void {
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

  getTextareaValue(): string {
    return this.textarea.value;
  }

  setTextareaValue(value: string): void {
    this.textarea.value = value;
  }

  getSelectedSequenceName(): string {
    return this.sequenceSelector.value;
  }

  setErrorStatusOk(): void {
    this.errorStatus.textContent = 'OK';
    this.errorStatus.className = 'error-status ok';
    this.errorLog.textContent = '';
    this.errorLog.classList.add('collapsed');
    this.errorLog.setAttribute('hidden', '');
    this.errorLogToggle.setAttribute('aria-expanded', 'false');
    this.errorLogToggle.textContent = 'エラーログを表示';
  }

  setErrorStatusNg(errorMessage: string): void {
    this.errorStatus.textContent = 'NG';
    this.errorStatus.className = 'error-status ng';
    this.errorLog.textContent = errorMessage;
    // Don't auto-expand the log - let user click to see it
  }
}
