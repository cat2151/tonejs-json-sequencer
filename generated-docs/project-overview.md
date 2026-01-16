Last updated: 2026-01-17

# Project Overview

## プロジェクト概要
-   Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
-   コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
-   時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
-   フロントエンド:
    -   **Webブラウザ**: デモやライブラリの利用環境として標準的なWebブラウザを想定しており、CDN経由での利用も可能です。
-   音楽・オーディオ:
    -   **Tone.js (v15.0.4)**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、シーケンサーなどの高度な音響処理をJavaScriptで実現するためのライブラリ。本プロジェクトの核となる音源・エフェクトエンジンです。
-   開発ツール:
    -   **TypeScript (v5.3.0)**: JavaScriptに静的型付けを追加した言語で、大規模なアプリケーション開発におけるコード品質と保守性の向上に貢献します。
    -   **@types/node (v20.10.0)**: Node.js環境でTypeScript開発をサポートするための型定義ファイルです。
    -   **npm**: JavaScriptのパッケージマネージャーであり、ライブラリのインストールや依存関係の管理に使用されます。
-   テスト:
    -   [言及なし]
-   ビルドツール:
    -   **TypeScriptコンパイラ (tsc)**: TypeScriptソースコードをJavaScript（ES ModulesおよびCommonJS形式）にコンパイルするために使用されます。
    -   **カスタムスクリプト**: `scripts/copy-to-dist.js`や`scripts/rename-to-mjs.js`など、ビルド後のファイル整理やESM形式への変換を自動化するためのスクリプトが使用されています。
-   言語機能:
    -   **TypeScript**: 静的型付け、インターフェース、クラスなど、モダンなJavaScriptの機能に加えて強力な型システムを提供します。
    -   **ES Modules / CommonJS**: JavaScriptモジュールの標準的な形式に対応し、幅広い環境での利用を可能にしています。
-   自動化・CI/CD:
    -   **GitHub Actions**: ドキュメントの自動英訳（`README.md`の生成）に利用されており、プロジェクトの自動化フローの一部として活用されています。
-   開発標準:
    -   **.editorconfig**: 複数の開発環境間でインデントスタイル、文字コード、改行コードなどのコードフォーマットを統一するための設定ファイルです。

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
📖 CONVERSION_SUMMARY.md
📖 EXTRACTION_PROCESS.md
📄 LICENSE
📖 NEW_STRUCTURE.md
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📖 REFACTORING_SUMMARY.md
📖 RELEASE.ja.md
📖 RELEASE.md
📄 _config.yml
📁 demo/
  🌐 index.html
  🎨 styles.css
📁 dist/
  📁 cjs/
    📘 event-scheduler.d.ts
    📜 event-scheduler.js
    📘 index.d.ts
    📜 index.js
    📘 node-factory.d.ts
    📜 node-factory.js
    📘 sequencer-nodes.d.ts
    📜 sequencer-nodes.js
    📘 types.d.ts
    📜 types.js
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
      📜 sampler-piano.js
      📜 supersaw.js
    📜 main.js
    📁 modules/
      📜 audioManager.js
      📜 uiManager.js
    📜 sequenceLoader.js
    📁 sequences/
      📜 basicSequences.js
      📜 effectSequences.js
      📜 synthSequences.js
  📁 esm/
    📘 event-scheduler.d.ts
    📄 event-scheduler.mjs
    📘 index.d.ts
    📄 index.mjs
    📘 node-factory.d.ts
    📄 node-factory.mjs
    📘 sequencer-nodes.d.ts
    📄 sequencer-nodes.mjs
    📘 types.d.ts
    📄 types.mjs
  📘 index.d.ts
  📜 index.js
  📄 index.mjs
📁 docs/
  📖 tonejs-components-roadmap.ja.md
  📖 tonejs-components-roadmap.md
📁 examples/
  🌐 cdn-example.html
  📄 npm-example.mjs
📁 generated-docs/
  🌐 callgraph.html
🌐 googled947dc864c270e07.html
🌐 index.html
📁 issue-notes/
  📖 1.md
  📖 11.md
  📖 12.md
  📖 14.md
  📖 15.md
  📖 17.md
  📖 19.md
  📖 2.md
  📖 21.md
  📖 23.md
  📖 25.md
  📖 27.md
  📖 29.md
  📖 3.md
  📖 31.md
  📖 32.md
  📖 34.md
  📖 36.md
  📖 38.md
  📖 4.md
  📖 40.md
  📖 41.md
  📖 44.md
  📖 5.md
  📖 7.md
  📖 9.md
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
      📘 sampler-piano.ts
      📘 supersaw.ts
    📘 main.ts
    📁 modules/
      📘 audioManager.ts
      📘 uiManager.ts
    📘 sequenceLoader.ts
    📁 sequences/
      📘 basicSequences.ts
      📘 effectSequences.ts
      📘 synthSequences.ts
    📘 tone-global.d.ts
  📘 event-scheduler.ts
  📘 index.ts
  📘 node-factory.ts
  📘 sequencer-nodes.ts
  📘 types.ts
