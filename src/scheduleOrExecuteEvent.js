// Tone.js JSON Sequencer - Event Scheduler
function scheduleOrExecuteEvent(element) {
  // console.log(element);
  switch (element.eventType) {
    // execute
    case "createNode":
      switch (element.nodeType) {
        case "Synth":
          nodes[element.nodeId] = new Tone.Synth();
          break;
        case "FMSynth":
          nodes[element.nodeId] = new Tone.FMSynth(element.args);
          break;
        case "Vibrato":
          nodes[element.nodeId] = new Tone.Vibrato(...element.args);
          break;
      }
      break;
    case "connect":
      if (element.connectTo == "toDestination") {
        nodes[element.nodeId].toDestination();
      } else {
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
