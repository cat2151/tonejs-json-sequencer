Last updated: 2026-02-23

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: 
  - **HTML/CSS/JavaScript**: デモページやライブラリの利用例で、Webブラウザ上で音楽シーケンスの再生と操作を行うためのUI構築に使用されます。
  - **Tone.js**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、シーケンサーなどの高度な音楽表現を可能にするJavaScriptライブラリです。本プロジェクトの核となる技術です。
- 音楽・オーディオ: 
  - **Tone.js**: 音色定義、エフェクトチェーン、イベントスケジューリング、NDJSONストリーミングによるリアルタイム再生など、プロジェクトのすべての音響処理と音楽再生機能を提供します。
- 開発ツール: 
  - **TypeScript**: JavaScriptに型安全性をもたらすスーパーセット言語で、大規模なプロジェクトでのコードの可読性、保守性、品質向上に貢献します。
  - **Node.js**: 開発スクリプトの実行環境として使用されます（例: `package.json`の`scripts`）。
- テスト: 
  - *情報なし*: プロジェクト情報に明示的なテストフレームワークやテスト関連技術の記述はありません。
- ビルドツール: 
  - **TypeScript Compiler (`tsc`)**: TypeScriptコードをブラウザやNode.jsで実行可能なJavaScriptにトランスパイルするために使用されます。
- 言語機能: 
  - **TypeScript / JavaScript**: ES Modules (`.mjs`) と CommonJS (`.js`) の両形式でライブラリを提供し、幅広い環境での利用を可能にします。
- 自動化・CI/CD: 
  - **GitHub Actions**: ドキュメントの自動翻訳（例: `README.ja.md`から`README.md`への翻訳）などの自動化ワークフローに使用されます。
- 開発標準: 
  - **.editorconfig**: 異なる開発環境間でのコードのフォーマット（インデントサイズ、改行コードなど）を統一し、一貫したコード品質を維持するために使用されます。

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
      📘 playback-state.d.ts
      📜 playback-state.js
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
      📜 effectSequences.js
      📜 synthSequences.js
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
      📘 playback-state.d.ts
      📄 playback-state.mjs
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
    📘 playback-state.d.ts
    📜 playback-state.js
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
      📘 effectSequences.ts
      📘 synthSequences.ts
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
    📘 playback-state.ts
  📘 types.ts
  📁 utils/
    📘 time-parser.ts
