Last updated: 2026-02-05

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: HTML/CSS (デモページの構築), JavaScript (ブラウザでの実行ロジック)
- 音楽・オーディオ: Tone.js (Web Audio APIを抽象化し、シンセ、エフェクト、スケジューリングを可能にする主要ライブラリ), Web Audio API (Tone.jsの基盤技術)
- 開発ツール: TypeScript (静的型付けによる開発効率向上), npm (パッケージ管理), Node.js (開発スクリプト実行環境)
- テスト: (プロジェクト情報には具体的なテストフレームワークの記載はありませんが、TypeScriptの利用により静的型チェックが行われています)
- ビルドツール: TypeScriptコンパイラ (TypeScriptコードからJavaScript (.js, .mjs, .cjs) および型定義ファイル (.d.ts) を生成), fs/path (ファイル操作スクリプトで使用)
- 言語機能: ES Modules (.mjs, 最新のJavaScriptモジュール形式), CommonJS (.cjs, Node.js向けのモジュール形式)
- 自動化・CI/CD: GitHub Actions (READMEの自動英訳などに使用)
- 開発標準: .editorconfig (複数のエディタやIDE間でコードスタイルの一貫性を保つための設定)

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
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
      📜 chorus.js
      📜 distortion.js
      📜 feedbackdelay.js
      📜 freeverb.js
      📜 frequencyshifter.js
      📜 jcreverb.js
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
      📘 chorus.ts
      📘 distortion.ts
      📘 feedbackdelay.ts
      📘 freeverb.ts
      📘 frequencyshifter.ts
      📘 jcreverb.ts
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

*   **`src/index.ts`**: ライブラリのエントリポイントで、主要なモジュール（`SequencerNodes`, `playSequence`, `NDJSONStreamingPlayer`）を公開しています。
*   **`src/event-scheduler.ts`**: JSONで定義された音楽イベントをTone.jsのAPIを用いてスケジュールまたは即座に実行する中核ロジックを実装しています。
*   **`src/ndjson-streaming.ts`**: NDJSON (改行区切りJSON) 形式の音楽シーケンスをリアルタイムで処理し、ライブ編集やループ再生に対応する機能を提供します。これにより、演奏中にシーケンスを変更したり、連続的に再生したりすることが可能です。
*   **`src/offline-renderer.ts`**: JSONシーケンスをオフラインでレンダリングし、結果として得られる音声をWAVファイルとして出力するための機能を提供します。これにより、ブラウザで再生するだけでなく、生成した音源をファイルとして保存できます。
*   **`src/node-factory.ts`**: JSON定義に基づき、Tone.jsのシンセサイザーやエフェクトなどのオーディオノードを作成し、それらのノード間の接続を管理する役割を担います。
    *   **`src/factories/instrument-factory.ts`**: 各種Tone.jsの楽器（Synth, Samplerなど）をJSON定義から生成する具体的なロジックをカプセル化しています。
    *   **`src/factories/effect-factory.ts`**: 各種Tone.jsのエフェクト（Reverb, Chorusなど）をJSON定義から生成する具体的なロジックをカプセル化しています。
*   **`src/sequencer-nodes.ts`**: 作成された全てのTone.jsオーディオノードを一元的に管理するためのコンテナクラスを提供します。ノードの取得、設定、一括破棄などの機能があります。
*   **`src/streaming/event-processor.ts`**: NDJSONストリーミングにおいて、受信したイベントを解析し、Tone.jsにスケジュールする具体的な処理ロジックを実装しています。
*   **`src/streaming/playback-state.ts`**: NDJSONストリーミングの再生状態（再生中か、開始時間、現在のイベント、ループ回数など）を管理するクラスです。
*   **`src/types.ts`**: プロジェクト全体で使用されるカスタムの型定義（JSONイベントの構造、ノードタイプなど）を定義しています。これにより、コードの型安全性が向上しています。
*   **`src/utils/time-parser.ts`**: Tone.jsで使われる様々な時間表記（例: "8n" (8分音符), "0:0:2" (0小節0拍2連符)) を標準的な秒単位の時間に変換するユーティリティ関数を提供します。
*   **`src/demo/`ディレクトリ**: プロジェクトの主要な機能をブラウザ上で体験できるデモアプリケーションのソースコードが含まれています。
    *   **`src/demo/main.ts`**: デモアプリケーションのメインロジックで、UIの初期化やシーケンスの再生処理などを制御します。
    *   **`src/demo/modules/audioManager.ts`**: デモのオーディオ再生に関する処理（Tone.jsの開始、シーケンス再生の呼び出しなど）を管理します。
    *   **`src/demo/modules/uiManager.ts`**: デモのユーザーインターフェース（ボタン、テキストエリア、セレクタなど）の操作とイベントハンドリングを管理します。
    *   **`src/demo/sequenceLoader.ts`**: デモで使用する様々な楽器やエフェクトのシーケンス定義データを読み込む役割を担います。
    *   **`src/demo/sequences/`ディレクトリ**: 各種楽器（シンセ、ドラムなど）やエフェクトを適用した具体的な音楽シーケンスのJSON定義ファイル群です。
    *   **`src/demo/instrument/` および `src/demo/effect/` ディレクトリ**: 各楽器やエフェクトのデモで使用されるJSONシーケンス定義のファイルです。
