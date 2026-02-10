Last updated: 2026-02-11

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリです。
- コードを書かずに音をデータで制御できるため、UIやストリーミングと自然に連携可能です。
- 時間順のイベントをデータとして扱い、緻密な演奏表現を可能にします。

## 技術スタック
プロジェクトで使用されている主な技術スタックをカテゴリ別に整理して説明します。

- フロントエンド: **Tone.js (Web Audio API)**: Webブラウザ上で高機能な音楽表現を可能にするJavaScriptライブラリです。シンセサイザー、エフェクト、オーディオ処理を容易にします。また、デモページでは**HTML**と**CSS**が使用されています。
- 音楽・オーディオ: **Tone.js**: シンセ、エフェクトチェーン、各種オーディオパラメータの制御、シーケンスの再生など、プロジェクトの音響機能全般を担います。
- 開発ツール: **TypeScript**: JavaScriptに静的型付けをもたらし、大規模なアプリケーション開発におけるコードの品質と保守性を向上させます。**npm**: プロジェクトの依存関係を管理し、ビルドやテストなどのスクリプトを実行するためのパッケージマネージャーです。
- テスト: プロジェクト情報に特筆すべきテスト関連技術の明記はありませんが、TypeScriptによる型安全性の確保がコードの品質維持に貢献しています。
- ビルドツール: **TypeScript Compiler (tsc)**: TypeScriptコードをJavaScriptに変換するために使用されます。また、**Node.jsスクリプト** (`scripts/` ディレクトリ内のファイル) が、ビルド後のファイル整理などに用いられています。
- 言語機能: **TypeScript**: 型安全性を提供する主要言語として使用されています。コンパイルされた成果物としては、ES Modules (`.mjs`) とCommonJS (`.js`) の両形式で出力されます。
- 自動化・CI/CD: **GitHub Actions**: README.ja.mdを元にREADME.mdを自動英訳するプロセスに利用されており、継続的な統合・デリバリーの一部として機能しています。
- 開発標準: **EditorConfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルが導入されています。

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
  📖 158.md
  📖 160.md
  📖 162.md
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
- **`.editorconfig`**: コーディングスタイル（インデントサイズ、タブ/スペースなど）を定義し、プロジェクト全体で一貫性を保つための設定ファイルです。
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイルです。
- **`AGENTS.md`**: プロジェクト開発に利用されたAIエージェントに関する情報が記載されている可能性があります。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`NPM_README.md`**: npmパッケージとして公開する際に使用されるREADMEファイルです。
- **`README.ja.md`**: プロジェクトの概要、使い方、開発状況などを記述した日本語のメインドキュメントです。
- **`README.md`**: `README.ja.md`を元に自動生成された英語のメインドキュメントです。
- **`RELEASE.ja.md`**: リリースノートの日本語版です。
- **`RELEASE.md`**: リリースノートの英語版です。
- **`_config.yml`**: GitHub Pagesなどのサイト設定に使用されるJekyll設定ファイルです。
- **`demo/`**: プロジェクトの様々な機能をブラウザ上で試せるデモアプリケーションのHTML、CSS、JavaScriptファイル群です。
  - `index.html`: 基本的なデモページ。
  - `offline-rendering.html`: オフラインレンダリング機能のデモページ。
  - `streaming.html`: NDJSONストリーミングとライブ編集機能のデモページ。
  - `styles.css`, `streaming-demo.css`: デモページのスタイルシートです。
- **`demo-library/`**: `tonejs-json-sequencer`を外部ライブラリとして利用する際の簡単な使用例を示すデモです。
- **`dist/`**: TypeScriptソースコードからコンパイルされた配布可能なJavaScriptファイル群です。
  - `cjs/`, `esm/`: CommonJSとES Modules形式のそれぞれコンパイル済みファイルと型定義ファイルが含まれています。
  - `index.js`, `index.mjs`: ライブラリのエントリポイントです。
  - `*.d.ts`: TypeScriptの型定義ファイルです。
  - `event-scheduler.js`: イベントをスケジュールまたは実行するロジックが含まれます。
  - `factories/`: Tone.jsのInstrumentやEffectノードを生成するためのファクトリ関数が含まれます。
  - `ndjson-streaming.js`: NDJSON形式の音楽データをストリーミング再生する機能が含まれます。
  - `node-factory.js`: Tone.jsノードの生成と接続に関するロジックが含まれます。
  - `offline-renderer.js`: シーケンスをオフラインでレンダリングしてWAVファイルとして出力する機能が含まれます。
  - `sequencer-nodes.js`: 生成されたTone.jsノードを管理するクラスが含まれます。
  - `streaming/`: NDJSONストリーミング再生に関連するイベント処理や再生状態管理のロジックが含まれます。
  - `types.js`: プロジェクト内で使用される型定義が含まれます。
  - `utils/time-parser.js`: 時間表記（例: '4n', '0:0:2'）を解析するユーティリティが含まれます。
