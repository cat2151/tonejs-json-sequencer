Last updated: 2026-02-15

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js (Web Audio APIを基盤とし、シンセサイザー、エフェクト、シーケンスなどの音楽処理を容易にするJavaScriptライブラリ)
- 音楽・オーディオ: Tone.js (Webブラウザ上で複雑なオーディオ合成とエフェクト処理を可能にする)
- 開発ツール: TypeScript (JavaScriptに静的型付けを追加し、大規模なアプリケーション開発を支援), npm (Node.jsのパッケージマネージャーで、プロジェクトの依存関係を管理)
- テスト: なし (提供情報に基づく)
- ビルドツール: TypeScript (TypeScriptコードをJavaScriptにコンパイル), `scripts/copy-to-dist.js` (ビルドされたファイルを`dist`ディレクトリにコピーするスクリプト), `scripts/rename-to-mjs.js` (ES Modules形式のファイルを`.mjs`にリネームし、importパスを更新するスクリプト)
- 言語機能: JavaScript (プロジェクトの基盤言語), TypeScript (静的型付け、ES Modules/CommonJS形式での出力に対応)
- 自動化・CI/CD: GitHub Actions (リポジトリのREADMEファイルの自動英訳など、ワークフローの自動化に使用)
- 開発標準: .editorconfig (異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル)

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
  📖 176.md
  📖 178.md
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
- **`src/index.ts`**: プロジェクトの主要なエントリポイントであり、このライブラリが外部に公開するモジュール（`SequencerNodes`, `playSequence`, `NDJSONStreamingPlayer`など）をエクスポートします。
- **`src/event-scheduler.ts`**: JSONで記述された音楽イベント（ノードの作成、接続、音符の発音、パラメータ変更など）を解析し、Tone.jsのタイミングシステムに基づいてスケジュールまたは即座に実行するコアロジックを担います。
- **`src/sequencer-nodes.ts`**: Tone.jsで作成されたシンセサイザーやエフェクトなどのオーディオノードをIDに基づいて一元的に管理するためのクラスを提供します。これにより、ノードの参照、追加、取得、一括破棄が容易になります。
- **`src/factories/instrument-factory.ts`**: JSON定義（`nodeType`が楽器の種類、`args`がその初期設定）に基づき、`Tone.Synth`、`Tone.FMSynth`、`Tone.Sampler`など、様々なTone.jsの楽器インスタンスを作成します。
- **`src/factories/effect-factory.ts`**: JSON定義（`nodeType`がエフェクトの種類、`args`がその初期設定）に基づき、`Tone.Reverb`、`Tone.Chorus`、`Tone.Distortion`など、様々なTone.jsのエフェクトインスタンスを作成します。
- **`src/node-factory.ts`**: `instrument-factory`と`effect-factory`を内部的に利用し、指定されたJSONイベントからTone.jsノードを作成し、さらにノード間の接続を処理する高レベルなファクトリです。
- **`src/ndjson-streaming.ts`**: NDJSON（改行区切りJSON）形式のイベントストリームをリアルタイムで再生する機能を提供します。ライブ編集、ループ再生、イベントの先読みによるスムーズな再生をサポートします。
- **`src/offline-renderer.ts`**: JSONシーケンスをオフラインでレンダリングし、その結果のオーディオをWAVファイルとして出力する機能を提供します。これにより、ブラウザのリアルタイム再生性能に依存せず、高品質なオーディオを生成できます。
- **`src/utils/time-parser.ts`**: Tone.jsで一般的に使用される様々な時間表記（例: '4n' (4分音符), '0:0:2' (0小節0拍2連符), 数値による秒数）を標準的な秒数に正確にパースするユーティリティ関数を提供します。
- **`src/types.ts`**: プロジェクト全体で使用されるカスタムのTypeScript型定義（`SequenceEvent`、`NodeType`など）を集中管理し、コードの型安全性を高めます。
- **`demo/`**: このディレクトリには、ライブラリの様々な機能（基本的なシーケンス再生、ストリーミング、オフラインレンダリングなど）を示すためのHTMLデモファイルと関連するCSS、JavaScriptファイルが含まれています。
- **`demo-library/`**: このディレクトリは、`tonejs-json-sequencer`を他のプロジェクトからライブラリとして利用する際の具体的な使用例を示すデモを含んでいます。
- **`dist/`**: TypeScriptコンパイラによって生成されたJavaScriptファイル（CommonJSおよびES Modules形式）、および型定義ファイル(`.d.ts`)が格納されています。本番環境での利用や他のプロジェクトへの組み込みに使用されます。
- **`docs/`**: Tone.jsコンポーネントのJSON対応ロードマップなどの詳細なドキュメントが含まれており、プロジェクトの設計思想や将来の計画を説明します。
- **`examples/`**: ライブラリのnpmパッケージとしての使用例やCDN経由での使用例など、より具体的なコードサンプルを提供します。
- **`scripts/`**: プロジェクトのビルドプロセスを補助するユーティリティスクリプトが含まれています。

