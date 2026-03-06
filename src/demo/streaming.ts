// Tone.js JSON Sequencer - NDJSON Streaming Demo
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer, parseNDJSON, type EventScheduledInfo } from '../../dist/index.mjs';
import { PlaybackViewer } from './streaming-modules/playback-viewer.js';
import { DebugOutput } from './streaming-modules/debug-output.js';

class StreamingDemo {
  private player: NDJSONStreamingPlayer | null = null;
  private nodes = new SequencerNodes();
  private sequences = loadAllSequences();
  private debounceTimer: number | null = null;
  private updateMode: 'manual' | 'debounce' = 'debounce';
  private readonly DEBOUNCE_DELAY_MS = 1000;
  private eventLineMap: number[] = [];
  private currentLineIndicator: HTMLElement | null = null;
  private numberedNDJSONTextarea: HTMLTextAreaElement | null = null;
  private playbackLoopEnabled = false;
  private playbackViewer: PlaybackViewer = new PlaybackViewer('playbackTrackContainer');
  private debugOutput: DebugOutput = new DebugOutput(100);

  constructor() {
    this.initializeUI();
    this.initializeCollapsibleSections();
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

    // Sequence selector change - immediately play the selected sequence for easier debugging
    selector.addEventListener('change', async () => {
      // Stop current playback if any, then load and play the new sequence
      if (this.player && this.player.playing) {
        this.stop();
      }
      this.loadSelectedSequence();
      // Auto-play when selecting a new sequence for easier debugging
      try {
        await this.play();
      } catch (error) {
        console.error('Error during auto-play:', error);
      }
    });

    // Loop checkbox change
    const loopCheckboxElement = document.getElementById('loopCheckbox') as HTMLInputElement | null;
    loopCheckboxElement?.addEventListener('change', () => {
      this.playbackLoopEnabled = loopCheckboxElement.checked;
      // If playing, restart with new loop setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });
    this.playbackLoopEnabled = loopCheckboxElement?.checked ?? false;

    // Debug checkbox change
    document.getElementById('debugCheckbox')?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked;
      const debugOutput = document.getElementById('debugOutput');
      const timingVisualization = document.getElementById('timingVisualization');
      if (debugOutput) {
        debugOutput.style.display = enabled ? 'block' : 'none';
      }
      if (timingVisualization) {
        timingVisualization.style.display = enabled ? 'block' : 'none';
      }
      if (!enabled) {
        this.debugOutput.clear();
      }
      // If playing, restart with new debug setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });

    // Clear debug button
    document.getElementById('clearDebugButton')?.addEventListener('click', () => {
      this.debugOutput.clear();
    });

    // Update mode radio buttons
    document.getElementById('updateModeManual')?.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
        this.updateMode = 'manual';
        // Clear any pending debounce timer when switching to manual mode
        this.clearDebounceTimer();
      }
    });

