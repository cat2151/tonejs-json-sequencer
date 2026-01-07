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
  } catch (error) {
    console.log("playWithAudioContext error:", error.name, error.message);

    if (error.name === 'InvalidAccessError') {
      console.log("InvalidAccessError: User interaction required before audio playback");
      alert("音声を再生するには、ページをクリックするかキーを押してください。");
      return;
    }

    try {
      await play();
    } catch (playError) {
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
      } catch (disposeError) {
        console.log("dispose error:", disposeError.name, disposeError.message);
      }
    });
    
    // First pass: create nodes and connections
    j.forEach(element => {
      try {
        if (element.eventType === "createNode" || element.eventType === "connect") {
          scheduleOrExecuteEvent(element);
        }
      } catch (scheduleError) {
        console.log("schedule error:", scheduleError.name, scheduleError.message);
      }
    });
    
    // Wait for all audio buffers to load (important for Sampler)
    await Tone.loaded();
    console.log("All audio buffers loaded");
    
    // Second pass: schedule playback events
    j.forEach(element => {
      try {
        if (element.eventType !== "createNode" && element.eventType !== "connect") {
          scheduleOrExecuteEvent(element);
        }
      } catch (scheduleError) {
        console.log("schedule error:", scheduleError.name, scheduleError.message);
      }
    });
  } catch (error) {
    console.log("play error:", error.name, error.message);
  }
}
