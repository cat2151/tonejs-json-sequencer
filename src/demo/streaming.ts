// Tone.js JSON Sequencer - NDJSON Streaming Demo
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer, parseNDJSON } from '../../dist/index.mjs';

class StreamingDemo {
  private player: NDJSONStreamingPlayer | null = null;
  private nodes = new SequencerNodes();
  private sequences = loadAllSequences();
  private debugMessages: string[] = [];
  private maxDebugMessages = 100;
  private debounceTimer: number | null = null;
  private updateMode: 'manual' | 'debounce' = 'debounce';
  private readonly DEBOUNCE_DELAY_MS = 1000;
  private timingStats = this.createInitialTimingStats();
  private lineHighlightContainer: HTMLDivElement | null = null;
  private lineHighlightElements: HTMLDivElement[] = [];
  private lineHighlightTimers: Map<number, number> = new Map();
  private eventLineMap: number[] = [];
  private readonly LINE_HIGHLIGHT_DURATION_MS = 200;

  constructor() {
    this.initializeUI();
    this.initializeCollapsibleSections();
    this.loadInitialSequence();
  }

  private createInitialTimingStats() {
    return {
      totalEvents: 0,
      onTimeEvents: 0,
      lateEvents: 0,
      earlyEvents: 0,
      loopCount: 0,
      lastLoopStatus: 'N/A',
      lastLoopDriftMs: null as number | null
    };
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
    document.getElementById('loopCheckbox')?.addEventListener('change', () => {
      // If playing, restart with new loop setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });

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
        this.clearDebugOutput();
      }
      // If playing, restart with new debug setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });

    // Clear debug button
    document.getElementById('clearDebugButton')?.addEventListener('click', () => {
      this.clearDebugOutput();
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
    this.lineHighlightContainer = document.getElementById('sequenceHighlightOverlay') as HTMLDivElement | null;
    this.syncHighlightLines();
    
    // Input event handler for debounce mode
    textarea.addEventListener('input', () => {
      this.syncHighlightLines();
      if (this.updateMode === 'debounce') {
        this.onSequenceEditDebounced();
      }
    });
    textarea.addEventListener('scroll', () => this.syncOverlayScroll(textarea));

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
      this.syncOverlayScroll(textarea);
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
          onDebug: (message: string, data?: any) => this.handleDebugMessage(message, data),
          onEventScheduled: (info: { eventIndex: number }) => this.handleEventScheduled(info),
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
    
    // Clear any pending debounce timer
    this.clearDebounceTimer();
    
    // Clear highlights
    this.resetLineHighlights();
    
    // Dispose all nodes on stop
    this.nodes.disposeAll();
    
    this.updateStatus('停止中');
    
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
    if (!this.lineHighlightContainer) {
      return;
    }

    this.resetLineHighlights();

    const source = ndjson ?? this.getNDJSONFromTextarea();
    const lines = source.split('\n');
    this.lineHighlightContainer.innerHTML = '';
    this.lineHighlightElements = lines.map(() => {
      const lineEl = document.createElement('div');
      lineEl.className = 'sequence-line-highlight';
      lineEl.textContent = '\u00A0';
      this.lineHighlightContainer!.appendChild(lineEl);
      return lineEl;
    });

    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement | null;
    if (textarea) {
      this.syncOverlayScroll(textarea);
    }
  }

  private syncOverlayScroll(textarea: HTMLTextAreaElement): void {
    if (this.lineHighlightContainer) {
      this.lineHighlightContainer.style.transform = `translateY(-${textarea.scrollTop}px)`;
    }
  }

  private highlightEventLine(eventIndex: number): void {
    const lineIndex = this.eventLineMap[eventIndex];
    if (lineIndex === undefined) {
      return;
    }

    const lineElement = this.lineHighlightElements[lineIndex];
    if (!lineElement) {
      return;
    }

    lineElement.classList.add('active');
    const existingTimer = this.lineHighlightTimers.get(lineIndex);
    if (existingTimer !== undefined) {
      window.clearTimeout(existingTimer);
    }

    const timerId = window.setTimeout(() => {
      lineElement.classList.remove('active');
      this.lineHighlightTimers.delete(lineIndex);
    }, this.LINE_HIGHLIGHT_DURATION_MS);

    this.lineHighlightTimers.set(lineIndex, timerId);
  }

  private resetLineHighlights(): void {
    this.lineHighlightElements.forEach(el => el.classList.remove('active'));
    this.lineHighlightElements = [];
    this.clearLineHighlightTimers();
  }

  private clearLineHighlightTimers(): void {
    this.lineHighlightTimers.forEach(timerId => window.clearTimeout(timerId));
    this.lineHighlightTimers.clear();
  }

  private handleEventScheduled(info: { eventIndex: number }): void {
    this.highlightEventLine(info.eventIndex);
  }

  private updateStatus(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `ステータス: ${status}`;
    }
  }

  private handleDebugMessage(message: string, data?: any): void {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    let debugLine = `[${timestamp}] ${message}`;
    
    if (data !== undefined && data !== null && data !== '') {
      if (typeof data === 'object') {
        debugLine += ': ' + JSON.stringify(data);
      } else {
        debugLine += ': ' + data;
      }
    }

    // Parse timing information from debug messages
    if (message.includes('⚪') || message.includes('🔴') || message.includes('🟢')) {
      // Event scheduling message
      this.timingStats.totalEvents++;
      if (message.includes('⚪')) {
        this.timingStats.onTimeEvents++;
      } else if (message.includes('🔴')) {
        this.timingStats.lateEvents++;
      } else if (message.includes('🟢')) {
        this.timingStats.earlyEvents++;
      }
    } else if (message.includes('🔄') && message.includes('Loop')) {
      // Loop completion message
      if (data && typeof data === 'object') {
        this.timingStats.loopCount = data.currentLoop || 0;
        if (data.timingStatus) {
          this.timingStats.lastLoopStatus = data.timingStatus;
        }
        if (data.loopTimingDriftMs !== undefined) {
          this.timingStats.lastLoopDriftMs = parseFloat(data.loopTimingDriftMs);
        }
      }
    } else if (message.includes('🎵') && message.includes('Initializing')) {
      // Reset stats on playback initialization
      this.timingStats = this.createInitialTimingStats();
    }

    this.debugMessages.push(debugLine);
    
    // Keep only the last N messages
    if (this.debugMessages.length > this.maxDebugMessages) {
      this.debugMessages.shift();
    }

    this.updateDebugOutput();
    this.updateTimingVisualization();
  }

  private updateDebugOutput(): void {
    const debugOutput = document.getElementById('debugOutput');
    if (debugOutput) {
      debugOutput.textContent = this.debugMessages.join('\n');
      // Auto-scroll to bottom
      debugOutput.scrollTop = debugOutput.scrollHeight;
    }
  }

  private updateTimingVisualization(): void {
    const eventSchedulingStats = document.getElementById('eventSchedulingStats');
    const loopTimingStats = document.getElementById('loopTimingStats');
    
    if (eventSchedulingStats) {
      const total = this.timingStats.totalEvents;
      const onTime = this.timingStats.onTimeEvents;
      const late = this.timingStats.lateEvents;
      const early = this.timingStats.earlyEvents;
      
      const onTimePercent = total > 0 ? ((onTime / total) * 100).toFixed(1) : '0.0';
      const latePercent = total > 0 ? ((late / total) * 100).toFixed(1) : '0.0';
      const earlyPercent = total > 0 ? ((early / total) * 100).toFixed(1) : '0.0';
      
      eventSchedulingStats.innerHTML = `
        <div>総イベント数: ${total}</div>
        <div style="margin-top: 5px;">
          <div>⚪ 正常: ${onTime} (${onTimePercent}%)</div>
          <div>🔴 遅延: ${late} (${latePercent}%)</div>
          <div>🟢 早い: ${early} (${earlyPercent}%)</div>
        </div>
      `;
    }
    
    if (loopTimingStats) {
      const driftDisplay = this.timingStats.lastLoopDriftMs !== null
        ? `${this.timingStats.lastLoopDriftMs > 0 ? '+' : ''}${this.timingStats.lastLoopDriftMs.toFixed(2)}ms`
        : '-';
      
      loopTimingStats.innerHTML = `
        <div>ループ回数: ${this.timingStats.loopCount}</div>
        <div style="margin-top: 5px;">
          <div>ステータス: ${this.timingStats.lastLoopStatus}</div>
          <div>タイミングずれ: ${driftDisplay}</div>
        </div>
      `;
    }
  }

  private clearDebugOutput(): void {
    this.debugMessages = [];
    this.timingStats = this.createInitialTimingStats();
    this.updateDebugOutput();
    this.updateTimingVisualization();
  }
}

// Initialize demo when page loads
window.addEventListener('load', () => {
  new StreamingDemo();
});
