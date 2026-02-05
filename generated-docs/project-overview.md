Last updated: 2026-02-06

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド:
    - **Tone.js**: Webブラウザ上で高機能な音楽・オーディオ処理を行うためのJavaScriptライブラリ。シンセ、エフェクト、シーケンシングなどの機能を提供する。
    - **HTML/CSS/JavaScript**: Webブラウザ上で動作するデモやサンプルコードの基盤技術として利用されている。
- 音楽・オーディオ:
    - **Tone.js**: Web Audio APIを抽象化し、Webブラウザでの高度なオーディオプログラミングを可能にする。
    - **Web Audio API**: ブラウザのネイティブなオーディオ処理APIで、Tone.jsの基盤となっている。
- 開発ツール:
    - **TypeScript**: 型安全なJavaScript開発を可能にするプログラミング言語。プロジェクトの主要なソースコードがTypeScriptで書かれている。
    - **npm**: Node.jsのパッケージマネージャーで、ライブラリの依存関係管理に使用される。
    - **GitHub Actions**: リポジトリのビルド、テスト、ドキュメントの自動翻訳などのCI/CDプロセスに利用されている。
- テスト:
    - (特筆すべきテストフレームワークの記載なし)
- ビルドツール:
    - **TypeScript Compiler (tsc)**: TypeScriptコードをCommonJS (CJS) および ES Modules (ESM) 形式のJavaScriptにコンパイルする。
- 言語機能:
    - **JSON**: 音色定義、演奏シーケンス、タイミング情報などをデータとして記述するためのフォーマット。
- 自動化・CI/CD:
    - **GitHub Actions**: 自動ビルド、デプロイ、ドキュメントの自動生成・翻訳などに活用されている。
- 開発標準:
    - **EditorConfig**: 異なるエディタやIDEを使用する開発者間で、コードのインデントスタイルや文字コードなどの書式設定を統一するための設定ファイル。

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
  📖 118.md
  📖 120.md
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
- **`.editorconfig`**: コードエディタの設定（インデントスタイル、文字コードなど）をプロジェクト全体で統一するための設定ファイルです。
- **`.gitignore`**: Gitのバージョン管理から除外するファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: 本プロジェクトのライセンス情報が記載されています。
- **`README.ja.md`, `README.md`**: プロジェクトの概要、機能、使用方法などを説明するドキュメントファイルです。日本語版と英語版があります。
- **`RELEASE.ja.md`, `RELEASE.md`**: プロジェクトのリリース履歴や変更点について記述されたファイルです。
- **`_config.yml`**: GitHub Pagesなどの静的サイトジェネレーターで使用される設定ファイルです。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`package-lock.json`**: `package.json`に基づき、npmパッケージの正確な依存関係ツリーを記録します。
- **`tsconfig*.json`**: TypeScriptコンパイラの設定ファイルで、コンパイルオプションや対象ファイルを指定します。
- **`demo/`ディレクトリ**:
    - **`index.html`, `streaming.html`, `offline-rendering.html`**: ブラウザ上で動作する各種デモのHTMLファイルです。
    - **`styles.css`, `streaming-demo.css`**: デモページのレイアウトやデザインを定義するスタイルシートです。
