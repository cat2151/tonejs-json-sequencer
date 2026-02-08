Last updated: 2026-02-09

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: **Tone.js** (Web Audio APIを抽象化し、Web上で高度な音楽表現を可能にするJavaScriptライブラリ)
- 音楽・オーディオ: **Tone.js** (シンセサイザー、エフェクト、シーケンサーなど、多様な音響コンポーネントを提供)
- 開発ツール: **TypeScript** (JavaScriptに静的型付けを追加し、大規模なアプリケーション開発を支援)、**npm** (Node.jsのパッケージマネージャーで、ライブラリの依存関係管理に使用)、**VS Code** (`.editorconfig`でコーディングスタイルを統一)
- テスト: (プロジェクト情報から具体的なテストツールは検出されませんでした)
- ビルドツール: **TypeScript Compiler (`tsc`)** (TypeScriptコードをJavaScriptにコンパイルする)、カスタムスクリプト (`scripts/copy-to-dist.js`, `scripts/rename-to-mjs.js`) (ビルド後のファイル整理やモジュール形式の変換)
- 言語機能: **TypeScript** (型定義、クラス、インターフェースなど)、**JavaScript ES Modules (ESM)** および **CommonJS (CJS)** (モジュールシステムとして提供)
- 自動化・CI/CD: **GitHub Actions** (ドキュメントの自動翻訳など、CI/CDパイプラインを自動化するために使用)
- 開発標準: **EditorConfig** (異なるエディタやIDE間で一貫したコーディングスタイルを維持するためのファイルフォーマット)、**Markdown** (プロジェクトのドキュメント作成に利用)

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
      📜 jcreverb.js
      📜 lpf-envelope.js
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
  📖 106.md
  📖 108.md
  📖 109.md
  📖 110.md
  📖 111.md
  📖 112.md
  📖 118.md
  📖 120.md
  📖 122.md
  📖 124.md
  📖 125.md
  📖 127.md
  📖 129.md
  📖 131.md
  📖 133.md
  📖 135.md
  📖 136.md
  📖 137.md
  📖 139.md
  📖 141.md
  📖 144.md
  📖 148.md
  📖 150.md
  📖 152.md
  📖 154.md
  📖 155.md
  📖 62.md
  📖 64.md
  📖 67.md
  📖 69.md
  📖 70.md
  📖 71.md
  📖 72.md
  📖 73.md
  📖 74.md
  📖 77.md
  📖 80.md
  📖 84.md
  📖 87.md
  📖 88.md
  📖 89.md
  📖 90.md
  📖 91.md
  📖 93.md
  📖 94.md
  📖 97.md
  📖 98.md
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
      📘 jcreverb.ts
      📘 lpf-envelope.ts
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

-   **`src/` ディレクトリ (ソースコード)**
    -   `src/event-scheduler.ts`: Tone.jsのイベントを時間通りにスケジュールし、実行する主要なロジックを定義します。ノードのパラメータ変更や音符の発音などを制御します。
    -   `src/node-factory.ts`: JSONイベントに基づいてTone.jsのオーディオノード（シンセやエフェクト）を作成および接続する役割を担います。
    -   `src/factories/instrument-factory.ts`: `Synth`, `FMSynth` などの楽器ノードをJSON定義から生成するファクトリを提供します。
    -   `src/factories/effect-factory.ts`: `Reverb`, `Chorus` などのエフェクトノードをJSON定義から生成するファクトリを提供します。
    -   `src/sequencer-nodes.ts`: 生成されたTone.jsオーディオノード群をIDで管理し、必要に応じて取得・破棄する機能を提供します。
    -   `src/ndjson-streaming.ts`: NDJSON (Newline Delimited JSON) 形式の音楽イベントストリームをリアルタイムで処理し、ライブ編集やループ再生を可能にします。
    -   `src/offline-renderer.ts`: 音楽シーケンスをオフラインでレンダリングし、結果をWAVオーディオファイルとして出力する機能を提供します。
    -   `src/types.ts`: プロジェクト全体で使用される型定義（例: `SequenceEvent`, `CreateNodeEvent` など）を集中管理します。
    -   `src/utils/time-parser.ts`: "4n" (四分音符) や "0:0:2" (0小節0拍2ティック) のようなTone.jsの時間表記を、内部処理用の秒数に変換するユーティリティ関数を提供します。
-   **`dist/` ディレクトリ (ビルド済みファイル)**
    -   `dist/cjs/`, `dist/esm/`: `src/` ディレクトリのTypeScriptファイルがCommonJS形式 (`.js`) とES Modules形式 (`.mjs`) にコンパイルされた成果物を含みます。各モジュールとその型定義 (`.d.ts`) が含まれ、ライブラリとして利用される主要なファイル群です。
    -   `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`: ライブラリのエントリポイントとなるファイル群です。