*   **`dist/`ディレクトリ**: `src/`ディレクトリにあるTypeScriptコードをコンパイルしたJavaScriptファイル（ES Modules, CommonJS形式）と型定義ファイルが含まれており、npmパッケージとして配布される成果物です。
*   **`demo/`ディレクトリ (ルート)**: `dist/demo/`内のコンパイル済みJavaScriptファイルと連携するHTMLおよびCSSファイルで、プロジェクトのWebデモページを構成します。
*   **`examples/`ディレクトリ**: `tonejs-json-sequencer`ライブラリをプロジェクトに組み込む際の具体的な使用例（CDN利用、npm利用、オフラインレンダリング）が示されています。
*   **`docs/`ディレクトリ**: プロジェクトに関する追加のドキュメント、特にTone.jsコンポーネントのJSON対応ロードマップなどが含まれています。
*   **`scripts/`ディレクトリ**: ビルドプロセスを補助するためのJavaScriptスクリプト（ファイルコピー、`.js`から`.mjs`へのリネームなど）が含まれています。
*   **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。
*   **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。

## 関数詳細説明

*   **`scheduleOrExecuteEvent(Tone, nodes, event, currentTime)`** (src/event-scheduler.ts):
    *   **役割**: JSONで定義された単一の音楽イベントを、Tone.jsのTransportを使って指定された時間にスケジュールするか、即座に実行します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `nodes` (SequencerNodesインスタンス), `event` (SequenceEventオブジェクト), `currentTime` (現在のオーディオコンテキスト時間)。
    *   **戻り値**: Promise<void>。
*   **`playSequence(Tone, nodes, sequence)`** (src/event-scheduler.ts):
    *   **役割**: 音楽イベントの配列を受け取り、それぞれのイベントを適切なタイミングで`scheduleOrExecuteEvent`を呼び出して再生します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `nodes` (SequencerNodesインスタンス), `sequence` (SequenceEventオブジェクトの配列)。
    *   **戻り値**: Promise<void>。
*   **`createNode(Tone, nodes, event)`** (src/node-factory.ts):
    *   **役割**: JSONイベントの定義に基づいて、Tone.jsの楽器（Synthなど）またはエフェクト（Reverbなど）のインスタンスを作成し、SequencerNodesに登録します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `nodes` (SequencerNodesインスタンス), `event` (createNodeタイプのSequenceEventオブジェクト)。
    *   **戻り値**: 作成されたTone.jsノードまたはnull。
*   **`connectNode(Tone, nodes, event)`** (src/node-factory.ts):
    *   **役割**: 既存のTone.jsノードを指定された別のノードまたは`Tone.Destination`に接続します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `nodes` (SequencerNodesインスタンス), `event` (connectタイプのSequenceEventオブジェクト)。
    *   **戻り値**: なし。
*   **`parseNDJSON(ndjsonStringOrArray)`** (src/ndjson-streaming.ts):
    *   **役割**: 改行区切りのJSON文字列、またはJSONイベントオブジェクトの配列を受け取り、SequenceEventオブジェクトの配列に変換します。無効な行はスキップされます。
    *   **引数**: `ndjsonStringOrArray` (NDJSON文字列またはSequenceEventの配列)。
    *   **戻り値**: SequenceEventの配列。