- **`docs/`**: プロジェクトに関する詳細なドキュメントが格納されています。
  - `tonejs-components-roadmap.ja.md`: Tone.jsコンポーネントのJSON対応ロードマップ（日本語版）です。
- **`examples/`**: ライブラリの基本的な使用方法を示すコード例です。
- **`issue-notes/`**: GitHub Issuesに関連するメモや計画が保存されているディレクトリです（開発者向け情報）。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されているnpmの設定ファイルです。
- **`package-lock.json`**: `package.json`で定義された依存関係の具体的なバージョンを記録し、ビルドの一貫性を保証するためのファイルです。
- **`scripts/`**: ビルドプロセスやファイル操作など、開発を補助するスクリプトが格納されています。
- **`src/`**: プロジェクトのTypeScriptソースコードが格納されているディレクトリです。`dist/`ディレクトリにコンパイルされる前の原型です。
  - `demo/`: デモアプリケーションのソースコードです。
  - `event-scheduler.ts`: イベントスケジュールの中核ロジックです。
  - `factories/`: InstrumentやEffectのファクトリです。
  - `index.ts`: ライブラリのエントリポイントです。
  - `ndjson-streaming.ts`: NDJSONストリーミング機能のソースコードです。
  - `node-factory.ts`: ノードの生成と接続のロジックです。
  - `offline-renderer.ts`: オフラインレンダリング機能のソースコードです。
  - `sequencer-nodes.ts`: Tone.jsノードを管理するクラスです。
  - `streaming/`: ストリーミング機能の内部ロジックです。
  - `types.ts`: プロジェクト固有の型定義です。
  - `utils/time-parser.ts`: 時間解析ユーティリティのソースコードです。
- **`tsconfig*.json`**: TypeScriptコンパイラの設定ファイルです。

## 関数詳細説明
- **`rampParameter(toneNode, paramPath, value, time)`**:
  - **役割**: 指定されたTone.jsノードの特定のパラメータを、滑らかに指定された値に変化させます（ランプ機能）。
  - **引数**:
    - `toneNode`: 対象となるTone.jsノードインスタンス。
    - `paramPath`: 変化させるパラメータへのパス（例: 'depth', 'volume.value'）。
    - `value`: 最終的に到達する値。
    - `time`: 変化が完了するTone.jsの時間表記（例: '+0.5'）。
  - **戻り値**: なし。
  - **機能**: ビブラートの深さや音量など、時間と共にパラメータを動的に制御するために使用されます。
- **`scheduleOrExecuteEvent(Tone, nodes, event, time)`**:
  - **役割**: JSON形式のイベントを解析し、Tone.jsのコンテキストで即座に実行するか、指定された時間にスケジュールします。プロジェクトのコアとなるイベント処理関数です。
  - **引数**:
    - `Tone`: Tone.jsライブラリ全体。
    - `nodes`: `SequencerNodes`インスタンスで、生成されたノードを管理します。
    - `event`: 処理するJSON形式のイベントオブジェクト。
    - `time`: イベントが実行されるTone.jsの時間表記。
  - **戻り値**: `Promise<void>`。イベントの実行が完了したときに解決されます。
  - **機能**: `createNode`, `connect`, `triggerAttackRelease`, `rampTo`, `set` などの様々なイベントタイプに対応し、Tone.jsの機能を抽象化してデータ駆動で制御します。
- **`playSequence(Tone, nodes, sequence)`**:
  - **役割**: JSON形式のイベント配列（シーケンス）全体をTone.jsを使って再生します。
  - **引数**:
    - `Tone`: Tone.jsライブラリ全体。
    - `nodes`: `SequencerNodes`インスタンス。
    - `sequence`: JSON形式のイベントオブジェクトの配列。
  - **戻り値**: `Promise<void>`。シーケンスの再生が完了したときに解決されます。
  - **機能**: 複数のイベントを順序立てて処理し、楽曲全体を構成・再生するのに利用されます。
