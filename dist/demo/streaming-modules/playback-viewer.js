// @ts-ignore - Using built library
import { parseNDJSON } from '../../../dist/index.mjs';
/**
 * Manages the piano-roll playback viewer for the streaming demo.
 * Renders note blocks, animates the playback position line, and
 * shows green flash markers when events are scheduled.
 */
export class PlaybackViewer {
    constructor(containerId) {
        this.trackLines = new Map();
        this.trackBodies = new Map();
        this.durationSeconds = 0;
        this.loopEnabled = false;
        this.loopWaitSeconds = 0;
        this.startTime = null;
        this.animationFrameId = null;
        this.EVENT_FLASH_DURATION_MS = 200;
        this.PLAYBACK_LOOKAHEAD_SECONDS = 0.05;
        this.container = document.getElementById(containerId);
    }
    /** Rebuild the viewer from an NDJSON string */
    rebuild(ndjson) {
        const container = this.container;
        if (!container) {
            return;
        }
        let events;
        try {
            events = parseNDJSON(ndjson);
        }
        catch {
            container.innerHTML = '<div class="playback-viewer-empty">NDJSONのパースに失敗しました</div>';
            this.trackLines.clear();
            this.trackBodies.clear();
            this.durationSeconds = 0;
            return;
        }
        const { tracks, totalDuration } = this.buildTracks(events);
        this.durationSeconds = totalDuration;
        container.innerHTML = '';
        this.trackLines.clear();
        this.trackBodies.clear();
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
            this.trackLines.set(track.nodeId, progressLine);
            this.trackBodies.set(track.nodeId, body);
            track.notes.forEach(note => {
                const noteEl = document.createElement('div');
                noteEl.className = 'playback-note';
                const leftPercent = this.durationSeconds > 0
                    ? Math.max(0, Math.min(100, (note.start / this.durationSeconds) * 100))
                    : 0;
                const widthPercent = this.durationSeconds > 0
                    ? Math.max((note.duration / this.durationSeconds) * 100, 0.5)
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
        this.updatePositionLine(0);
    }
    /** Start animating the playback position line */
    startPositionUpdates(loopEnabled, loopWaitSeconds) {
        this.stopPositionUpdates();
        this.loopEnabled = loopEnabled;
        this.loopWaitSeconds = loopWaitSeconds;
        this.startTime = Tone.now() + this.PLAYBACK_LOOKAHEAD_SECONDS;
        this.updateProgressFromNow();
    }
    /** Stop animating and reset the position line */
    stopPositionUpdates() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.startTime = null;
        this.updatePositionLine(0);
    }
    /** Handle an event being scheduled: flash its position on the viewer */
    flashEvent(info) {
        if (this.durationSeconds <= 0) {
            return;
        }
        const eventStartTime = this.getEventStartTime(info.event);
        const nodeId = info.event.nodeId;
        if (eventStartTime === null) {
            return;
        }
        const targetBody = this.trackBodies.get(nodeId);
        if (!targetBody) {
            return;
        }
        const loopCycle = this.durationSeconds + this.loopWaitSeconds;
        if (this.startTime === null) {
            const loopOffset = info.loopIteration * loopCycle;
            this.startTime = info.absoluteTime - eventStartTime - loopOffset;
        }
        const baseStart = this.startTime ?? info.absoluteTime;
        const elapsedFromStart = info.absoluteTime - baseStart;
        const relativeTime = this.loopEnabled && loopCycle > 0
            ? elapsedFromStart % loopCycle
            : elapsedFromStart;
        const percent = Math.max(0, Math.min(100, (relativeTime / this.durationSeconds) * 100));
        const flashLine = document.createElement('div');
        flashLine.className = 'playback-flash-line';
        flashLine.style.left = `${percent}%`;
        targetBody.appendChild(flashLine);
        window.setTimeout(() => {
            flashLine.remove();
        }, this.EVENT_FLASH_DURATION_MS);
    }
    /** Expose the total duration so the caller can read it */
    get duration() {
        return this.durationSeconds;
    }
    updateProgressFromNow() {
        if (this.startTime === null || this.durationSeconds <= 0) {
            return;
        }
        const now = Tone.now();
        const elapsed = Math.max(0, now - this.startTime);
        const loopCycle = this.durationSeconds + this.loopWaitSeconds;
        const position = this.loopEnabled && loopCycle > 0
            ? elapsed % loopCycle
            : Math.min(elapsed, this.durationSeconds);
        this.updatePositionLine(position);
        this.animationFrameId = requestAnimationFrame(() => this.updateProgressFromNow());
    }
    updatePositionLine(positionSeconds) {
        if (this.durationSeconds <= 0) {
            this.trackLines.forEach(line => {
                line.style.left = '0%';
            });
            return;
        }
        const percent = Math.max(0, Math.min(100, (positionSeconds / this.durationSeconds) * 100));
        this.trackLines.forEach(line => {
            line.style.left = `${percent}%`;
        });
    }
    buildTracks(events) {
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
        return { tracks, totalDuration };
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
}