## 関数詳細説明
- **`scheduleOrExecuteEvent(Tone, nodes, event)`**
    - **役割**: JSON形式で記述された単一の音楽イベント（ノード作成、接続、音符発音、パラメータ変更など）を解析し、Tone.jsのAPIを用いてスケジュールまたは即座に実行する中核となる関数です。
    - **引数**:
        - `Tone`: Tone.jsのグローバルオブジェクト。
        - `nodes`: `SequencerNodes`のインスタンス。オーディオノードの管理に使用されます。
        - `event`: 実行すべきイベントの詳細を含むJSONオブジェクト。
    - **戻り値**: `Promise<void>`（非同期処理を含む場合）または `void`。
    - **機能**: `eventType`に応じて、`createNode`、`connectNode`、`triggerAttackRelease`、`rampTo`、`LFO`、`set`などのアクションを実行します。

- **`playSequence(Tone, nodes, sequence)`**
    - **役割**: JSON形式のイベント配列（シーケンス）を受け取り、その中の全てのイベントを`scheduleOrExecuteEvent`関数を呼び出すことで順次再生をスケジュールします。
    - **引数**:
        - `Tone`: Tone.jsのグローバルオブジェクト。
        - `nodes`: `SequencerNodes`のインスタンス。
        - `sequence`: 複数の音楽イベントを含むJSONオブジェクトの配列。
    - **戻り値**: `Promise<void>`。
    - **機能**: シーケンス内のイベントを反復処理し、それぞれのイベントを適切なタイミングでTone.jsに登録します。

- **`createNode(Tone, type, args)`** (node-factory.tsより)
    - **役割**: 指定されたタイプと引数に基づいて、Tone.jsのオーディオノード（楽器またはエフェクト）のインスタンスを生成します。
    - **引数**:
        - `Tone`: Tone.jsのグローバルオブジェクト。
        - `type`: 作成するノードのタイプを示す文字列（例: 'Synth', 'Reverb'）。
        - `args`: ノードのコンストラクタに渡す引数のオブジェクトまたは配列。
    - **戻り値**: 新しく作成された`Tone.ToneAudioNode`のインスタンス。
    - **機能**: `instrument-factory`と`effect-factory`に処理を委譲し、適切なTone.jsノードを動的に作成します。

- **`connectNode(nodes, sourceId, destinationId)`** (node-factory.tsより)
    - **役割**: 2つのTone.jsノード間、またはノードとオーディオ出力（`toDestination`）との間のオーディオ接続を確立します。
    - **引数**:
        - `nodes`: `SequencerNodes`のインスタンス。接続元のノードを取得するために使用されます。
        - `sourceId`: 接続元のノードのID。
        - `destinationId`: 接続先のノードのID、または`'toDestination'`。
    - **戻り値**: `void`。
    - **機能**: `SequencerNodes`から接続元のノードを取得し、`connect()`メソッドを使って指定された宛先に接続します。

- **`parseNDJSON(ndjsonString)`** (ndjson-streaming.tsより)
    - **役割**: NDJSON (改行区切りJSON) 形式の文字列を解析し、個々のJSONオブジェクトの配列に変換します。
    - **引数**:
        - `ndjsonString`: NDJSON形式の文字列。
    - **戻り値**: `SequenceEvent[]`（パースされたイベントの配列）。
    - **機能**: 入力文字列を改行で分割し、各行をJSONとしてパースします。パースエラーが発生した行はスキップされます。

- **`NDJSONStreamingPlayer.start(ndjson)`** (ndjson-streaming.tsのクラスメソッド)
    - **役割**: NDJSONストリームの再生を開始または更新します。ライブ編集やループ再生のコア機能を提供します。
    - **引数**:
        - `ndjson`: NDJSON文字列または`SequenceEvent`の配列。
    - **戻り値**: `Promise<void>`。
    - **機能**: 内部のイベントスケジューリングロジックを起動し、`lookaheadMs`設定に基づいてイベントを先読みし、リアルタイムでのスムーズな再生とライブ編集を可能にします。

- **`SequencerNodes.get(id)`** (sequencer-nodes.tsのクラスメソッド)
    - **役割**: 指定されたIDに関連付けられたTone.jsオーディオノードを取得します。
    - **引数**:
        - `id`: 取得したいノードのID。
    - **戻り値**: `Tone.ToneAudioNode`のインスタンス、またはノードが見つからない場合は`undefined`。
    - **機能**: 内部マップからノードを検索し、返します。

