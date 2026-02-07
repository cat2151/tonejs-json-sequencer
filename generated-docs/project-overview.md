Last updated: 2026-02-08

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリです。
- コードを書かずに音をデータで制御でき、UIやストリーミングと自然に連携します。
- 時間順のイベントをデータとして扱い、緻密な演奏表現を可能にします。

## 技術スタック
- フロントエンド: **Tone.js** (Web Audio API上に構築された音楽制作ライブラリ), **JavaScript/TypeScript** (モダンなウェブアプリケーション開発言語)
- 音楽・オーディオ: **Tone.js** (シンセサイザー、エフェクト、シーケンシングなどの音楽表現を可能にする)
- 開発ツール: **TypeScript** (JavaScriptに型安全性をもたらす言語), **npm** (Node.jsパッケージマネージャー), **GitHub Actions** (CI/CDおよび自動翻訳に使用)
- テスト: (明示的なテストフレームワークの記載はありませんが、TypeScriptによる型チェックがコード品質向上に寄与します)
- ビルドツール: **TypeScript Compiler** (TypeScriptからJavaScriptへの変換), **`scripts/copy-to-dist.js`**, **`scripts/rename-to-mjs.js`** (ビルド後のファイル整理スクリプト)
- 言語機能: **TypeScript** (ECMAScriptのスーパーセットとして、クラス、インターフェース、ジェネリクスなどの高度な言語機能を提供)
- 自動化・CI/CD: **GitHub Actions** (プロジェクトのビルド、テスト、ドキュメントの自動生成・翻訳などのワークフローを自動化)
- 開発標準: **.editorconfig** (異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイル)

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
- **`src/` ディレクトリ**: プロジェクトのTypeScriptソースコードが格納されています。主要なロジックがここに定義されています。
    - **`src/event-scheduler.ts`**: JSONで定義された音楽イベントをTone.jsのタイムラインにスケジュールしたり、即座に実行したりする中核的な処理を担います。
    - **`src/factories/` ディレクトリ**: Tone.jsの様々なコンポーネント（楽器、エフェクトなど）をJSON定義に基づいて作成するためのファクトリ関数を提供します。
        - **`src/factories/instrument-factory.ts`**: シンセサイザーやサンプラーなどの楽器ノードを作成します。
        - **`src/factories/effect-factory.ts`**: リバーブやディストーションなどのエフェクトノードを作成します。
    - **`src/node-factory.ts`**: 楽器やエフェクトといった異なる種類のノードを作成し、それらを接続する共通インターフェースを提供します。
    - **`src/sequencer-nodes.ts`**: 作成されたTone.jsノード（楽器やエフェクトなど）を一元的に管理し、IDによるアクセスや一括破棄の機能を提供します。
    - **`src/ndjson-streaming.ts`**: NDJSON（改行区切りJSON）形式のイベントストリームをリアルタイムで再生・更新する機能を提供します。ライブコーディングやループ再生に対応しています。
    - **`src/offline-renderer.ts`**: 音楽シーケンスをブラウザのバックグラウンドでレンダリングし、生成されたオーディオをWAVファイルとしてダウンロードする機能を提供します。
    - **`src/types.ts`**: プロジェクト全体で使用されるカスタム型定義（例：`SequenceEvent`, `NodeType`など）を集中管理します。
    - **`src/utils/time-parser.ts`**: `Tone.js`の特定の時間表記（例: "0:0:2"）を秒単位にパースするユーティリティ機能を提供します。
    - **`src/streaming/` ディレクトリ**: NDJSONストリーミング機能の内部ロジックを構成するモジュールです。
        - **`src/streaming/event-processor.ts`**: NDJSONストリーミングにおいて、イベントの作成、接続、スケジューリングを処理します。
        - **`src/streaming/playback-state.ts`**: NDJSONストリーミング再生の状態（現在の時間、処理済みイベント、ループカウントなど）を管理します。
    - **`src/demo/` ディレクトリ**: ライブラリの様々な機能をデモンストレーションするためのサンプルコードと関連ファイルが含まれています。
        - **`src/demo/main.ts`**: デモアプリケーションのエントリーポイントであり、UIとオーディオの連携を管理します。
        - **`src/demo/modules/audioManager.ts`**: Tone.jsを使ったオーディオ再生に関するロジックをカプセル化し、シーケンスの再生やオーディオコンテキストの管理を行います。
        - **`src/demo/modules/uiManager.ts`**: デモページのユーザーインターフェース要素の操作やイベント処理を管理します。
        - **`src/demo/sequences/` ディレクトリ**: 様々な楽器、エフェクト、奏法を試すためのJSONシーケンスのサンプルを格納しています。

