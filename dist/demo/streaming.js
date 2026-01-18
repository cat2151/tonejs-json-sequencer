import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer } from '../../dist/index.mjs';
class StreamingDemo {
    constructor() {
        this.player = null;
        this.nodes = new SequencerNodes();
        this.sequences = loadAllSequences();
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
        // Play button
        document.getElementById('playButton')?.addEventListener('click', () => {
            this.play();
        });
        // Stop button
        document.getElementById('stopButton')?.addEventListener('click', () => {
            this.stop();
        });
        // Sequence selector change
        selector.addEventListener('change', () => {
            this.loadSelectedSequence();
        });
        // Loop checkbox change
        document.getElementById('loopCheckbox')?.addEventListener('change', () => {
            // If playing, restart with new loop setting
            if (this.player && this.player.playing) {
                this.stop();
                this.play();
            }
        });
        // Textarea change (live editing)
        const textarea = document.getElementById('sequenceEditor');
        textarea.addEventListener('input', () => {
            this.onSequenceEdit();
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
    async play() {
        try {
            // Ensure audio context is started
            await Tone.start();
            const loopCheckbox = document.getElementById('loopCheckbox');
            const loop = loopCheckbox.checked;
            // Create player only if it doesn't exist or isn't playing
            if (!this.player || !this.player.playing) {
                // Dispose old nodes and create fresh instance
                this.nodes.disposeAll();
                this.nodes = new SequencerNodes();
                this.player = new NDJSONStreamingPlayer(Tone, this.nodes, {
                    lookaheadMs: 50,
                    loop: loop,
                    onLoopComplete: () => {
                        this.updateStatus('Playing (looped)');
                    }
                });
            }
            // Get NDJSON from textarea
            const ndjson = this.getNDJSONFromTextarea();
            // Start playback
            await this.player.start(ndjson);
            this.updateStatus(loop ? 'Playing (loop enabled)' : 'Playing');
            // Disable play button, enable stop button
            document.getElementById('playButton').disabled = true;
            document.getElementById('stopButton').disabled = false;
        }
        catch (error) {
            console.error('Error during playback:', error);
            this.updateStatus('Error: ' + error.message);
            alert('Failed to start playback. Please check the console for details.');
        }
    }
    stop() {
        if (this.player) {
            this.player.stop();
            this.player = null;
        }
        // Dispose all nodes on stop
        this.nodes.disposeAll();
        this.updateStatus('Stopped');
        // Enable play button, disable stop button
        document.getElementById('playButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
    onSequenceEdit() {
        // If playing, update the sequence in real-time
        if (this.player && this.player.playing) {
            try {
                const ndjson = this.getNDJSONFromTextarea();
                this.player.start(ndjson);
                this.updateStatus('Playing (live editing)');
            }
            catch (error) {
                console.error('Error updating sequence:', error);
                // Don't stop playback on edit errors
            }
        }
    }
    updateStatus(status) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = `Status: ${status}`;
        }
    }
}
// Initialize demo when page loads
window.addEventListener('load', () => {
    new StreamingDemo();
});