📊 tsconfig.all.json
📊 tsconfig.demo-new.json
📊 tsconfig.json
```

## ファイル詳細説明
- **`.editorconfig`**:
  プロジェクト全体のコーディングスタイル（インデントサイズ、改行コードなど）を定義し、異なるエディタやIDE間で一貫したコードフォーマットを維持するための設定ファイルです。
- **`.gitignore`**:
  Gitのバージョン管理から除外するファイルやディレクトリを指定する設定ファイルです。コンパイルされたファイル、一時ファイル、依存関係のディレクトリなどが含まれます。
- **`LICENSE`**:
  プロジェクトのライセンス情報です。ソフトウェアの利用、配布、変更に関する条件が記述されています。
- **`README.ja.md` / `README.md`**:
  プロジェクトの概要、目的、機能、使い方、開発状況、ロードマップなどを日本語と英語で説明するメインドキュメントです。
- **`package.json`**:
  プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、依存関係、開発依存関係を定義するファイルです。npmやyarnなどのパッケージマネージャーによって使用されます。
- **`tsconfig.json`**:
  TypeScriptコンパイラの設定ファイルです。コンパイルオプション（ターゲットECMAScriptバージョン、モジュール形式、型定義ファイルの出力先など）を定義します。
- **`src/index.ts`**:
  このライブラリの主要なエクスポート（`SequencerNodes`, `playSequence`, `NDJSONStreamingPlayer`など）を定義するエントリーポイントファイルです。
- **`src/types.ts`**:
  プロジェクト全体で使用されるカスタム型定義（例: `SequenceEvent`, `NodeType`, `EventDefinition`など）を集中管理するファイルです。
- **`src/sequencer-nodes.ts`**:
  Tone.jsで作成されたシンセサイザーやエフェクトノードをIDで管理するためのクラス`SequencerNodes`を定義します。これにより、シーケンスイベントから特定のノードにアクセスし、操作することが可能になります。
- **`src/event-scheduler.ts`**:
  JSON形式で定義された個々の音楽イベント（ノードの作成、接続、音符の発音、パラメータの変更など）をTone.jsのタイムラインにスケジュールし、実行するコアロジックを実装します。
- **`src/ndjson-streaming.ts`**:
  NDJSON（改行区切りJSON）形式のシーケンスデータをリアルタイムで解析し、Tone.jsのイベントとしてスケジュール、再生するための`NDJSONStreamingPlayer`クラスを定義します。ライブ編集やループ再生機能もサポートします。
- **`src/offline-renderer.ts`**:
  JSONシーケンスをWeb Audio APIを使用してオフラインでレンダリングし、結果のオーディオをWAVファイルとして出力する機能を提供します。
- **`src/node-factory.ts`**:
  `createNode`関数と`connectNode`関数を定義し、JSONイベントの指示に基づいて、新しいTone.jsノード（楽器、エフェクト）を作成し、それらを接続する役割を担います。
- **`src/factories/instrument-factory.ts`**:
  `createInstrument`関数を定義し、JSONイベントの`nodeType`に基づいて、`Tone.Synth`, `Tone.PolySynth`などの具体的なTone.js楽器ノードを生成します。
- **`src/factories/effect-factory.ts`**:
  `createEffect`関数を定義し、JSONイベントの`nodeType`に基づいて、`Tone.Reverb`, `Tone.Chorus`などの具体的なTone.jsエフェクトノードを生成します。
- **`src/utils/time-parser.ts`**:
  Tone.jsで使用される時間表記（例: `"4n"`, `"0:0:2"`）を解析し、秒単位の数値に変換するためのユーティリティクラス`TimeParser`を定義します。
- **`src/streaming/event-processor.ts`**:
  NDJSONストリーミング中に受信したイベントを処理し、Tone.jsのスケジュールに適合させるためのロジックを提供します。新しいノードの作成やイベントのスケジュールを行います。
- **`src/streaming/playback-state.ts`**:
  NDJSONストリーミング再生の状態（現在の再生時間、処理済みイベント、ループカウントなど）を管理するためのクラスを定義します。
- **`src/demo/`ディレクトリ**:
  プロジェクトの様々な機能（楽器、エフェクト、ストリーミング、オフラインレンダリングなど）を示すためのTypeScriptベースのデモコードが格納されています。
- **`demo/`ディレクトリ (HTMLファイル)**:
  デモを実行するためのHTMLページ群です。CDN経由またはローカルファイルとしてライブラリを参照し、UI要素を提供します。
- **`dist/`ディレクトリ**:
  TypeScriptのソースコードがJavaScriptにコンパイルされ、配布可能な形式（ES Modules, CommonJS, 型定義ファイル）で格納されるディレクトリです。

## 関数詳細説明
- **`scheduleOrExecuteEvent(Tone, nodes, event, time, debugCallback?)`** (`src/event-scheduler.ts`)
  - **役割**: JSONで定義された単一の音楽イベント（ノード作成、接続、音符発音、パラメータ変更など）をTone.jsのタイムラインにスケジュールするか、即座に実行します。
  - **引数**:
    - `Tone`: Tone.jsライブラリインスタンス。
    - `nodes`: `SequencerNodes`インスタンス（作成されたTone.jsノードを管理）。
    - `event`: 処理するJSONイベントオブジェクト。
    - `time`: イベントをスケジュールする時間（Tone.jsのタイムスタンプ形式）。
    - `debugCallback`: デバッグ情報を受け取るコールバック関数（任意）。
  - **戻り値**: `Promise<void>`
  - **機能**: イベントタイプに応じて、対応するTone.jsのメソッドを呼び出し、音響処理を実行します。パラメータの`rampTo`処理やLFOモジュレーションなども含みます。
- **`playSequence(Tone, nodes, sequence, debugCallback?)`** (`src/event-scheduler.ts`)
  - **役割**: JSON形式で定義されたイベントの配列（シーケンス）を順番に処理し、Tone.jsのタイムラインにスケジュールして再生します。
  - **引数**:
    - `Tone`: Tone.jsライブラリインスタンス。
    - `nodes`: `SequencerNodes`インスタンス。
    - `sequence`: `SequenceEvent`オブジェクトの配列。
    - `debugCallback`: デバッグ情報を受け取るコールバック関数（任意）。
  - **戻り値**: `Promise<void>`
  - **機能**: シーケンス内の各イベントを`scheduleOrExecuteEvent`に渡し、再生を開始します。
- **`createNode(Tone, nodes, event)`** (`src/node-factory.ts`)
  - **役割**: JSONイベントの定義に基づいて、新しいTone.jsノード（楽器またはエフェクト）を作成し、`SequencerNodes`に登録します。
  - **引数**:
    - `Tone`: Tone.jsライブラリインスタンス。
    - `nodes`: `SequencerNodes`インスタンス。
    - `event`: `createNode`イベントオブジェクト（`nodeId`, `nodeType`, `args`などを含む）。
  - **戻り値**: `void`
  - **機能**: `instrument-factory`または`effect-factory`を呼び出し、指定された種類のTone.jsノードをインスタンス化します。
- **`connectNode(nodes, event)`** (`src/node-factory.ts`)
  - **役割**: `SequencerNodes`に登録されている既存のTone.jsノード同士を接続するか、出力ノードに接続します。
  - **引数**:
    - `nodes`: `SequencerNodes`インスタンス。
    - `event`: `connect`イベントオブジェクト（`nodeId`, `connectTo`などを含む）。
  - **戻り値**: `void`
  - **機能**: `nodeId`で指定されたノードを、`connectTo`で指定された別のノードまたは`Tone.Destination`に接続します。
- **`createInstrument(Tone, type, args)`** (`src/factories/instrument-factory.ts`)
  - **役割**: 指定されたタイプと引数に基づいて、Tone.jsの楽器ノード（例: Synth, MonoSynth, PolySynthなど）を生成します。
  - **引数**:
    - `Tone`: Tone.jsライブラリインスタンス。
    - `type`: 楽器のタイプ名（文字列）。
    - `args`: 楽器のコンストラクタに渡す引数オブジェクト。
  - **戻り値**: `Tone.Instrument | Tone.PolySynth | Tone.Sampler`
  - **機能**: `switch`文でタイプを判別し、対応するTone.jsの楽器クラスをインスタンス化して返します。
- **`createEffect(Tone, type, args)`** (`src/factories/effect-factory.ts`)
  - **役割**: 指定されたタイプと引数に基づいて、Tone.jsのエフェクトノード（例: Reverb, Chorus, Distortionなど）を生成します。
  - **引数**:
    - `Tone`: Tone.jsライブラリインスタンス。
    - `type`: エフェクトのタイプ名（文字列）。
    - `args`: エフェクトのコンストラクタに渡す引数オブジェクト。
  - **戻り値**: `Tone.Effect`
  - **機能**: `switch`文でタイプを判別し、対応するTone.jsのエフェクトクラスをインスタンス化して返します。
- **`parseNDJSON(ndjsonString)`** (`src/ndjson-streaming.ts`)
  - **役割**: 改行区切りのJSON（NDJSON）文字列を解析し、`SequenceEvent`オブジェクトの配列に変換します。
  - **引数**:
    - `ndjsonString`: NDJSON形式の文字列。
  - **戻り値**: `SequenceEvent[]`
  - **機能**: 各行をJSONオブジェクトとしてパースし、エラーハンドリングを含めてイベント配列を構築します。
- **`NDJSONStreamingPlayer` クラスのメソッド** (`src/ndjson-streaming.ts`)
  - **`constructor(Tone, nodes, options)`**: NDJSONストリーミングプレーヤーを初期化します。
  - **`start(ndjson)`**: NDJSONシーケンスの再生を開始または更新します。ライブ編集に対応し、再生を停止せずにシーケンスを更新できます。
  - **`stop()`**: 現在の再生を停止します。
- **`OfflineRenderer` クラスのメソッド** (`src/offline-renderer.ts`)
  - **`constructor(Tone, sequencerNodes)`**: オフラインレンダラーを初期化します。
  - **`render(sequence, duration)`**: 指定されたシーケンスを指定された時間でオフラインレンダリングし、`AudioBuffer`を返します。
- **`SequencerNodes` クラスのメソッド** (`src/sequencer-nodes.ts`)
  - **`constructor()`**: ノード管理用のマップを初期化します。
  - **`get(nodeId)`**: 指定されたIDのノードを取得します。
  - **`set(nodeId, node)`**: 指定されたIDでノードを登録します。
  - **`disposeAll()`**: 登録されているすべてのノードを破棄します。
- **`TimeParser` クラスのメソッド** (`src/utils/time-parser.ts`)
  - **`constructor(Tone)`**: Tone.jsインスタンスでTimeParserを初期化します。
  - **`parseTimeToSeconds(timeNotation)`**: Tone.jsの時間表記（例: `"4n"`, `"0:0:2"`, `"1s"`) を秒単位の数値に変換します。

## 関数呼び出し階層ツリー
```
- if (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - resolveTarget (dist/cjs/event-scheduler.js)
      - rampParameter ()
      - forEach ()
      - defineProperty ()
      - start ()
      - stop ()
      - get ()
      - disposeAll ()
      - ensureAudioContextStarted ()
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode ()
  - createInstrument (dist/cjs/factories/instrument-factory.d.ts)
    - createPolySynth ()
      - createSampler ()
  - set ()
  - copyRecursive (scripts/copy-to-dist.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports ()
  - createEffect (dist/cjs/factories/effect-factory.d.ts)
    - startIfAvailable ()
- for (dist/cjs/event-scheduler.js)
- switch (dist/cjs/event-scheduler.js)
- catch (dist/cjs/event-scheduler.js)
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (undefined)
  - parseNDJSON (dist/cjs/ndjson-streaming.d.ts)
- i (dist/demo/instrument/loopend-test.js)
- loadAllSequences (dist/demo/sequenceLoader.js)

---
Generated at: 2026-02-23 07:10:34 JST
