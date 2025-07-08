// Tone.js JSON Sequencer Data

// シーケンスの定義
const sequenceDefinitions = [
  {
    name: "ディレイビブラート",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "FMSynth",
        "args": {
          "harmonicity": 7,
          "modulationIndex": 20,
          "modulationEnvelope": {
            "attack": 0.001,
            "decay": 0.5,
            "sustain": 0.3,
            "release": 0.3
          },
          "envelope": {
            "attack": 0.001,
            "decay": 0.2,
            "sustain": 0.3,
            "release": 0.5
          },
          "portamento": 0
        }
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Vibrato",
        "args": [7, 0]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "758i", "+0i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0.2", "192i", "+192i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0", "10i", "+758i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "758i", "+768i"]
      },
      {
        "eventType": "depth.rampTo",
        "nodeId": 1,
        "args": ["0.2", "192i", "+960i"]
      }
    ]
  },
  {
    name: "test",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth",
        "args": {
          "oscillator": {
            "type": "sine"
          },
          "envelope": {
            "attack": 0.1,
            "decay": 0.2,
            "sustain": 0.5,
            "release": 0.8
          }
        }
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["A4", "500i", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["F4", "500i", "+500i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "500i", "+1000i"]
      }
    ]
  }
];

// 後方互換性のために、オブジェクト形式も保持
const sequenceDataCollection = {};
sequenceDefinitions.forEach(seq => {
  sequenceDataCollection[seq.name] = seq.data;
});

// デフォルトのシーケンスデータ
const sequenceData = sequenceDefinitions[0].data;
