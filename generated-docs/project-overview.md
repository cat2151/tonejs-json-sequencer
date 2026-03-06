Last updated: 2026-03-07

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: **HTML/CSS** (デモアプリケーションのUI), **JavaScript** (ES ModulesおよびCommonJS形式で提供), **TypeScript** (開発言語として型安全性を提供), **Tone.js** (Web Audio APIを抽象化し、Web上でのリッチな音楽表現を可能にする中核ライブラリ)
- 音楽・オーディオ: **Tone.js** (シンセサイザー、エフェクト、スケジューリングなどのオーディオ処理)
- 開発ツール: **TypeScript** (ソースコードの型チェックとJavaScriptへのコンパイル), **npm** (Node.jsパッケージ管理), **@types/node** (Node.js環境でのTypeScript型定義)
- テスト: プロジェクト情報に明示的なテストフレームワークの記載はありません。
- ビルドツール: **TypeScript Compiler (tsc)** (TypeScriptソースをJavaScriptおよび型定義ファイルに変換), **GitHub Actions** (自動ビルド、デプロイ、READMEの翻訳などに利用)
- 言語機能: **TypeScript** (型定義と静的解析によるコード品質向上), **JavaScript (ES Modules/CommonJS)** (ブラウザおよびNode.js環境での互換性を提供)
- 自動化・CI/CD: **GitHub Actions** (継続的インテグレーションおよびデプロイの自動化)
- 開発標準: **.editorconfig** (IDE設定によりコーディングスタイルを統一)

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
  📖 185.md
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
- **`README.ja.md`**: プロジェクトの目的、機能、使用方法、開発状況などを日本語で記述したメインドキュメント。
- **`src/`ディレクトリ**: プロジェクトのTypeScriptソースコードが格納されています。
    - **`src/index.ts`**: ライブラリのエントリーポイント。主要なクラスや関数をエクスポートします。
    - **`src/event-scheduler.ts`**: シーケンスイベントをTone.jsのタイムラインにスケジュール・実行するロジックを管理します。
    - **`src/sequencer-nodes.ts`**: Tone.jsのオーディオノード（シンセ、エフェクトなど）を管理するクラスが定義されています。
    - **`src/node-factory.ts`**: JSONイベントからTone.jsノードを作成・接続するためのファクトリ関数を提供します。
    - **`src/factories/instrument-factory.ts`**: `Synth`や`FMSynth`などのインストゥルメントノードを作成する具体的なロジックを含みます。
    - **`src/factories/effect-factory.ts`**: `Reverb`や`Chorus`などのエフェクトノードを作成する具体的なロジックを含みます。
    - **`src/ndjson-streaming.ts`**: NDJSON形式のストリーミングデータをリアルタイムで再生、ライブ編集、ループ再生を可能にする機能を提供します。
    - **`src/offline-renderer.ts`**: シーケンスをオフラインでレンダリングし、WAVファイルとして出力する機能を提供します。
    - **`src/streaming/`ディレクトリ**: NDJSONストリーミング機能のサブモジュールです。
        - **`src/streaming/event-processor.ts`**: ストリーミングイベントの処理とTone.jsへのスケジューリングを行います。
        - **`src/streaming/ndjson-parser.ts`**: NDJSON文字列をパースしてイベントオブジェクトに変換します。
        - **`src/streaming/playback-state.ts`**: ストリーミング再生の状態（現在のイベント、ループ回数など）を管理します。
        - **`src/streaming/prediction-manager.ts`**: イベントの先読みとスケジューリングの予測を管理します。
    - **`src/types.ts`**: プロジェクト全体で使用されるカスタム型定義（シーケンスイベントの構造など）が含まれています。
    - **`src/utils/time-parser.ts`**: Tone.jsの多様な時間表記（例: "4n", "0:0:2"）を秒単位に変換するユーティリティを提供します。
    - **`src/demo/`ディレクトリ**: デモンストレーション用のTypeScriptソースコードが格納されています。
        - **`src/demo/main.ts`**: デモアプリケーションの主要なロジックを制御します。
        - **`src/demo/modules/audioManager.ts`**: 音声再生に関するロジックを管理し、`tonejs-json-sequencer`ライブラリをラップします。
        - **`src/demo/modules/uiManager.ts`**: デモUIのイベントリスナーや表示更新を管理します。
        - **`src/demo/sequences/`ディレクトリ**: 各種シンセ、エフェクト、奏法をデモンストレーションするためのJSONシーケンスデータが格納されています。
