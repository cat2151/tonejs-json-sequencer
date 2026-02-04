// Import from built library in dist/
// @ts-ignore - Using built library
import { SequencerNodes, scheduleOrExecuteEvent } from '../../../dist/index.mjs';
export class AudioManager {
    constructor() {
        this.nodes = new SequencerNodes();
    }
    async playSequence(sequence) {
        try {
            // Stop and clear Transport to remove any scheduled events from previous sequences
            Tone.Transport.stop();
            Tone.Transport.cancel();
            // Dispose all existing nodes
            this.nodes.disposeAll();
            // First pass: create nodes and connections
            sequence.forEach((element) => {
                try {
                    if (element.eventType === "createNode" || element.eventType === "connect") {
                        scheduleOrExecuteEvent(Tone, this.nodes, element);
                    }
                }
                catch (scheduleError) {
                    console.log("schedule error:", scheduleError.name, scheduleError.message);
                }
            });
            // Wait for all audio buffers to load (important for Sampler)
            await Tone.loaded();
            console.log("All audio buffers loaded");
            // Second pass: schedule playback events
            sequence.forEach((element) => {
                try {
                    if (element.eventType !== "createNode" && element.eventType !== "connect") {
                        scheduleOrExecuteEvent(Tone, this.nodes, element);
                    }
                }
                catch (scheduleError) {
                    console.log("schedule error:", scheduleError.name, scheduleError.message);
                }
            });
        }
        catch (error) {
            console.log("play error:", error.name, error.message);
        }
    }
    async ensureAudioContextStarted() {
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
        }
        catch (error) {
            console.log("ensureAudioContextStarted error:", error.name, error.message);
            if (error.name === 'InvalidAccessError') {
                console.log("InvalidAccessError: User interaction required before audio playback");
                alert("音声を再生するには、ページをクリックするかキーを押してください。");
                throw error;
            }
        }
    }
}