- **`dist/` ディレクトリ**: TypeScriptソースコードがJavaScriptにコンパイルされた成果物が格納されています。ES Modules (`esm/`) と CommonJS (`cjs/`) の両形式で提供され、型定義ファイル (`.d.ts`) も含まれます。これにより、様々なプロジェクト環境で利用可能です。
- **`demo/` ディレクトリ**: ライブデモ用のHTML、CSSファイルです。プロジェクトの動作をブラウザで実際に確認できます。
- **`demo-library/` ディレクトリ**: ライブラリとしてプロジェクトを組み込む場合の具体的な使用例を示すデモです。
- **`docs/` ディレクトリ**: プロジェクトのドキュメントが格納されており、特に`tonejs-components-roadmap.ja.md`はTone.jsコンポーネントのJSON対応状況の詳細なロードマップを示します。
- **`examples/` ディレクトリ**: npmやCDNを使ったプロジェクトの基本的な使用例を示すファイルです。
- **`scripts/` ディレクトリ**: ビルドプロセスを支援するJavaScriptスクリプト（例：`copy-to-dist.js`, `rename-to-mjs.js`）が含まれています。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されています。

## 関数詳細説明
- **`scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent, time: number | string)`**
    - **役割**: 指定されたJSONイベントをTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`のインスタンスで、作成済みノードを管理します。
        - `event`: 実行する`SequenceEvent`オブジェクト（例: `createNode`, `triggerAttackRelease`など）。
        - `time`: イベントを実行する時刻（Tone.jsのタイムスタンプ形式または秒単位）。
    - **戻り値**: `Promise<void>`。イベントの実行が完了すると解決します。
    - **機能**: `eventType`に応じて適切なTone.jsのメソッドを呼び出し、音の生成やパラメータ変更を行います。安全性のため、ホワイトリスト形式で対応イベントを処理します。

- **`playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[], startOffset?: number)`**
    - **役割**: JSONイベントの配列全体を再生します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`のインスタンス。
        - `sequence`: 再生する`SequenceEvent`オブジェクトの配列。
        - `startOffset`: (オプション) シーケンスの開始オフセット時間（秒単位）。
    - **戻り値**: `Promise<void>`。シーケンスの再生が完了すると解決します。
    - **機能**: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、再生を開始します。

- **`createNode(Tone: typeof Tone, nodes: SequencerNodes, nodeId: number, nodeType: NodeType, args?: any)`**
    - **役割**: JSON定義に基づいてTone.jsのオーディオノード（シンセサイザー、エフェクトなど）を作成し、`SequencerNodes`に登録します。
    - **引数**:
        - `Tone`: Tone.jsライブラリのインスタンス。
        - `nodes`: `SequencerNodes`のインスタンス。
        - `nodeId`: 新しく作成するノードに割り当てる一意のID。
        - `nodeType`: 作成するTone.jsノードの種類（例: 'Synth', 'Reverb'など）。
        - `args`: (オプション) ノードのコンストラクタに渡す引数オブジェクト。
    - **戻り値**: `Tone.ToneAudioNode`。作成されたTone.jsノードのインスタンス。
    - **機能**: `instrument-factory`や`effect-factory`を利用して適切なTone.jsノードをインスタンス化します。

- **`connectNode(nodes: SequencerNodes, fromNodeId: number, toNodeId: number | 'toDestination')`**
    - **役割**: `SequencerNodes`に登録されている2つのTone.jsノードを接続します。
    - **引数**:
        - `nodes`: `SequencerNodes`のインスタンス。
        - `fromNodeId`: 接続元となるノードのID。
        - `toNodeId`: 接続先となるノードのID、またはTone.jsの最終出力先を示す `'toDestination'`。
    - **戻り値**: `void`。
    - **機能**: 指定されたIDのノードを取得し、`Tone.connect()`メソッドを使ってオーディオグラフを構築します。

- **`parseNDJSON(ndjsonString: string)` (in `ndjson-streaming.ts`)**
    - **役割**: NDJSON形式の文字列を`SequenceEvent`オブジェクトの配列にパースします。
    - **引数**: `ndjsonString`: NDJSON形式の文字列。
    - **戻り値**: `SequenceEvent[]`。パースされたイベントの配列。
    - **機能**: 各行を個別のJSONオブジェクトとして解析し、配列に格納します。

- **`NDJSONStreamingPlayer` クラス (in `ndjson-streaming.ts`)**
    - **役割**: NDJSONイベントストリームのリアルタイム再生、ライブ編集、ループ再生を管理します。
    - **主なメソッド**:
        - **`constructor(Tone: typeof Tone, nodes: SequencerNodes, options?: NDJSONStreamingPlayerOptions)`**: プレイヤーを初期化します。
        - **`start(ndjson: string | SequenceEvent[])`**: NDJSONデータまたはイベント配列で再生を開始または更新します。
        - **`stop()`**: 再生を停止します。
        - **`isPlaying(): boolean`**: 現在再生中かどうかを返します。
    - **機能**: `requestAnimationFrame`と先読みロジックを組み合わせて、スムーズで正確なリアルタイム再生を実現します。

- **`SequencerNodes` クラス (in `sequencer-nodes.ts`)**
    - **役割**: プロジェクト内で作成されたすべてのTone.jsノード（シンセ、エフェクトなど）をIDで管理します。
    - **主なメソッド**:
        - **`constructor()`**: ノードマップを初期化します。
        - **`get(nodeId: number)`**: 指定されたIDのノードを取得します。
        - **`set(nodeId: number, node: Tone.ToneAudioNode)`**: ノードをIDと関連付けて登録します。
        - **`disposeAll()`**: 登録されているすべてのノードを破棄し、リソースを解放します。
    - **機能**: ノードのライフサイクル管理と、`nodeId`を通じた効率的なアクセスを提供します。

