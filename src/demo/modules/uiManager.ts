// UI management for Tone.js JSON Sequencer Demo
import type { SequenceDefinition } from '../sequenceLoader.js';

export class UIManager {
  private textarea: HTMLTextAreaElement;
  private sequenceSelector: HTMLSelectElement;
  private playButton: HTMLButtonElement;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private isProgrammaticChange = false;

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
    this.isProgrammaticChange = true;
    this.textarea.value = value;
    // Reset flag after a short delay to ensure input event has been processed
    setTimeout(() => {
      this.isProgrammaticChange = false;
    }, 0);
  }

  getSelectedSequenceName(): string {
    return this.sequenceSelector.value;
  }
}
