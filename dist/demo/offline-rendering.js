import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { OfflineRenderer, downloadWav, audioBufferToWav } from '../../dist/index.mjs';
class OfflineRenderingDemo {
    constructor() {
        this.renderer = null;
        this.sequences = loadAllSequences();
        this.currentBuffer = null;
        this.currentBlobUrl = null;
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
        // Render button
        document.getElementById('renderButton')?.addEventListener('click', () => {
            this.render();
        });
        // Download button
        document.getElementById('downloadButton')?.addEventListener('click', () => {
            this.download();
        });
        // Sequence selector change
        selector.addEventListener('change', () => {
            this.loadSelectedSequence();
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
    async render() {
        try {
            // Ensure audio context is started (required for Tone.js initialization)
            // Even though offline rendering doesn't use the main audio context,
            // Tone.js requires context initialization before creating offline contexts
            await Tone.start();
            // Disable render button during rendering
            const renderButton = document.getElementById('renderButton');
            renderButton.disabled = true;
            // Hide audio player and download button
            const audioPlayer = document.getElementById('audioPlayer');
            const downloadButton = document.getElementById('downloadButton');
            if (audioPlayer)
                audioPlayer.classList.remove('active');
            downloadButton.disabled = true;
            // Get configuration
            const sampleRateInput = document.getElementById('sampleRate');
            const endBufferInput = document.getElementById('endBuffer');
            const sampleRate = parseInt(sampleRateInput.value);
            const endBufferSeconds = parseFloat(endBufferInput.value);
            // Show progress container
            const progressContainer = document.getElementById('progressContainer');
            if (progressContainer)
                progressContainer.classList.add('active');
            // Update status
            this.updateStatus('Initializing renderer...');
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
            this.updateStatus('Rendering audio offline...');
            // Render offline
            const result = await this.renderer.render(ndjson);
            this.currentBuffer = result.buffer;
            // Update status
            this.updateStatus(`Rendering complete! Duration: ${result.duration.toFixed(2)}s`);
            // Create audio URL for preview
            this.createAudioPreview(result.buffer);
            // Enable download button
            downloadButton.disabled = false;
            // Show audio player
            if (audioPlayer)
                audioPlayer.classList.add('active');
            // Re-enable render button
            renderButton.disabled = false;
        }
        catch (error) {
            console.error('Error during rendering:', error);
            this.updateStatus('Error: ' + error.message);
            alert('Failed to render audio. Please check the console for details.');
            // Re-enable render button
            const renderButton = document.getElementById('renderButton');
            renderButton.disabled = false;
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
            alert('No audio to download. Please render first.');
            return;
        }
        try {
            const filenameInput = document.getElementById('filename');
            const filename = filenameInput.value || 'output.wav';
            downloadWav(this.currentBuffer, filename);
            this.updateStatus('Download started: ' + filename);
        }
        catch (error) {
            console.error('Error downloading WAV:', error);
            alert('Failed to download WAV. Please check the console for details.');
        }
    }
    updateStatus(status) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = `Status: ${status}`;
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
