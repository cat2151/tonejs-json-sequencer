// Tone.js JSON Sequencer - NDJSON Streaming Demo
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer } from '../../dist/index.mjs';

class StreamingDemo {
  private player: NDJSONStreamingPlayer | null = null;
  private nodes = new SequencerNodes();
  private sequences = loadAllSequences();

  constructor() {
    this.initializeUI();
    this.loadInitialSequence();
  }

  private initializeUI(): void {
    // Populate sequence selector
    const selector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    this.sequences.forEach((seq, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = seq.name;
      selector.appendChild(option);
    });

    // Play button
    document.getElementById('playButton')?.addEventListener('click', () => {
      this.play();
    });

    // Stop button
    document.getElementById('stopButton')?.addEventListener('click', () => {
      this.stop();
    });

    // Sequence selector change
    selector.addEventListener('change', () => {
      this.loadSelectedSequence();
    });

    // Loop checkbox change
    document.getElementById('loopCheckbox')?.addEventListener('change', () => {
      // If playing, restart with new loop setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });

    // Textarea change (live editing)
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    textarea.addEventListener('input', () => {
      this.onSequenceEdit();
    });
  }

  private loadInitialSequence(): void {
    if (this.sequences.length > 0) {
      this.loadSelectedSequence();
    }
  }

  private loadSelectedSequence(): void {
    const selector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    const index = parseInt(selector.value);
    const sequence = this.sequences[index];

    if (sequence) {
      const ndjson = this.sequenceToNDJSON(sequence.data);
      const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
      textarea.value = ndjson;
    }
  }

  private sequenceToNDJSON(sequence: SequenceEvent[]): string {
    return sequence.map(event => JSON.stringify(event)).join('\n');
  }

  private getNDJSONFromTextarea(): string {
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    return textarea.value;
  }

  private async play(): Promise<void> {
    try {
      // Ensure audio context is started
      await Tone.start();

      const loopCheckbox = document.getElementById('loopCheckbox') as HTMLInputElement;
      const loop = loopCheckbox.checked;

      // Create player only if it doesn't exist or isn't playing
      if (!this.player || !this.player.playing) {
        // Dispose old nodes and create fresh instance
        this.nodes.disposeAll();
        this.nodes = new SequencerNodes();
        
        this.player = new NDJSONStreamingPlayer(Tone, this.nodes, {
          lookaheadMs: 50,
          loop: loop,
          onLoopComplete: () => {
            this.updateStatus('Playing (looped)');
          }
        });
      }

      // Get NDJSON from textarea
      const ndjson = this.getNDJSONFromTextarea();

      // Start playback
      await this.player.start(ndjson);
      
      this.updateStatus(loop ? 'Playing (loop enabled)' : 'Playing');
      
      // Disable play button, enable stop button
      (document.getElementById('playButton') as HTMLButtonElement).disabled = true;
      (document.getElementById('stopButton') as HTMLButtonElement).disabled = false;
    } catch (error) {
      console.error('Error during playback:', error);
      this.updateStatus('Error: ' + (error as Error).message);
      alert('Failed to start playback. Please check the console for details.');
    }
  }

  private stop(): void {
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    
    // Dispose all nodes on stop
    this.nodes.disposeAll();
    
    this.updateStatus('Stopped');
    
    // Enable play button, disable stop button
    (document.getElementById('playButton') as HTMLButtonElement).disabled = false;
    (document.getElementById('stopButton') as HTMLButtonElement).disabled = true;
  }

  private onSequenceEdit(): void {
    // If playing, update the sequence in real-time
    if (this.player && this.player.playing) {
      try {
        const ndjson = this.getNDJSONFromTextarea();
        this.player.start(ndjson);
        this.updateStatus('Playing (live editing)');
      } catch (error) {
        console.error('Error updating sequence:', error);
        // Don't stop playback on edit errors
      }
    }
  }

  private updateStatus(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `Status: ${status}`;
    }
  }
}

// Initialize demo when page loads
window.addEventListener('load', () => {
  new StreamingDemo();
});
