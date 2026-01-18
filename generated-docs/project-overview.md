Last updated: 2026-01-19

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: 
    - **Web Audio API**: ブラウザ上で高度な音声処理を行うための基盤API。Tone.jsの根幹を成します。
    - **HTML/CSS**: デモアプリケーションのユーザーインターフェースを構築するために使用されています。
    - **JavaScript/TypeScript**: プロジェクトの主要な開発言語であり、全てのロジックがこれらの言語で記述されています。
- 音楽・オーディオ: 
    - **Tone.js**: Web Audio APIを使いやすく抽象化し、シンセサイザー、エフェクト、シーケンサーなどの音楽機能を簡単に実装できるJavaScriptフレームワークです。
    - **JSON**: 音色定義、演奏内容、タイミング情報などをデータとして記述するための標準フォーマットです。
    - **NDJSON (Newline Delimited JSON)**: リアルタイムストリーミングやライブ編集をサポートするために使用される、改行区切りのJSON形式です。
- 開発ツール: 
    - **TypeScript**: JavaScriptに静的型付けを追加し、大規模なプロジェクトでのコードの堅牢性、可読性、保守性を向上させます。
    - **npm**: JavaScriptパッケージの管理とプロジェクトの依存関係の解決に使用されます。
    - **Node.js**: 開発環境におけるJavaScriptの実行環境です。
- テスト: 
    - **TypeScriptによる型チェック**: コンパイル時に型エラーを早期に検出し、コードの品質と安定性を高める役割を果たしています。
- ビルドツール: 
    - **TypeScript Compiler (tsc)**: TypeScriptのソースコードをJavaScript（ES ModulesやCommonJS形式）に変換するために使用されます。
    - **スクリプト (Node.jsベース)**: ビルド成果物を`dist`ディレクトリにコピーしたり、モジュール形式に合わせてファイル名を変更したりする（例: `.js`から`.mjs`へ）ための補助スクリプトが用意されています。
- 言語機能: 
    - **ES Modules (ESM)**: JavaScriptの標準的なモジュールシステムで、ブラウザとNode.jsの両方で利用できる現代的なコード分割とインポート/エクスポートの方法を提供します。
    - **CommonJS (CJS)**: 主にNode.js環境で使用されるモジュールシステムで、広く普及しています。
    - **静的型付け**: TypeScriptによって提供され、開発中のエラーを減らし、コードの理解を容易にします。
- 自動化・CI/CD: 
    - **GitHub Actions**: コードの自動テスト、ビルド、デプロイ、およびドキュメントの自動翻訳（例: README.ja.mdからREADME.mdへの英訳）などの継続的インテグレーション/デプロイメントのタスクを自動化するために使用されます。
    - **npm scripts**: `package.json`に定義されたコマンドで、ビルドや開発タスクを効率的に実行します。
- 開発標準: 
    - **.editorconfig**: 異なる開発環境やエディタを使用するチームメンバー間で、インデントスタイル、文字コード、改行コードなど、一貫したコーディングスタイルを維持するための設定ファイルです。

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
🌐 index.html
📁 issue-notes/
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
- **`.editorconfig`**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。
- **`.gitignore`**: Gitが追跡すべきではないファイルやディレクトリ（例: ビルド成果物、一時ファイル）を指定します。
- **`LICENSE`**: プロジェクトのライセンス情報が記載されています。
- **`NPM_README.md`, `README.ja.md`, `README.md`**: プロジェクトの概要、使い方、開発状況などに関する説明文書です。`README.ja.md`が日本語版、`README.md`がその自動英訳版です。
- **`RELEASE.ja.md`, `RELEASE.md`**: リリースノートや変更履歴が記載されています。
- **`_config.yml`**: GitHub Pagesなどのサイト設定ファイルです。
- **`demo/`**: デモアプリケーションのファイル群を格納するディレクトリです。
    - **`demo/index.html`**: プロジェクトの基本的なデモページです。
    - **`demo/offline-rendering.html`**: オフラインレンダリング機能のデモページです。
    - **`demo/streaming.html`**: NDJSONストリーミング機能のデモページです。
    - **`demo/styles.css`**: デモページのスタイルシートです。
