Last updated: 2026-01-16

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js - Webブラウザ上でシンセサイザー、エフェクト、スケジューリングなど、高度な音響設計をJavaScriptで自由に行うためのオーディオフレームワーク。
- 音楽・オーディオ: Tone.js - 上記の通り、Web上での音楽生成と再生のコアとなる技術。
- 開発ツール:
    - TypeScript - JavaScriptに静的型付けを追加し、大規模なプロジェクト開発の堅牢性と保守性を向上させるプログラミング言語。
    - Node.js (via `@types/node`) - TypeScriptの型定義ファイルを通じて、Node.js環境での開発ツールやスクリプト実行をサポート。
- テスト: 現時点では、プロジェクト情報に具体的なテスト関連技術の言及はありません。
- ビルドツール:
    - TypeScript Compiler (tsc) - TypeScriptコードをJavaScript（ES ModulesおよびCommonJS形式）にコンパイルするために使用されます。
    - `scripts/` ディレクトリ内のカスタムスクリプト (`copy-to-dist.js`, `rename-to-mjs.js`) - ビルド後のファイルの配置やモジュール形式の変換を自動化します。
- 言語機能:
    - JavaScript (ECMAScript) - WebブラウザおよびNode.js環境で動作するプロジェクトの基盤となるスクリプト言語。
    - TypeScript - 上記「開発ツール」参照。
- 自動化・CI/CD: GitHub Actions - `README.md`に自動翻訳に使用されているとの記載があり、継続的インテグレーション/デプロイメントのプロセスに利用されています。
- 開発標準: .editorconfig - 複数のエディタや開発環境において、コードの書式設定（インデント、改行コードなど）の一貫性を保つための設定ファイル。

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

-   **`src/index.ts`**: ライブラリの主要なエントリポイント。`SequencerNodes`クラスと`playSequence`関数をエクスポートし、外部からライブラリ機能を利用できるようにします。
-   **`src/sequencer-nodes.ts`**: `SequencerNodes`クラスを定義。このクラスは、生成されたTone.jsのオーディオノード（シンセサイザー、エフェクトなど）を`nodeId`で一元的に管理するためのマップを提供します。ノードの追加、取得、およびすべてのノードの破棄機能が含まれます。
-   **`src/node-factory.ts`**: `createNode`関数と`connectNode`関数を定義。JSON形式で記述された情報に基づき、Tone.jsの様々なオーディオノードを動的に生成し、それらを相互に、またはオーディオ出力に接続するロジックを担います。
-   **`src/event-scheduler.ts`**: `scheduleOrExecuteEvent`関数と`playSequence`関数を定義。JSON形式のシーケンスイベントを受け取り、イベントタイプ（ノード作成、接続、ノートトリガー、パラメータ変更など）に応じて、対応するTone.jsのメソッド呼び出しをスケジューリングまたは即時実行します。プロジェクトのコア再生ロジックを構成します。
-   **`src/types.ts`**: プロジェクト全体で使用されるJSONシーケンスイベントの構造やノードタイプなどの型定義を集中管理します。TypeScriptによる開発において型安全性を保証する役割を持ちます。

-   **`src/demo/main.ts`**: デモアプリケーションのメインスクリプト。UIの初期化、イベントリスナーの設定、サンプルシーケンスの読み込み、オーディオ再生のトリガーなど、デモ全体の制御ロジックを実装しています。
-   **`src/demo/modules/audioManager.ts`**: デモアプリケーションのオーディオ再生関連ロジックをカプセル化。Tone.jsのオーディオコンテキストの開始保証や、メインライブラリの`playSequence`関数の呼び出しを担当します。
-   **`src/demo/modules/uiManager.ts`**: デモアプリケーションのユーザーインターフェース（ボタン、シーケンスセレクタ、テキストエリア）の操作を管理します。DOM要素の取得、イベントリスナーの設定、UI要素へのデータ反映などを行います。
-   **`src/demo/sequenceLoader.ts`**: デモで使用される各種サンプルシーケンス（楽器、エフェクト、基本的な演奏パターンなど）を読み込み、分類して提供する役割を担います。
-   **`src/demo/sequences/*.ts`**: 様々な楽器、エフェクト、および基本的な演奏フレーズをJSON形式で定義したサンプルシーケンスファイル群。プロジェクトの機能と表現力を示す具体的なデータが記述されています。
-   **`src/demo/instrument/*.ts`**: 各種Tone.js楽器（例: Synth, FMSynth, Sampler）のJSON定義を含むサンプルシーケンス。
-   **`src/demo/effect/*.ts`**: 各種Tone.jsエフェクト（例: Reverb, Chorus, Distortion）のJSON定義を含むサンプルシーケンス。
-   **`demo/index.html`**: デモアプリケーションのフロントエンドを構成するHTMLファイル。UI要素の配置と、必要なJavaScript・CSSファイルの読み込みを定義します。
-   **`demo/styles.css`**: デモアプリケーションの視覚的なスタイルを定義するCSSファイル。

