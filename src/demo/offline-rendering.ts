// Tone.js JSON Sequencer - Offline Rendering Demo
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { OfflineRenderer, downloadWav, audioBufferToWav } from '../../dist/index.mjs';

class OfflineRenderingDemo {
  private renderer: OfflineRenderer | null = null;
  private sequences = loadAllSequences();
  private currentBuffer: AudioBuffer | null = null;
  private currentBlobUrl: string | null = null;
  private debounceTimer: number | null = null;
  private renderStartTime: number = 0;

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
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    textarea?.addEventListener('input', () => {
      this.debouncedRender();
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
    }
  }

  private sequenceToNDJSON(sequence: SequenceEvent[]): string {
    return sequence.map(event => JSON.stringify(event)).join('\n');
  }

  private getNDJSONFromTextarea(): string {
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    return textarea.value;
  }

  private debouncedRender(): void {
    if (this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = window.setTimeout(() => {
      this.render();
    }, 1000); // 1 second debounce
  }

  private formatTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  private async render(): Promise<void> {
    try {
      // Ensure audio context is started (required for Tone.js initialization)
      // Even though offline rendering doesn't use the main audio context,
      // Tone.js requires context initialization before creating offline contexts
      await Tone.start();

      // Record start time
      this.renderStartTime = performance.now();
      
      // Hide audio player and download button
      const audioPlayer = document.getElementById('audioPlayer');
      const downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
      if (audioPlayer) audioPlayer.classList.remove('active');
      downloadButton.disabled = true;

      // Fixed configuration
      const sampleRate = 48000;
      const endBufferSeconds = 0;

      // Show progress container
      const progressContainer = document.getElementById('progressContainer');
      if (progressContainer) progressContainer.classList.add('active');

      // Update status
      this.updateStatus('レンダラーを初期化中...');
      this.updateProgress(0);

      // Create renderer with configuration
      this.renderer = new OfflineRenderer(Tone, {
        sampleRate,
        endBufferSeconds,
        onProgress: (progress: number) => {
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
      if (audioPlayer) audioPlayer.classList.add('active');

      // Auto-play preview
      const audioElement = document.getElementById('audioElement') as HTMLAudioElement;
      if (audioElement) {
        try {
          await audioElement.play();
        } catch (e) {
          console.log('Auto-play was prevented by browser policy');
        }
      }

      // Draw waveform overlay on progress bar
      this.drawWaveformOverlay(result.buffer);

    } catch (error) {
      console.error('Error during rendering:', error);
      this.updateStatus('エラー: ' + (error as Error).message);
      
      // Hide progress container
      const progressContainer = document.getElementById('progressContainer');
      if (progressContainer) progressContainer.classList.remove('active');
    }
  }

  private createAudioPreview(buffer: AudioBuffer): void {
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
      const audioElement = document.getElementById('audioElement') as HTMLAudioElement;
      audioElement.src = this.currentBlobUrl;
    } catch (error) {
      console.error('Error creating audio preview:', error);
    }
  }

  private download(): void {
    if (!this.currentBuffer) {
      alert('ダウンロードする音声がありません。');
      return;
    }

    try {
      const filename = `output_${this.formatTimestamp()}.wav`;
      
      downloadWav(this.currentBuffer, filename);
      this.updateStatus('ダウンロード開始: ' + filename);
    } catch (error) {
      console.error('Error downloading WAV:', error);
      alert('WAVのダウンロードに失敗しました。詳細はコンソールを確認してください。');
    }
  }

  private drawWaveformOverlay(buffer: AudioBuffer): void {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    if (!progressBar) return;

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
    if (!ctx) return;

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

  private updateStatus(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `ステータス: ${status}`;
    }
  }

  private updateProgress(progress: number): void {
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
