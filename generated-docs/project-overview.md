Last updated: 2026-04-19

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド:
    - **Tone.js**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、シーケンサーなどを容易に作成するためのJavaScriptライブラリ。
    - **Web Audio API**: ブラウザで高度な音声処理を行うためのAPI。Tone.jsの基盤。
- 音楽・オーディオ:
    - **Tone.js**: 音楽合成、エフェクト処理、イベントスケジューリングの中心となるライブラリ。
    - **NDJSON (Newline Delimited JSON)**: ストリーミング再生やライブ編集に対応するため、リアルタイムイベントデータ形式として利用。
- 開発ツール:
    - **TypeScript**: 静的型付けを導入し、大規模なJavaScriptアプリケーションの開発を支援する言語。
    - **npm**: JavaScriptのパッケージ管理ツール。依存関係の解決とスクリプト実行に使用。
    - **GitHub Actions**: 自動テスト、ビルド、デプロイ、ドキュメントの自動生成・翻訳（README.mdの自動英訳）などのCI/CDワークフロー。
- テスト:
    - **TypeScript**: 型定義によるコンパイル時のエラーチェックが主要なテスト手法として機能。
- ビルドツール:
    - **TypeScript Compiler (tsc)**: TypeScriptコードをJavaScript（ES Modules, CommonJS）にコンパイル。
    - **npm scripts**: ビルド、コピー、リネームなどのタスク自動化。
- 言語機能:
    - **JSON**: 音色定義、演奏内容、タイミング情報などの音楽データを記述するための形式。
- 自動化・CI/CD:
    - **GitHub Actions**: リポジトリの各種イベント（コミット、プルリクエストなど）に基づいて、指定されたワークフローを自動実行。
- 開発標準:
    - **.editorconfig**: 異なるエディタやIDE間でコードスタイル（インデント、改行など）を統一するための設定ファイル。

