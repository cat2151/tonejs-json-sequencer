Last updated: 2026-02-04

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
プロジェクトで使用されている技術スタックを以下のカテゴリに整理して説明します。

- フロントエンド:
  - **HTML/CSS**: デモページやサンプルインターフェースの構造とスタイリングに使用されています。
  - **JavaScript**: プロジェクトの主要な実装言語であり、TypeScriptからコンパイルされたものが使用されます。ES ModulesとCommonJS形式の両方で提供されます。
  - **Web Audio API**: Tone.jsの基盤となるブラウザのオーディオ処理APIで、低遅延で高精度なオーディオ再生を実現します。
- 音楽・オーディオ:
  - **Tone.js**: Web上でシンセサイザー、エフェクト、スケジューリングなど高度な音楽表現を可能にする主要なオーディオライブラリです。
  - **NDJSON**: (Newline Delimited JSON) ストリーミング再生やライブ編集に対応するための、改行区切りJSON形式で音楽イベントデータを扱います。
- 開発ツール:
  - **TypeScript**: プロジェクトのソースコードはTypeScriptで記述されており、型安全な開発を支援します。
  - **npm**: JavaScriptパッケージマネージャーとして、依存関係の管理とプロジェクトのビルドに利用されます。
  - **Node.js**: 開発環境におけるスクリプトの実行やパッケージ管理に利用されます。
- テスト:
  - テストに関する特定のツールやフレームワークは明示されていませんが、安定した機能提供のために内部的な検証が行われていると推測されます。
- ビルドツール:
  - **TypeScript Compiler (tsc)**: TypeScriptコードをJavaScriptにコンパイルするために使用されます。
  - **カスタムビルドスクリプト**: `scripts/`ディレクトリに配置されたJavaScriptファイルが、コンパイル済みファイルの整理やESM形式への変換（`.js`から`.mjs`へリネーム）を行います。
- 言語機能:
  - **JavaScript (ES Modules/CommonJS)**: ライブラリは異なるモジュールシステムに対応し、多様な環境での利用を可能にします。
- 自動化・CI/CD:
  - **GitHub Actions**: ドキュメントの自動英訳など、プロジェクトの自動化フローに利用されています。