- **`dist/`**: TypeScriptコンパイラによって生成されたJavaScriptのビルド成果物（CommonJS, ES Modules形式）が格納されるディレクトリです。
    - **`dist/cjs/`**: CommonJS形式のモジュールファイル群です。
        - **`dist/cjs/event-scheduler.js`**: シーケンスイベントのスケジュールと実行を行う主要なロジックが含まれています。
        - **`dist/cjs/factories/effect-factory.js`**: JSON定義からTone.jsのエフェクトインスタンスを生成するファクトリです。
        - **`dist/cjs/factories/instrument-factory.js`**: JSON定義からTone.jsの楽器（シンセサイザーなど）インスタンスを生成するファクトリです。
        - **`dist/cjs/index.js`**: ライブラリのCommonJS形式のエントリポイントです。
        - **`dist/cjs/ndjson-streaming.js`**: NDJSON形式のシーケンスをリアルタイムで再生するロジックが含まれています。
        - **`dist/cjs/node-factory.js`**: Tone.jsのノードを作成し、接続するための汎用的な機能を提供します。
        - **`dist/cjs/offline-renderer.js`**: 音楽シーケンスをオフラインでレンダリングし、WAVファイルとして保存する機能を提供します。
        - **`dist/cjs/sequencer-nodes.js`**: 生成されたTone.jsオーディオノードを一元的に管理するクラスです。
        - **`dist/cjs/streaming/event-processor.js`**: NDJSONストリーミングにおけるイベント処理ロジックです。
        - **`dist/cjs/streaming/playback-state.js`**: NDJSONストリーミングの再生状態（現在時刻、ループ回数など）を管理するクラスです。
        - **`dist/cjs/types.js`**: プロジェクト内で使用される共通の型定義をJavaScriptとしてエクスポートします（通常は`.d.ts`と対になります）。
        - **`dist/cjs/utils/time-parser.js`**: Tone.jsのさまざまな時間表記（例: "4n", "0:0:2"）を秒単位に解析するユーティリティです。
    - **`dist/demo/`**: デモアプリケーションのコンパイル済みJavaScriptファイル群です。`src/demo/`に対応します。
        - **`dist/demo/main.js`**: 各デモページのメインロジックを制御します。
        - **`dist/demo/modules/audioManager.js`**: Tone.jsのオーディオコンテキストの管理とシーケンス再生を担当します。
        - **`dist/demo/modules/uiManager.js`**: デモページのユーザーインターフェース要素の操作（ボタンイベント、テキストエリア更新など）を担当します。
        - **`dist/demo/sequenceLoader.js`**: 各デモで使用するプリセットのJSONシーケンスデータをロードします。
        - **`dist/demo/sequences/`**: さまざまな楽器やエフェクトのデモに使用されるサンプルJSONシーケンスデータが格納されています。
        - **`dist/demo/instrument/`**: 各種楽器（シンセ、ドラムなど）のJSON定義サンプルです。
        - **`dist/demo/effect/`**: 各種エフェクトのJSON定義サンプルです。
    - **`dist/esm/`**: ES Modules形式のモジュールファイル群です。`.cjs/`と同様のファイル構成です。
- **`docs/`**: プロジェクトに関する追加のドキュメントが格納されています。
    - **`docs/tonejs-components-roadmap.ja.md`**: Tone.jsコンポーネントのJSON対応状況とロードマップが日本語で詳細に記述されています。
