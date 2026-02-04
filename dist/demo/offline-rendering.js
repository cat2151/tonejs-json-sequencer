import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { OfflineRenderer, downloadWav, audioBufferToWav } from '../../dist/index.mjs';
class OfflineRenderingDemo {
    constructor() {
        this.renderer = null;
        this.sequences = loadAllSequences();
        this.currentBuffer = null;
        this.currentBlobUrl = null;
        this.debounceTimer = null;
        this.renderStartTime = 0;
        this.isRendering = false;
        this.lastRenderTrigger = null;
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
        // Download button
        document.getElementById('downloadButton')?.addEventListener('click', () => {
            this.download();
        });
        // Sequence selector change - auto-render
        selector.addEventListener('change', () => {
            // Cancel any pending debounced render to avoid race conditions
            if (this.debounceTimer !== null) {
                window.clearTimeout(this.debounceTimer);
                this.debounceTimer = null;
            }
            this.loadSelectedSequence();
            this.lastRenderTrigger = 'selector';
            this.render();
        });
        // Textarea change - debounced auto-render
        const textarea = document.getElementById('sequenceEditor');
        textarea?.addEventListener('input', () => {
            this.debouncedRender();
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
        }
    }
    sequenceToNDJSON(sequence) {
        return sequence.map(event => JSON.stringify(event)).join('\n');
    }
    getNDJSONFromTextarea() {
        const textarea = document.getElementById('sequenceEditor');
        return textarea.value;
    }
    debouncedRender() {
        if (this.debounceTimer !== null) {
            window.clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = window.setTimeout(() => {
            this.lastRenderTrigger = 'textarea';
            this.render();
        }, 1000); // 1 second debounce
    }
    formatTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
    async render() {
        // Prevent concurrent render operations
        if (this.isRendering) {
            console.log('Render already in progress, ignoring request');
            return;
        }
        try {
            this.isRendering = true;
            // Ensure audio context is started (required for Tone.js initialization)
            // Even though offline rendering doesn't use the main audio context,
            // Tone.js requires context initialization before creating offline contexts
            await Tone.start();
            // Record start time
            this.renderStartTime = performance.now();
            // Clear any existing waveform overlay
            this.clearWaveformOverlay();
            // Hide audio player and download button
            const audioPlayer = document.getElementById('audioPlayer');
            const downloadButton = document.getElementById('downloadButton');
            if (audioPlayer)
                audioPlayer.classList.remove('active');
            downloadButton.disabled = true;
            // Fixed configuration
            const sampleRate = 48000;
            const endBufferSeconds = 0;
            // Show progress container
            const progressContainer = document.getElementById('progressContainer');
            if (progressContainer)
                progressContainer.classList.add('active');
            // Update status
            this.updateStatus('レンダラーを初期化中...');
            this.updateProgress(0);
            // Create renderer with configuration
            this.renderer = new OfflineRenderer(Tone, {
                sampleRate,
                endBufferSeconds,
                onProgress: (progress) => {
                    this.updateProgress(progress);
                }
            });
            // Get NDJSON from textarea
            const ndjson = this.getNDJSONFromTextarea();
            // Update status
            this.updateStatus('音声をオフラインでレンダリング中...');
            // Render offline
            const result = await this.renderer.render(ndjson);
            this.currentBuffer = result.buffer;
            // Calculate rendering time and speed
            const renderEndTime = performance.now();
            const renderTimeSeconds = (renderEndTime - this.renderStartTime) / 1000;
            const renderSpeed = renderTimeSeconds > 0 ? result.duration / renderTimeSeconds : null;
            // Update status with rendering info
            const renderTimeText = renderTimeSeconds > 0 ? `${renderTimeSeconds.toFixed(2)}秒` : '瞬時';
            const renderSpeedText = renderSpeed !== null ? `、レンダリングスピード: x${renderSpeed.toFixed(1)}` : '';
            this.updateStatus(`レンダリング完了！ 長さ: ${result.duration.toFixed(2)}秒 | レンダリング時間: ${renderTimeText}${renderSpeedText}`);
            // Create audio URL for preview
            this.createAudioPreview(result.buffer);
            // Enable download button
            downloadButton.disabled = false;
            // Show audio player
            if (audioPlayer)
                audioPlayer.classList.add('active');
            // Auto-play preview (only if user is not actively editing the textarea)
            const textarea = document.getElementById('sequenceEditor');
            const isEditing = textarea !== null && document.activeElement === textarea;
            if (!isEditing && this.lastRenderTrigger === 'selector') {
                const audioElement = document.getElementById('audioElement');
                if (audioElement) {
                    try {
                        await audioElement.play();
                    }
                    catch (e) {
                        console.log('Auto-play was prevented by browser policy');
                    }
                }
            }
            else if (isEditing) {
                console.log('Skipping auto-play because the user is actively editing the sequence.');
            }
            // Draw waveform overlay on progress bar
            this.drawWaveformOverlay(result.buffer);
            this.isRendering = false;
        }
        catch (error) {
            console.error('Error during rendering:', error);
            this.updateStatus('エラー: ' + error.message);
            // Clear waveform overlay on error to avoid showing stale data
            this.clearWaveformOverlay();
            // Hide progress container
            const progressContainer = document.getElementById('progressContainer');
            if (progressContainer)
                progressContainer.classList.remove('active');
            this.isRendering = false;
        }
    }
    createAudioPreview(buffer) {
        try {
            // Convert buffer to WAV
            const wav = audioBufferToWav(buffer);
            const blob = new Blob([wav], { type: 'audio/wav' });
            // Revoke previous URL if exists
            if (this.currentBlobUrl) {
                URL.revokeObjectURL(this.currentBlobUrl);
            }
            // Create new URL
            this.currentBlobUrl = URL.createObjectURL(blob);
            // Set audio element source
            const audioElement = document.getElementById('audioElement');
            audioElement.src = this.currentBlobUrl;
        }
        catch (error) {
            console.error('Error creating audio preview:', error);
        }
    }
    download() {
        if (!this.currentBuffer) {
            alert('ダウンロードする音声がありません。');
            return;
        }
        try {
            const filename = `output_${this.formatTimestamp()}.wav`;
            downloadWav(this.currentBuffer, filename);
            this.updateStatus('ダウンロード開始: ' + filename);
        }
        catch (error) {
            console.error('Error downloading WAV:', error);
            alert('WAVのダウンロードに失敗しました。詳細はコンソールを確認してください。');
        }
    }
    clearWaveformOverlay() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar)
            return;
        const existingCanvas = progressBar.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
    }
    drawWaveformOverlay(buffer) {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar)
            return;
        // Remove existing canvas if any
        this.clearWaveformOverlay();
        // Create canvas for waveform
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        const rect = progressBar.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        // Set canvas size accounting for device pixel ratio
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        progressBar.style.position = 'relative';
        progressBar.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Scale context for device pixel ratio
        ctx.scale(dpr, dpr);
        // Get audio data from first channel
        const channelData = buffer.getChannelData(0);
        const step = Math.ceil(channelData.length / rect.width);
        const amp = rect.height / 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < rect.width; i++) {
            const start = i * step;
            const end = Math.min((i + 1) * step, channelData.length);
            let min = channelData[start];
            let max = channelData[start];
            // Find min and max in a single pass
            for (let j = start + 1; j < end; j++) {
                const value = channelData[j];
                if (value < min)
                    min = value;
                if (value > max)
                    max = value;
            }
            const y1 = (1 + min) * amp;
            const y2 = (1 + max) * amp;
            // Draw a vertical line segment for this pixel's min/max range
            ctx.beginPath();
            ctx.moveTo(i, y1);
            ctx.lineTo(i, y2);
            ctx.stroke();
        }
    }
    updateStatus(status) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = `ステータス: ${status}`;
        }
    }
    updateProgress(progress) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
            progressFill.textContent = `${Math.round(progress)}%`;
        }
    }
}
// Initialize demo when page loads
window.addEventListener('load', () => {
    new OfflineRenderingDemo();
});