- 開発標準:
  - **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するために使用されます。

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
📊 package.json
📁 demo/
  🌐 index.html
  🌐 offline-rendering.html
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
    📜 event-scheduler.js
    📄 event-scheduler.mjs
    📁 factories/
      📘 effect-factory.d.ts
      📜 effect-factory.js
      📄 effect-factory.mjs
      📘 instrument-factory.d.ts
      📜 instrument-factory.js
      📄 instrument-factory.mjs
    📘 index.d.ts
    📜 index.js
    📄 index.mjs
    📘 ndjson-streaming.d.ts
    📜 ndjson-streaming.js
    📄 ndjson-streaming.mjs
    📘 node-factory.d.ts
    📜 node-factory.js
    📄 node-factory.mjs
    📘 offline-renderer.d.ts
    📜 offline-renderer.js
    📄 offline-renderer.mjs
    📘 sequencer-nodes.d.ts
    📜 sequencer-nodes.js
    📄 sequencer-nodes.mjs
    📁 streaming/
      📘 event-processor.d.ts
      📜 event-processor.js
      📄 event-processor.mjs
      📘 playback-state.d.ts
      📜 playback-state.js
      📄 playback-state.mjs
    📘 types.d.ts
    📜 types.js
    📄 types.mjs
    📁 utils/
      📘 time-parser.d.ts
      📜 time-parser.js
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
```

## ファイル詳細説明
プロジェクト内の主要なファイルとディレクトリの役割を説明します。

- **ドキュメント・設定ファイル群**:
  - `README.ja.md`, `README.md`: プロジェクトの概要、使い方、開発状況などを説明する主要ドキュメント（日本語と英語）。
  - `NPM_README.md`: npmパッケージ用のREADMEファイルです。
  - `RELEASE.ja.md`, `RELEASE.md`: リリース履歴や変更点をまとめたドキュメント（日本語と英語）。
  - `LICENSE`: プロジェクトのライセンス情報です。
  - `.editorconfig`: コードの整形ルールを定義し、開発者間で統一されたコーディングスタイルを維持します。
  - `.gitignore`: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
  - `package.json`: プロジェクトのメタデータ（名前、バージョン、依存関係、スクリプトなど）を定義します。

- **`demo/` ディレクトリ**:
  - Webブラウザで動作するデモンストレーションページとその関連ファイルが含まれます。
  - `index.html`: 基本的なシーケンス再生デモのHTMLページ。
  - `offline-rendering.html`: オフラインレンダリング機能のデモHTMLページ。
  - `streaming.html`: NDJSONストリーミング、ライブ編集、ループ再生機能のデモHTMLページ。
  - `styles.css`: デモページのスタイルシートです。
  - `dist/demo/` (ビルドされたデモファイル):
    - `main.js`: 各デモページの主要なロジックを制御します。
    - `modules/audioManager.js`: Tone.jsを介したオーディオ再生を管理します。
    - `modules/uiManager.js`: ユーザーインターフェースの操作と表示を管理します。
    - `sequenceLoader.js`: デモで使用されるプリセットシーケンスデータを読み込みます。
    - `effect/`, `instrument/`, `sequences/`: 特定のエフェクト、楽器、音楽シーケンスの定義をJavaScriptオブジェクトとして含みます。

- **`dist/` ディレクトリ**:
  - TypeScriptソースコードからビルドされた配布用のJavaScriptファイルと型定義ファイルが含まれます。
  - `cjs/`: CommonJS形式のモジュールファイル群（Node.js環境向け）。
    - `index.js`: CommonJS形式のエントリポイントで、主要なモジュールを公開します。
    - 各`*.js`ファイル: それぞれのモジュールのJavaScript実装です。
    - 各`*.d.ts`ファイル: TypeScriptの型定義ファイルで、型補完や静的解析に利用されます。
  - `esm/`: ES Modules形式のモジュールファイル群（ブラウザやモダンなJavaScript環境向け）。
    - `index.mjs`: ES Modules形式のエントリポイントで、主要なモジュールを公開します。
    - 各`*.mjs`ファイル: それぞれのモジュールのJavaScript実装です。
    - 各`*.d.ts`ファイル: TypeScriptの型定義ファイルです。
  - `dist/`直下の`*.js`, `*.mjs`, `*.d.ts`: プロジェクトのエントリポイントおよび主要なモジュールのビルド済みファイルです。

- **`docs/` ディレクトリ**:
  - プロジェクトに関する追加のドキュメントが含まれます。
  - `tonejs-components-roadmap.ja.md`, `tonejs-components-roadmap.md`: Tone.jsコンポーネントのJSON対応ロードマップと詳細な計画を記述したドキュメントです。

- **`examples/` ディレクトリ**:
  - ライブラリの基本的な使用方法を示すコード例が含まれます。
  - `cdn-example.html`: CDNからライブラリを利用するブラウザのHTML例。
  - `npm-example.mjs`: npmパッケージとしてライブラリを利用するES Modulesの例。
  - `offline-rendering-example.html`: オフラインレンダリング機能の簡単な使用例。

- **`scripts/` ディレクトリ**:
  - ビルドプロセスを補助するJavaScriptスクリプトが含まれます。
  - `copy-to-dist.js`: ビルド成果物を`dist`ディレクトリにコピーします。
  - `rename-to-mjs.js`: ES Modulesとして適切に動作するようにファイル名を`.js`から`.mjs`に変換し、インポートパスを修正します。

- **`src/` ディレクトリ**:
  - プロジェクトのTypeScriptソースコードが含まれる最上位ディレクトリです。
  - `event-scheduler.ts`: 音楽イベントのスケジュール管理ロジック。
  - `factories/`: Tone.jsノード（楽器、エフェクト）を生成するためのファクトリ関数。
    - `effect-factory.ts`: 各種エフェクトノードを作成するロジック。
    - `instrument-factory.ts`: 各種楽器ノードを作成するロジック。
  - `index.ts`: ライブラリのエントリポイント。
  - `ndjson-streaming.ts`: NDJSONストリーミング再生ロジック。
  - `node-factory.ts`: 一般的なTone.jsノードの作成と接続ロジック。
  - `offline-renderer.ts`: 音楽シーケンスをオーディオファイル（WAV）としてオフラインでレンダリングするロジック。
  - `sequencer-nodes.ts`: 生成されたTone.jsノードを管理するクラス。
  - `streaming/`: NDJSONストリーミングに関連する詳細なロジック。
    - `event-processor.ts`: ストリーミングイベントの処理ロジック。
    - `playback-state.ts`: ストリーミング再生の状態管理ロジック。
  - `types.ts`: プロジェクト全体で利用されるTypeScriptの型定義。
  - `utils/time-parser.ts`: `Tone.js`の時刻表記やティック時間、バー・ビート時間などの文字列を秒数にパースするユーティリティ。
  - `src/demo/`: `demo/`ディレクトリのJavaScriptファイルに対応するTypeScriptソースコード。

## 関数詳細説明
プロジェクト内で定義されている主要な関数やクラスメソッドについて説明します。

- **`SequencerNodes` (クラス)**:
  - **役割**: Tone.jsで生成されたオーディオノードを一元的に管理し、IDを通じてアクセスできるようにします。
  - **`constructor()`**: `SequencerNodes`インスタンスを初期化し、ノードを格納するMapを作成します。
  - **`get(nodeId)`**: 指定されたIDを持つノードを返します。
    - `nodeId`: ノードの識別子（数値）。
    - 戻り値: Tone.jsのオーディオノード。
  - **`set(nodeId, node)`**: 指定されたIDでノードを登録します。
    - `nodeId`: ノードの識別子（数値）。
    - `node`: 登録するTone.jsのオーディオノード。
  - **`disposeAll()`**: 管理しているすべてのノードを破棄し、リソースを解放します。
- **`scheduleOrExecuteEvent(Tone, nodes, event, time)`**:
  - **役割**: Tone.jsのオーディオイベントを、指定された時刻にスケジュールするか、即時実行します。
  - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
  - `nodes`: `SequencerNodes`のインスタンス。
  - `event`: 実行するオーディオイベントのデータオブジェクト。
  - `time`: イベントを実行するTone.jsの時刻表記（例: `'0:0:0'`や秒数）。
- **`playSequence(Tone, nodes, sequence)`**:
  - **役割**: 定義されたJSONシーケンスを解析し、Tone.jsのノードを生成・接続し、音楽シーケンスを再生します。
  - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
  - `nodes`: `SequencerNodes`のインスタンス。
  - `sequence`: 演奏するイベントの配列（JSONデータ）。
- **`createNode(Tone, type, args)`**:
  - **役割**: 指定されたタイプと引数に基づいて、Tone.jsのシンセサイザーやエフェクトなどのオーディオノードを作成します。
  - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
  - `type`: 作成するノードのタイプ名（例: `'Synth'`, `'Reverb'`）。
  - `args`: ノードのコンストラクタに渡す引数オブジェクト。
  - 戻り値: 生成されたTone.jsのオーディオノード。
- **`connectNode(node, connectTo)`**:
  - **役割**: 作成されたTone.jsノードを、他のノードまたはマスター出力（`toDestination`）に接続します。
  - `node`: 接続元となるTone.jsのオーディオノード。
  - `connectTo`: 接続先のノードIDまたは文字列（例: `'toDestination'`）。
- **`createInstrument(Tone, type, args)`**:
  - **役割**: Tone.jsのインストゥルメント（例: `Synth`, `FMSynth`, `Sampler`など）を作成します。
  - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
  - `type`: インストゥルメントのタイプ名。
  - `args`: インストゥルメントのコンストラクタ引数。
  - 戻り値: 生成されたTone.jsインストゥルメント。
- **`createEffect(Tone, type, args)`**:
  - **役割**: Tone.jsのエフェクト（例: `Reverb`, `Chorus`, `Distortion`など）を作成します。
  - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
  - `type`: エフェクトのタイプ名。
  - `args`: エフェクトのコンストラクタ引数。
  - 戻り値: 生成されたTone.jsエフェクト。
- **`parseNDJSON(ndjsonString)`**:
  - **役割**: NDJSON形式の文字列を解析し、イベントオブジェクトの配列に変換します。
  - `ndjsonString`: NDJSON形式の文字列。
  - 戻り値: 解析されたイベントオブジェクトの配列。
- **`NDJSONStreamingPlayer` (クラス)**:
  - **役割**: NDJSONストリームを受け取り、リアルタイムで音楽を再生・ライブ編集・ループ再生を可能にするプレーヤーです。
  - **`constructor(Tone, nodes, options)`**: `NDJSONStreamingPlayer`インスタンスを初期化します。
    - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`のインスタンス。
    - `options`: 先読み時間、ループ設定、ループ完了時のコールバックなどの設定オブジェクト。
  - **`start(ndjson)`**: NDJSONデータを受け取り、ストリーミング再生を開始します。
    - `ndjson`: NDJSON文字列またはイベント配列。
  - **`stop()`**: 再生を停止します。
  - **`processEvents()`**: 現在の再生時間に先読みを考慮して、次のイベントをスケジュールします。（内部的に呼び出される）
