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

  private async render(): Promise<void> {
    try {
      // Ensure audio context is started (required for Tone.js initialization)
      // Even though offline rendering doesn't use the main audio context,
      // Tone.js requires context initialization before creating offline contexts
      await Tone.start();

      // Disable render button during rendering
      const renderButton = document.getElementById('renderButton') as HTMLButtonElement;
      renderButton.disabled = true;
      
      // Hide audio player and download button
      const audioPlayer = document.getElementById('audioPlayer');
      const downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
      if (audioPlayer) audioPlayer.classList.remove('active');
      downloadButton.disabled = true;

      // Get configuration
      const sampleRateInput = document.getElementById('sampleRate') as HTMLInputElement;
      const endBufferInput = document.getElementById('endBuffer') as HTMLInputElement;
      const sampleRate = parseInt(sampleRateInput.value);
      const endBufferSeconds = parseFloat(endBufferInput.value);

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

      // Update status
      this.updateStatus(`レンダリング完了！ 長さ: ${result.duration.toFixed(2)}秒`);

      // Create audio URL for preview
      this.createAudioPreview(result.buffer);

      // Enable download button
      downloadButton.disabled = false;

      // Show audio player
      if (audioPlayer) audioPlayer.classList.add('active');

      // Re-enable render button
      renderButton.disabled = false;
    } catch (error) {
      console.error('Error during rendering:', error);
      this.updateStatus('エラー: ' + (error as Error).message);
      alert('音声のレンダリングに失敗しました。詳細はコンソールを確認してください。');
      
      // Re-enable render button
      const renderButton = document.getElementById('renderButton') as HTMLButtonElement;
      renderButton.disabled = false;
      
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
      alert('ダウンロードする音声がありません。先にレンダリングしてください。');
      return;
    }

    try {
      const filenameInput = document.getElementById('filename') as HTMLInputElement;
      const filename = filenameInput.value || 'output.wav';
      
      downloadWav(this.currentBuffer, filename);
      this.updateStatus('ダウンロード開始: ' + filename);
    } catch (error) {
      console.error('Error downloading WAV:', error);
      alert('WAVのダウンロードに失敗しました。詳細はコンソールを確認してください。');
    }
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
