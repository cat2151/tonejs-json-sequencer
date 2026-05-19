Last updated: 2026-05-20

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js（Web Audio APIを抽象化し、音楽的な表現を可能にするJavaScriptライブラリ）、Web Audio API（ブラウザでオーディオ処理を行う標準API）
- 音楽・オーディオ: JSON/NDJSON（音楽の音色定義、演奏内容、タイミング情報などをデータとして記述するためのフォーマット）
- 開発ツール: TypeScript（JavaScriptに静的型付けを追加する言語）、npm（Node.jsのパッケージマネージャ）
- ビルドツール: TypeScript Compiler（tsc、TypeScriptコードをJavaScriptにコンパイル）、CommonJS/ES Modules（異なるモジュール形式へのビルド出力）
- 言語機能: JavaScript（ES ModulesおよびCommonJS形式でのモジュール実装）、TypeScript（型安全な開発）
- 自動化・CI/CD: GitHub Actions（リポジトリの自動化ワークフロー、例としてドキュメントの自動翻訳に利用）、カスタムスクリプト（ビルド後のファイル操作など）
- 開発標準: EditorConfig（異なるエディタやIDE間でコードスタイルを統一するための設定）

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
📖 AGENTS.md
📄 LICENSE
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📖 RELEASE.ja.md
📖 RELEASE.md
📄 _config.yml
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
- **README.md / README.ja.md**: プロジェクトの概要、使い方、設計思想などを説明する主要なドキュメント。日本語版と英語版がある。
- **LICENSE**: プロジェクトのライセンス情報（著作権や利用条件）。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどを定義するファイル。
- **src/index.ts**: ライブラリのエントリポイント。SequencerNodes、playSequence、NDJSONStreamingPlayerなどの主要モジュールをエクスポートする。
- **src/sequencer-nodes.ts**: Tone.jsのオーディオノードを管理（作成、取得、破棄）するためのクラス。ノードIDによってTone.jsオブジェクトを追跡する。
- **src/event-scheduler.ts**: JSONで記述されたイベント（ノード作成、接続、音符の発音、パラメータ変更など）をTone.jsのタイムラインにスケジュールし、実行するコアロジックを実装。
- **src/ndjson-streaming.ts**: NDJSON（改行区切りJSON）形式の音楽データをリアルタイムでストリーミング再生、ライブ編集、ループ再生する機能を提供するクラス。
- **src/node-factory.ts**: Tone.jsの楽器（Instrument）とエフェクト（Effect）のファクトリを統合し、JSONイベントに基づいて新しいTone.jsノードを作成し、接続する役割を担う。
- **src/factories/instrument-factory.ts**: JSON定義からTone.jsの楽器ノード（Synth, FMSynthなど）を作成する。
- **src/factories/effect-factory.ts**: JSON定義からTone.jsのエフェクトノード（Reverb, Chorusなど）を作成する。
- **src/offline-renderer.ts**: JSONシーケンスをWeb Audio APIを使ってオフラインでレンダリングし、結果のAudioBufferをWAVファイルとしてダウンロードする機能を提供する。
- **src/utils/time-parser.ts**: "0:0:0"のようなTone.jsの時刻表記や、相対的な時間指定（例: "4n"）を実際の秒数に変換するためのユーティリティ。
- **src/types.ts**: プロジェクト全体で使用されるカスタムの型定義（SequenceEvent, NodeEventなど）。
- **src/streaming/**: NDJSONストリーミング機能に関連するサブモジュール群。
    - **event-processor.ts**: NDJSONストリーミング中に新しいイベントの作成、接続、スケジュールを処理する。
    - **ndjson-parser.ts**: NDJSON文字列をパースして`SequenceEvent`の配列に変換する。
    - **playback-state.ts**: NDJSONストリーミング再生の状態（再生時刻、ループ回数、処理済みイベント）を管理する。
    - **prediction-manager.ts**: 将来のイベントを予測し、スムーズな再生を可能にする。
- **demo/index.html**: プロジェクトの基本的なウェブデモページ。
- **demo/streaming.html**: NDJSONストリーミングとライブ編集機能を示すデモページ。
- **demo/offline-rendering.html**: シーケンスのオフラインレンダリング機能を示すデモページ。
- **dist/**: TypeScriptで書かれたソースコードがコンパイルされたJavaScriptファイルと型定義ファイルが格納されるディレクトリ。CommonJS (cjs/) と ES Modules (esm/) の両形式で提供される。
- **examples/**: ライブラリの基本的な使用例を示すコードとHTMLファイル。

## 関数詳細説明
- **SequencerNodes クラス**
    - `constructor()`: 新しい `SequencerNodes` インスタンスを初期化し、Tone.jsノードを管理するためのマップを作成します。
    - `get(nodeId: number)`: 指定された `nodeId` に関連付けられたTone.jsノードを返します。
        - 引数: `nodeId` (number) - 取得したいノードのID。
        - 戻り値: `Tone.ToneAudioNode | undefined` - 対応するTone.jsノード、または見つからない場合は `undefined`。
    - `set(nodeId: number, node: Tone.ToneAudioNode)`: 指定された `nodeId` にTone.jsノードを関連付けます。
        - 引数: `nodeId` (number) - 設定したいノードのID、`node` (Tone.ToneAudioNode) - 関連付けるTone.jsノード。
        - 戻り値: `void`
    - `disposeSingle(nodeId: number)`: 指定された `nodeId` のノードを解放し、マップから削除します。
    - `disposeNode(nodeId: number)`: 指定された`nodeId`を持つノードを解放し、関連する参照をクリーンアップします。
    - `disposeAll()`: 管理している全てのTone.jsノードを解放し、マップをクリアします。
- **scheduleOrExecuteEvent(Tone: any, nodes: SequencerNodes, event: SequenceEvent, time: number | string, debug: boolean)**
    - 役割: 単一のJSONイベントをTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - 引数: `Tone` (any) - Tone.jsライブラリのインスタンス、`nodes` (SequencerNodes) - ノードマネージャ、`event` (SequenceEvent) - 処理するJSONイベント、`time` (number | string) - イベントの実行時刻、`debug` (boolean) - デバッグモードのフラグ。
    - 戻り値: `Promise<void>`
- **playSequence(Tone: any, nodes: SequencerNodes, sequence: SequenceEvent[], debug: boolean)**
    - 役割: JSONで定義されたシーケンス全体を非同期的に再生します。
    - 引数: `Tone` (any) - Tone.jsライブラリのインスタンス、`nodes` (SequencerNodes) - ノードマネージャ、`sequence` (SequenceEvent[]) - 再生するJSONシーケンス、`debug` (boolean) - デバッグモードのフラグ。
    - 戻り値: `Promise<void>`
- **NDJSONStreamingPlayer クラス**
    - `constructor(Tone: any, nodes: SequencerNodes, options?: NDJSONStreamingPlayerOptions)`: 新しい `NDJSONStreamingPlayer` インスタンスを初期化し、NDJSONストリーミング再生を設定します。
    - `start(ndjson: string | SequenceEvent[], startTime?: number)`: NDJSON文字列またはイベント配列からストリーミング再生を開始します。
    - `stop()`: ストリーミング再生を停止します。
    - `playing()`: 現在再生中かどうかを返します。
- **createNode(Tone: any, nodes: SequencerNodes, event: CreateNodeEvent)**
    - 役割: `CreateNodeEvent`に基づいて新しいTone.jsノード（楽器またはエフェクト）を作成し、`SequencerNodes`に登録します。
    - 引数: `Tone` (any), `nodes` (SequencerNodes), `event` (CreateNodeEvent)。
    - 戻り値: `Promise<Tone.ToneAudioNode>`
- **connectNode(nodes: SequencerNodes, event: ConnectEvent)**
    - 役割: `ConnectEvent`に基づいて、指定されたノード間を接続します。
    - 引数: `nodes` (SequencerNodes), `event` (ConnectEvent)。
    - 戻り値: `Promise<void>`
- **audioBufferToWav(buffer: AudioBuffer)**
    - 役割: `AudioBuffer`オブジェクトをWAV形式のBlobデータに変換します。
    - 引数: `buffer` (AudioBuffer) - 変換するオーディオバッファ。
    - 戻り値: `Blob` - WAV形式のBlobデータ。
- **downloadWav(buffer: AudioBuffer, filename: string)**
    - 役割: `AudioBuffer`をWAVファイルとしてダウンロードします。
    - 引数: `buffer` (AudioBuffer) - ダウンロードするオーディオバッファ、`filename` (string) - ファイル名。
    - 戻り値: `void`
- **OfflineRenderer クラス**
    - `constructor(Tone: any)`: 新しい `OfflineRenderer` インスタンスを初期化します。
    - `render(nodes: SequencerNodes, sequence: SequenceEvent[], duration: number, callback: (buffer: AudioBuffer) => void, progressCallback?: (progress: number) => void)`: 指定されたシーケンスをオフラインでレンダリングし、結果を`AudioBuffer`としてコールバック関数に渡します。
        - 引数: `nodes` (SequencerNodes), `sequence` (SequenceEvent[]), `duration` (number) - レンダリングする時間（秒）、`callback` (function), `progressCallback` (function, オプション)。
        - 戻り値: `void`
- **createInstrument(Tone: any, instrumentType: InstrumentType, args: any[])**
    - 役割: 指定された`instrumentType`と引数に基づいてTone.jsの楽器インスタンスを作成します。
    - 引数: `Tone` (any), `instrumentType` (string) - 楽器の種類、`args` (any[]) - コンストラクタ引数。
    - 戻り値: `Tone.ToneAudioNode`
- **createEffect(Tone: any, effectType: EffectType, args: any[])**
    - 役割: 指定された`effectType`と引数に基づいてTone.jsのエフェクトインスタンスを作成します。
    - 引数: `Tone` (any), `effectType` (string) - エフェクトの種類、`args` (any[]) - コンストラクタ引数。
    - 戻り値: `Tone.ToneAudioNode`
- **resolveTarget(Tone: any, nodes: SequencerNodes, nodeId: number, targetPath: string)**
    - 役割: `nodeId`とドット区切りの`targetPath`から、対応するTone.jsのパラメータオブジェクトを解決します。
    - 引数: `Tone` (any), `nodes` (SequencerNodes), `nodeId` (number), `targetPath` (string)。
    - 戻り値: `any` - 解決されたターゲットオブジェクトまたはパラメータ。
- **rampParameter(param: Tone.Param, value: number, rampTime: string | number, time?: number | string)**
    - 役割: Tone.jsのパラメータを、指定された時間で滑らかに目標値へ変化させます。
    - 引数: `param` (Tone.Param) - 変化させるTone.jsパラメータ、`value` (number) - 目標値、`rampTime` (string | number) - 変化にかかる時間、`time` (number | string, オプション) - スケジュールされた開始時刻。
    - 戻り値: `void`
- **parseNDJSON(ndjsonString: string)**
    - 役割: NDJSON文字列をパースし、`SequenceEvent`オブジェクトの配列を返します。
    - 引数: `ndjsonString` (string) - NDJSON形式の文字列。
    - 戻り値: `SequenceEvent[]`
- **TimeParser クラス**
    - `constructor(bpm: number)`: 新しい `TimeParser` インスタンスを初期化し、BPMを設定します。
    - `updateBPM(newBPM: number)`: 現在のBPMを更新します。
    - `parseTimeToSeconds(time: string | number)`: Tone.jsの時刻表記（例: "4n", "0:0:0"）や数値（秒）を秒数に変換します。
    - `parseTickTime(tickTime: string)`: tickベースの時刻表記を秒数に変換します。

## 関数呼び出し階層ツリー
```
- scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
  - playSequence ()
    - resolveTarget (dist/cjs/event-scheduler.js)
    - rampParameter ()
    - start ()
    - stop ()
    - get ()
    - disposeAll ()
    - createNode (dist/cjs/node-factory.d.ts)
    - connectNode ()
- createInstrument (dist/cjs/factories/instrument-factory.d.ts)
  - createPolySynth ()
    - createSampler ()
- set ()
- parseNDJSON (dist/cjs/streaming/ndjson-parser.d.ts)
- copyRecursive (scripts/copy-to-dist.js)
- renameFiles (scripts/rename-to-mjs.js)
  - updateImports ()
- createEffect (dist/cjs/factories/effect-factory.d.ts)
  - startIfAvailable ()
- disposeSingle ()
- disposeNode ()
- debug ()
- isSchedulableEvent ()
- getTimeNotation ()
- getEventTime ()
- clear ()
- generate ()
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (undefined)
- loadAllSequences (dist/demo/sequenceLoader.js)
- createInitialTimingStats (dist/demo/streaming-modules/debug-output.js)

---
Generated at: 2026-05-20 07:35:21 JST
