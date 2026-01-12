import { loadAllSequences } from './sequenceLoader.js';
import { UIManager } from './modules/uiManager.js';
import { AudioManager } from './modules/audioManager.js';
class DemoApp {
    constructor() {
        this.sequenceDataCollection = {};
        this.sequences = [];
        this.audioManager = new AudioManager();
        this.uiManager = new UIManager(() => this.playWithAudioContext(), (name) => this.updateTextareaWithSelectedSequence(name));
    }
    async initialize() {
        this.sequences = loadAllSequences();
        this.initializeSequenceDataCollection();
        this.uiManager.populateSequenceSelector(this.sequences);
        this.updateTextareaWithSelectedSequence();
    }
    initializeSequenceDataCollection() {
        this.sequences.forEach(seq => {
            this.sequenceDataCollection[seq.name] = seq.data;
        });
    }
    updateTextareaWithSelectedSequence(selectedSequenceName) {
        // If no sequences are loaded, there is nothing to display or play.
        if (this.sequences.length === 0) {
            return;
        }
        const sequenceName = selectedSequenceName ||
            this.uiManager.getSelectedSequenceName() ||
            this.sequences[0].name;
        const selectedSequenceData = this.sequenceDataCollection[sequenceName];
        this.uiManager.setTextareaValue(JSON.stringify(selectedSequenceData, null, 2));
        this.playWithAudioContext();
    }
    async playWithAudioContext() {
        try {
            await this.audioManager.ensureAudioContextStarted();
            await this.play();
        }
        catch (error) {
            console.log("playWithAudioContext error:", error.name, error.message);
            // If audio context couldn't start, try playing anyway
            if (error.name !== 'InvalidAccessError') {
                try {
                    await this.play();
                }
                catch (playError) {
                    console.log("play error:", playError.name, playError.message);
                }
            }
        }
    }
    async play() {
        const json = this.uiManager.getTextareaValue();
        let sequence;
        try {
            sequence = JSON.parse(json);
        }
        catch (error) {
            console.error('Invalid JSON in sequence editor:', error);
            alert('Invalid JSON in sequence editor. Please fix the JSON syntax and try again.');
            return;
        }
        await this.audioManager.playSequence(sequence);
    }
}
// Initialize app when page loads
window.addEventListener("load", async () => {
    const app = new DemoApp();
    await app.initialize();
});
