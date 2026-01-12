// Tone.js JSON Sequencer Main Script
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences, type SequenceDefinition } from './sequenceLoader.js';
import { UIManager } from './modules/uiManager.js';
import { AudioManager } from './modules/audioManager.js';

interface SequenceDataCollection {
  [key: string]: SequenceEvent[];
}

class DemoApp {
  private sequenceDataCollection: SequenceDataCollection = {};
  private sequences: SequenceDefinition[] = [];
  private uiManager: UIManager;
  private audioManager: AudioManager;

  constructor() {
    this.audioManager = new AudioManager();
    this.uiManager = new UIManager(
      () => this.playWithAudioContext(),
      (name) => this.updateTextareaWithSelectedSequence(name)
    );
  }

  async initialize(): Promise<void> {
    this.sequences = loadAllSequences();
    this.initializeSequenceDataCollection();
    this.uiManager.populateSequenceSelector(this.sequences);
    this.updateTextareaWithSelectedSequence();
  }

  private initializeSequenceDataCollection(): void {
    this.sequences.forEach(seq => {
      this.sequenceDataCollection[seq.name] = seq.data;
    });
  }

  private updateTextareaWithSelectedSequence(selectedSequenceName?: string): void {
    // If no sequences are loaded, there is nothing to display or play.
    if (this.sequences.length === 0) {
      return;
    }
    
    const sequenceName = selectedSequenceName || 
                         this.uiManager.getSelectedSequenceName() || 
                         this.sequences[0].name;
    const selectedSequenceData = this.sequenceDataCollection[sequenceName];

    this.uiManager.setTextareaValue(JSON.stringify(selectedSequenceData, null, 2));
    this.playWithAudioContext();
  }

  private async playWithAudioContext(): Promise<void> {
    try {
      await this.audioManager.ensureAudioContextStarted();
      await this.play();
    } catch (error: any) {
      console.log("playWithAudioContext error:", error.name, error.message);
      // If audio context couldn't start, try playing anyway
      if (error.name !== 'InvalidAccessError') {
        try {
          await this.play();
        } catch (playError: any) {
          console.log("play error:", playError.name, playError.message);
        }
      }
    }
  }

  private async play(): Promise<void> {
    const json = this.uiManager.getTextareaValue();
    
    let sequence: SequenceEvent[];
    try {
      sequence = JSON.parse(json) as SequenceEvent[];
    } catch (error: any) {
      console.error('Invalid JSON in sequence editor:', error);
      alert('Invalid JSON in sequence editor. Please fix the JSON syntax and try again.');
      return;
    }
    
    await this.audioManager.playSequence(sequence);
  }
}

// Initialize app when page loads
window.addEventListener("load", async () => {
  const app = new DemoApp();
  await app.initialize();
});
