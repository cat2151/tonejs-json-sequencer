Last updated: 2026-02-07

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド:
    - **Tone.js**: Web Audio APIを抽象化し、Web上で音楽表現を可能にするJavaScriptライブラリ。シンセサイザー、エフェクト、シーケンシングなどに使用されます。
    - **JavaScript**: ブラウザ上での音楽再生ロジックやUI操作の実装に使用される主要言語。ES ModulesおよびCommonJS形式で提供されます。
    - **HTML/CSS**: デモページやサンプルインターフェースの構造とスタイリングに使用されます。
- 音楽・オーディオ:
    - **Tone.js**: 上記の通り、Web Audio APIを基盤とした音楽合成・処理の核となるライブラリです。
    - **Web Audio API**: ブラウザに内蔵されたオーディオ処理のための低レベルAPI。Tone.jsの動作基盤となります。
    - **JSON**: 音色定義、演奏内容、タイミング情報などの音楽データを記述するための標準的なデータ形式です。
    - **NDJSON (Newline Delimited JSON)**: リアルタイム再生、ライブ編集、ループ再生をサポートするストリーミングデータ形式です。
- 開発ツール:
    - **TypeScript**: コードの型安全性を確保し、大規模なプロジェクトでの保守性を向上させるためのプログラミング言語。JavaScriptにコンパイルされます。
    - **npm**: JavaScriptのパッケージ管理ツール。プロジェクトの依存関係の管理とインストールに使用されます。
- テスト:
    - (プロジェクト情報に明示的なテストフレームワークの記述はありませんが、デモやサンプルコードを通じて機能の検証が行われています。)
- ビルドツール:
    - **TypeScript Compiler (tsc)**: TypeScriptコードをJavaScript（ES ModulesおよびCommonJS）にコンパイルするために使用されます。
    - **Node.js Scripts**: ビルド後のファイルを`dist/`ディレクトリにコピーしたり、モジュール形式に応じてファイル名を変更したりするのに使用されます。
- 言語機能:
    - **TypeScript**: 静的型付け、クラス、インターフェースなどの高度な言語機能を提供します。
    - **JavaScript (ES Modules/CommonJS)**: モジュール化されたコードベースを構築するための標準的なモジュールシステムです。
- 自動化・CI/CD:
    - **GitHub Actions**: リポジトリの`README.md`ファイルの自動翻訳や、ビルドプロセスの一部自動化に利用されています。
- 開発標準:
    - **.editorconfig**: 複数の開発者が異なるエディタを使用しても、コードの書式設定を統一するための設定ファイルです。