📊 tsconfig.all.json
📊 tsconfig.demo-new.json
📊 tsconfig.json
```

## ファイル詳細説明

*   **`src/index.ts`**: ライブラリのエントリーポイント。主要なモジュール（`SequencerNodes`, `playSequence`など）を外部にエクスポートします。
*   **`src/sequencer-nodes.ts`**: `SequencerNodes`クラスを定義。Tone.jsのノードインスタンスをIDで管理するための中心的な役割を担い、生成、取得、破棄などを効率的に行います。
*   **`src/node-factory.ts`**: JSONで記述されたイベント定義に基づき、Tone.jsの様々なコンポーネント（シンセサイザー、エフェクトなど）を動的に生成し、それらを適切に接続するロジックを実装しています。
*   **`src/event-scheduler.ts`**: JSONシーケンス内の各イベントを時間指定に基づいてスケジュールしたり、即時実行したりする中心的なロジックを含んでいます。`playSequence`や`scheduleOrExecuteEvent`といった主要な関数を定義します。
*   **`src/types.ts`**: プロジェクト全体で使用される型定義（JSONシーケンスイベントの構造など）を集中管理し、コードの型安全性を高めています。

*   **`src/demo/main.ts`**: デモアプリケーションのメインロジック。UIの初期化、ユーザーイベント（再生ボタンクリックなど）のハンドリング、シーケンスのロードと再生のトリガーなどを担当します。
*   **`src/demo/modules/audioManager.ts`**: デモにおいてTone.jsと`tonejs-json-sequencer`ライブラリを使用してオーディオ再生を管理するモジュール。オーディオコンテキストの開始確認や、シーケンス再生の実行を行います。
*   **`src/demo/modules/uiManager.ts`**: デモのユーザーインターフェース（再生ボタン、シーケンス選択セレクター、JSON表示テキストエリアなど）の操作と状態管理を担当するモジュールです。
*   **`src/demo/sequenceLoader.ts`**: デモで使用されるプリセットのJSONシーケンスデータをロードし、管理する機能を提供します。
*   **`src/demo/sequences/`**: 事前に定義された様々な音楽的シーケンス（JSON形式）が格納されているディレクトリです。
*   **`src/demo/instrument/`**: デモで使用されるTone.jsの楽器（シンセサイザーなど）のJSONシーケンス定義が格納されています。
*   **`src/demo/effect/`**: デモで使用されるTone.jsのエフェクトのJSONシーケンス定義が格納されています。
*   **`src/demo/demo-types.ts`**: デモアプリケーション固有の型定義を格納します。

*   **`dist/` ディレクトリ**: TypeScriptコンパイル後のJavaScriptファイルと型定義ファイル、およびデモ関連のコンパイル済みファイルが格納されます。ES Modules (`.mjs`) と CommonJS (`.js`) の両形式で提供され、ライブラリとして配布される最終成果物です。
*   **`README.ja.md` / `README.md`**: プロジェクトの目的、使い方、インストール方法、開発状況、ロードマップなどが記述されたドキュメントです。（日本語版と英語版）
*   **`docs/tonejs-components-roadmap.ja.md`**: Tone.jsの各コンポーネント（楽器、エフェクトなど）のJSON対応状況、実装計画、優先順位などに関する詳細なロードマップドキュメントです。
*   **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどを定義するファイルです。
*   **`tsconfig.json`**: TypeScriptコンパイラの動作を制御するための設定ファイルです。
*   **`scripts/` ディレクトリ**: ビルドプロセスやファイル変換などを補助するカスタムスクリプトが格納されています。
*   **`examples/` ディレクトリ**: ライブラリの基本的な使用方法を示すコード例（HTMLおよびJavaScriptファイル）が含まれています。

## 関数詳細説明

*   **`SequencerNodes` クラス (コンストラクタ)**
    *   **役割**: Tone.jsのオーディオノードをIDに基づいて効率的に管理するためのインスタンスを初期化します。
    *   **引数**: なし。
    *   **戻り値**: `SequencerNodes`の新しいインスタンス。
    *   **機能**: 内部にMapを保持し、生成されたTone.jsノードを`nodeId`で参照できるように準備します。
*   **`SequencerNodes.get(nodeId: number)`**
    *   **役割**: 指定されたIDを持つTone.jsノードを取得します。
    *   **引数**: `nodeId` (number) - 取得したいノードのユニークな識別子。
    *   **戻り値**: 該当するTone.jsノードインスタンス、またはノードが見つからない場合は`undefined`。
    *   **機能**: 内部のマップから指定された`nodeId`に対応するノードを検索して返します。
*   **`SequencerNodes.set(nodeId: number, node: Tone.ToneAudioNode | Tone.ToneAudioBuffer)`**
    *   **役割**: 新しいTone.jsノードを、指定されたIDと関連付けて内部マップに登録します。
    *   **引数**: `nodeId` (number) - 登録するノードのユニークな識別子。`node` (Tone.ToneAudioNode | Tone.ToneAudioBuffer) - 登録するTone.jsノードのインスタンス。
    *   **戻り値**: なし。
    *   **機能**: ノードIDとTone.jsインスタンスのペアをマップに保存し、後で参照できるようにします。
*   **`SequencerNodes.disposeAll()`**
    *   **役割**: 管理している全てのTone.jsノードを破棄し、関連するオーディオリソースを解放します。
    *   **引数**: なし。
    *   **戻り値**: なし。
    *   **機能**: 登録されている各ノードの`dispose()`メソッドを呼び出した後、内部マップをクリアしてメモリを解放します。
*   **`createNode(Tone: typeof Tone, event: CreateNodeEvent, nodes: SequencerNodes)`**
    *   **役割**: JSONのイベント定義に基づいて、Tone.jsの新しいオーディオノード（シンセサイザーやエフェクトなど）を生成します。
    *   **引数**: `Tone` (typeof Tone) - Tone.jsライブラリのグローバルオブジェクト。`event` (CreateNodeEvent) - ノード生成の詳細を含むJSONイベントオブジェクト。`nodes` (SequencerNodes) - ノードを管理する`SequencerNodes`のインスタンス。
    *   **戻り値**: `Promise<void>` (非同期処理のため)。
    *   **機能**: `event.nodeType` (例: 'Synth', 'Reverb') と`event.args`の引数を使用し、対応するTone.jsのコンストラクタを呼び出してノードを作成し、`nodes.set()`で登録します。
*   **`connectNode(nodes: SequencerNodes, event: ConnectEvent)`**
    *   **役割**: JSONのイベント定義に基づいて、既存のTone.jsノード間を接続します。
    *   **引数**: `nodes` (SequencerNodes) - ノードを管理する`SequencerNodes`のインスタンス。`event` (ConnectEvent) - ノード接続の詳細を含むJSONイベントオブジェクト。
    *   **戻り値**: `Promise<void>` (非同期処理のため)。
    *   **機能**: `event.nodeId`で指定されたノードを、`event.connectTo`で指定された別のノードまたは`Tone.Destination`に接続します。
*   **`scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent)`**
    *   **役割**: 単一のJSONシーケンスイベントを、指定された時間にスケジュールまたは即座に実行します。
    *   **引数**: `Tone` (typeof Tone) - Tone.jsライブラリのグローバルオブジェクト。`nodes` (SequencerNodes) - ノードを管理する`SequencerNodes`のインスタンス。`event` (SequenceEvent) - 実行する単一のJSONシーケンスイベント。
    *   **戻り値**: `Promise<void>` (非同期処理のため)。
    *   **機能**: `event.eventType`に基づいて処理を分岐し、ノードの作成、接続、パラメータ設定、音のトリガー（例: `triggerAttackRelease`）などを行います。時間指定がある場合はTone.jsのスケジューリング機能を利用します。
*   **`playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[])`**
    *   **役割**: JSONシーケンスの配列全体を再生します。
    *   **引数**: `Tone` (typeof Tone) - Tone.jsライブラリのグローバルオブジェクト。`nodes` (SequencerNodes) - ノードを管理する`SequencerNodes`のインスタンス。`sequence` (SequenceEvent[]) - 再生するJSONシーケンスイベントの配列。
    *   **戻り値**: `Promise<void>` (非同期処理のため)。
    *   **機能**: シーケンスの再生を開始する前に既存のノードを破棄し、シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、全体の再生フローを管理します。

*   **`DemoApp.initialize()` (src/demo/main.ts)**
    *   **役割**: デモアプリケーションの初期化処理を実行します。
    *   **引数**: なし。
    *   **戻り値**: `Promise<void>`.
    *   **機能**: シーケンスデータのロード、UI要素の初期設定、イベントリスナーの登録を行います。
*   **`DemoApp.playWithAudioContext()` (src/demo/main.ts)**
    *   **役割**: オーディオコンテキストを開始し、選択されたシーケンスの再生をトリガーします。
    *   **引数**: なし。
    *   **戻り値**: `Promise<void>`.
    *   **機能**: `AudioManager.ensureAudioContextStarted()`を呼び出してオーディオコンテキストをアクティブにし、`AudioManager.playSequence()`を介してJSONシーケンスの再生を開始します。
*   **`AudioManager.ensureAudioContextStarted()` (src/demo/modules/audioManager.ts)**
    *   **役割**: Tone.jsのオーディオコンテキストが確実に開始されている状態にします。
    *   **引数**: なし。
    *   **戻り値**: `Promise<void>`.
    *   **機能**: Web Audio APIの仕様に基づき、ユーザー操作（クリックなど）をトリガーとしてオーディオ再生を開始するために`Tone.start()`を呼び出します。
*   **`AudioManager.playSequence(sequence: SequenceEvent[])` (src/demo/modules/audioManager.ts)**
    *   **役割**: 指定されたJSONシーケンスをオーディオとして再生します。
    *   **引数**: `sequence` (SequenceEvent[]) - 再生するJSONシーケンスイベントの配列。
    *   **戻り値**: `Promise<void>`.
    *   **機能**: コアライブラリの`playSequence`関数を呼び出し、Tone.jsを使用して実際にサウンドを生成・再生します。
*   **`UIManager.setupEventListeners(sequenceNames: string[], onSequenceChange: (name: string) => void)` (src/demo/modules/uiManager.ts)**
    *   **役割**: デモUIの各要素に対するイベントリスナー（例: 再生ボタン、シーケンス選択）を設定します。
    *   **引数**: `sequenceNames` (string[]) - シーケンス名のリスト。`onSequenceChange` (function) - シーケンス選択が変更されたときに呼び出されるコールバック関数。
    *   **戻り値**: なし。
    *   **機能**: 再生ボタンのクリックイベントやシーケンス選択ドロップダウンの変更イベントを監視し、対応する処理を起動します。
*   **`SequenceLoader.loadAllSequences()` (src/demo/sequenceLoader.ts)**
    *   **役割**: デモで使用する全てのプリセットシーケンス（楽器やエフェクトの定義を含む）をロードし、コレクションとして返します。
    *   **引数**: なし。
    *   **戻り値**: `SequenceDataCollection` - シーケンス名をキーとするマップ。
    *   **機能**: 複数のファイルからJSONシーケンスデータをインポートし、統合されたデータ構造を構築します。

## 関数呼び出し階層ツリー
```
- DemoApp.initialize() (src/demo/main.ts)
  - SequenceLoader.loadAllSequences() (src/demo/sequenceLoader.ts)
  - UIManager.populateSequenceSelector(sequenceNames: string[]) (src/demo/modules/uiManager.ts)
  - UIManager.setupEventListeners(sequenceNames: string[], onSequenceChange: (name: string) => void) (src/demo/modules/uiManager.ts)
    - DemoApp.playWithAudioContext() (コールバックとして登録)