- **`examples/`**: ライブラリの基本的な使用方法を示すコード例（HTML, JavaScript）が格納されています。
- **`scripts/`**: ビルドプロセスを自動化するためのNode.jsスクリプトです。
    - **`scripts/copy-to-dist.js`**: ビルドされたファイルを`dist`ディレクトリにコピーします。
    - **`scripts/rename-to-mjs.js`**: `dist`ディレクトリ内のES Modulesファイルを`.mjs`拡張子にリネームし、関連するインポートパスを修正します。
- **`src/`**: プロジェクトのTypeScriptソースコードが格納されるディレクトリです。
    - **`src/demo/`**: デモアプリケーションのTypeScriptソースコードです。
    - **`src/event-scheduler.ts`**: イベントスケジューラのTypeScriptソースコードです。
    - **`src/factories/`**: 楽器およびエフェクトファクトリのTypeScriptソースコードです。
    - **`src/index.ts`**: ライブラリのメインエントリポイントのTypeScriptソースコードです。
    - **`src/ndjson-streaming.ts`**: NDJSONストリーミング機能のTypeScriptソースコードです。
    - **`src/node-factory.ts`**: ノードファクトリのTypeScriptソースコードです。
    - **`src/offline-renderer.ts`**: オフラインレンダリング機能のTypeScriptソースコードです。
    - **`src/sequencer-nodes.ts`**: シーケンサーノード管理クラスのTypeScriptソースコードです。
    - **`src/streaming/`**: ストリーミング処理内部のTypeScriptソースコードです。
    - **`src/types.ts`**: プロジェクト全体の型定義のTypeScriptソースコードです。
    - **`src/utils/time-parser.ts`**: 時間解析ユーティリティのTypeScriptソースコードです。
- **`tsconfig*.json`**: TypeScriptコンパイラの設定ファイルです。

## 関数詳細説明
- **`scheduleOrExecuteEvent(Tone, nodes, event, time)`**:
    - **役割**: 単一のシーケンスイベント（例: 楽器の音を鳴らす、エフェクトのパラメータを変更する）をTone.jsのオーディオコンテキストにスケジュールするか、即座に実行します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`クラスのインスタンスで、作成されたTone.jsノードを管理します。
        - `event`: 実行するシーケンスイベントの詳細を含むオブジェクト。
        - `time`: イベントが実行されるべき時間（Tone.jsのタイムフォーマットまたは秒数）。
    - **戻り値**: Promise<void>
- **`playSequence(Tone, nodes, sequence)`**:
    - **役割**: JSON形式で定義された一連のシーケンスイベント全体を、`scheduleOrExecuteEvent`を使用して順番に再生します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`クラスのインスタンス。
        - `sequence`: 再生するシーケンスイベントの配列。
    - **戻り値**: Promise<void>
- **`createEffect(Tone, effectType, args)`**:
    - **役割**: 指定されたエフェクトの種類と設定に基づいて、Tone.jsのエフェクト（例: Reverb, Chorus）インスタンスを作成します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `effectType`: 作成するエフェクトのタイプを識別する文字列（例: "Reverb", "Chorus"）。
        - `args`: エフェクトの初期設定パラメータを含むオブジェクトまたは配列。
    - **戻り値**: Tone.jsのエフェクトインスタンス。
- **`createInstrument(Tone, instrumentType, args)`**:
    - **役割**: 指定された楽器の種類と設定に基づいて、Tone.jsの楽器（例: Synth, PolySynth）インスタンスを作成します。また、PolySynthやSamplerのような特殊な楽器の作成も内部で処理します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `instrumentType`: 作成する楽器のタイプを識別する文字列（例: "Synth", "FMSynth"）。
        - `args`: 楽器の初期設定パラメータを含むオブジェクトまたは配列。
    - **戻り値**: Tone.jsの楽器インスタンス。
- **`parseNDJSON(ndjsonStringOrArray)`**:
    - **役割**: NDJSON形式の文字列、またはJavaScriptオブジェクトの配列をパースし、標準化されたシーケンスイベントの配列に変換します。
    - **引数**: `ndjsonStringOrArray`: NDJSON形式の文字列、または既にパースされたイベントオブジェクトの配列。
    - **戻り値**: `SequenceEvent`型（プロジェクト内で定義されたイベントオブジェクトの型）の配列。