- **`dist/`ディレクトリ**: TypeScriptコンパイラによって生成されたJavaScriptファイル、ES Modules (`.mjs`)、CommonJS (`.js`)、および型定義ファイル (`.d.ts`) が格納されています。このディレクトリ内のファイルがライブラリとして配布・利用されます。
- **`demo/`ディレクトリ (トップレベル)**: デモアプリケーションのHTMLとCSSファイルです。
    - **`demo/index.html`**: 基本的なシーケンス再生デモのページです。
    - **`demo/streaming.html`**: NDJSONストリーミングによるライブ編集・ループ再生デモのページです。
    - **`demo/offline-rendering.html`**: オフラインレンダリングデモのページです。
- **`demo-library/index.html`**: ライブラリとしてプロジェクトが使用される際の具体的な例を示すHTMLファイルです。
- **`docs/`ディレクトリ**: 詳細なドキュメントファイルが格納されています。
    - **`docs/tonejs-components-roadmap.ja.md`**: Tone.jsコンポーネントのJSON対応ロードマップの詳細が日本語で記述されています。
- **`examples/`ディレクトリ**: npmやCDN経由でライブラリを使用する際の簡単な使用例が含まれています。
- **`scripts/`ディレクトリ**: ビルドプロセスやファイル操作を自動化するための補助スクリプトが格納されています。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。

## 関数詳細説明
- `scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent, time: Tone.Unit.Time)`:
    - 役割: 単一のシーケンスイベント（音符発音、パラメータ変更など）をTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - 引数: `Tone` (Tone.jsライブラリインスタンス), `nodes` (ノード管理インスタンス), `event` (実行するイベントオブジェクト), `time` (イベント実行時刻)。
    - 機能: イベントタイプ（`createNode`, `connect`, `triggerAttackRelease`, `rampTo`など）に応じて、対応するTone.jsのメソッドを呼び出し、音響イベントを発生させます。
- `playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[], onEventScheduled?: (event: SequenceEvent) => void)`:
    - 役割: JSONで定義されたシーケンス全体を再生します。
    - 引数: `Tone`, `nodes`, `sequence` (イベントオブジェクトの配列), `onEventScheduled` (イベントがスケジュールされた際に呼び出されるオプションのコールバック関数)。
    - 機能: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、指定された時刻に実行されるようTone.jsのトランスポートにスケジュールします。
- `SequencerNodes` クラス:
    - 役割: 作成されたTone.jsノード（シンセ、エフェクトなど）を管理し、一意のIDを通じてアクセスできるようにします。
    - `constructor()`: ノードを格納する内部マップを初期化します。
    - `get(nodeId: number)`: 指定された`nodeId`に関連付けられたTone.jsノードを取得します。
    - `set(nodeId: number, node: Tone.ToneAudioNode)`: 指定された`nodeId`にTone.jsノードを登録します。
    - `disposeSingle(nodeId: number)`: 指定された`nodeId`のノードを破棄し、マップから削除します。
    - `disposeAll()`: 管理されている全てのノードを破棄し、マップをクリアします。
- `NDJSONStreamingPlayer` クラス:
    - 役割: NDJSON（改行区切りJSON）形式のシーケンスデータをリアルタイムでストリーミング再生、ライブ編集、ループ再生をサポートします。
    - `constructor(Tone: typeof Tone, nodes: SequencerNodes, options: NDJSONStreamingPlayerOptions)`: プレーヤーのインスタンスを作成し、Tone.jsインスタンス、ノードマネージャ、およびオプション（先読み時間、ループ設定、イベントコールバックなど）を初期化します。
    - `start(ndjsonOrEvents: string | SequenceEvent[], startTime?: Tone.Unit.Time)`: NDJSON文字列またはイベント配列をロードし、ストリーミング再生を開始または既存の再生を更新します。
    - `stop()`: 現在のストリーミング再生を停止します。
