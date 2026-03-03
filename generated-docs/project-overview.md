Last updated: 2026-03-04

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: **Tone.js** (Web Audio APIを抽象化し、シンセサイザー、エフェクト、シーケンサーなどの音楽機能を簡単に実装できるJavaScriptライブラリ)、**JavaScript** (コア言語)、**TypeScript** (JavaScriptに静的型付けを追加し、大規模なアプリケーション開発を支援)
- 音楽・オーディオ: **Tone.js** (Web上での高度な音楽表現とオーディオ処理の中心的なライブラリ)
- 開発ツール: **TypeScript** (開発時の型チェックとコード補完を提供)、**npm** (パッケージ管理とスクリプト実行)、**GitHub Actions** (CI/CDおよび自動翻訳などのワークフロー自動化)
- テスト: (特定のテストフレームワークは明示されていませんが、`demo`および`examples`ディレクトリに多数の動作確認用サンプルコードが含まれています)
- ビルドツール: **TypeScript Compiler** (TypeScriptコードをJavaScriptに変換)、**npm scripts** (ビルド、コピー、リネームなどのタスクを実行)
- 言語機能: **TypeScript** (静的型付け、ES Modulesなど)
- 自動化・CI/CD: **GitHub Actions** (リポジトリのREADME自動英訳、継続的インテグレーション/デプロイメントの基盤)
- 開発標準: **.editorconfig** (異なるエディタやIDE間でコードスタイルの一貫性を保つための設定ファイル)

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

*   **`src/index.ts`**:
    プロジェクトのメインエントリポイントであり、他のモジュールを公開しています。これにより、ユーザーはライブラリの主要な機能（SequencerNodes, playSequence, NDJSONStreamingPlayerなど）をインポートして利用できます。

*   **`src/event-scheduler.ts`**:
    JSON形式で記述された音楽イベントをTone.jsのタイムラインに沿ってスケジュールし、実行するコアロジックを担います。ノードの作成、接続、パラメータの変更（`rampTo`など）といった多様なイベントを処理します。

*   **`src/sequencer-nodes.ts`**:
    Tone.jsのオーディオノード（シンセサイザーやエフェクトなど）を管理するクラスです。各ノードに一意のIDを割り当て、プログラム全体でノードへのアクセス、追加、取得、破棄を一元的に行えるようにします。

*   **`src/ndjson-streaming.ts`**:
    NDJSON (Newline Delimited JSON) 形式の音楽イベントストリームをリアルタイムで再生、ライブ編集、ループ再生を可能にする機能を提供します。先読み機能によりスムーズな再生を実現し、動的なシーケンス更新に対応します。

*   **`src/node-factory.ts`**:
    JSON定義に基づいてTone.jsの各種オーディオノード（楽器、エフェクトなど）を作成し、それらのノード間を接続する共通のインターフェースを提供します。

*   **`src/factories/instrument-factory.ts`**:
    `node-factory.ts`から呼び出され、JSON定義に基づいてTone.jsの各種楽器（Synth, FMSynth, Samplerなど）のインスタンスを生成する具体的なロジックを含みます。

*   **`src/factories/effect-factory.ts`**:
    `node-factory.ts`から呼び出され、JSON定義に基づいてTone.jsの各種エフェクト（Reverb, Chorus, Distortionなど）のインスタンスを生成する具体的なロジックを含みます。

*   **`src/offline-renderer.ts`**:
    音楽シーケンスをリアルタイムで再生するのではなく、最終的なオーディオファイルを生成するためのオフラインレンダリング機能を提供します。レンダリングされたオーディオはWAV形式でダウンロードできます。

*   **`src/types.ts`**:
    プロジェクト全体で使用される型定義（インターフェース、列挙型など）をまとめて定義しています。これにより、コードの一貫性と型安全性が向上します。

*   **`src/utils/time-parser.ts`**:
    "4n" (四分音符) や "0:0:0" (小節:拍:16分音符) のような音楽的な時間表記を、Tone.jsが理解できる秒単位の時間に変換するためのユーティリティ関数を提供します。

*   **`src/streaming/event-processor.ts`**:
    NDJSONストリーミング再生において、新規に受信したイベントを処理し、Tone.jsのタイムラインにスケジュールする役割を担います。ノードの作成、接続、イベントのスケジューリングなどを行います。

*   **`src/streaming/playback-state.ts`**:
    NDJSONストリーミング再生の現在の状態（再生中か、開始時間、処理済みイベント、ループ回数など）を管理するクラスです。再生コントロールやUIへの情報提供に利用されます。