- **`createNode(Tone, nodes, event)`**:
  - **役割**: JSON定義に基づいてTone.jsのシンセサイザーやエフェクトノードを生成し、`SequencerNodes`に登録します。
  - **引数**:
    - `Tone`: Tone.jsライブラリ全体。
    - `nodes`: `SequencerNodes`インスタンス。
    - `event`: `createNode`タイプのイベントオブジェクト。
  - **戻り値**: 生成されたTone.jsノードインスタンス。
  - **機能**: 楽曲の音源やエフェクトの構成要素を動的に作成します。
- **`connectNode(nodes, event)`**:
  - **役割**: `SequencerNodes`で管理されている複数のTone.jsノード間を接続し、オーディオルーティングを構築します。
  - **引数**:
    - `nodes`: `SequencerNodes`インスタンス。
    - `event`: `connect`タイプのイベントオブジェクト。
  - **戻り値**: なし。
  - **機能**: 生成したシンセサイザーとエフェクトを接続したり、最終出力をDestination（スピーカーなど）にルーティングしたりします。
- **`SequencerNodes` クラス**:
  - **役割**: 生成されたTone.jsノードをIDと紐付けて管理するマップを提供し、アクセスや一括破棄を可能にします。
  - **メソッド**:
    - `constructor()`: 新しい`SequencerNodes`インスタンスを初期化します。
    - `get(nodeId)`: 指定されたIDのノードを取得します。
    - `set(nodeId, node)`: 指定されたIDでノードを登録します。
    - `disposeAll()`: 管理しているすべてのノードを破棄し、リソースを解放します。
- **`NDJSONStreamingPlayer` クラス**:
  - **役割**: NDJSON (改行区切りJSON) 形式の音楽データをリアルタイムでストリーミング再生し、ライブ編集やループ再生をサポートします。
  - **メソッド**:
    - `constructor(Tone, nodes, options)`: プレーヤーを初期化します。`lookaheadMs`, `loop`, `onLoopComplete`などのオプションを設定できます。
    - `start(ndjson)`: ストリーミング再生を開始または更新します。再生中に呼び出すことでライブ編集が可能です。
    - `stop()`: ストリーミング再生を停止します。
- **`parseNDJSON(ndjsonString)`**:
  - **役割**: NDJSON形式の文字列を受け取り、各行をJSONオブジェクトとしてパースし、`SequenceEvent`オブジェクトの配列に変換します。
  - **引数**: `ndjsonString`: NDJSON形式の文字列。
  - **戻り値**: `SequenceEvent`オブジェクトの配列。
  - **機能**: NDJSONストリームからイベントデータを抽出するために使用されます。
- **`audioBufferToWav(audioBuffer)`**:
  - **役割**: Web Audio APIの`AudioBuffer`オブジェクトをWAV形式のバイナリデータ（ArrayBuffer）に変換します。
  - **引数**: `audioBuffer`: WAVに変換する`AudioBuffer`。
  - **戻り値**: `ArrayBuffer`。WAVフォーマットのバイナリデータです。
  - **機能**: オフラインレンダリングで生成されたオーディオデータをファイルとして保存可能にするために使用されます。
- **`downloadWav(buffer, filename)`**:
  - **役割**: WAV形式の`ArrayBuffer`データをブラウザ経由でユーザーにダウンロードさせます。
  - **引数**:
    - `buffer`: WAVフォーマットの`ArrayBuffer`。
    - `filename`: ダウンロードされるファイル名。
  - **戻り値**: なし。
  - **機能**: オフラインレンダリング結果を簡単に取得できるようにします。

## 関数呼び出し階層ツリー
```
- for (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence
      - rampParameter (dist/cjs/event-scheduler.js)
      - forEach
      - defineProperty
      - stop
      - get
      - disposeAll
      - start
      - ensureAudioContextStarted
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode
- if (dist/cjs/event-scheduler.js)
  - createInstrument (dist/cjs/factories/instrument-factory.d.ts)
    - createPolySynth
      - createSampler
  - set
  - copyRecursive (scripts/copy-to-dist.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports
  - createEffect (dist/cjs/factories/effect-factory.d.ts)
    - startIfAvailable
- switch (dist/cjs/event-scheduler.js)
- catch (dist/cjs/event-scheduler.js)
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (dist/cjs/offline-renderer.js)
  - parseNDJSON (dist/cjs/ndjson-streaming.d.ts)
- i (dist/demo/instrument/loopend-test.js)
- loadAllSequences (dist/demo/sequenceLoader.js)

---
Generated at: 2026-02-11 07:21:00 JST