- **`NDJSONStreamingPlayer` クラス (コンストラクタ)**:
    - **役割**: NDJSON形式のシーケンスデータをリアルタイムでストリーミング再生するためのプレーヤーを初期化します。ライブ編集やループ再生機能も提供します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`クラスのインスタンス。
        - `options`: プレーヤーの設定オプション（先読み時間、ループの有無、ループ完了時のコールバックなど）。
    - **戻り値**: `NDJSONStreamingPlayer`のインスタンス。
- **`NDJSONStreamingPlayer.prototype.start(ndjson)`**:
    - **役割**: NDJSONストリーミング再生を開始します。再生中に新しいNDJSONを渡すことで、シームレスなライブ編集が可能です。
    - **引数**: `ndjson`: 再生するNDJSON文字列またはイベント配列。
    - **戻り値**: Promise<void>
- **`NDJSONStreamingPlayer.prototype.stop()`**:
    - **役割**: 現在のNDJSONストリーミング再生を停止します。
    - **引数**: なし。
    - **戻り値**: なし。
- **`SequencerNodes` クラス (コンストラクタ)**:
    - **役割**: プロジェクト内で作成されたTone.jsのオーディオノード（楽器、エフェクトなど）を、一意のIDで管理するためのインスタンスを作成します。
    - **引数**: なし。
    - **戻り値**: `SequencerNodes`のインスタンス。
- **`SequencerNodes.prototype.get(nodeId)`**:
    - **役割**: 指定されたIDに関連付けられたTone.jsノードを取得します。
    - **引数**: `nodeId`: 取得したいノードのID。
    - **戻り値**: 指定されたIDのTone.jsノード、または見つからない場合は`undefined`。
- **`SequencerNodes.prototype.set(nodeId, node)`**:
    - **役割**: Tone.jsノードを特定のIDに関連付けて登録します。
    - **引数**:
        - `nodeId`: ノードに関連付ける一意のID。
        - `node`: 登録するTone.jsノードインスタンス。
    - **戻り値**: なし。
- **`SequencerNodes.prototype.disposeAll()`**:
    - **役割**: `SequencerNodes`によって管理されているすべてのTone.jsノードを破棄し、リソースを解放します。
    - **引数**: なし。
    - **戻り値**: なし。
- **`audioBufferToWav(buffer)`**:
    - **役割**: Web Audio APIの`AudioBuffer`オブジェクトから、標準的なWAV形式の`ArrayBuffer`を生成します。オフラインレンダリングで作成された音声をファイル化する際に使用されます。
    - **引数**: `buffer`: WAVファイルに変換する`AudioBuffer`オブジェクト。
    - **戻り値**: WAV形式のデータを含む`ArrayBuffer`。
- **`downloadWav(buffer, filename)`**:
    - **役割**: 生成されたWAV形式の`ArrayBuffer`をブラウザを通じてユーザーにダウンロードさせます。
    - **引数**:
        - `buffer`: ダウンロードするWAV形式の`ArrayBuffer`。
        - `filename`: ダウンロードされるWAVファイルのファイル名。
    - **戻り値**: なし。
- **`parseTimeToSeconds(time, now)`**:
    - **役割**: Tone.jsがサポートする様々な時間表記（例: "4n" (四分音符), "0:0:2" (0小節0拍2ティック), "+8n" (現在時刻から八分音符分後)）を、指定された基準時間からの秒数に変換します。
    - **引数**:
        - `time`: 解析する時間文字列。
        - `now`: 基準となる現在の時刻（秒数）。
    - **戻り値**: 解析された時間を示す秒数。

## 関数呼び出し階層ツリー
```
- switch (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - forEach ()
      - defineProperty ()
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
Generated at: 2026-01-19 07:09:05 JST