- **`SequencerNodes.set(id, node)`** (sequencer-nodes.tsのクラスメソッド)
    - **役割**: Tone.jsオーディオノードを特定のIDに関連付けて内部マップに格納します。
    - **引数**:
        - `id`: ノードに割り当てる一意のID。
        - `node`: 格納する`Tone.ToneAudioNode`のインスタンス。
    - **戻り値**: `void`。
    - **機能**: IDとノードのペアを内部マップに追加します。

- **`TimeParser.parseTimeToSeconds(time, bpm?)`** (utils/time-parser.tsのクラスメソッド)
    - **役割**: Tone.jsの多様な時間表記（例: '4n', '0:0:2'など）や数値（秒数）を、統一された秒数表現に変換します。
    - **引数**:
        - `time`: 解析する時間表記（文字列または数値）。
        - `bpm`: 現在のBPM（省略可能）。BPMに依存する時間表記（'4n'など）を解析するために使用されます。
    - **戻り値**: 解析された時間を示す数値（秒）。
    - **機能**: 文字列の形式を判別し、Tone.jsの拍表記や小節拍連符表記、または直接の秒数表記を適切に秒数に変換します。

- **`audioBufferToWav(buffer)`** (offline-renderer.tsより)
    - **役割**: `AudioBuffer`オブジェクトの生オーディオデータを標準的なWAV形式のBlobに変換します。
    - **引数**:
        - `buffer`: WAVに変換するオーディオデータを含む`AudioBuffer`インスタンス。
    - **戻り値**: WAV形式のオーディオデータを含む`Blob`オブジェクト。
    - **機能**: `AudioBuffer`のチャンネルデータ、サンプルレート、長さを利用して、WAVヘッダとオーディオデータを構築します。

- **`downloadWav(blob, filename)`** (offline-renderer.tsより)
    - **役割**: 生成されたWAV形式のBlobをユーザーのブラウザにダウンロードさせます。
    - **引数**:
        - `blob`: ダウンロードするWAVデータを含む`Blob`オブジェクト。
        - `filename`: ダウンロードされるファイルの名前。
    - **戻り値**: `void`。
    - **機能**: 一時的なURLを作成し、アンカータグを使ってプログラム的にクリックイベントをシミュレートすることでダウンロードを開始します。

## 関数呼び出し階層ツリー
```
- playSequence (コアライブラリのシーケンス再生関数)
  - scheduleOrExecuteEvent (イベント処理の中核)
    - resolveTarget (パラメータパス解決ユーティリティ)
    - rampParameter (スムーズなパラメータ変更ユーティリティ)
    - createNode (Tone.jsノードファクトリ)
      - createInstrument (楽器ノード専用ファクトリ)
        - createPolySynth
        - createSampler
      - createEffect (エフェクトノード専用ファクトリ)
        - startIfAvailable (エフェクトにstartメソッドがある場合に呼び出す)
    - connectNode (Tone.jsノード接続)
    - SequencerNodes.get (管理ノード取得)
    - SequencerNodes.set (管理ノード格納)
- NDJSONStreamingPlayer.start (NDJSONストリーミング再生開始)
  - parseNDJSON (NDJSON文字列解析)
  - initializePlayback (内部再生状態初期化)
  - processEvents (イベント先読みとスケジューリングの内部ループ)
    - EventProcessor.scheduleEvent (イベントのスケジューリング処理)
      - scheduleOrExecuteEvent (イベント処理の中核へ委譲)
      - TimeParser.adjustEventTime (イベント時間の調整)
      - TimeParser.getEventTime (イベント時間の取得)
- OfflineRenderer.render (オフラインレンダリング実行)
  - calculateSequenceDuration (シーケンスの総再生時間計算)
  - playSequence (コアライブラリのシーケンス再生へ委譲)
  - audioBufferToWav (AudioBufferをWAV形式に変換)
  - downloadWav (WAVファイルのダウンロード)
  - TimeParser.getEventTime (イベント時間の取得)
- scripts/copy-to-dist.js:copyRecursive (ビルドスクリプト)
- scripts/rename-to-mjs.js:renameFiles (ビルドスクリプト)
  - scripts/rename-to-mjs.js:updateImports (インポートパス更新)
- demo/main.js:play (デモUIからの再生トリガー)
  - audioManager.playSequence (デモのオーディオ管理機能)
    - playSequence (コアライブラリのシーケンス再生へ委譲)
    - Tone.start (AudioContext開始)
    - SequencerNodes (インスタンス化)
- demo/offline-rendering.js:render (デモUIからのオフラインレンダリングトリガー)
  - OfflineRenderer.render (オフラインレンダラーへ委譲)
- demo/streaming.js:play (デモUIからのストリーミング再生トリガー)
  - NDJSONStreamingPlayer.start (NDJSONストリーミング再生へ委譲)
  - Tone.start (AudioContext開始)
- demo/sequenceLoader.js:loadAllSequences (デモ用シーケンス読み込み)

---
Generated at: 2026-02-15 07:09:35 JST