-   **`demo/` ディレクトリ (デモアプリケーション)**
    -   `demo/index.html`: プロジェクトの基本的な機能を示すメインデモページです。
    -   `demo/streaming.html`: NDJSONストリーミングとライブ編集機能に特化したデモページです。
    -   `demo/offline-rendering.html`: オフラインレンダリング機能を示すデモページです。
    -   `demo/styles.css`, `demo/streaming-demo.css`: デモページのUIスタイルを定義するCSSファイルです。
    -   `demo/instrument/`, `demo/effect/`, `demo/sequences/`: 様々な楽器、エフェクト、音楽シーケンスのJSON定義とJavaScriptコードのサンプルを含み、デモで利用されます。
-   **`demo-library/index.html`**:
    -   `tonejs-json-sequencer`を他のプロジェクトからライブラリとして利用する際の具体的なコード例を示すHTMLデモです。
-   **`docs/tonejs-components-roadmap.ja.md`**:
    -   Tone.jsの各コンポーネントがJSONでどのように対応しているか、また今後の実装計画について詳細に記述された日本語ドキュメントです。
-   **`package.json`**:
    -   プロジェクトのメタ情報（名前、バージョンなど）、開発依存関係、ビルドスクリプトなどを定義するファイルです。

## 関数詳細説明

-   **`scheduleOrExecuteEvent(Tone, nodes, event, currentTime)`** (dist/cjs/event-scheduler.js)
    -   **役割**: 指定された単一のシーケンスイベント（音符の発音、パラメータ変更など）をTone.jsのタイムラインに沿ってスケジュールするか、即座に実行します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `nodes`: `SequencerNodes`のインスタンスで、作成済みのTone.jsノードを管理します。
        -   `event`: 実行するイベントの内容を記述したオブジェクト（`SequenceEvent`型）。
        -   `currentTime`: イベントをスケジュールする基準となる現在の時間。
    -   **戻り値**: スケジュールされたイベントのID、またはPromise<void>。

-   **`playSequence(Tone, nodes, sequence, startTime?)`** (dist/cjs/event-scheduler.js)
    -   **役割**: 複数のシーケンスイベントからなる配列をまとめて再生します。各イベントは`scheduleOrExecuteEvent`を介して処理されます。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `nodes`: `SequencerNodes`のインスタンス。
        -   `sequence`: `SequenceEvent`オブジェクトの配列。
        -   `startTime` (オプション): 再生を開始するTone.jsの時刻。指定しない場合は即時開始。
    -   **戻り値**: 全てのイベントがスケジュールされた後に解決する`Promise<void>`。

-   **`createNode(Tone, event)`** (dist/cjs/node-factory.js)
    -   **役割**: `CreateNodeEvent`の定義に従って、新しいTone.jsの楽器（Synthなど）またはエフェクト（Reverbなど）ノードを作成します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `event`: ノードの種類、ID、初期設定などを記述した`CreateNodeEvent`オブジェクト。
    -   **戻り値**: 新しく作成されたTone.jsのオーディオノードインスタンス。

-   **`connectNode(nodes, event)`** (dist/cjs/node-factory.js)
    -   **役割**: `ConnectEvent`の定義に従って、既存のTone.jsノードを指定された別のノードや`toDestination`（最終出力）に接続します。
    -   **引数**:
        -   `nodes`: `SequencerNodes`のインスタンス。
        -   `event`: 接続元のノードID、接続先のノードIDまたは`'toDestination'`を記述した`ConnectEvent`オブジェクト。
    -   **戻り値**: なし。

-   **`parseNDJSON(ndjsonString)`** (dist/cjs/ndjson-streaming.js)
    -   **役割**: NDJSON (Newline Delimited JSON) 形式の文字列を解析し、`SequenceEvent`オブジェクトの配列に変換します。
    -   **引数**:
        -   `ndjsonString`: 解析対象のNDJSON形式の文字列。
    -   **戻り値**: 解析された`SequenceEvent`オブジェクトの配列。