*   **`NDJSONStreamingPlayer` クラス** (src/ndjson-streaming.ts):
    *   **`constructor(Tone, nodes, options)`**: NDJSONストリーミングプレーヤーを初期化します。先読み時間、ループ設定、ループ完了時のコールバックなどを設定できます。
    *   **`start(ndjson)`**: NDJSONストリーミング再生を開始または既存の再生を更新します。ライブ編集中にシーケンスを再読み込みする際にも使用されます。
    *   **`stop()`**: 現在のストリーミング再生を停止します。
    *   **`processEvents(currentTime)`**: 再生ループ内で定期的に呼び出され、先読み時間に基づいてイベントをTone.jsにスケジュールします。
*   **`SequencerNodes` クラス** (src/sequencer-nodes.ts):
    *   **`constructor()`**: Tone.jsノードをIDで管理するためのマップを初期化します。
    *   **`get(nodeId)`**: 指定されたIDを持つTone.jsノードを取得します。
    *   **`set(nodeId, node)`**: 指定されたIDでTone.jsノードを登録します。
    *   **`disposeAll()`**: 管理している全てのTone.jsノードを破棄し、リソースを解放します。
*   **`audioBufferToWav(buffer)`** (src/offline-renderer.ts):
    *   **役割**: `AudioBuffer`オブジェクトを標準的なWAV形式の`Blob`に変換します。
    *   **引数**: `buffer` (AudioBufferオブジェクト)。
    *   **戻り値**: `Blob` (WAV形式の音声データ)。
*   **`downloadWav(buffer, filename)`** (src/offline-renderer.ts):
    *   **役割**: `AudioBuffer`をWAVファイルに変換し、指定されたファイル名でダウンロードをトリガーします。
    *   **引数**: `buffer` (AudioBufferオブジェクト), `filename` (ダウンロードするファイル名)。
    *   **戻り値**: なし。
*   **`OfflineRenderer` クラス** (src/offline-renderer.ts):
    *   **`constructor(Tone, nodes, options)`**: オフラインレンダラーを初期化します。
    *   **`render(sequence)`**: 指定されたシーケンスをオフラインオーディオコンテキストでレンダリングし、結果の`AudioBuffer`を返します。
*   **`TimeParser` クラス** (src/utils/time-parser.ts):
    *   **`constructor(Tone)`**: Tone.jsインスタンスを使って時間表記を解析するユーティリティを初期化します。
    *   **`parseTimeToSeconds(time, defaultUnit)`**: さまざまな時間表記（例: "4n", "0:1:0", "1.5s"）を秒単位の数値に変換します。
    *   **`parseTickTime(tickTime)`**: "0:0:0"のようなバー・ビート・ティック形式の時間を解析します。
    *   **`isToneNotation(time)`**: 与えられた文字列がTone.jsの時間表記（例: "4n"）であるかを判定します。
*   **`createInstrument(Tone, instrumentType, args)`** (src/factories/instrument-factory.ts):
    *   **役割**: 指定された楽器タイプ（例: 'Synth', 'FMSynth'）と引数を用いて、Tone.jsの楽器インスタンスを作成します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `instrumentType` (楽器のタイプ文字列), `args` (楽器のコンストラクタ引数オブジェクト)。
    *   **戻り値**: 作成されたTone.jsの楽器インスタンス。
*   **`createEffect(Tone, effectType, args)`** (src/factories/effect-factory.ts):
    *   **役割**: 指定されたエフェクトタイプ（例: 'Reverb', 'Chorus'）と引数を用いて、Tone.jsのエフェクトインスタンスを作成します。
    *   **引数**: `Tone` (Tone.jsインスタンス), `effectType` (エフェクトのタイプ文字列), `args` (エフェクトのコンストラクタ引数オブジェクト)。
    *   **戻り値**: 作成されたTone.jsのエフェクトインスタンス。

## 関数呼び出し階層ツリー
```
- switch (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - forEach ()
      - defineProperty ()
      - stop ()
      - get ()
      - disposeAll ()
      - start ()
      - ensureAudioContextStarted ()
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode ()
  - createEffect (dist/cjs/factories/effect-factory.d.ts)
  - createInstrument (dist/cjs/factories/instrument-factory.d.ts)
    - createPolySynth ()
      - createSampler ()
- if (dist/cjs/event-scheduler.js)
  - set ()
  - copyRecursive (scripts/copy-to-dist.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports ()
- catch (dist/cjs/event-scheduler.js)
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (undefined)
  - parseNDJSON (dist/cjs/ndjson-streaming.d.ts)
- loadAllSequences (dist/demo/sequenceLoader.js)

---
Generated at: 2026-02-05 07:11:42 JST
