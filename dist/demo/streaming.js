import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer, parseNDJSON } from '../../dist/index.mjs';
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
        this.timingStats = this.createInitialTimingStats();
        this.eventLineMap = [];
        this.currentLineIndicator = null;
        this.numberedNDJSONTextarea = null;
        this.playbackTrackContainer = null;
        this.playbackTrackLines = new Map();
        this.playbackTrackBodies = new Map();
        this.playbackDurationSeconds = 0;
        this.playbackLoopEnabled = false;
        this.playbackLoopWaitSeconds = 0;
        this.playbackStartTime = null;
        this.playbackAnimationFrameId = null;
        this.EVENT_FLASH_DURATION_MS = 200;
        this.PLAYBACK_LOOKAHEAD_SECONDS = 0.05;
        this.initializeUI();
        this.initializeCollapsibleSections();
        this.loadInitialSequence();
    }
    createInitialTimingStats() {
        return {
            totalEvents: 0,
            onTimeEvents: 0,
            lateEvents: 0,
            earlyEvents: 0,
            loopCount: 0,
            lastLoopStatus: 'N/A',
            lastLoopDriftMs: null
        };
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
        this.currentLineIndicator = document.getElementById('currentLineIndicator');
        this.numberedNDJSONTextarea = document.getElementById('sequenceEditorDebug');
        this.playbackTrackContainer = document.getElementById('playbackTrackContainer');
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
            this.playbackLoopWaitSeconds = loopWaitSeconds;
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
            this.startPlaybackPositionUpdates();
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
        this.stopPlaybackPositionUpdates();
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
        this.rebuildPlaybackViewer(source);
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
        this.flashPlaybackEvent(info);
    }
    rebuildPlaybackViewer(ndjson) {
        const container = this.playbackTrackContainer;
        if (!container) {
            return;
        }
        let events;
        try {
            events = parseNDJSON(ndjson);
        }
        catch {
            container.innerHTML = '<div class="playback-viewer-empty">NDJSONのパースに失敗しました</div>';
            this.playbackTrackLines.clear();
            this.playbackTrackBodies.clear();
            this.playbackDurationSeconds = 0;
            return;
        }
        const { tracks, totalDuration } = this.buildPlaybackTracks(events);
        this.playbackDurationSeconds = totalDuration;
        container.innerHTML = '';
        this.playbackTrackLines.clear();
        this.playbackTrackBodies.clear();
        if (tracks.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'playback-viewer-empty';
            empty.textContent = 'triggerAttackReleaseイベントがありません';
            container.appendChild(empty);
            return;
        }
        tracks.forEach(track => {
            const wrapper = document.createElement('div');
            wrapper.className = 'playback-track';
            const label = document.createElement('div');
            label.className = 'playback-track-label';
            label.textContent = track.nodeLabel;
            wrapper.appendChild(label);
            const body = document.createElement('div');
            body.className = 'playback-track-body';
            const progressLine = document.createElement('div');
            progressLine.className = 'playback-progress-line';
            body.appendChild(progressLine);
            this.playbackTrackLines.set(track.nodeId, progressLine);
            this.playbackTrackBodies.set(track.nodeId, body);
            track.notes.forEach(note => {
                const noteEl = document.createElement('div');
                noteEl.className = 'playback-note';
                const leftPercent = this.playbackDurationSeconds > 0
                    ? Math.max(0, Math.min(100, (note.start / this.playbackDurationSeconds) * 100))
                    : 0;
                const widthPercent = this.playbackDurationSeconds > 0
                    ? Math.max((note.duration / this.playbackDurationSeconds) * 100, 0.5)
                    : 0;
                const noteRange = track.maxNote - track.minNote;
                const verticalRatio = noteRange === 0
                    ? 0.5
                    : (note.noteNumber - track.minNote) / noteRange;
                const topPercent = 100 - (verticalRatio * 100);
                noteEl.style.left = `${leftPercent}%`;
                noteEl.style.width = `${widthPercent}%`;
                noteEl.style.top = `${topPercent}%`;
                body.appendChild(noteEl);
            });
            wrapper.appendChild(body);
            container.appendChild(wrapper);
        });
        this.updatePlaybackPositionLine(0);
    }
    buildPlaybackTracks(events) {
        const trackMap = new Map();
        const nodeTypeMap = new Map();
        let maxEndTime = 0;
        let loopEndSeconds = null;
        events.forEach(event => {
            if (event.eventType === 'createNode') {
                nodeTypeMap.set(event.nodeId, event.nodeType);
                return;
            }
            if (event.eventType === 'loopEnd' && 'args' in event && Array.isArray(event.args) && event.args.length > 0) {
                const parsedLoopEnd = this.parseTimeValue(event.args[event.args.length - 1]);
                if (parsedLoopEnd !== null) {
                    loopEndSeconds = loopEndSeconds === null ? parsedLoopEnd : Math.max(loopEndSeconds, parsedLoopEnd);
                }
                return;
            }
            if (event.eventType !== 'triggerAttackRelease' || !('args' in event) || !Array.isArray(event.args)) {
                return;
            }
            if (event.args.length < 3) {
                return;
            }
            const noteNumber = this.parseNoteNumber(event.args[0]);
            const duration = this.parseTimeValue(event.args[1]);
            const start = this.parseTimeValue(event.args[event.args.length - 1]);
            if (noteNumber === null || duration === null || start === null) {
                return;
            }
            const endTime = start + duration;
            maxEndTime = Math.max(maxEndTime, endTime);
            const existing = trackMap.get(event.nodeId);
            const label = nodeTypeMap.has(event.nodeId)
                ? `Node ${event.nodeId} (${nodeTypeMap.get(event.nodeId)})`
                : `Node ${event.nodeId}`;
            const track = existing ?? {
                nodeId: event.nodeId,
                nodeLabel: label,
                minNote: noteNumber,
                maxNote: noteNumber,
                notes: []
            };
            track.minNote = Math.min(track.minNote, noteNumber);
            track.maxNote = Math.max(track.maxNote, noteNumber);
            track.notes.push({ start, duration, noteNumber, nodeId: event.nodeId });
            trackMap.set(event.nodeId, track);
        });
        const tracks = Array.from(trackMap.values()).sort((a, b) => a.nodeId - b.nodeId);
        const totalDuration = loopEndSeconds !== null && loopEndSeconds > 0 ? loopEndSeconds : maxEndTime;
        return {
            tracks,
            totalDuration
        };
    }
    parseNoteNumber(value) {
        if (typeof value === 'number' && Number.isFinite(value)) {
            return value;
        }
        if (typeof value === 'string') {
            const trimmed = value.trim();
            const numeric = Number(trimmed);
            if (Number.isFinite(numeric)) {
                return numeric;
            }
            try {
                const midi = Tone.Frequency(trimmed).toMidi();
                return Number.isFinite(midi) ? midi : null;
            }
            catch {
                return null;
            }
        }
        return null;
    }
    parseTimeValue(value) {
        if (typeof value === 'number' && Number.isFinite(value)) {
            return value;
        }
        if (typeof value !== 'string') {
            return null;
        }
        const trimmed = value.trim();
        const withoutPlus = trimmed.startsWith('+') ? trimmed.substring(1) : trimmed;
        try {
            const ticksSeconds = Tone.Ticks(withoutPlus).toSeconds();
            if (Number.isFinite(ticksSeconds)) {
                return ticksSeconds;
            }
        }
        catch {
            // Fall through
        }
        try {
            const seconds = Tone.Time(withoutPlus).toSeconds();
            if (Number.isFinite(seconds)) {
                return seconds;
            }
        }
        catch {
            // Fall through
        }
        const numeric = Number(withoutPlus);
        return Number.isFinite(numeric) ? numeric : null;
    }
    getEventStartTime(event) {
        if (!('args' in event) || !Array.isArray(event.args) || event.args.length === 0) {
            return null;
        }
        return this.parseTimeValue(event.args[event.args.length - 1]);
    }
    startPlaybackPositionUpdates() {
        this.stopPlaybackPositionUpdates();
        this.playbackStartTime = Tone.now() + this.PLAYBACK_LOOKAHEAD_SECONDS;
        this.updatePlaybackProgressLineFromNow();
    }
    stopPlaybackPositionUpdates() {
        if (this.playbackAnimationFrameId !== null) {
            cancelAnimationFrame(this.playbackAnimationFrameId);
            this.playbackAnimationFrameId = null;
        }
        this.playbackStartTime = null;
        this.updatePlaybackPositionLine(0);
    }
    updatePlaybackProgressLineFromNow() {
        if (this.playbackStartTime === null || this.playbackDurationSeconds <= 0) {
            return;
        }
        const now = Tone.now();
        const elapsed = Math.max(0, now - this.playbackStartTime);
        const loopCycle = this.playbackDurationSeconds + this.playbackLoopWaitSeconds;
        const position = this.playbackLoopEnabled && loopCycle > 0
            ? elapsed % loopCycle
            : Math.min(elapsed, this.playbackDurationSeconds);
        this.updatePlaybackPositionLine(position);
        this.playbackAnimationFrameId = requestAnimationFrame(() => this.updatePlaybackProgressLineFromNow());
    }
    updatePlaybackPositionLine(positionSeconds) {
        if (this.playbackDurationSeconds <= 0) {
            this.playbackTrackLines.forEach(line => {
                line.style.left = '0%';
            });
            return;
        }
        const percent = Math.max(0, Math.min(100, (positionSeconds / this.playbackDurationSeconds) * 100));
        this.playbackTrackLines.forEach(line => {
            line.style.left = `${percent}%`;
        });
    }
    flashPlaybackEvent(info) {
        if (this.playbackDurationSeconds <= 0) {
            return;
        }
        const eventStartTime = this.getEventStartTime(info.event);
        const nodeId = 'nodeId' in info.event ? info.event.nodeId : null;
        if (eventStartTime === null || nodeId === null) {
            return;
        }
        const targetBody = this.playbackTrackBodies.get(nodeId);
        if (!targetBody) {
            return;
        }
        const loopCycle = this.playbackDurationSeconds + this.playbackLoopWaitSeconds;
        if (this.playbackStartTime === null) {
            const loopOffset = info.loopIteration * loopCycle;
            this.playbackStartTime = info.absoluteTime - eventStartTime - loopOffset;
        }
        const baseStart = this.playbackStartTime ?? info.absoluteTime;
        const elapsedFromStart = info.absoluteTime - baseStart;
        const relativeTime = this.playbackLoopEnabled && loopCycle > 0
            ? elapsedFromStart % loopCycle
            : elapsedFromStart;
        const percent = Math.max(0, Math.min(100, (relativeTime / this.playbackDurationSeconds) * 100));
        const flashLine = document.createElement('div');
        flashLine.className = 'playback-flash-line';
        flashLine.style.left = `${percent}%`;
        targetBody.appendChild(flashLine);
        window.setTimeout(() => {
            flashLine.remove();
        }, this.EVENT_FLASH_DURATION_MS);
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
    clearDebugOutput() {
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