-   **`package.json`**, **`package-lock.json`**: Node.jsプロジェクトの設定ファイル。依存関係（ライブラリ、開発ツール）、スクリプトなどが定義されています。
-   **`tsconfig.json`** など: TypeScriptコンパイラの設定ファイル群。コンパイルのオプションや対象ファイル、出力形式などを指定します。
-   **`scripts/*.js`**: ビルドプロセスを支援するユーティリティスクリプト。例えば、コンパイル後のJavaScriptファイルを`dist/`ディレクトリにコピーしたり、ES Modules形式にリネームしたりする処理を行います。
-   **`README.ja.md`**, **`README.md`**: プロジェクトの概要、インストール方法、使用例、設計思想、ロードマップなどの説明ドキュメント（日本語と英語）。
-   **`docs/tonejs-components-roadmap.ja.md`**, **`docs/tonejs-components-roadmap.md`**: Tone.jsの各コンポーネント（楽器、エフェクトなど）がJSON記述に対応している状況と、今後の実装計画について詳細に記されたドキュメント。

## 関数詳細説明

-   **`scheduleOrExecuteEvent(Tone, nodes, event, scheduledTime?)`**
    -   **役割**: JSON形式の単一シーケンスイベントを解析し、Tone.jsの適切なメソッドを呼び出して実行またはスケジューリングします。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのインスタンス。
        -   `nodes`: `SequencerNodes`クラスのインスタンスで、管理対象のTone.jsノードを格納。
        -   `event`: 実行するイベントを表すJSONオブジェクト（`eventType`、`nodeId`、`args`などを含む）。
        -   `scheduledTime?`: (オプション) イベントを実行する予定時刻。指定されない場合は即時実行されます。
    -   **戻り値**: `void`
    -   **機能**: `event.eventType`の値（例: `createNode`, `connect`, `triggerAttackRelease`, `setParam`）に基づいて処理を分岐させ、`node-factory.ts`の関数を呼び出すか、指定された`nodeId`のTone.jsノードに対して適切なメソッドを引数とともに実行します。

-   **`playSequence(Tone, nodes, sequence)`**
    -   **役割**: JSON形式で定義されたシーケンス（イベントの配列）全体を再生します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのインスタンス。
        -   `nodes`: `SequencerNodes`クラスのインスタンス。
        -   `sequence`: 再生するイベントのJSON配列。
    -   **戻り値**: `Promise<void>` (非同期処理のため)
    -   **機能**: シーケンス内の各イベントを順番に処理し、それぞれに対して`scheduleOrExecuteEvent`を呼び出します。再生前に`nodes.disposeAll()`を呼び出して既存のノードをクリーンアップし、オーディオリソースの競合を防ぎます。

-   **`createNode(Tone, nodes, event)`**
    -   **役割**: `createNode`イベントのJSON定義に基づき、新しいTone.jsオーディオノードを生成し、`SequencerNodes`に登録します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのインスタンス。
        -   `nodes`: `SequencerNodes`クラスのインスタンス。
        -   `event`: `createNode`イベントを表すJSONオブジェクト（`nodeType`、`nodeId`、`args`を含む）。
    -   **戻り値**: `void`
    -   **機能**: `event.nodeType`で指定されたTone.jsクラス（例: `Synth`, `Reverb`）を`event.args`を引数にインスタンス化し、生成されたノードを`event.nodeId`で`SequencerNodes`に格納します。

-   **`connectNode(nodes, event)`**
    -   **役割**: `connect`イベントのJSON定義に基づき、指定されたTone.jsノードを別のノードまたはオーディオ出力に接続します。
    -   **引数**:
        -   `nodes`: `SequencerNodes`クラスのインスタンス。
        -   `event`: `connect`イベントを表すJSONオブジェクト（`nodeId`、`connectTo`を含む）。
    -   **戻り値**: `void`
    -   **機能**: `event.nodeId`で指定されたノードを`nodes`から取得し、`event.connectTo`が`'toDestination'`であれば`node.toDestination()`を呼び出し、それ以外であれば`connectTo`で指定された別のノードに`node.connect()`で接続します。

