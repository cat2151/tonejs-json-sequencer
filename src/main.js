// Tone.js JSON Sequencer Main Script
import { sequenceDefinitions } from './sampleData.js';
let textarea1;
let sequenceSelector;
const nodes = [];
const sequenceDataCollection = {};
window.addEventListener("load", () => {
    initializeSequenceDataCollection();
    const button = document.querySelector('button');
    textarea1 = document.querySelector('textarea');
    sequenceSelector = document.getElementById('sequenceSelector');
    textarea1.addEventListener('input', play);
    sequenceSelector.addEventListener('change', () => {
        updateTextareaWithSelectedSequence();
    });
    button.onclick = async () => {
        await playWithAudioContext();
    };
    populateSequenceSelector();
    updateTextareaWithSelectedSequence();
});
function initializeSequenceDataCollection() {
    sequenceDefinitions.forEach(seq => {
        sequenceDataCollection[seq.name] = seq.data;
    });
}
function populateSequenceSelector() {
    sequenceSelector.innerHTML = '';
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Demoを選んでください';
    placeholderOption.selected = true;
    sequenceSelector.appendChild(placeholderOption);
    sequenceDefinitions.forEach(seq => {
        const option = document.createElement('option');
        option.value = seq.name;
        option.textContent = seq.name;
        sequenceSelector.appendChild(option);
    });
}
function updateTextareaWithSelectedSequence() {
    const selectedSequenceName = sequenceSelector.value;
    const sequenceName = selectedSequenceName || sequenceDefinitions[0].name;
    const selectedSequenceData = sequenceDataCollection[sequenceName];
    textarea1.value = JSON.stringify(selectedSequenceData, null, 2);
    playWithAudioContext();
}
// Play functions for Tone.js JSON Sequencer
async function playWithAudioContext() {
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
        await play();
    }
    catch (error) {
        console.log("playWithAudioContext error:", error.name, error.message);
        if (error.name === 'InvalidAccessError') {
            console.log("InvalidAccessError: User interaction required before audio playback");
            alert("音声を再生するには、ページをクリックするかキーを押してください。");
            return;
        }
        try {
            await play();
        }
        catch (playError) {
            console.log("play error:", playError.name, playError.message);
        }
    }
}
async function play() {
    try {
        const json = textarea1.value;
        const j = JSON.parse(json);
        // dispose
        nodes.forEach(element => {
            try {
                element.dispose();
            }
            catch (disposeError) {
                console.log("dispose error:", disposeError.name, disposeError.message);
            }
        });
        // First pass: create nodes and connections
        j.forEach((element) => {
            try {
                if (element.eventType === "createNode" || element.eventType === "connect") {
                    scheduleOrExecuteEvent(element);
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
        j.forEach((element) => {
            try {
                if (element.eventType !== "createNode" && element.eventType !== "connect") {
                    scheduleOrExecuteEvent(element);
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
// Tone.js JSON Sequencer - Event Scheduler
function scheduleOrExecuteEvent(element) {
    // console.log(element);
    switch (element.eventType) {
        // execute
        case "createNode":
            switch (element.nodeType) {
                // Instrument
                case "AMSynth":
                    nodes[element.nodeId] = new Tone.AMSynth(element.args);
                    break;
                case "DuoSynth":
                    nodes[element.nodeId] = new Tone.DuoSynth(element.args);
                    break;
                case "FMSynth":
                    nodes[element.nodeId] = new Tone.FMSynth(element.args);
                    break;
                case "MembraneSynth":
                    nodes[element.nodeId] = new Tone.MembraneSynth(element.args);
                    break;
                case "MetalSynth":
                    nodes[element.nodeId] = new Tone.MetalSynth(element.args);
                    break;
                case "MonoSynth":
                    nodes[element.nodeId] = new Tone.MonoSynth(element.args);
                    break;
                case "NoiseSynth":
                    nodes[element.nodeId] = new Tone.NoiseSynth(element.args);
                    break;
                case "PluckSynth":
                    nodes[element.nodeId] = new Tone.PluckSynth(element.args);
                    break;
                case "PolySynth":
                    nodes[element.nodeId] = new Tone.PolySynth(element.args);
                    break;
                case "Sampler":
                    nodes[element.nodeId] = new Tone.Sampler({
                        ...element.args,
                        onload: () => {
                            console.log("Sampler loaded successfully");
                        },
                        onerror: (error) => {
                            console.error("Sampler loading error:", error);
                        }
                    });
                    break;
                case "Synth":
                    nodes[element.nodeId] = new Tone.Synth(element.args);
                    break;
                // Effect
                case "AutoFilter":
                    nodes[element.nodeId] = new Tone.AutoFilter(...element.args);
                    break;
                case "AutoPanner":
                    nodes[element.nodeId] = new Tone.AutoPanner(...element.args);
                    break;
                case "AutoWah":
                    nodes[element.nodeId] = new Tone.AutoWah(...element.args);
                    break;
                case "BitCrusher":
                    nodes[element.nodeId] = new Tone.BitCrusher(...element.args);
                    break;
                case "Chebyshev":
                    nodes[element.nodeId] = new Tone.Chebyshev(...element.args);
                    break;
                case "Chorus":
                    nodes[element.nodeId] = new Tone.Chorus(...element.args);
                    break;
                case "Distortion":
                    nodes[element.nodeId] = new Tone.Distortion(...element.args);
                    break;
                case "FeedbackDelay":
                    nodes[element.nodeId] = new Tone.FeedbackDelay(...element.args);
                    break;
                case "Freeverb":
                    nodes[element.nodeId] = new Tone.Freeverb(...element.args);
                    break;
                case "FrequencyShifter":
                    nodes[element.nodeId] = new Tone.FrequencyShifter(...element.args);
                    break;
                case "JCReverb":
                    nodes[element.nodeId] = new Tone.JCReverb(...element.args);
                    break;
                case "Phaser":
                    nodes[element.nodeId] = new Tone.Phaser(...element.args);
                    break;
                case "PingPongDelay":
                    nodes[element.nodeId] = new Tone.PingPongDelay(...element.args);
                    break;
                case "PitchShift":
                    nodes[element.nodeId] = new Tone.PitchShift(...element.args);
                    break;
                case "Reverb":
                    nodes[element.nodeId] = new Tone.Reverb(...element.args);
                    break;
                case "StereoWidener":
                    nodes[element.nodeId] = new Tone.StereoWidener(...element.args);
                    break;
                case "Tremolo":
                    nodes[element.nodeId] = new Tone.Tremolo(...element.args);
                    break;
                case "Vibrato":
                    nodes[element.nodeId] = new Tone.Vibrato(...element.args);
                    break;
            }
            break;
        case "connect":
            if (element.connectTo === "toDestination") {
                nodes[element.nodeId].toDestination();
            }
            else {
                nodes[element.nodeId].connect(nodes[element.connectTo]);
            }
            break;
        // schedule
        case "triggerAttackRelease":
            nodes[element.nodeId].triggerAttackRelease(...element.args);
            break;
        case "depth.rampTo":
            nodes[element.nodeId].depth.rampTo(...element.args);
            break;
    }
}
