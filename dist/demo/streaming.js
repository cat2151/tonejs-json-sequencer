import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer, parseNDJSON } from '../../dist/index.mjs';
import { PlaybackViewer } from './streaming-modules/playback-viewer.js';
import { DebugOutput } from './streaming-modules/debug-output.js';
class StreamingDemo {
    constructor() {
        this.player = null;
        this.nodes = new SequencerNodes();
        this.sequences = loadAllSequences();
        this.debounceTimer = null;
        this.updateMode = 'debounce';
        this.DEBOUNCE_DELAY_MS = 1000;
        this.eventLineMap = [];
        this.currentLineIndicator = null;
        this.numberedNDJSONTextarea = null;
        this.playbackLoopEnabled = false;
        this.playbackViewer = new PlaybackViewer('playbackTrackContainer');
        this.debugOutput = new DebugOutput(100);
        this.initializeUI();
        this.initializeCollapsibleSections();
        this.loadInitialSequence();
    }
    initializeUI() {
        // Populate sequence selector
        const selector = document.getElementById('sequenceSelector');
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
            }
            catch (error) {
                console.error('Error during auto-play:', error);
            }
        });
        // Loop checkbox change
        const loopCheckboxElement = document.getElementById('loopCheckbox');
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
            const enabled = e.target.checked;
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
            if (e.target.checked) {
                this.updateMode = 'manual';
                // Clear any pending debounce timer when switching to manual mode
                this.clearDebounceTimer();
            }
        });
        document.getElementById('updateModeDebounce')?.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.updateMode = 'debounce';
            }
        });
        // Textarea change (live editing)
        const textarea = document.getElementById('sequenceEditor');
        this.currentLineIndicator = document.getElementById('currentLineIndicator');
        this.numberedNDJSONTextarea = document.getElementById('sequenceEditorDebug');
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
    initializeCollapsibleSections() {
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
    loadInitialSequence() {
        if (this.sequences.length > 0) {
            this.loadSelectedSequence();
        }
    }
    loadSelectedSequence() {
        const selector = document.getElementById('sequenceSelector');
        const index = parseInt(selector.value);
        const sequence = this.sequences[index];
        if (sequence) {
            const ndjson = this.sequenceToNDJSON(sequence.data);
            const textarea = document.getElementById('sequenceEditor');
            textarea.value = ndjson;
            this.eventLineMap = this.buildEventLineMap(ndjson);
            this.syncHighlightLines(ndjson);
        }
    }
    sequenceToNDJSON(sequence) {
        return sequence.map(event => JSON.stringify(event)).join('\n');
    }
    getNDJSONFromTextarea() {
        const textarea = document.getElementById('sequenceEditor');
        return textarea.value;
    }
    async play() {
        try {
            // Ensure audio context is started
            await Tone.start();
            const loopCheckbox = document.getElementById('loopCheckbox');
            const loop = loopCheckbox.checked;
            this.playbackLoopEnabled = loop;
            const debugCheckbox = document.getElementById('debugCheckbox');
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
                    onDebug: (message, data) => this.debugOutput.handleMessage(message, data),
                    onEventScheduled: (info) => this.handleEventScheduled(info),
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
            document.getElementById('playButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
        }
        catch (error) {
            console.error('Error during playback:', error);
            this.updateStatus('エラー: ' + error.message);
            alert('再生の開始に失敗しました。詳細はコンソールを確認してください。');
        }
    }
    stop() {
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
        document.getElementById('playButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
    onSequenceEdit() {
        // If playing, update the sequence in real-time
        if (this.player && this.player.playing) {
            try {
                const ndjson = this.getNDJSONFromTextarea();
                this.eventLineMap = this.buildEventLineMap(ndjson);
                this.syncHighlightLines(ndjson);
                const events = parseNDJSON(ndjson);
                this.player.start(events);
                this.updateStatus('再生中（ライブ編集）');
            }
            catch (error) {
                console.error('Error updating sequence:', error);
                // Don't stop playback on edit errors
            }
        }
    }
    onSequenceEditDebounced() {
        // Clear existing timer
        this.clearDebounceTimer();
        // Set new timer for debounce
        this.debounceTimer = window.setTimeout(() => {
            this.onSequenceEdit();
            this.debounceTimer = null;
        }, this.DEBOUNCE_DELAY_MS);
    }
    clearDebounceTimer() {
        if (this.debounceTimer !== null) {
            window.clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
    }
    buildEventLineMap(ndjson) {
        const lines = ndjson.split('\n');
        const map = [];
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
    syncHighlightLines(ndjson) {
        const source = ndjson ?? this.getNDJSONFromTextarea();
        this.updateNumberedNDJSON(source);
        this.playbackViewer.rebuild(source);
    }
    updateNumberedNDJSON(ndjson) {
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
    updateCurrentLineIndicator(lineIndex) {
        if (!this.currentLineIndicator) {
            return;
        }
        this.currentLineIndicator.textContent = lineIndex === null
            ? '現在の演奏行: -'
            : `現在の演奏行: ${lineIndex + 1}`;
    }
    updateCurrentLineFromEvent(eventIndex) {
        const lineIndex = this.eventLineMap[eventIndex];
        this.updateCurrentLineIndicator(lineIndex ?? null);
    }
    handleEventScheduled(info) {
        this.updateCurrentLineFromEvent(info.eventIndex);
        this.playbackViewer.flashEvent(info);
    }
    updateStatus(status) {
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