## ファイル階層ツリー
```
.editorconfig
.gitignore
LICENSE
NPM_README.md
README.ja.md
README.md
RELEASE.ja.md
RELEASE.md
_config.yml
demo/
  README.md
  index.html
  offline-rendering.html
  streaming-demo.css
  streaming.html
  styles.css
demo-library/
  README.md
  index.html
dist/
  cjs/
    event-scheduler.d.ts
    event-scheduler.js
    factories/
      effect-factory.d.ts
      effect-factory.js
      instrument-factory.d.ts
      instrument-factory.js
    index.d.ts
    index.js
    ndjson-streaming.d.ts
    ndjson-streaming.js
    node-factory.d.ts
    node-factory.js
    offline-renderer.d.ts
    offline-renderer.js
    sequencer-nodes.d.ts
    sequencer-nodes.js
    streaming/
      event-processor.d.ts
      event-processor.js
      playback-state.d.ts
      playback-state.js
    types.d.ts
    types.js
    utils/
      time-parser.d.ts
      time-parser.js
  demo/
    demo-types.js
    effect/
      autofilter.js
      autopanner.js
      autowah.js
      bitcrusher.js
      chebyshev.js
      chorus.js
      distortion.js
      feedbackdelay.js
      freeverb.js
      frequencyshifter.js
      jcreverb.js
      phaser.js
      pingpongdelay.js
      pitchshift.js
      reverb.js
      stereowidener.js
      tremolo.js
      vibrato.js
    instrument/
      amsynth.js
      delay-vibrato.js
      duosynth.js
      loopend-test.js
      membranesynth.js
      metalsynth.js
      minimal.js
      monosynth.js
      multitimbral.js
      noisesynth.js
      plucksynth.js
      polysynth-fm.js
      portamento.js
      sampler-piano.js
      streaming-test-doremi.js
      supersaw.js
      tempo-test.js
      volume-control.js
    main.js
    modules/
      audioManager.js
      uiManager.js
    offline-rendering.js
    sequenceLoader.js
    sequences/
      basicSequences.js
      effectSequences.js
      synthSequences.js
    streaming.js
  esm/
    event-scheduler.d.ts
    event-scheduler.mjs
    factories/
      effect-factory.d.ts
      effect-factory.mjs
      instrument-factory.d.ts
      instrument-factory.mjs
    index.d.ts
    index.mjs
    ndjson-streaming.d.ts
    ndjson-streaming.mjs
    node-factory.d.ts
    node-factory.mjs
    offline-renderer.d.ts
    offline-renderer.mjs
    sequencer-nodes.d.ts
    sequencer-nodes.mjs
    streaming/
      event-processor.d.ts
      event-processor.mjs
      playback-state.d.ts
      playback-state.mjs
    types.d.ts
    types.mjs
    utils/
      time-parser.d.ts
      time-parser.mjs
  event-scheduler.d.ts
  event-scheduler.js
  factories/
    effect-factory.d.ts
    effect-factory.js
    instrument-factory.d.ts
    instrument-factory.js
  index.d.ts
  index.js
  index.mjs
  ndjson-streaming.d.ts
  ndjson-streaming.js
  node-factory.d.ts
  node-factory.js
  offline-renderer.d.ts
  offline-renderer.js
  sequencer-nodes.d.ts
  sequencer-nodes.js
  streaming/
    event-processor.d.ts
    event-processor.js
    playback-state.d.ts
    playback-state.js
  types.d.ts
  types.js
  utils/
    time-parser.d.ts
    time-parser.js
docs/
  tonejs-components-roadmap.ja.md
  tonejs-components-roadmap.md
examples/
  cdn-example.html
  npm-example.mjs
  offline-rendering-example.html
generated-docs/
googled947dc864c270e07.html
issue-notes/
  100.md
  106.md
  ... (多数のissueメモファイル)
package-lock.json
package.json
scripts/
  copy-to-dist.js
  rename-to-mjs.js
src/
  demo/
    demo-types.ts
    effect/
      autofilter.ts
      ... (多数のエフェクト定義ファイル)
    instrument/
      amsynth.ts
      ... (多数のインストゥルメント定義ファイル)
    main.ts
    modules/
      audioManager.ts
      uiManager.ts
    offline-rendering.ts
    sequenceLoader.ts
    sequences/
      basicSequences.ts
      effectSequences.ts
      synthSequences.ts
    streaming.ts
    tone-global.d.ts
  event-scheduler.ts
  factories/
    effect-factory.ts
    instrument-factory.ts
  index.ts
  ndjson-streaming.ts
  node-factory.ts
  offline-renderer.ts
  sequencer-nodes.ts
  streaming/
    event-processor.ts
    playback-state.ts
  types.ts
  utils/
    time-parser.ts
tsconfig.all.json
tsconfig.demo-new.json
tsconfig.json
```

## ファイル詳細説明

このプロジェクトの主要なファイルは、Tone.jsイベントをJSONから処理するためのコアロジック、リアルタイムストリーミング機能、オフラインレンダリング、そしてデモとサンプルで構成されています。

-   **`src/index.ts`**:
    -   このライブラリのエントリポイントで、主要なモジュール（`SequencerNodes`, `playSequence`, `NDJSONStreamingPlayer`など）をエクスポートします。
-   **`src/event-scheduler.ts`**:
    -   JSON形式の単一イベントを受け取り、それを即座に実行するか、Tone.jsのスケジューリング機能を使って将来の時刻に予約する、ライブラリの核となるロジックを担います。
    -   `playSequence`関数を含み、JSONシーケンス全体を非同期的に再生します。
-   **`src/sequencer-nodes.ts`**:
    -   Tone.jsで作成されたシンセサイザーやエフェクトなどのオーディオノードを一元的に管理するためのクラス (`SequencerNodes`) を定義します。
    -   ノードの作成、取得、設定、そしてすべてのノードの解放（破棄）機能を提供します。
-   **`src/factories/instrument-factory.ts`**:
    -   JSON定義に基づいて様々な種類のTone.jsインストゥルメント（例: `Synth`, `FMSynth`, `Sampler`など）を生成する役割を担います。
    -   サポートするインストゥルメントのホワイトリストを管理し、安全なノード生成を保証します。
-   **`src/factories/effect-factory.ts`**:
    -   JSON定義に基づいて様々な種類のTone.jsエフェクト（例: `Reverb`, `Chorus`, `Distortion`など）を生成する役割を担います。
    -   サポートするエフェクトのホワイトリストを管理し、安全なノード生成を保証します。
