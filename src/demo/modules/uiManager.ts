// UI management for Tone.js JSON Sequencer Demo
import type { SequenceDefinition } from '../sequenceLoader.js';

export class UIManager {
  private textarea: HTMLTextAreaElement;
  private sequenceSelector: HTMLSelectElement;
  private playButton: HTMLButtonElement;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private static readonly DEBOUNCE_DELAY_MS = 500;

  constructor(
    private onPlay: () => Promise<void>,
    private onSequenceChange: (sequenceName: string) => void
  ) {
    this.textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    this.sequenceSelector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    this.playButton = document.querySelector('button') as HTMLButtonElement;

    this.setupEventListeners();
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
      // Clear existing timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      // Set new timer to trigger play after user stops typing
      this.debounceTimer = setTimeout(async () => {
        await this.onPlay();
      }, UIManager.DEBOUNCE_DELAY_MS);
    });
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
}
