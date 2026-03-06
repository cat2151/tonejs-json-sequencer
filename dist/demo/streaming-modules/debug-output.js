// Tone.js JSON Sequencer - Debug Output Handler for Streaming Demo
function createInitialTimingStats() {
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
/**
 * Manages debug output and timing statistics for the streaming demo.
 */
export class DebugOutput {
    constructor(maxMessages = 100) {
        this.messages = [];
        this.timingStats = createInitialTimingStats();
        this.maxMessages = maxMessages;
    }
    /**
     * Process a debug message: parse timing info and update the output element.
     */
    handleMessage(message, data) {
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
            this.timingStats = createInitialTimingStats();
        }
        this.messages.push(debugLine);
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }
        this.updateOutput();
        this.updateTimingVisualization();
    }
    /** Reset messages and timing stats, then refresh the UI */
    clear() {
        this.messages = [];
        this.timingStats = createInitialTimingStats();
        this.updateOutput();
        this.updateTimingVisualization();
    }
    updateOutput() {
        const debugOutput = document.getElementById('debugOutput');
        if (debugOutput) {
            debugOutput.textContent = this.messages.join('\n');
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
}