- `createNode(Tone: typeof Tone, event: CreateNodeEvent)` (in `node-factory.ts`):
    - 役割: `createNode`タイプのJSONイベントに基づいて新しいTone.jsノード（インストゥルメントまたはエフェクト）を作成します。
    - 引数: `Tone`, `event` (CreateNodeEventオブジェクト)。
    - 機能: イベントの`nodeType`と`args`に基づき、`createInstrument`または`createEffect`を呼び出して適切なTone.jsノードインスタンスを生成します。
- `connectNode(nodes: SequencerNodes, event: ConnectNodeEvent)` (in `node-factory.ts`):
    - 役割: `connect`タイプのJSONイベントに基づいて、既存のTone.jsノード同士を接続します。
    - 引数: `nodes`, `event` (ConnectNodeEventオブジェクト)。
    - 機能: `nodeId`で指定されたソースノードを、`connectTo`で指定されたターゲット（別のノードIDまたは`'toDestination'`）に接続します。
- `createInstrument(Tone: typeof Tone, type: InstrumentNodeType, args: any[])` (in `instrument-factory.ts`):
    - 役割: 指定された種類のTone.jsインストゥルメント（例: `Synth`, `FMSynth`, `Sampler`）を作成します。
    - 引数: `Tone`, `type` (インストゥルメントのタイプ名), `args` (コンストラクタ引数)。
    - 機能: 内部で`switch`文を使用し、タイプに応じたTone.jsインストゥルメントのインスタンスを生成して返します。
- `createEffect(Tone: typeof Tone, type: EffectNodeType, args: any[])` (in `effect-factory.ts`):
    - 役割: 指定された種類のTone.jsエフェクト（例: `Reverb`, `Chorus`, `Distortion`）を作成します。
    - 引数: `Tone`, `type` (エフェクトのタイプ名), `args` (コンストラクタ引数)。
    - 機能: 内部で`switch`文を使用し、タイプに応じたTone.jsエフェクトのインスタンスを生成して返します。
- `parseNDJSON(ndjsonStringOrEvents: string | SequenceEvent[])` (in `ndjson-parser.ts`):
    - 役割: NDJSON文字列またはイベント配列を、統一された`SequenceEvent`オブジェクトの配列にパースします。
    - 引数: `ndjsonStringOrEvents` (NDJSON文字列または既存のイベント配列)。
    - 機能: NDJSON文字列を行ごとにJSONオブジェクトに変換し、パースエラーを適切に処理しながらイベント配列を生成します。
- `TimeParser` クラス (in `time-parser.ts`):
    - 役割: Tone.jsで使用される様々な時間表記（例: "4n", "0:0:2", "1s"）を秒単位に変換するユーティリティ機能を提供します。
    - `constructor(bpm: number)`: 初期BPMを設定してインスタンスを作成します。
    - `updateBPM(newBPM: number)`: 実行時にBPM（拍子あたりの時間）を更新します。
    - `parseTimeToSeconds(time: Tone.Unit.Time)`: 与えられたTone.jsの時間表記を秒単位の数値に変換します。
    - `parseToneNotation(time: string)`: Tone.js固有の「小節:拍:16分音符」形式の文字列を秒に変換します。

## 関数呼び出し階層ツリー
```
- playSequence
  - scheduleOrExecuteEvent
    - resolveTarget
    - rampParameter
    - createNode
      - createInstrument
        - createPolySynth
        - createSampler
      - createEffect
        - startIfAvailable
    - connectNode
- NDJSONStreamingPlayer
  - constructor
  - start
    - initializePlayback
    - updateEvents
    - processEvents (streaming/event-processor.ts)
      - scheduleEvent
        - scheduleOrExecuteEvent
    - parseNDJSON (streaming/ndjson-parser.ts)
  - stop
- SequencerNodes
  - constructor
  - get
  - set
  - disposeSingle
  - disposeNode
  - disposeAll
- OfflineRenderer
  - constructor
  - render
    - calculateSequenceDuration
    - getEventTime
    - playSequence
  - audioBufferToWav
    - writeString
  - downloadWav
- TimeParser
  - constructor
  - updateBPM
  - parseTimeToSeconds
  - parseTickTime
  - isToneNotation
  - parseToneNotation
  - parseBarBeatTime
- scripts/copy-to-dist.js
  - copyRecursive
- scripts/rename-to-mjs.js
  - renameFiles
    - updateImports

---
Generated at: 2026-03-07 07:12:40 JST
