// Audio playback management for Tone.js JSON Sequencer
import type { SequenceEvent } from '../demo-types.js';
// Import from built library in dist/
// @ts-ignore - Using built library
import { SequencerNodes, scheduleOrExecuteEvent } from '../../../dist/index.mjs';

export class AudioManager {
  private nodes = new SequencerNodes();

  async playSequence(sequence: SequenceEvent[]): Promise<void> {
    try {
      // Stop and clear Transport to remove any scheduled events from previous sequences
      if (typeof Tone !== 'undefined') {
        Tone.Transport.stop();
        Tone.Transport.cancel();
      }
      
      // Dispose all existing nodes
      this.nodes.disposeAll();
      
      // First pass: create nodes and connections
      sequence.forEach((element: SequenceEvent) => {
        try {
          if (element.eventType === "createNode" || element.eventType === "connect") {
            scheduleOrExecuteEvent(Tone, this.nodes, element);
          }
        } catch (scheduleError: any) {
          console.log("schedule error:", scheduleError.name, scheduleError.message);
        }
      });
      
      // Wait for all audio buffers to load (important for Sampler)
      await Tone.loaded();
      console.log("All audio buffers loaded");
      
      // Second pass: schedule playback events
      sequence.forEach((element: SequenceEvent) => {
        try {
          if (element.eventType !== "createNode" && element.eventType !== "connect") {
            scheduleOrExecuteEvent(Tone, this.nodes, element);
          }
        } catch (scheduleError: any) {
          console.log("schedule error:", scheduleError.name, scheduleError.message);
        }
      });
    } catch (error: any) {
      console.log("play error:", error.name, error.message);
    }
  }

  async ensureAudioContextStarted(): Promise<void> {
    try {
      if (typeof Tone === 'undefined') {
        console.log("Tone.js is not loaded");
        return;
      }

      if (Tone.context.state !== 'running') {
        console.log("Starting Tone.js AudioContext...");
        await Tone.start();
        console.log("AudioContext started successfully");
      }
    } catch (error: any) {
      console.log("ensureAudioContextStarted error:", error.name, error.message);

      if (error.name === 'InvalidAccessError') {
        console.log("InvalidAccessError: User interaction required before audio playback");
        alert("音声を再生するには、ページをクリックするかキーを押してください。");
        throw error;
      }
    }
  }
}