## ファイル階層ツリー
```
.editorconfig
.gitignore
AGENTS.md
LICENSE
NPM_README.md
README.ja.md
README.md
RELEASE.ja.md
RELEASE.md
_config.yml
📁 demo/
  📖 README.md
  🌐 index.html
  🌐 offline-rendering.html
  🎨 streaming-demo.css
  🌐 streaming.html
  🎨 styles.css
📁 demo-library/
  📖 README.md
  🌐 index.html
📁 dist/
  📁 cjs/
    📘 event-scheduler.d.ts
    📜 event-scheduler.js
    📁 factories/
      📘 effect-factory.d.ts
      📜 effect-factory.js
      📘 instrument-factory.d.ts
      📜 instrument-factory.js
    📘 index.d.ts
    📜 index.js
    📘 ndjson-streaming.d.ts
    📜 ndjson-streaming.js
    📘 node-factory.d.ts
    📜 node-factory.js
    📘 offline-renderer.d.ts
    📜 offline-renderer.js
    📘 sequencer-nodes.d.ts
    📜 sequencer-nodes.js
    📁 streaming/
      📘 event-processor.d.ts
      📜 event-processor.js
      📘 ndjson-parser.d.ts
      📘 playback-state.d.ts
      📜 playback-state.js
      📘 prediction-manager.d.ts
      📘 streaming-types.d.ts
    📘 types.d.ts
    📜 types.js
    📁 utils/
      📘 time-parser.d.ts
      📜 time-parser.js
  📁 demo/
    📜 demo-types.js
    📁 effect/
      📜 autofilter.js
      📜 autopanner.js
      📜 autowah.js
      📜 bitcrusher.js
      📜 chebyshev.js
      📜 chorus-object-args.js
      📜 chorus.js
      📜 distortion.js
      📜 feedbackdelay.js
      📜 freeverb.js
      📜 frequencyshifter.js
      📜 generic-ramp-to.js
      📜 jcreverb.js
      📜 lpf-envelope.js
      📜 lpf-q-lfo.js
      📜 lpf-sweep.js
      📜 phaser.js
      📜 pingpongdelay.js
      📜 pitchshift.js
      📜 reverb.js
      📜 stereowidener.js
      📜 tremolo.js
      📜 vibrato.js
    📁 instrument/
      📜 amsynth.js
      📜 delay-vibrato.js
      📜 duosynth.js
      📜 loopend-test.js
      📜 membranesynth.js
      📜 metalsynth.js
      📜 minimal.js
      📜 monosynth.js
      📜 multitimbral.js
      📜 noisesynth.js
      📜 plucksynth.js
      📜 polysynth-fm.js
      📜 portamento.js
      📜 sampler-piano.js
      📜 streaming-test-doremi.js
      📜 supersaw.js
      📜 tempo-test.js
      📜 volume-control.js
    📜 main.js
    📁 modules/
      📜 audioManager.js
      📜 uiManager.js
    📜 offline-rendering.js
    📜 sequenceLoader.js
    📁 sequences/
      📜 basicSequences.js
      📁 effect-sequences/
        📜 delay-distortion-sequences.js
        📜 modulation-sequences.js
        📜 reverb-sequences.js
      📜 effectSequences.js
      📜 synthSequences.js
    📁 streaming-modules/
      📜 debug-output.js
      📜 playback-viewer.js
    📜 streaming.js
  📁 esm/
    📘 event-scheduler.d.ts
    📄 event-scheduler.mjs
    📁 factories/
      📘 effect-factory.d.ts
      📄 effect-factory.mjs
      📘 instrument-factory.d.ts
      📄 instrument-factory.mjs
    📘 index.d.ts
    📄 index.mjs
    📘 ndjson-streaming.d.ts
    📄 ndjson-streaming.mjs
    📘 node-factory.d.ts
    📄 node-factory.mjs
    📘 offline-renderer.d.ts
    📄 offline-renderer.mjs
    📘 sequencer-nodes.d.ts
    📄 sequencer-nodes.mjs
    📁 streaming/
      📘 event-processor.d.ts
      📄 event-processor.mjs
      📘 ndjson-parser.d.ts
      📄 ndjson-parser.mjs
      📘 playback-state.d.ts
      📄 playback-state.mjs
      📘 prediction-manager.d.ts
      📄 prediction-manager.mjs
      📘 streaming-types.d.ts
      📄 streaming-types.mjs
    📘 types.d.ts
    📄 types.mjs
    📁 utils/
      📘 time-parser.d.ts
      📄 time-parser.mjs
  📘 event-scheduler.d.ts
  📜 event-scheduler.js
  📁 factories/
    📘 effect-factory.d.ts
    📜 effect-factory.js
    📘 instrument-factory.d.ts
    📜 instrument-factory.js
  📘 index.d.ts
  📜 index.js
  📄 index.mjs
  📘 ndjson-streaming.d.ts
  📜 ndjson-streaming.js
  📘 node-factory.d.ts
  📜 node-factory.js
  📘 offline-renderer.d.ts
  📜 offline-renderer.js
  📘 sequencer-nodes.d.ts
  📜 sequencer-nodes.js
  📁 streaming/
    📘 event-processor.d.ts
    📜 event-processor.js
    📘 ndjson-parser.d.ts
    📜 ndjson-parser.js
    📘 playback-state.d.ts
    📜 playback-state.js
    📘 prediction-manager.d.ts
    📜 prediction-manager.js
    📘 streaming-types.d.ts
    📜 streaming-types.js
  📘 types.d.ts
  📜 types.js
  📁 utils/
    📘 time-parser.d.ts
    📜 time-parser.js
📁 docs/
  📖 tonejs-components-roadmap.ja.md
  📖 tonejs-components-roadmap.md
📁 examples/
  🌐 cdn-example.html
  📄 npm-example.mjs
  🌐 offline-rendering-example.html
📁 generated-docs/
🌐 googled947dc864c270e07.html
📁 issue-notes/
  📖 100.md
  📖 108.md
  📖 109.md
  📖 110.md
  📖 111.md
  📖 112.md
  📖 120.md
  📖 124.md
  📖 137.md
  📖 139.md
  📖 162.md
  📖 170.md
  📖 180.md
  📖 188.md
  📖 89.md
📊 package-lock.json
📊 package.json
📁 scripts/
  📜 copy-to-dist.js
  📜 rename-to-mjs.js
📁 src/
  📁 demo/
    📘 demo-types.ts
    📁 effect/
      📘 autofilter.ts
      📘 autopanner.ts
      📘 autowah.ts
      📘 bitcrusher.ts
      📘 chebyshev.ts
      📘 chorus-object-args.ts
      📘 chorus.ts
      📘 distortion.ts
      📘 feedbackdelay.ts
      📘 freeverb.ts
      📘 frequencyshifter.ts
      📘 generic-ramp-to.ts
      📘 jcreverb.ts
      📘 lpf-envelope.ts
      📘 lpf-q-lfo.ts
      📘 lpf-sweep.ts
      📘 phaser.ts
      📘 pingpongdelay.ts
      📘 pitchshift.ts
      📘 reverb.ts
      📘 stereowidener.ts
      📘 tremolo.ts
      📘 vibrato.ts
    📁 instrument/
      📘 amsynth.ts
      📘 delay-vibrato.ts
      📘 duosynth.ts
      📘 loopend-test.ts
      📘 membranesynth.ts
      📘 metalsynth.ts
      📘 minimal.ts
      📘 monosynth.ts
      📘 multitimbral.ts
      📘 noisesynth.ts
      📘 plucksynth.ts
      📘 polysynth-fm.ts
      📘 portamento.ts
      📘 sampler-piano.ts
      📘 streaming-test-doremi.ts
      📘 supersaw.ts
      📘 tempo-test.ts
      📘 volume-control.ts
    📘 main.ts
    📁 modules/
      📘 audioManager.ts
      📘 uiManager.ts
    📘 offline-rendering.ts
    📘 sequenceLoader.ts
    📁 sequences/
      📘 basicSequences.ts
      📁 effect-sequences/
        📘 delay-distortion-sequences.ts
        📘 modulation-sequences.ts
        📘 reverb-sequences.ts
      📘 effectSequences.ts
      📘 synthSequences.ts
    📁 streaming-modules/
      📘 debug-output.ts
      📘 playback-viewer.ts
    📘 streaming.ts
    📘 tone-global.d.ts
  📘 event-scheduler.ts
  📁 factories/
    📘 effect-factory.ts
    📘 instrument-factory.ts
  📘 index.ts
  📘 ndjson-streaming.ts
  📘 node-factory.ts
  📘 offline-renderer.ts
  📘 sequencer-nodes.ts
  📁 streaming/
    📘 event-processor.ts
    📘 ndjson-parser.ts
    📘 playback-state.ts
    📘 prediction-manager.ts
    📘 streaming-types.ts
  📘 types.ts
  📁 utils/
    📘 time-parser.ts
📊 tsconfig.all.json
📊 tsconfig.demo-new.json
📊 tsconfig.json
```