*   **`dist/` ディレクトリ**:
    TypeScriptソースコードがJavaScriptにコンパイルされ、CommonJS (`cjs/`) および ES Modules (`esm/`) 形式で配布されるビルド済みファイル群です。型定義ファイル (`.d.ts`) も含まれます。

*   **`demo/` および `examples/` ディレクトリ**:
    ライブラリの様々な機能（基本再生、ストリーミング、オフラインレンダリング、各種楽器・エフェクトの使用例など）を示すためのHTMLファイルとJavaScript/TypeScriptファイルが含まれています。

*   **`docs/tonejs-components-roadmap.ja.md`**:
    Tone.jsコンポーネントのJSON対応状況、実装優先順位、実装方針に関する詳細なロードマップドキュメントです。

## 関数詳細説明

*   **`scheduleOrExecuteEvent(Tone, nodes, event, scheduledTime?)`**:
    - **役割**: JSONで定義された単一の音楽イベント（ノード作成、接続、音符の発音、パラメータ変更など）を、指定された時刻にTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`インスタンス（ノード管理用）。
        - `event`: 処理するJSONイベントオブジェクト。
        - `scheduledTime?`: イベントをスケジュールするオプションの時刻（Tone.jsの時間表記または秒）。
    - **戻り値**: Promise<void>（非同期処理のため）
    - **機能**: イベントタイプに基づいて適切なTone.jsメソッドを呼び出し、音の生成やパラメータ制御を行います。`rampTo`イベントの場合、指定されたパスのパラメータを滑らかに変化させます。

*   **`playSequence(Tone, nodes, sequence)`**:
    - **役割**: JSON配列で定義された一連の音楽イベント（シーケンス）全体を再生します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`インスタンス。
        - `sequence`: JSONイベントオブジェクトの配列。
    - **戻り値**: Promise<void>
    - **機能**: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、再生を開始します。

*   **`createNode(Tone, type, args, id?, chain?)`**:
    - **役割**: 指定されたタイプと引数に基づいてTone.jsのオーディオノード（楽器またはエフェクト）を作成します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `type`: ノードのタイプ名（例: "Synth", "Reverb"）。
        - `args`: ノードのコンストラクタに渡す引数オブジェクトまたは配列。
        - `id?`: オプションのノードID。
        - `chain?`: オプションのチェーン構成。
    - **戻り値**: 作成されたTone.jsオーディオノードのインスタンス。
    - **機能**: `instrument-factory`と`effect-factory`を利用して、適切なTone.jsノードをインスタンス化します。

*   **`connectNode(nodes, sourceId, connectTo)`**:
    - **役割**: 2つのTone.jsノードまたはノードとDestinationを接続します。
    - **引数**:
        - `nodes`: `SequencerNodes`インスタンス。
        - `sourceId`: 接続元ノードのID。
        - `connectTo`: 接続先（ノードIDまたは"toDestination"）。
    - **戻り値**: void
    - **機能**: 指定されたIDのノードを取得し、Tone.jsの接続メソッドを用いてオーディオ信号パスを確立します。

*   **`createInstrument(Tone, instrumentType, args)`**:
    - **役割**: 特定の楽器タイプ（Synth, FMSynthなど）のTone.jsインスタンスを生成します。
    - **引数**: `Tone`, `instrumentType`, `args`
    - **戻り値**: `Tone.Instrument`またはその派生クラスのインスタンス。
    - **機能**: 内部で`Tone.PolySynth`や`Tone.Sampler`などの特定の楽器コンストラクタを呼び出します。

*   **`createEffect(Tone, effectType, args)`**:
    - **役割**: 特定のエフェクトタイプ（Reverb, Chorusなど）のTone.jsインスタンスを生成します。
    - **引数**: `Tone`, `effectType`, `args`
    - **戻り値**: `Tone.Effect`またはその派生クラスのインスタンス。
    - **機能**: 内部で`Tone.Reverb`や`Tone.Distortion`などの特定のエフェクトコンストラクタを呼び出します。

*   **`parseNDJSON(ndjsonStringOrArray)`**:
    - **役割**: NDJSON (改行区切りJSON) 形式の文字列またはJSONイベントオブジェクトの配列を解析し、整形されたイベント配列を返します。
    - **引数**: `ndjsonStringOrArray`: NDJSON文字列またはイベント配列。
    - **戻り値**: `SequenceEvent[]`（解析されたイベントの配列）。
    - **機能**: NDJSON文字列の場合、各行をJSONとしてパースし、コメント行などをスキップします。