-   **`SequencerNodes` クラス** (dist/cjs/sequencer-nodes.js)
    -   **`constructor()`**
        -   **役割**: `SequencerNodes`インスタンスを初期化し、Tone.jsノードをIDで管理するための内部マップを作成します。
        -   **引数**: なし。
        -   **戻り値**: `SequencerNodes`の新しいインスタンス。
    -   **`get(nodeId)`**
        -   **役割**: 指定されたノードIDに関連付けられたTone.jsノードインスタンスを取得します。
        -   **引数**:
            -   `nodeId`: 取得したいノードの数値ID。
        -   **戻り値**: 該当するTone.jsノードインスタンス、または見つからない場合は`undefined`。
    -   **`set(nodeId, node)`**
        -   **役割**: 指定されたノードIDにTone.jsノードインスタンスを関連付けて登録します。
        -   **引数**:
            -   `nodeId`: 登録するノードの数値ID。
            -   `node`: 登録するTone.jsオーディオノード。
        -   **戻り値**: なし。
    -   **`disposeAll()`**
        -   **役割**: `SequencerNodes`によって管理されている全てのTone.jsノードを解放し、リソースをクリーンアップします。
        -   **引数**: なし。
        -   **戻り値**: なし。

-   **`NDJSONStreamingPlayer` クラス** (dist/cjs/ndjson-streaming.js)
    -   **`constructor(Tone, nodes, options)`**
        -   **役割**: NDJSONストリーミングプレーヤーのインスタンスを初期化します。再生オプション（先読み時間、ループ設定など）を設定できます。
        -   **引数**:
            -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
            -   `nodes`: `SequencerNodes`のインスタンス。
            -   `options`: プレーヤーの挙動を制御する設定オブジェクト（`NDJSONStreamingPlayerOptions`型）。
        -   **戻り値**: `NDJSONStreamingPlayer`の新しいインスタンス。
    -   **`start(ndjson)`**
        -   **役割**: NDJSONストリームの再生を開始または更新します。これにより、リアルタイム編集やループ再生が可能になります。
        -   **引数**:
            -   `ndjson`: NDJSON形式の文字列、または`SequenceEvent`オブジェクトの配列。
        -   **戻り値**: 再生開始後に解決する`Promise<void>`。
    -   **`stop()`**
        -   **役割**: 現在実行中のNDJSONストリーミング再生を停止します。
        -   **引数**: なし。
        -   **戻り値**: なし。

-   **`OfflineRenderer` クラス** (dist/cjs/offline-renderer.js)
    -   **`constructor(Tone, nodes)`**
        -   **役割**: オフラインレンダラーのインスタンスを初期化します。
        -   **引数**:
            -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
            -   `nodes`: `SequencerNodes`のインスタンス。
        -   **戻り値**: `OfflineRenderer`の新しいインスタンス。
    -   **`render(sequence, duration)`**
        -   **役割**: 指定された音楽シーケンスを、指定された期間オフラインでレンダリングし、結果のAudioBufferを返します。
        -   **引数**:
            -   `sequence`: レンダリングする`SequenceEvent`オブジェクトの配列。
            -   `duration`: レンダリングする秒単位の期間。
        -   **戻り値**: レンダリングされたオーディオデータを含む`Promise<AudioBuffer>`。

-   **`TimeParser` クラス** (dist/cjs/utils/time-parser.js)
    -   **`constructor(bpm)`**
        -   **役割**: 指定されたBPM（Beats Per Minute）でタイムパーサーを初期化します。BPMは時間表記の計算に影響します。
        -   **引数**:
            -   `bpm`: 曲のテンポを示す数値。
        -   **戻り値**: `TimeParser`の新しいインスタンス。
    -   **`parseTimeToSeconds(time)`**
        -   **役割**: "4n", "0:0:2" などのTone.js時間表記や数値の時間を、正確な秒数に変換します。
        -   **引数**:
            -   `time`: 解析する時間表記（文字列または数値）。
        -   **戻り値**: 変換された秒数。

## 関数呼び出し階層ツリー
```
- for (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - rampParameter (dist/cjs/event-scheduler.js)
      - forEach ()
      - defineProperty ()
      - stop ()
      - get ()
      - disposeAll ()
      - start ()
      - ensureAudioContextStarted ()
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode ()
- if (dist/cjs/event-scheduler.js)
  - createInstrument (dist/cjs/factories/instrument-factory.d.ts)
    - createPolySynth ()
      - createSampler ()
  - set ()
  - copyRecursive (scripts/copy-to-dist.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports ()
  - createEffect (dist/cjs/factories/effect-factory.d.ts)
    - startIfAvailable ()
- switch (dist/cjs/event-scheduler.js)
- catch (dist/cjs/event-scheduler.js)
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (undefined)
  - parseNDJSON (dist/cjs/ndjson-streaming.d.ts)
- i (dist/demo/instrument/loopend-test.js)
- loadAllSequences (dist/demo/sequenceLoader.js)

---
Generated at: 2026-02-09 07:11:23 JST