- **`dist/`ディレクトリ**:
    - TypeScriptソースコードをJavaScriptにコンパイルした成果物が格納されています。CommonJS (`cjs/`) と ES Modules (`esm/`) の両形式が提供されます。
    - **`event-scheduler.js` (`.mjs`)**: JSONイベントをTone.jsのタイムラインにスケジュールし、実行する主要なロジックを含みます。
    - **`factories/`**: Tone.jsのインストゥルメント（楽器）やエフェクトノードをJSONの定義に基づいて動的に生成するためのファクトリ関数を格納します。
    - **`index.js` (`.mjs`)**: ライブラリの主要なエントリポイントであり、他のモジュールをエクスポートします。
    - **`ndjson-streaming.js` (`.mjs`)**: NDJSON (改行区切りJSON) 形式のストリームをリアルタイムで処理し、ライブ編集やループ再生を可能にする機能を提供します。
    - **`node-factory.js` (`.mjs`)**: Tone.jsのオーディオノードの作成と、ノード間の接続を管理します。
    - **`offline-renderer.js` (`.mjs`)**: JSONシーケンスをオフラインでレンダリングし、結果をWAV形式のオーディオファイルとして出力する機能を提供します。
    - **`sequencer-nodes.js` (`.mjs`)**: 実行中に作成されたTone.jsノードをIDに基づいて管理するクラスです。
    - **`streaming/`**: NDJSONストリーミング機能の詳細なロジック（イベント処理、再生状態管理など）を格納します。
    - **`types.js` (`.mjs`)**: プロジェクト全体で使用される型定義をまとめたファイルです。
    - **`utils/time-parser.js` (`.mjs`)**: Tone.jsの時間記法（例: "0:0:2", "8n"）を含む文字列を秒数に変換するユーティリティ関数を提供します。
- **`docs/`ディレクトリ**:
    - プロジェクトに関する詳細なドキュメント（例: Tone.jsコンポーネントのJSON対応ロードマップ）を格納します。
- **`examples/`ディレクトリ**:
    - ライブラリの基本的な使用方法を示すコード例が含まれています。
- **`scripts/`ディレクトリ**:
    - ビルドプロセスやファイル操作など、開発を補助するスクリプトが格納されています。
- **`src/`ディレクトリ**:
    - プロジェクトのTypeScriptソースコードが格納されています。`dist/`ディレクトリ内のJavaScriptファイルに対応する元のコードです。

## 関数詳細説明
- **`scheduleOrExecuteEvent(Tone, nodes, event, currentTime)`**:
    - 役割: JSONで定義された単一のイベントをTone.jsのオーディオコンテキストにスケジュールするか、即座に実行します。
    - 引数: `Tone` (Tone.jsインスタンス), `nodes` (`SequencerNodes`インスタンス), `event` (実行するイベントの詳細), `currentTime` (現在のオーディオ時間)。
    - 機能: イベントタイプ（`createNode`, `connect`, `triggerAttackRelease`など）に応じて、対応するTone.jsのメソッドを呼び出します。
- **`playSequence(Tone, nodes, sequence)`**:
    - 役割: JSON形式で記述されたイベントのシーケンス全体を再生します。
    - 引数: `Tone`, `nodes`, `sequence` (再生するイベントの配列)。
    - 機能: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、再生をスケジュールします。
- **`parseNDJSON(ndjsonString)`**:
    - 役割: 改行区切りJSON (NDJSON) 形式の文字列を、`SequenceEvent`オブジェクトの配列に変換します。
    - 引数: `ndjsonString` (NDJSON形式の文字列)。
    - 機能: 各行をJSONとしてパースし、コメント行や空行をスキップして有効なイベントのみを抽出します。
- **`NDJSONStreamingPlayer`クラス**:
    - 役割: NDJSONストリームをリアルタイムで再生し、ライブ編集、ループ再生、先読みによるスムーズな再生をサポートします。
    - `constructor(Tone, nodes, options)`: プレーヤーを初期化します。
    - `start(ndjson)`: NDJSONストリームの再生を開始または更新します。
    - `stop()`: 再生を停止します。
    - `processEvents()`: ループ再生や先読みロジックに基づいてイベントを継続的に処理します。
- **`SequencerNodes`クラス**:
    - 役割: プロジェクト内で作成されたTone.jsのオーディオノードインスタンスを、一意のIDに基づいて管理します。
    - `get(nodeId)`: 指定されたIDのノードを取得します。
    - `set(nodeId, node)`: ノードをIDに関連付けて保存します。
    - `disposeAll()`: 管理している全てのノードを破棄します。