*   **`NDJSONStreamingPlayer.start(ndjson)`**:
    - **役割**: NDJSONストリームの再生を開始または更新します。ライブ編集やループ再生に対応します。
    - **引数**: `ndjson`: NDJSON文字列またはイベント配列。
    - **戻り値**: Promise<void>
    - **機能**: 内部で`initializePlayback`、`updateEvents`を呼び出し、`requestAnimationFrame`ループで定期的にイベントを先読みし、`event-processor`を通じて`scheduleEvent`を実行します。

*   **`NDJSONStreamingPlayer.stop()`**:
    - **役割**: 現在のNDJSONストリーミング再生を停止します。
    - **引数**: なし
    - **戻り値**: void
    - **機能**: 再生ループを停止し、関連するタイマーをクリアします。

*   **`OfflineRenderer.render(Tone, nodes, sequence, durationSeconds)`**:
    - **役割**: 指定された音楽シーケンスをオフラインでレンダリングし、`AudioBuffer`を生成します。
    - **引数**: `Tone`, `nodes`, `sequence`, `durationSeconds`
    - **戻り値**: Promise<AudioBuffer>
    - **機能**: `Tone.Offline`コンテキストを使用し、シーケンス全体を非同期で再生・録音します。

*   **`audioBufferToWav(audioBuffer)`**:
    - **役割**: `AudioBuffer`オブジェクトをWAV形式の`Blob`に変換します。
    - **引数**: `audioBuffer`: WAVに変換する`AudioBuffer`。
    - **戻り値**: `Blob`（WAV形式のデータ）。
    - **機能**: オーディオデータとWAVヘッダーをバイナリ形式で構築します。

*   **`downloadWav(audioBuffer, filename)`**:
    - **役割**: `AudioBuffer`をWAVファイルとしてブラウザにダウンロードさせます。
    - **引数**: `audioBuffer`, `filename`
    - **戻り値**: void
    - **機能**: `audioBufferToWav`を呼び出し、生成された`Blob`をダウンロードリンクとして提供します。

*   **`TimeParser.parseTimeToSeconds(time, bpm)`**:
    - **役割**: "4n", "0:0:0", "1s" などの時間表記を秒単位の数値に変換します。
    - **引数**: `time`: 解析する時間表記文字列または数値。`bpm`: テンポ（オプション）。
    - **戻り値**: `number`（秒単位の時間）。
    - **機能**: 音符表記、小節拍表記、秒表記など様々な形式を判別し、適切に計算します。

*   **`SequencerNodes.get(nodeId)`**:
    - **役割**: 指定されたIDを持つTone.jsオーディオノードを取得します。
    - **引数**: `nodeId`: 取得するノードのID。
    - **戻り値**: `Tone.ToneAudioNode`またはその派生クラスのインスタンス。
    - **機能**: 内部のマップからノードを検索します。

*   **`SequencerNodes.disposeAll()`**:
    - **役割**: 管理している全てのTone.jsオーディオノードを破棄します。
    - **引数**: なし
    - **戻り値**: void
    - **機能**: 各ノードの`dispose()`メソッドを呼び出し、リソースを解放します。

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
      - startIfAvailable (エフェクトの開始)
    - connectNode
  - SequencerNodes.get
  - SequencerNodes.disposeAll

- NDJSONStreamingPlayer.start
  - parseNDJSON
  - initializePlayback
  - updateEvents (内部でイベント処理を継続)
    - EventProcessor.createNodesAndConnections
      - createNode
      - connectNode
    - EventProcessor.scheduleEvent
      - scheduleOrExecuteEvent
  - PlaybackState.start

- NDJSONStreamingPlayer.stop
  - PlaybackState.stop

- OfflineRenderer.render
  - playSequence (オフラインコンテキスト内でシーケンスを再生)
  - SequencerNodes.get
  - TimeParser.parseTimeToSeconds

- audioBufferToWav
  - (内部でバイナリデータ書き込み)

- downloadWav
  - audioBufferToWav

- AudioManager.playSequence (デモモジュール)
  - playSequence (ライブラリのplaySequence)
  - Tone.start (Web Audio Contextの開始)

- AudioManager.ensureAudioContextStarted (デモモジュール)
  - Tone.start

- UIManager.setupEventListeners (デモモジュール)
  - UIManager.populateSequenceSelector
  - UIManager.getTextareaValue
  - UIManager.setTextareaValue
  - UIManager.setErrorStatusOk
  - UIManager.setErrorStatusNg

- TimeParser.parseTimeToSeconds
  - TimeParser.parseTickTime
  - TimeParser.isToneNotation
  - TimeParser.parseToneNotation
  - TimeParser.parseBarBeatTime

---
Generated at: 2026-03-04 07:12:51 JST