- DemoApp.playWithAudioContext() (src/demo/main.ts)
  - AudioManager.ensureAudioContextStarted() (src/demo/modules/audioManager.ts)
    - Tone.start()
  - AudioManager.playSequence(sequence: SequenceEvent[]) (src/demo/modules/audioManager.ts)
    - playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[]) (src/event-scheduler.ts)
      - SequencerNodes.disposeAll() (src/sequencer-nodes.ts)
      - forEach (sequence配列の各イベントを処理)
        - scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent) (src/event-scheduler.ts)
          - (event.eventTypeによる処理分岐)
          - createNode(Tone: typeof Tone, event: CreateNodeEvent, nodes: SequencerNodes) (src/node-factory.ts) (eventType: 'createNode'の場合)
            - SequencerNodes.set(nodeId: number, node: Tone.ToneAudioNode | Tone.ToneAudioBuffer) (src/sequencer-nodes.ts)
          - connectNode(nodes: SequencerNodes, event: ConnectEvent) (src/node-factory.ts) (eventType: 'connect'の場合)
            - SequencerNodes.get(nodeId: number) (src/sequencer-nodes.ts)
          - SequencerNodes.get(nodeId: number) (src/sequencer-nodes.ts) (eventType: 'triggerAttackRelease', 'set'などの既存ノード操作の場合)
          - (Tone.jsのメソッド呼び出し: 例: node.triggerAttackRelease(), node.set()など)

---
Generated at: 2026-01-17 07:09:53 JST
