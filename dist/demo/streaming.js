import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer } from '../../dist/index.mjs';
class StreamingDemo {
    constructor() {
        this.player = null;
        this.nodes = new SequencerNodes();
        this.sequences = loadAllSequences();
        this.debugMessages = [];
        this.maxDebugMessages = 100;
        this.debounceTimer = null;
        this.updateMode = 'debounce';
        this.DEBOUNCE_DELAY_MS = 1000;
        this.timingStats = {
            totalEvents: 0,
            onTimeEvents: 0,
            lateEvents: 0,
            earlyEvents: 0,
            loopCount: 0,
            lastLoopStatus: 'N/A',
            lastLoopDriftMs: 0
        };
        this.initializeUI();
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
        document.getElementById('loopCheckbox')?.addEventListener('change', () => {
            // If playing, restart with new loop setting
            if (this.player && this.player.playing) {
                this.stop();
                this.play();
            }
        });
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
        // Input event handler for debounce mode
        textarea.addEventListener('input', () => {
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
                    onDebug: (message, data) => this.handleDebugMessage(message, data),
                    onLoopComplete: () => {
                        this.updateStatus('再生中（ループ）');
                    }
                });
            }
            // Get NDJSON from textarea
            const ndjson = this.getNDJSONFromTextarea();
            // Start playback
            await this.player.start(ndjson);
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
        // Clear any pending debounce timer
        this.clearDebounceTimer();
        // Dispose all nodes on stop
        this.nodes.disposeAll();
        this.updateStatus('停止中');
        // Enable play button, disable stop button
        document.getElementById('playButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
    onSequenceEdit() {
        // If playing, update the sequence in real-time
        if (this.player && this.player.playing) {
            try {
                const ndjson = this.getNDJSONFromTextarea();
                this.player.start(ndjson);
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
    updateStatus(status) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = `ステータス: ${status}`;
        }
    }
    handleDebugMessage(message, data) {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        let debugLine = `[${timestamp}] ${message}`;
        if (data !== undefined && data !== null && data !== '') {
            if (typeof data === 'object') {
                debugLine += ': ' + JSON.stringify(data);
            }
            else {
                debugLine += ': ' + data;
            }
        }
        // Parse timing information from debug messages
        if (message.includes('⚪') || message.includes('🔴') || message.includes('🟢')) {
            // Event scheduling message
            this.timingStats.totalEvents++;
            if (message.includes('⚪')) {
                this.timingStats.onTimeEvents++;
            }
            else if (message.includes('🔴')) {
                this.timingStats.lateEvents++;
            }
            else if (message.includes('🟢')) {
                this.timingStats.earlyEvents++;
            }
        }
        else if (message.includes('🔄') && message.includes('Loop')) {
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
        }
        else if (message.includes('🎵') && message.includes('Initializing')) {
            // Reset stats on playback initialization
            this.timingStats = {
                totalEvents: 0,
                onTimeEvents: 0,
                lateEvents: 0,
                earlyEvents: 0,
                loopCount: 0,
                lastLoopStatus: 'N/A',
                lastLoopDriftMs: 0
            };
        }
        this.debugMessages.push(debugLine);
        // Keep only the last N messages
        if (this.debugMessages.length > this.maxDebugMessages) {
            this.debugMessages.shift();
        }
        this.updateDebugOutput();
        this.updateTimingVisualization();
    }
    updateDebugOutput() {
        const debugOutput = document.getElementById('debugOutput');
        if (debugOutput) {
            debugOutput.textContent = this.debugMessages.join('\n');
            // Auto-scroll to bottom
            debugOutput.scrollTop = debugOutput.scrollHeight;
        }
    }
    updateTimingVisualization() {
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
            const driftDisplay = this.timingStats.lastLoopDriftMs !== 0
                ? `${this.timingStats.lastLoopDriftMs > 0 ? '+' : ''}${this.timingStats.lastLoopDriftMs}ms`
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
    clearDebugOutput() {
        this.debugMessages = [];
        this.timingStats = {
            totalEvents: 0,
            onTimeEvents: 0,
            lateEvents: 0,
            earlyEvents: 0,
            loopCount: 0,
            lastLoopStatus: 'N/A',
            lastLoopDriftMs: 0
        };
        this.updateDebugOutput();
        this.updateTimingVisualization();
    }
}
// Initialize demo when page loads
window.addEventListener('load', () => {
    new StreamingDemo();
});