-   **`SequencerNodes`クラスのメソッド**:
    -   **`constructor()`**: ノードを管理するための内部`Map`を初期化します。
    -   **`get(nodeId: number | string)`**: 指定された`nodeId`に関連付けられたTone.jsノードを取得します。
    -   **`set(nodeId: number | string, node: Tone.ToneAudioNode)`**: 指定された`nodeId`でTone.jsノードを`SequencerNodes`に登録します。
    -   **`disposeAll()`**: 現在`SequencerNodes`で管理されているすべてのTone.jsノードを破棄し、マップをクリアします。これにより、使用されていないオーディオリソースが解放されます。

-   **`loadAllSequences()`** (`src/demo/sequenceLoader.ts` 内)
    -   **役割**: デモで利用可能な全てのサンプルシーケンスデータを読み込み、カテゴリ別に整理して返します。
    -   **引数**: なし
    -   **戻り値**: シーケンスデータのコレクションを含むオブジェクト。
    -   **機能**: `src/demo/sequences/`、`src/demo/instrument/`、`src/demo/effect/`配下にある個々のJSONシーケンスファイルをインポートし、利用しやすい形式に統合します。

-   **`initialize()`** (`src/demo/main.ts` 内)
    -   **役割**: デモアプリケーションの起動時に必要な初期設定をすべて行います。
    -   **引数**: なし
    -   **戻り値**: `void`
    -   **機能**: `uiManager`と`audioManager`のインスタンス化と初期化、サンプルシーケンスの読み込み、UIセレクタへのシーケンスデータの投入、初期シーケンスのテキストエリアへの表示、各種UIイベントリスナーの設定を行います。

-   **`playWithAudioContext()`** (`src/demo/main.ts` 内、UIイベントハンドラから呼び出し)
    -   **役割**: ユーザーアクションに応じてWeb Audio APIのオーディオコンテキストを開始し、選択されたシーケンスの再生をトリガーします。
    -   **引数**: なし
    -   **戻り値**: `Promise<void>`
    -   **機能**: `audioManager.ensureAudioContextStarted()`を呼び出してTone.jsのオーディオコンテキストが確実に開始されるようにし、その後`audioManager.playSequence()`を呼び出して現在選択されているシーケンスの再生を開始します。

-   **`ensureAudioContextStarted(Tone)`** (`src/demo/modules/audioManager.ts` 内)
    -   **役割**: Tone.jsのオーディオコンテキストが確実に開始されていることを保証します。
    -   **引数**: `Tone`インスタンス。
    -   **戻り値**: `Promise<void>`
    -   **機能**: Web Audio APIの仕様により、オーディオコンテキストはユーザーのジェスチャー（クリックなど）によってのみ開始できます。この関数は、`Tone.start()`を呼び出すことで、オーディオが再生可能であることを保証します。既に開始済みの場合は何もしません。

## 関数呼び出し階層ツリー
```
- playSequence (src/event-scheduler.ts)
    - scheduleOrExecuteEvent (src/event-scheduler.ts)
        - createNode (src/node-factory.ts)
            - SequencerNodes.set (src/sequencer-nodes.ts)
        - connectNode (src/node-factory.ts)
            - SequencerNodes.get (src/sequencer-nodes.ts)
        - SequencerNodes.get (src/sequencer-nodes.ts)
        - (Tone.jsの各種メソッド呼び出し:例: triggerAttackRelease, set, rampTo)
    - Tone.start (Tone.jsライブラリ関数、通常はensureAudioContextStarted経由)
    - SequencerNodes.disposeAll (src/sequencer-nodes.ts)

- デモアプリケーションの主要な実行フロー:
    - initialize (src/demo/main.ts)
        - uiManager.setupEventListeners (src/demo/modules/uiManager.ts)
        - sequenceLoader.loadAllSequences (src/demo/sequenceLoader.ts)
        - uiManager.populateSequenceSelector (src/demo/modules/uiManager.ts)
        - uiManager.updateTextareaWithSelectedSequence (src/demo/modules/uiManager.ts)
    - (UIイベントハンドラ: 例: 'playButton'のクリック)
        - playWithAudioContext (src/demo/main.ts)
            - audioManager.ensureAudioContextStarted (src/demo/modules/audioManager.ts)
                - Tone.start (Tone.jsライブラリ関数)
            - audioManager.playSequence (src/demo/modules/audioManager.ts)
                - playSequence (上記メインのシーケンス再生関数)

---
Generated at: 2026-01-16 07:09:56 JST
