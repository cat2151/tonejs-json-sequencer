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
            this.loadSelectedSequence();
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
        try {
            // Ensure audio context is started (required for Tone.js initialization)
            // Even though offline rendering doesn't use the main audio context,
            // Tone.js requires context initialization before creating offline contexts
            await Tone.start();
            // Record start time
            this.renderStartTime = performance.now();
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
            const renderSpeed = result.duration / renderTimeSeconds;
            // Update status with rendering info
            this.updateStatus(`レンダリング完了！ 長さ: ${result.duration.toFixed(2)}秒 | レンダリング時間: ${renderTimeSeconds.toFixed(2)}秒、レンダリングスピード: x${renderSpeed.toFixed(1)}`);
            // Create audio URL for preview
            this.createAudioPreview(result.buffer);
            // Enable download button
            downloadButton.disabled = false;
            // Show audio player
            if (audioPlayer)
                audioPlayer.classList.add('active');
            // Auto-play preview
            const audioElement = document.getElementById('audioElement');
            if (audioElement) {
                try {
                    await audioElement.play();
                }
                catch (e) {
                    console.log('Auto-play was prevented by browser policy');
                }
            }
            // Draw waveform overlay on progress bar
            this.drawWaveformOverlay(result.buffer);
        }
        catch (error) {
            console.error('Error during rendering:', error);
            this.updateStatus('エラー: ' + error.message);
            // Hide progress container
            const progressContainer = document.getElementById('progressContainer');
            if (progressContainer)
                progressContainer.classList.remove('active');
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
    drawWaveformOverlay(buffer) {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar)
            return;
        // Remove existing canvas if any
        const existingCanvas = progressBar.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        // Create canvas for waveform
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        const rect = progressBar.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        progressBar.style.position = 'relative';
        progressBar.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Get audio data from first channel
        const channelData = buffer.getChannelData(0);
        const step = Math.ceil(channelData.length / canvas.width);
        const amp = canvas.height / 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i++) {
            const min = Math.min(...Array.from(channelData.slice(i * step, (i + 1) * step)));
            const max = Math.max(...Array.from(channelData.slice(i * step, (i + 1) * step)));
            const y1 = (1 + min) * amp;
            const y2 = (1 + max) * amp;
            if (i === 0) {
                ctx.moveTo(i, y1);
            }
            ctx.lineTo(i, y1);
            ctx.lineTo(i, y2);
        }
        ctx.stroke();
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