- **`createNode(Tone, nodes, event)`**:
    - 役割: JSONイベントの定義に基づいて、新しいTone.jsノード（シンセサイザーやエフェクトなど）を作成します。
    - 引数: `Tone`, `nodes`, `event` (ノード作成の定義を含むイベント)。
    - 機能: 内部で`createInstrument`や`createEffect`といったファクトリ関数を呼び出し、適切なTone.jsオブジェクトを生成します。
- **`connectNode(nodes, event)`**:
    - 役割: 既存のTone.jsノードを別のノードまたは最終出力（`toDestination`）に接続します。
    - 引数: `nodes`, `event` (接続元と接続先を含むイベント)。
    - 機能: `nodeId`で指定されたノードを`connectTo`で指定されたターゲットに接続します。
- **`createInstrument(Tone, nodeType, args)`**:
    - 役割: 指定された種類のTone.jsインストゥルメント（例: 'Synth', 'FMSynth', 'Sampler'）のインスタンスを作成します。
    - 引数: `Tone`, `nodeType` (インストゥルメントのタイプ名), `args` (コンストラクタ引数)。
    - 機能: `nodeType`に応じて、対応するTone.jsインストゥルメントのコンストラクタを呼び出します。
- **`createEffect(Tone, nodeType, args)`**:
    - 役割: 指定された種類のTone.jsエフェクトノード（例: 'Reverb', 'Chorus', 'Distortion'）のインスタンスを作成します。
    - 引数: `Tone`, `nodeType` (エフェクトのタイプ名), `args` (コンストラクタ引数)。
    - 機能: `nodeType`に応じて、対応するTone.jsエフェクトのコンストラクタを呼び出します。
- **`audioBufferToWav(buffer)`**:
    - 役割: Web Audio APIの`AudioBuffer`オブジェクトをWAV形式の`Blob`データに変換します。
    - 引数: `buffer` (変換する`AudioBuffer`)。
    - 機能: オーディオデータとWAVヘッダーを構築し、ダウンロード可能な`Blob`として返します。
- **`downloadWav(buffer, filename)`**:
    - 役割: `AudioBuffer`をWAVファイルとしてユーザーのブラウザにダウンロードさせます。
    - 引数: `buffer` (`AudioBuffer`), `filename` (ダウンロードするファイル名)。
    - 機能: `audioBufferToWav`を利用してWAVデータを生成し、ダウンロードリンクとして提供します。
- **`OfflineRenderer`クラス**:
    - 役割: JSONシーケンスをリアルタイムではなく、指定された時間範囲でオフラインレンダリングし、結果の`AudioBuffer`を生成します。
    - `render(sequence, renderDuration, renderConfig)`: シーケンスをレンダリングし、`AudioBuffer`を返します。
- **`TimeParser`クラス**:
    - 役割: Tone.jsの時間表記（例: "0:0:2" (小節:拍:16分音符), "8n" (8分音符)）を含む時間文字列を、正確な秒数に変換するユーティリティを提供します。
    - `parseTimeToSeconds(time)`: 様々な時間文字列を秒数に変換します。

## 関数呼び出し階層ツリー
```
- playSequence
  - scheduleOrExecuteEvent
    - createNode
      - createInstrument
        - createPolySynth
        - createSampler
      - createEffect
    - connectNode
    - (Tone.jsのメソッド呼び出し: triggerAttackRelease, rampTo, set など)
- NDJSONStreamingPlayer.start (再生開始/更新)
  - NDJSONStreamingPlayer.initializePlayback (再生状態初期化)
  - NDJSONStreamingPlayer.processEvents (イベント処理ループ)
    - EventProcessor.scheduleEvent
      - scheduleOrExecuteEvent (上記参照)
- OfflineRenderer.render (オフラインレンダリング実行)
  - playSequence (上記参照)
- OfflineRenderer.downloadWav (WAVダウンロード)
  - audioBufferToWav
- parseNDJSON (NDJSON文字列パース)
  - TimeParser.parseTimeToSeconds (内部で利用)
- loadAllSequences (デモ用シーケンス読み込み)

---
Generated at: 2026-02-06 07:12:45 JST