- **`OfflineRenderer` (クラス)**:
  - **役割**: 音楽シーケンスをブラウザ上で実行し、その結果をWAVオーディオファイルとしてレンダリングおよびダウンロードする機能を提供します。
  - **`constructor(Tone, nodes, timeParser)`**: `OfflineRenderer`インスタンスを初期化します。
    - `Tone`: Tone.jsライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`のインスタンス。
    - `timeParser`: `TimeParser`のインスタンス。
  - **`render(sequence, durationSeconds, onProgress)`**: 指定されたシーケンスをレンダリングし、AudioBufferを返します。
    - `sequence`: 演奏するイベントの配列。
    - `durationSeconds`: レンダリングする時間（秒）。
    - `onProgress`: レンダリングの進行状況を通知するコールバック関数。
    - 戻り値: AudioBufferオブジェクト。
  - **`audioBufferToWav(buffer)`**: AudioBufferオブジェクトをWAV形式のバイナリデータに変換します。
  - **`downloadWav(buffer, filename)`**: レンダリングされたAudioBufferをWAVファイルとしてダウンロードします。
- **`TimeParser` (クラス)**:
  - **役割**: Tone.jsの標準的な時間表記（例: `'4n'`, `'0:0:0'`) やティック時間表記を秒数に変換するユーティリティを提供します。
  - **`constructor(bpm)`**: `TimeParser`インスタンスを初期化します。
    - `bpm`: 基準となるBPM（Beats Per Minute）。
  - **`parseTimeToSeconds(timeString)`**: 様々な時間表記の文字列を秒数に変換します。
    - `timeString`: 解析する時間表記文字列。
    - 戻り値: 変換された秒数。
  - **`parseTickTime(tickTime)`**: ティック時間表記（例: `1920t`）を秒数に変換します。
  - **`parseToneNotation(toneNotation)`**: Tone.jsの音符表記（例: `'4n'`, `'8n.'`）を秒数に変換します。
  - **`parseBarBeatTime(barBeatTime)`**: バー:ビート:16th表記（例: `'0:0:0'`）を秒数に変換します。
- **`loadAllSequences()`**:
  - **役割**: デモ用の様々な音楽シーケンス（インストゥルメント、エフェクト、基本シーケンスなど）を読み込み、コレクションとして提供します。
  - 戻り値: シーケンスのカテゴリとイベントデータを含むオブジェクト。

## 関数呼び出し階層ツリー
```
playSequence(Tone, nodes, sequence)
 ├─ scheduleOrExecuteEvent(Tone, nodes, event, time)
 │  ├─ createNode(Tone, type, args)
 │  │  ├─ createInstrument(Tone, type, args)
 │  │  │  ├─ createPolySynth(Tone, args)
 │  │  │  └─ createSampler(Tone, args)
 │  │  └─ createEffect(Tone, type, args)
 │  └─ connectNode(node, connectTo)
 └─ SequencerNodes (class)
    ├─ get(nodeId)
    ├─ set(nodeId, node)
    └─ disposeAll()

