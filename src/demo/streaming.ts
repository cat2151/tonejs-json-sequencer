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

    // Debug checkbox change
    document.getElementById('debugCheckbox')?.addEventListener('change', (e) => {
      (window as any).DEBUG_TIMING = (e.target as HTMLInputElement).checked;
    });

    // Textarea change (live editing)
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    textarea.addEventListener('input', () => {
      this.onSequenceEdit();
      this.visualizeTimeline();
    });
    
    // Initial timeline visualization
    this.visualizeTimeline();
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
      this.visualizeTimeline();
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

  private visualizeTimeline(): void {
    try {
      const ndjson = this.getNDJSONFromTextarea();
      const lines = ndjson.split('\n').filter(line => line.trim());
      const events: SequenceEvent[] = [];

      // Parse events
      for (const line of lines) {
        try {
          events.push(JSON.parse(line) as SequenceEvent);
        } catch (e) {
          // Skip invalid JSON
        }
      }

      // Extract timing information
      const timelineEvents: Array<{note: string, duration: number, startTime: number}> = [];
      
      for (const event of events) {
        if (event.eventType === 'triggerAttackRelease' && 'args' in event && Array.isArray(event.args) && event.args.length >= 3) {
          const note = event.args[0];
          const durationStr = event.args[1];
          const timeStr = event.args[2];

          // Parse duration
          const duration = this.parseTimeString(durationStr);
          // Parse start time
          const startTime = this.parseTimeString(timeStr);

          timelineEvents.push({ note, duration, startTime });
        }
      }

      // Draw timeline
      const canvas = document.getElementById('timeline') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timelineEvents.length === 0) {
        ctx.fillStyle = '#999';
        ctx.font = '14px sans-serif';
        ctx.fillText('No events to visualize', 10, canvas.height / 2);
        return;
      }

      // Calculate max time for scaling
      const maxTime = Math.max(...timelineEvents.map(e => e.startTime + e.duration));
      const timeScale = maxTime > 0 ? (canvas.width - 40) / maxTime : 1;

      // Draw events
      timelineEvents.forEach((event, index) => {
        const x = 20 + event.startTime * timeScale;
        const width = Math.max(event.duration * timeScale, 2);
        const y = 40 + (index % 5) * 30;
        const height = 20;

        // Draw event rectangle
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(x, y, width, height);

        // Draw event border
        ctx.strokeStyle = '#2E7D32';
        ctx.strokeRect(x, y, width, height);

        // Draw note label
        ctx.fillStyle = '#fff';
        ctx.font = '12px sans-serif';
        ctx.fillText(event.note, x + 2, y + 14);
      });

      // Draw time markers
      ctx.strokeStyle = '#ccc';
      ctx.fillStyle = '#666';
      ctx.font = '10px sans-serif';
      for (let t = 0; t <= maxTime; t += 0.1) {
        const x = 20 + t * timeScale;
        if (x > canvas.width - 20) break;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        ctx.fillText(t.toFixed(1) + 's', x + 2, 12);
      }

      // Update info text
      const infoElement = document.getElementById('timelineInfo');
      if (infoElement) {
        const infoText = timelineEvents.map((e, i) => 
          `Event ${i + 1}: ${e.note} starts at ${e.startTime.toFixed(3)}s, lasts ${e.duration.toFixed(3)}s`
        ).join('<br>');
        infoElement.innerHTML = infoText;
      }
    } catch (error) {
      console.error('Error visualizing timeline:', error);
    }
  }

  private parseTimeString(timeStr: string): number {
    // Simple tick notation parser (matches ndjson-streaming.ts logic)
    const ticksPerQuarter = 480;
    const beatsPerMinute = 120;
    const secondsPerBeat = 60 / beatsPerMinute;

    // Remove '+' prefix if present
    const cleanStr = timeStr.startsWith('+') ? timeStr.substring(1) : timeStr;

    // Parse tick notation
    const match = cleanStr.match(/^(\d+(?:\.\d+)?)(i)?$/);
    if (match) {
      const value = parseFloat(match[1]);
      return (value / ticksPerQuarter) * secondsPerBeat;
    }

    return 0;
  }
}

// Initialize demo when page loads
window.addEventListener('load', () => {
  new StreamingDemo();
});