## ファイル詳細説明
- **README.ja.md / README.md**: プロジェクトの目的、機能、使用方法、インストール手順、デモリンクなどを記述したメインドキュメント（日本語版と英語版）。
- **LICENSE**: プロジェクトのライセンス情報。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義。
- **.editorconfig**: 異なる開発環境間でのコーディングスタイルの一貫性を保つための設定ファイル。
- **.gitignore**: Gitが追跡しないファイルやディレクトリを指定。
- **_config.yml**: GitHub PagesのJekyll設定ファイル。
- **docs/tonejs-components-roadmap.ja.md**: Tone.jsコンポーネントのJSON対応状況、実装計画、優先順位の詳細なドキュメント。
- **src/index.ts**: ライブラリのエントリポイントで、主要なモジュール（`SequencerNodes`, `playSequence`, `NDJSONStreamingPlayer`など）を集約してエクスポート。
- **src/sequencer-nodes.ts**: Tone.jsのノード（シンセ、エフェクトなど）を一元的に管理するクラスを定義。ノードの作成、取得、破棄を行う。
- **src/event-scheduler.ts**: JSONで定義された音楽イベント（音符の発音、パラメータ変更など）をTone.jsのタイムラインにスケジュールまたは即時実行するコアロジック。
- **src/ndjson-streaming.ts**: NDJSON（改行区切りJSON）形式のイベントストリームをリアルタイムで処理し、ライブ編集やループ再生に対応する機能を提供。
- **src/node-factory.ts**: JSONの定義に基づいて、Tone.jsの楽器（`InstrumentFactory`）やエフェクト（`EffectFactory`）のノードを作成し、相互に接続する機能。
- **src/factories/instrument-factory.ts**: `Synth`, `FMSynth`, `Sampler`など、各種Tone.js楽器ノードのインスタンスを生成するファクトリ関数を定義。
- **src/factories/effect-factory.ts**: `Reverb`, `Chorus`, `Distortion`など、各種Tone.jsエフェクトノードのインスタンスを生成するファクトリ関数を定義。
- **src/offline-renderer.ts**: JSONシーケンスをオフラインでレンダリングし、結果のオーディオをWAVファイルとしてダウンロードするための機能。
- **src/types.ts**: プロジェクト内で使用されるJSONイベント、ノード定義、オプションなどの型定義を集約。
- **src/utils/time-parser.ts**: "0:0:0"のようなTone.jsの時間表記や、その他の時間表現を解析し、秒数に変換するユーティリティ。
- **dist/** (ディレクトリ): TypeScriptソースコードからコンパイルされたJavaScriptファイル（CommonJSおよびES Modules形式）と型定義ファイルを出力。
- **demo/index.html**: プロジェクトの基本的な機能や使用例をブラウザで試せるライブデモのメインページ。
- **demo/streaming.html**: NDJSONストリーミングによるリアルタイム再生とライブ編集のデモページ。
- **demo/offline-rendering.html**: シーケンスをオフラインでレンダリングしてWAVファイルを生成するデモページ。
- **demo-library/index.html**: ライブラリとしてプロジェクトを外部から利用する例を示すデモページ。
- **src/demo/** (ディレクトリ): 各種楽器やエフェクトのデモシーケンスや、デモアプリケーションのUI/オーディオ管理ロジックを含む。

## 関数詳細説明
- **constructor**:
    - `SequencerNodes`: `Tone.js`ノードを管理するためのマップを初期化します。
    - `NDJSONStreamingPlayer`: ストリーミング再生を制御するための設定と状態を初期化します。
    - `OfflineRenderer`: オフラインレンダリングのUIと状態を初期化します。
    - `TimeParser`: BPMや時間解析に必要な内部状態を初期化します。
- **scheduleOrExecuteEvent(Tone, nodes, event, time?)**:
    - 役割: 単一のJSONイベントを解析し、Tone.jsの対応するメソッド（`triggerAttackRelease`、`rampTo`など）をスケジュールまたは即時実行します。
    - 引数: `Tone` (Tone.jsインスタンス), `nodes` (`SequencerNodes`インスタンス), `event` (実行するイベントオブジェクト), `time` (スケジュールする具体的な時間、オプション)。
    - 戻り値: なし。
- **playSequence(Tone, nodes, sequence)**:
    - 役割: JSON形式のシーケンス全体を処理し、各イベントをTone.jsのタイムラインにスケジュールします。
    - 引数: `Tone`, `nodes`, `sequence` (イベントオブジェクトの配列)。
    - 戻り値: `Promise<void>`。
- **createNode(Tone, nodeType, args)**:
    - 役割: JSON定義（`nodeType`, `args`）に基づいてTone.jsの楽器またはエフェクトノードのインスタンスを作成します。
    - 引数: `Tone`, `nodeType` (作成するノードのタイプ名), `args` (ノードのコンストラクタ引数)。
    - 戻り値: 作成された`Tone.js`ノード。
- **connectNode(sourceNode, destinationNode, connectionType?)**:
    - 役割: 2つのTone.jsノードを接続します（例: `synth.connect(reverb)`）。
    - 引数: `sourceNode`, `destinationNode` (接続元と接続先のノード), `connectionType` (接続の種類、オプション)。
    - 戻り値: なし。
- **createEffect(Tone, type, args)**:
    - 役割: 指定されたタイプのエフェクトノードを生成します。
    - 引数: `Tone`, `type` (エフェクトのタイプ名), `args` (エフェクトのコンストラクタ引数)。
    - 戻り値: 生成された`Tone.js`エフェクトノード。
- **createInstrument(Tone, type, args)**:
    - 役割: 指定されたタイプの楽器ノードを生成します。`PolySynth`や`Sampler`などの特殊なケースも処理します。
    - 引数: `Tone`, `type` (楽器のタイプ名), `args` (楽器のコンストラクタ引数)。
    - 戻り値: 生成された`Tone.js`楽器ノード。
- **createPolySynth(Tone, args)**:
    - 役割: `Tone.PolySynth`インスタンスを生成します。
    - 引数: `Tone`, `args` (コンストラクタ引数)。
    - 戻り値: `Tone.PolySynth`インスタンス。
- **createSampler(Tone, args)**:
    - 役割: `Tone.Sampler`インスタンスを生成します。
    - 引数: `Tone`, `args` (コンストラクタ引数)。
    - 戻り値: `Tone.Sampler`インスタンス。
- **audioBufferToWav(audioBuffer)**:
    - 役割: `AudioBuffer`オブジェクトをWAV形式の`Blob`に変換します。
    - 引数: `audioBuffer` (変換する`AudioBuffer`)。
    - 戻り値: `Blob` (WAVデータ)。
- **downloadWav(blob, filename)**:
    - 役割: 生成されたWAV `Blob`をユーザーのブラウザにダウンロードさせます。
    - 引数: `blob` (ダウンロードするWAV `Blob`), `filename` (ファイル名)。
    - 戻り値: なし。
- **parseNDJSON(ndjsonStringOrArray)**:
    - 役割: NDJSON形式の文字列、またはJSONイベントオブジェクトの配列を解析し、整形されたイベント配列を返します。
    - 引数: `ndjsonStringOrArray` (NDJSON文字列またはイベント配列)。
    - 戻り値: 解析されたイベントオブジェクトの配列。
- **updateBPM(bpm)**:
    - 役割: `Tone.Transport`のBPM（テンポ）設定を更新します。
    - 引数: `bpm` (新しいBPM値)。
    - 戻り値: なし。
- **parseTimeToSeconds(time, now, bpm)**:
    - 役割: さまざまな時間表記（例: "4n", "0:0:0", "1.5"）を絶対的な秒数に変換します。
    - 引数: `time` (解析する時間文字列または数値), `now` (現在の時刻、基準となる秒数), `bpm` (現在のBPM)。
    - 戻り値: 秒数。
- **rampParameter(target, value, rampTime, startTime?)**:
    - 役割: `Tone.js`のパラメータ（例: `synth.volume`）を指定された時間で滑らかに目標値に変化させます（`rampTo`メソッドを使用）。
    - 引数: `target` (対象となる`Tone.Param`または`Tone.Signal`), `value` (目標値), `rampTime` (変化にかける時間), `startTime` (変化を開始する時間、オプション)。
    - 戻り値: なし。
- **resolveTarget(Tone, nodes, event, time?)**:
    - 役割: イベントオブジェクトから、操作対象となるTone.jsノードまたはそのパラメータ（例: `synth.filter.Q`）を解決します。
    - 引数: `Tone`, `nodes`, `event`, `time` (スケジュール時間、オプション)。
    - 戻り値: 解決されたターゲットオブジェクトまたはundefined。
- **start() (NDJSONStreamingPlayer)**:
    - 役割: NDJSONストリーミング再生を開始します。イベントの初期処理とループを開始します。
    - 引数: `ndjsonEventsOrString` (再生するNDJSONイベントまたは文字列)。
    - 戻り値: `Promise<void>`.
- **stop() (NDJSONStreamingPlayer)**:
    - 役割: NDJSONストリーミング再生を停止し、関連するタイマーとノードを破棄します。
    - 引数: なし。
    - 戻り値: なし。
- **initializePlayback() (NDJSONStreamingPlayer)**:
    - 役割: NDJSONストリーミングプレーヤーの内部状態とTone.jsのタイムラインを初期化します。
    - 引数: なし。
    - 戻り値: なし。
- **get(nodeId)**:
    - 役割: 指定された`nodeId`に対応するTone.jsノードを取得します。
    - 引数: `nodeId` (取得するノードのID)。
    - 戻り値: `Tone.js`ノードまたは`undefined`。
- **set(nodeId, node)**:
    - 役割: 指定された`nodeId`にTone.jsノードを登録します。
    - 引数: `nodeId` (登録するノードのID), `node` (登録する`Tone.js`ノード)。
    - 戻り値: なし。
- **disposeSingle(nodeId)**:
    - 役割: 単一のTone.jsノードとそのIDを管理マップから破棄します。
    - 引数: `nodeId` (破棄するノードのID)。
    - 戻り値: なし。
- **disposeAll()**:
    - 役割: 管理されているすべてのTone.jsノードを破棄し、マップをクリアします。
    - 引数: なし。
    - 戻り値: なし。
- **createNodesAndConnections() (EventProcessor)**:
    - 役割: ストリーミングの初期化段階で、イベントデータに基づいてTone.jsノードを作成し、相互接続します。
    - 引数: なし。
    - 戻り値: なし。
- **scheduleEvent() (EventProcessor)**:
    - 役割: 個々のイベントをTone.jsのタイムラインにスケジュールします。
    - 引数: `Tone`, `nodes`, `event`, `time`, `loopCount`など。
    - 戻り値: なし。
- **calculateSequenceDuration() (EventProcessor)**:
    - 役割: 現在のシーケンス全体の再生時間を計算します。
    - 引数: `Tone`, `events`など。
    - 戻り値: シーケンスの総再生時間（秒）。
- **rebuild() (PlaybackViewer)**:
    - 役割: NDJSONストリーミングデモの再生ビューアのUI（イベントラインなど）を再構築します。
    - 引数: なし。
    - 戻り値: なし。

## 関数呼び出し階層ツリー
```
playSequence(Tone, nodes, sequence)
├─ resolveTarget(Tone, nodes, event, time?)
├─ rampParameter(target, value, rampTime, startTime?)
├─ scheduleOrExecuteEvent(Tone, nodes, event, time?)
│  ├─ resolveTarget(...)
│  ├─ rampParameter(...)
│  └─ createNode(Tone, nodeType, args)
│     ├─ createInstrument(Tone, type, args)
│     │  ├─ createPolySynth(Tone, args)
│     │  └─ createSampler(Tone, args)
│     └─ createEffect(Tone, type, args)
│        └─ startIfAvailable(effect)
├─ createNode(...)
├─ connectNode(sourceNode, destinationNode, connectionType?)
├─ nodes.get(nodeId)
├─ nodes.set(nodeId, node)
└─ nodes.disposeAll()

NDJSONStreamingPlayer.start(ndjsonEventsOrString)
├─ initializePlayback()
│  ├─ createNodesAndConnections()
│  │  └─ scheduleEvent()
│  └─ calculateSequenceDuration()
├─ updateEvents()
├─ player.isPlaying()
├─ predictionManager.generatePredictions()
│  └─ timeParser.parseTimeToSeconds(time, now, bpm)
└─ eventProcessor.processEvents()

OfflineRenderer.render(sequence, options)
├─ Tone.start()
├─ playSequence(...)
├─ Tone.Offline()
├─ audioBufferToWav(audioBuffer)
└─ downloadWav(blob, filename)

audioManager.playSequence(sequence)
├─ Tone.start()
├─ ensureAudioContextStarted()
└─ playSequence(...)

streaming.play()
├─ Tone.start()
├─ NDJSONStreamingPlayer.start(...)
├─ buildEventLineMap()
├─ updateNumberedNDJSON()
└─ playbackViewer.startPositionUpdates()

playbackViewer.rebuild(events, options)
├─ playbackViewer.buildTracks()
├─ playbackViewer.startPositionUpdates()
└─ playbackViewer.updateProgressFromNow()

---
Generated at: 2026-04-19 07:15:16 JST