NDJSONStreamingPlayer (class)
 ├─ constructor(Tone, nodes, options)
 ├─ start(ndjson)
 │  ├─ parseNDJSON(ndjsonString)
 │  ├─ initializePlayback()
 │  └─ processEvents()
 │     ├─ EventProcessor (class)
 │     │  ├─ createNodesAndConnections(Tone, nodes, events)
 │     │  └─ scheduleEvent(Tone, nodes, event, time)
 │     │     └─ scheduleOrExecuteEvent(...)
 │     └─ PlaybackState (class)
 │        ├─ start()
 │        ├─ stop()
 │        ├─ markEventAsProcessed(index)
 │        └─ resetProcessedEvents()
 └─ stop()

OfflineRenderer (class)
 ├─ constructor(Tone, nodes, timeParser)
 ├─ render(sequence, durationSeconds, onProgress)
 │  ├─ playSequence(...)
 │  └─ TimeParser (class)
 │     └─ parseTimeToSeconds(timeString)
 │        ├─ parseTickTime(tickTime)
 │        ├─ parseToneNotation(toneNotation)
 │        └─ parseBarBeatTime(barBeatTime)
 ├─ audioBufferToWav(buffer)
 └─ downloadWav(buffer, filename)

scripts/
 ├─ copy-to-dist.js: copyRecursive(src, dest)
 └─ rename-to-mjs.js: renameFiles(directory)
    └─ updateImports(filePath)

loadAllSequences() (demo context)

---
Generated at: 2026-02-04 07:14:25 JST