-   **`src/node-factory.ts`**:
    -   インストゥルメントとエフェクトのファクトリを統合し、`createNode`関数で汎用的なノード作成インターフェースを提供します。
    -   `connectNode`関数で、作成されたノード同士を接続する機能も提供します。
-   **`src/ndjson-streaming.ts`**:
    -   NDJSON（改行区切りJSON）形式のイベントストリームを解析し、リアルタイムでの音楽再生、ライブ編集、ループ再生を可能にする主要な機能を提供します。
    -   `NDJSONStreamingPlayer`クラスが、先読み、イベント処理、再生状態の管理を行います。
-   **`src/offline-renderer.ts`**:
    -   指定されたJSONシーケンスをWeb Audio APIのオフラインレンダリング機能を使ってオーディオファイルとして生成し、WAV形式でダウンロード可能にする機能を提供します。
    -   `OfflineRenderer`クラスがレンダリングプロセスを管理します。
-   **`src/streaming/event-processor.ts`**:
    -   `NDJSONStreamingPlayer`クラスの内部で、新しいイベントの作成と接続、そしてスケジューリングを処理するロジックを担います。
    -   既存の`scheduleOrExecuteEvent`関数を利用し、イベントを適切なタイミングでTone.jsに登録します。
-   **`src/streaming/playback-state.ts`**:
    -   NDJSONストリーミング再生中の現在の状態（再生中かどうか、現在のイベント、ループ回数など）を管理するクラスです。
-   **`src/types.ts`**:
    -   プロジェクト全体で使用されるTypeScriptの型定義（例: `SequenceEvent`, `NodeType`, `EventArg`など）が含まれています。これにより、コードの型安全性が向上します。
-   **`src/utils/time-parser.ts`**:
    -   Tone.jsで使われる時間表記（例: "8n"、"0:0:2"、"440hz"）を秒単位の数値に変換するユーティリティ機能を提供します。
-   **`demo/`ディレクトリ**:
    -   ブラウザでプロジェクトの機能を試せるデモHTMLファイルと関連するJavaScript/CSSファイルが含まれています。例えば、`index.html`は基本的なシーケンス再生、`streaming.html`はNDJSONストリーミングデモを提供します。
-   **`examples/`ディレクトリ**:
    -   npm経由やCDN経由でのライブラリ利用方法を示す最小限のサンプルコードが含まれています。
-   **`dist/`ディレクトリ**:
    -   TypeScriptコンパイラによって生成されたJavaScriptファイル（ES Modules形式の`.mjs`とCommonJS形式の`.js`）、および対応する型定義ファイル（`.d.ts`）が含まれています。これは、プロジェクトが外部ライブラリとして使用される際に配布されるコードです。
-   **`docs/`ディレクトリ**:
    -   プロジェクトの詳細なドキュメント、特にTone.jsコンポーネントのJSON対応状況やロードマップに関する情報が格納されています。

## 関数詳細説明

以下に、プロジェクトの主要な関数（クラスメソッドを含む）の役割と機能について説明します。