    document.getElementById('updateModeDebounce')?.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
        this.updateMode = 'debounce';
      }
    });

    // Textarea change (live editing)
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    this.currentLineIndicator = document.getElementById('currentLineIndicator');
    this.numberedNDJSONTextarea = document.getElementById('sequenceEditorDebug') as HTMLTextAreaElement | null;
    this.updateCurrentLineIndicator(null);
    this.syncHighlightLines();
    
    // Input event handler for debounce mode
    textarea.addEventListener('input', () => {
      this.syncHighlightLines();
      if (this.updateMode === 'debounce') {
        this.onSequenceEditDebounced();
      }
    });

    // Keyboard shortcuts for manual mode (CTRL+S and SHIFT+ENTER)
    textarea.addEventListener('keydown', (e) => {
      if (this.updateMode === 'manual') {
        // CTRL+S (prevent default save behavior)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault();
          this.onSequenceEdit();
        }
        // SHIFT+ENTER
        else if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          this.onSequenceEdit();
        }
      }
    });
  }

  private initializeCollapsibleSections(): void {
    // About button
    const aboutButton = document.getElementById('aboutButton');
    const aboutContent = document.getElementById('aboutContent');
    aboutButton?.addEventListener('click', () => {
      if (aboutContent && aboutButton) {
        const isExpanded = aboutContent.classList.toggle('active');
        aboutButton.setAttribute('aria-expanded', String(isExpanded));
      }
    });

    // Usage button
    const usageButton = document.getElementById('usageButton');
    const usageContent = document.getElementById('usageContent');
    usageButton?.addEventListener('click', () => {
      if (usageContent && usageButton) {
        const isExpanded = usageContent.classList.toggle('active');
        usageButton.setAttribute('aria-expanded', String(isExpanded));
      }
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
      this.eventLineMap = this.buildEventLineMap(ndjson);
      this.syncHighlightLines(ndjson);
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
      this.playbackLoopEnabled = loop;
      
      const debugCheckbox = document.getElementById('debugCheckbox') as HTMLInputElement;
      const debug = debugCheckbox.checked;

      // Loop wait is fixed to 0 seconds
      const loopWaitSeconds = 0;

      // Create player only if it doesn't exist or isn't playing
      if (!this.player || !this.player.playing) {
        // Dispose old nodes and create fresh instance
        this.nodes.disposeAll();
        this.nodes = new SequencerNodes();
        
        this.player = new NDJSONStreamingPlayer(Tone, this.nodes, {
          lookaheadMs: 50,
          loop: loop,
          loopWaitSeconds: loopWaitSeconds,
          debug: debug,
          onDebug: (message: string, data?: any) => this.debugOutput.handleMessage(message, data),
          onEventScheduled: (info: EventScheduledInfo) => this.handleEventScheduled(info),
          onLoopComplete: () => {
            this.updateStatus('再生中（ループ）');
          }
        });
      }

      // Get NDJSON from textarea
      const ndjson = this.getNDJSONFromTextarea();
      this.eventLineMap = this.buildEventLineMap(ndjson);
      this.syncHighlightLines(ndjson);
      const events = parseNDJSON(ndjson);

      // Start playback
      await this.player.start(events);
      // Rebuild viewer after player.start() so time values (e.g. ticks→seconds) use the
      // BPM that was applied by the sequence's "set" event, not the pre-play default BPM.
      this.syncHighlightLines(ndjson);
      this.playbackViewer.startPositionUpdates(loop, loopWaitSeconds);
      
      this.updateStatus(loop ? '再生中（ループ有効）' : '再生中');
      
      // Disable play button, enable stop button
      (document.getElementById('playButton') as HTMLButtonElement).disabled = true;
      (document.getElementById('stopButton') as HTMLButtonElement).disabled = false;
    } catch (error) {
      console.error('Error during playback:', error);
      this.updateStatus('エラー: ' + (error as Error).message);
      alert('再生の開始に失敗しました。詳細はコンソールを確認してください。');
    }
  }

  private stop(): void {
    if (this.player) {
      this.player.stop();
      this.player = null;
    }

    this.playbackViewer.stopPositionUpdates();
    
    // Clear any pending debounce timer
    this.clearDebounceTimer();
    
    // Dispose all nodes on stop
    this.nodes.disposeAll();
    
    this.updateStatus('停止中');
    this.updateCurrentLineIndicator(null);
    
    // Enable play button, disable stop button
    (document.getElementById('playButton') as HTMLButtonElement).disabled = false;
    (document.getElementById('stopButton') as HTMLButtonElement).disabled = true;
  }

  private onSequenceEdit(): void {
    // If playing, update the sequence in real-time
    if (this.player && this.player.playing) {
      try {
        const ndjson = this.getNDJSONFromTextarea();
        this.eventLineMap = this.buildEventLineMap(ndjson);
        this.syncHighlightLines(ndjson);
        const events = parseNDJSON(ndjson);
        this.player.start(events);
        this.updateStatus('再生中（ライブ編集）');
      } catch (error) {
        console.error('Error updating sequence:', error);
        // Don't stop playback on edit errors
      }
    }
  }

  private onSequenceEditDebounced(): void {
    // Clear existing timer
    this.clearDebounceTimer();

    // Set new timer for debounce
    this.debounceTimer = window.setTimeout(() => {
      this.onSequenceEdit();
      this.debounceTimer = null;
    }, this.DEBOUNCE_DELAY_MS);
  }

  private clearDebounceTimer(): void {
    if (this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  private buildEventLineMap(ndjson: string): number[] {
    const lines = ndjson.split('\n');
    const map: number[] = [];
    let eventIndex = 0;
    
    lines.forEach((line, index) => {
      if (line.trim().length === 0) {
        return;
      }
      map[eventIndex] = index;
      eventIndex++;
    });

    return map;
  }

  private syncHighlightLines(ndjson?: string): void {
    const source = ndjson ?? this.getNDJSONFromTextarea();
    this.updateNumberedNDJSON(source);
    this.playbackViewer.rebuild(source);
  }

  private updateNumberedNDJSON(ndjson?: string): void {
    if (!this.numberedNDJSONTextarea) {
      return;
    }

    const source = ndjson ?? this.getNDJSONFromTextarea();
    const lines = source.split('\n');
    const padding = Math.max(1, lines.length.toString().length);
    const numbered = lines
      .map((line, index) => `${String(index + 1).padStart(padding, ' ')}: ${line}`)
      .join('\n');

    this.numberedNDJSONTextarea.value = numbered;
  }

  private updateCurrentLineIndicator(lineIndex: number | null): void {
    if (!this.currentLineIndicator) {
      return;
    }

    this.currentLineIndicator.textContent = lineIndex === null
      ? '現在の演奏行: -'
      : `現在の演奏行: ${lineIndex + 1}`;
  }

  private updateCurrentLineFromEvent(eventIndex: number): void {
    const lineIndex = this.eventLineMap[eventIndex];
    this.updateCurrentLineIndicator(lineIndex ?? null);
  }

  private handleEventScheduled(info: EventScheduledInfo): void {
    this.updateCurrentLineFromEvent(info.eventIndex);
    this.playbackViewer.flashEvent(info);
  }

  private updateStatus(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `ステータス: ${status}`;
    }
  }
}

// Initialize demo when page loads
window.addEventListener('load', () => {
  new StreamingDemo();
});
