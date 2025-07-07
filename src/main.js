// Tone.js JSON Sequencer Main Script
var outputArea, textarea1, nodes = [];

window.addEventListener("load", () => {
  // outputArea = document.getElementById('output');
  const button = document.querySelector('button');
  textarea1 = document.querySelector('textarea');
  textarea1.value = JSON.stringify(sequenceData, null, 2); // from data.js
  textarea1.addEventListener('input', play);

  button.onclick = async () => {
    await Tone.start();
    play();
  };
});

function play() {
  try {
    const json = textarea1.value;
    const j = JSON.parse(json);
    // dispose
    nodes.forEach(element => element.dispose());
    // play
    j.forEach(element => scheduleOrExecuteEvent(element));
  } catch (error) {
    console.log("error : [" + error + "]");
  }
}