- **`OfflineRenderer` クラス (in `offline-renderer.ts`)**
    - **役割**: 音楽シーケンスをオフラインでオーディオにレンダリングし、WAVファイルとして出力する機能を提供します。
    - **主なメソッド**:
        - **`constructor(Tone: typeof Tone, nodes: SequencerNodes, TimeParser: TimeParser)`**: レンダラーを初期化します。
        - **`render(sequence: SequenceEvent[], onUpdate?: (progress: number) => void)`**: シーケンスをオーディオバッファにレンダリングします。
        - **`audioBufferToWav(buffer: AudioBuffer)`**: `AudioBuffer`をWAV形式の`Blob`に変換します。
        - **`downloadWav(wavBlob: Blob, filename: string)`**: 生成されたWAVファイルをダウンロードします。
    - **機能**: Tone.jsのオフラインレンダリング機能を利用して、視覚化や永続化のためのオーディオファイルを生成します。

- **`TimeParser` クラス (in `utils/time-parser.ts`)**
    - **役割**: `Tone.js`のさまざまな時間表記（例: "4n", "0:0:2"）を標準的な秒数に変換するユーティリティです。
    - **主なメソッド**:
        - **`constructor(bpm: number)`**: 基準となるBPMを設定してパーサーを初期化します。
        - **`parseTimeToSeconds(timeNotation: string)`**: 指定された時間表記を秒数に変換します。
    - **機能**: ユーザーフレンドリーな時間指定を内部的な時間計算に適した形式に変換します。

## 関数呼び出し階層ツリー
```
- playSequence (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.js)
    - switch (dist/cjs/event-scheduler.js) (eventTypeに基づいて処理を分岐)
      - createNode (dist/cjs/node-factory.js)
        - createInstrument (dist/cjs/factories/instrument-factory.js)
          - createPolySynth (dist/cjs/factories/instrument-factory.js)
          - createSampler (dist/cjs/factories/instrument-factory.js)
        - createEffect (dist/cjs/factories/effect-factory.js)
      - connectNode (dist/cjs/node-factory.js)
      - Tone.jsの各種メソッド (例: triggerAttackRelease, rampTo, set など)
  - SequencerNodes.forEach (dist/cjs/sequencer-nodes.js) (ノードの管理)
  - Tone.start (Tone.jsライブラリ)
  - Tone.Transport.bpm.value (BPM設定)

- NDJSONStreamingPlayer.start (dist/cjs/ndjson-streaming.js)
  - parseNDJSON (dist/cjs/ndjson-streaming.js)
  - NDJSONStreamingPlayer.initializePlayback (dist/cjs/ndjson-streaming.js)
  - NDJSONStreamingPlayer.updateEvents (dist/cjs/ndjson-streaming.js)
  - NDJSONStreamingPlayer.processEvents (dist/cjs/ndjson-streaming.js)
    - streaming/event-processor.js のメソッド群 (イベント処理、スケジューリング)
      - scheduleEvent (dist/cjs/streaming/event-processor.js)
      - getEventTime (dist/cjs/streaming/event-processor.js)
      - scheduleOrExecuteEvent (dist/cjs/event-scheduler.js) (上記参照)
  - streaming/playback-state.js のメソッド群 (再生状態管理)
    - incrementProcessLoopCount
    - markEventAsProcessed
    - resetProcessedEvents
  - TimeParser.parseTimeToSeconds (dist/cjs/utils/time-parser.js)

- OfflineRenderer.render (dist/cjs/offline-renderer.js)
  - calculateSequenceDuration (dist/cjs/offline-renderer.js)
  - getEventTime (dist/cjs/offline-renderer.js)
  - Tone.Offline() (Tone.jsのオフラインレンダリング機能)
    - playSequence (dist/cjs/event-scheduler.js) (上記参照)
  - audioBufferToWav (dist/cjs/offline-renderer.js)
    - writeString (dist/cjs/offline-renderer.js)
  - downloadWav (dist/cjs/offline-renderer.js)

- SequencerNodes.disposeAll (dist/cjs/sequencer-nodes.js)
  - forEach (JavaScript組み込み)
    - Tone.ToneAudioNode.dispose() (Tone.jsノードの破棄)

- scripts/copy-to-dist.js
  - copyRecursive (scripts/copy-to-dist.js)
    - fs.statSync (Node.jsファイルシステム)
    - fs.mkdirSync (Node.jsファイルシステム)
    - fs.readdirSync (Node.jsファイルシステム)
    - fs.copyFileSync (Node.jsファイルシステム)
- scripts/rename-to-mjs.js
  - renameFiles (scripts/rename-to-mjs.js)
  - updateImports (scripts/rename-to-mjs.js)
    - fs.readFileSync (Node.jsファイルシステム)
    - fs.writeFileSync (Node.jsファイルシステム)

---
Generated at: 2026-02-08 07:10:41 JST