-   **`scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent, isScheduled: boolean, timeOffset?: number): Promise<void>`**
    -   **役割**: JSON形式の単一の音楽イベントを受け取り、Tone.jsのオーディオコンテキスト内でスケジュールまたは即時実行します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `nodes`: `SequencerNodes`インスタンス。作成済みノードの管理に使用。
        -   `event`: 実行する`SequenceEvent`オブジェクト。イベントの種類、ノードID、引数などが含まれます。
        -   `isScheduled`: `true`の場合、イベントはTone.jsのトランスポートによってスケジュールされます。`false`の場合、即時実行されます。
        -   `timeOffset`: イベント時刻に加算するオフセット（秒単位）。ストリーミング再生などで使用されます。
    -   **戻り値**: イベントの処理が完了したことを示す`Promise<void>`。
    -   **機能**: `eventType`に応じて、`createNode`、`connect`、`triggerAttackRelease`、`rampTo`、``set`などのTone.jsメソッドを適切なノードに対して呼び出します。

-   **`playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[]): Promise<void>`**
    -   **役割**: JSON形式の音楽イベントの配列（シーケンス）を受け取り、その全体を再生します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `nodes`: `SequencerNodes`インスタンス。
        -   `sequence`: 再生する`SequenceEvent`オブジェクトの配列。
    -   **戻り値**: シーケンスの再生が完了したことを示す`Promise<void>`。
    -   **機能**: シーケンス内の各イベントに対して`scheduleOrExecuteEvent`を呼び出し、Tone.jsのトランスポートでイベントをスケジュールします。

-   **`SequencerNodes`クラス**
    -   **`constructor()`**
        -   **役割**: `SequencerNodes`インスタンスを初期化し、ノードを格納するマップを作成します。
        -   **引数**: なし。
        -   **戻り値**: なし。
    -   **`get(nodeId: number): Tone.ToneAudioNode | undefined`**
        -   **役割**: 指定された`nodeId`に対応するTone.jsオーディオノードを取得します。
        -   **引数**: `nodeId`: 取得するノードのID。
        -   **戻り値**: 対応する`ToneAudioNode`オブジェクト、または存在しない場合は`undefined`。
    -   **`set(nodeId: number, node: Tone.ToneAudioNode): void`**
        -   **役割**: 指定された`nodeId`にTone.jsオーディオノードを登録します。
        -   **引数**:
            -   `nodeId`: 登録するノードのID。
            -   `node`: 登録する`ToneAudioNode`オブジェクト。
        -   **戻り値**: なし。
    -   **`disposeAll(): void`**
        -   **役割**: 管理しているすべてのTone.jsオーディオノードを破棄し、リソースを解放します。
        -   **引数**: なし。
        -   **戻り値**: なし。

-   **`createInstrument(Tone: typeof Tone, instrumentType: InstrumentType, args: any[]): Tone.ToneAudioNode`**
    -   **役割**: 指定されたタイプと引数に基づいてTone.jsのインストゥルメント（シンセ）を作成します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `instrumentType`: 作成するインストゥルメントのタイプ（例: 'Synth', 'FMSynth'）。
        -   `args`: インストゥルメントのコンストラクタに渡す引数。
    -   **戻り値**: 作成された`ToneAudioNode`インスタンス。
    -   **機能**: `switch`文を使用して、既知のインストゥルメントタイプに対応するTone.jsコンストラクタを呼び出します。

-   **`createEffect(Tone: typeof Tone, effectType: EffectType, args: any[]): Tone.ToneAudioNode`**
    -   **役割**: 指定されたタイプと引数に基づいてTone.jsのエフェクトを作成します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `effectType`: 作成するエフェクトのタイプ（例: 'Reverb', 'Chorus'）。
        -   `args`: エフェクトのコンストラクタに渡す引数。
    -   **戻り値**: 作成された`ToneAudioNode`インスタンス。
    -   **機能**: `switch`文を使用して、既知のエフェクトタイプに対応するTone.jsコンストラクタを呼び出します。

-   **`createNode(Tone: typeof Tone, nodes: SequencerNodes, event: CreateNodeEvent): Tone.ToneAudioNode`**
    -   **役割**: `createNode`イベントオブジェクトに基づいて、新しいTone.jsオーディオノード（インストゥルメントまたはエフェクト）を作成し、`SequencerNodes`に登録します。
    -   **引数**:
        -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   `nodes`: `SequencerNodes`インスタンス。
        -   `event`: `createNode`タイプの`SequenceEvent`オブジェクト。
    -   **戻り値**: 作成された`ToneAudioNode`インスタンス。
    -   **機能**: `nodeType`に応じて`createInstrument`または`createEffect`を呼び出し、結果を`nodes`に`set`します。

-   **`connectNode(nodes: SequencerNodes, event: ConnectEvent): void`**
    -   **役割**: `connect`イベントオブジェクトに基づいて、2つのTone.jsオーディオノードを接続します。
    -   **引数**:
        -   `nodes`: `SequencerNodes`インスタンス。
        -   `event`: `connect`タイプの`SequenceEvent`オブジェクト。
    -   **戻り値**: なし。
    -   **機能**: `nodeId`と`connectTo`プロパティを使用して、`nodes`から適切なノードを取得し、`connect`メソッドを呼び出します。

-   **`parseNDJSON(ndjsonStringOrArray: string | SequenceEvent[]): SequenceEvent[]`**
    -   **役割**: NDJSON形式の文字列またはイベントオブジェクトの配列を受け取り、パースして`SequenceEvent`オブジェクトの配列を返します。
    -   **引数**: `ndjsonStringOrArray`: パースするNDJSON文字列またはイベント配列。
    -   **戻り値**: パースされた`SequenceEvent`オブジェクトの配列。
    -   **機能**: 各行をJSONとして解析し、無効な行はスキップします。

-   **`NDJSONStreamingPlayer`クラス**
    -   **`constructor(Tone: typeof Tone, nodes: SequencerNodes, config?: NDJSONStreamingPlayerConfig)`**
        -   **役割**: ストリーミングプレーヤーを初期化します。
        -   **引数**:
            -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
            -   `nodes`: `SequencerNodes`インスタンス。
            -   `config`: 先読み時間、ループ設定、ループ完了時のコールバックなどの設定オプション。
        -   **戻り値**: なし。
    -   **`start(ndjson: string | SequenceEvent[]): Promise<void>`**
        -   **役割**: NDJSONストリームの再生を開始または更新します。
        -   **引数**: `ndjson`: 再生するNDJSON文字列またはイベント配列。
        -   **戻り値**: 再生開始を示す`Promise<void>`。
    -   **`stop(): void`**
        -   **役割**: NDJSONストリームの再生を停止します。
        -   **引数**: なし。
        -   **戻り値**: なし。
    -   **`playing(): boolean`**
        -   **役割**: 現在再生中であるかどうかを返します。
        -   **引数**: なし。
        -   **戻り値**: `true`または`false`。

-   **`OfflineRenderer`クラス**
    -   **`constructor(Tone: typeof Tone, nodes: SequencerNodes)`**
        -   **役割**: オフラインレンダラーを初期化します。
        -   **引数**:
            -   `Tone`: Tone.jsライブラリのグローバルオブジェクト。
            -   `nodes`: `SequencerNodes`インスタンス。
        -   **戻り値**: なし。
    -   **`render(sequence: SequenceEvent[], duration: number): Promise<AudioBuffer>`**
        -   **役割**: 指定されたシーケンスを指定された時間でオフラインレンダリングし、`AudioBuffer`を生成します。
        -   **引数**:
            -   `sequence`: レンダリングする`SequenceEvent`オブジェクトの配列。
            -   `duration`: レンダリングする時間（秒）。
        -   **戻り値**: レンダリングされたオーディオデータを含む`Promise<AudioBuffer>`。

-   **`audioBufferToWav(buffer: AudioBuffer): Blob`**
    -   **役割**: `AudioBuffer`オブジェクトをWAV形式の`Blob`オブジェクトに変換します。
    -   **引数**: `buffer`: 変換する`AudioBuffer`。
    -   **戻り値**: WAV形式の`Blob`。

-   **`downloadWav(buffer: AudioBuffer, filename: string): void`**
    -   **役割**: `AudioBuffer`をWAVファイルとしてダウンロードします。
    -   **引数**:
        -   `buffer`: ダウンロードする`AudioBuffer`。
        -   `filename`: ダウンロードするファイルの基本名。
    -   **戻り値**: なし。

-   **`TimeParser`クラス**
    -   **`constructor(Tone: typeof Tone)`**
        -   **役割**: 時間表記のパーサーを初期化します。
        -   **引数**: `Tone`: Tone.jsライブラリのグローバルオブジェクト。
        -   **戻り値**: なし。
    -   **`parseTimeToSeconds(timeNotation: ToneTimeNotation): number`**
        -   **役割**: Tone.jsの時間表記（例: '8n', '0:0:2', '440hz'）を秒単位の数値に変換します。
        -   **引数**: `timeNotation`: パースする時間表記。
        -   **戻り値**: 秒単位の数値。

## 関数呼び出し階層ツリー
```
playSequence()
├── scheduleOrExecuteEvent()
│   ├── createNode() (node-factory.ts)
│   │   ├── createInstrument() (instrument-factory.ts)
│   │   │   ├── createPolySynth()
│   │   │   └── createSampler()
│   │   └── createEffect() (effect-factory.ts)
│   ├── connectNode() (node-factory.ts)
│   ├── Tone.jsメソッド呼び出し (例: triggerAttackRelease, rampTo, set)
│   └── SequencerNodes (get(), set())
├── SequencerNodes (get(), set(), disposeAll())
└── TimeParser (parseTimeToSeconds())

NDJSONStreamingPlayer.start()
├── parseNDJSON()
├── streaming/event-processor.ts の内部処理
│   ├── createNodesAndConnections()
│   └── scheduleEvent()
│       └── scheduleOrExecuteEvent() (上記と共通)
└── streaming/playback-state.ts の状態管理メソッド

OfflineRenderer.render()
├── calculateSequenceDuration() (event-processor.tsまたはoffline-renderer.ts内)
├── scheduleOrExecuteEvent() (上記と共通)
├── audioBufferToWav()
└── downloadWav()

---
Generated at: 2026-02-07 07:09:52 JST
