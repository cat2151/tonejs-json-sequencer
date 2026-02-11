Last updated: 2026-02-12

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリです。
- コードを書かずに音をデータで制御できるため、UIやストリーミングと自然に連携します。
- 時間順のイベントをデータとして扱い、緻密な演奏表現を可能にします。

## 技術スタック
- フロントエンド:
    - **HTML/CSS**: デモやサンプルページの構造とスタイル定義に利用されています。
    - **JavaScript**: ブラウザ環境での実行ロジックや、ライブラリのコア部分の実装に使用されています。
- 音楽・オーディオ:
    - **Tone.js**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、スケジューリングなど、Web上で高度な音楽表現を実現するための主要なライブラリです。このプロジェクトの中核を成しています。
- 開発ツール:
    - **npm**: Node.jsのパッケージマネージャーであり、プロジェクトの依存関係の管理やスクリプトの実行に使用されます。
- ビルドツール:
    - **TypeScript**: 静的型付けされたJavaScriptとしてコードを記述し、コンパイル時にCommonJSおよびES Modules形式のJavaScriptコードと型定義ファイルを生成するために使用されます。
    - **scripts/ (copy-to-dist.js, rename-to-mjs.js)**: ビルド後のファイルを`dist`ディレクトリに配置し、ES Modulesのファイル名を適切に`.mjs`にリネームするなど、ビルドプロセスを補助するカスタムスクリプトです。
- 言語機能:
    - **TypeScript**: コードの品質と保守性を高めるために採用されており、静的型チェックによるバグの早期発見を可能にします。
    - **JavaScript (ES Modules / CommonJS)**: 生成されるライブラリは、モダンなWeb環境とNode.js環境の両方で利用できるよう、ES Modules (`.mjs`) とCommonJS (`.js`) の両形式で提供されます。
- 自動化・CI/CD:
    - **GitHub Actions**: リポジトリの`README.md`ファイルの自動翻訳など、開発ワークフローの自動化に利用されています。
- 開発標準:
    - **.editorconfig**: 異なるエディタやIDEを使用する開発者間で、コーディングスタイル（インデント、改行コードなど）を統一するために使用されます。

## ファイル階層ツリー
```
.editorconfig
.gitignore
AGENTS.md
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
      playback-state.d.ts
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
      chorus-object-args.js
      chorus.js
      distortion.js
      feedbackdelay.js
      freeverb.js
      frequencyshifter.js
      jcreverb.js
      lpf-envelope.js
      lpf-sweep.js
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
      playback-state.d.ts
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
  108.md
  109.md
  110.md
  111.md
  112.md
  118.md
  120.md
  122.md
  124.md
  125.md
  127.md
  129.md
  131.md
  133.md
  135.md
  136.md
  137.md
  139.md
  141.md
  144.md
  148.md
  150.md
  152.md
  154.md
  155.md
  158.md
  160.md
  162.md
  62.md
  64.md
  67.md
  69.md
  70.md
  71.md
  72.md
  73.md
  74.md
  77.md
  80.md
  84.md
  87.md
  88.md
  89.md
  90.md
  91.md
  93.md
  94.md
  97.md
  98.md
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
      autopanner.ts
      autowah.ts
      bitcrusher.ts
      chebyshev.ts
      chorus-object-args.ts
      chorus.ts
      distortion.ts
      feedbackdelay.ts
      freeverb.ts
      frequencyshifter.ts
      jcreverb.ts
      lpf-envelope.ts
      lpf-sweep.ts
      phaser.ts
      pingpongdelay.ts
      pitchshift.ts
      reverb.ts
      stereowidener.ts
      tremolo.ts
      vibrato.ts
    instrument/
      amsynth.ts
      delay-vibrato.ts
      duosynth.ts
      loopend-test.ts
      membranesynth.ts
      metalsynth.ts
      minimal.ts
      monosynth.ts
      multitimbral.ts
      noisesynth.ts
      plucksynth.ts
      polysynth-fm.ts
      portamento.ts
      sampler-piano.ts
      streaming-test-doremi.ts
      supersaw.ts
      tempo-test.ts
      volume-control.ts
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
- **`.editorconfig`**: 異なる開発環境間でのコーディングスタイルの一貫性を維持するための設定ファイル。
- **`.gitignore`**: Gitが追跡しないファイルやディレクトリを指定するファイル。
- **`AGENTS.md`**: プロジェクトで利用されているAIエージェントに関する情報が記述されているドキュメント。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されたファイル。
- **`NPM_README.md`**: npmパッケージとしてのREADMEファイル（おそらく`README.md`から生成）。
- **`README.ja.md`, `README.md`**: プロジェクトの日本語および英語の概要説明、使い方、開発状況などを記述したメインのドキュメント。
- **`RELEASE.ja.md`, `RELEASE.md`**: リリースノートや変更履歴を記述したファイル。
- **`_config.yml`**: GitHub Pagesサイトの設定ファイル。
- **`demo/` ディレクトリ**: プロジェクトのライブデモや使用例を含むHTMLファイルと関連CSSファイル。
    - `index.html`: 主要なデモページ。
    - `offline-rendering.html`: オフラインレンダリング機能のデモページ。
    - `streaming.html`: NDJSONストリーミング再生のデモページ。
    - `styles.css`, `streaming-demo.css`: デモページのスタイル定義。
- **`demo-library/` ディレクトリ**: ライブラリとしてプロジェクトを利用する際の具体的な使用例を示すデモページ。
    - `index.html`: ライブラリ利用デモのページ。
- **`dist/` ディレクトリ**: TypeScriptソースコードからコンパイルされたJavaScriptファイルと型定義ファイル、およびデモ用のJavaScriptファイル群。
    - `cjs/`, `esm/`: CommonJSとES Modules形式の出力ディレクトリ。それぞれ`.js`と`.mjs`ファイルが含まれる。
    - `*.d.ts` ファイル: TypeScriptの型定義ファイル。JavaScriptモジュールがどのようなインターフェースを持つかを記述する。
    - `event-scheduler.js`: Tone.jsイベントのスケジューリングと実行に関するロジック。
    - `factories/`: Tone.jsの楽器 (`instrument-factory.js`) やエフェクト (`effect-factory.js`) ノードを生成するためのファクトリ関数群。
    - `index.js`, `index.mjs`: ライブラリの主要なエントリポイント。
    - `ndjson-streaming.js`: NDJSON (改行区切りJSON) 形式の音楽データをリアルタイムでストリーミング再生するためのロジック。
    - `node-factory.js`: Tone.jsノードの作成と接続を抽象化する機能。
    - `offline-renderer.js`: シーケンスをブラウザ上でオフラインレンダリングし、オーディオファイルとして保存する機能。
    - `sequencer-nodes.js`: 作成されたTone.jsノードを管理・保持するためのクラス。
    - `streaming/`: NDJSONストリーミング再生の内部処理 (`event-processor.js`, `playback-state.js`) に関するファイル。
    - `types.js`: プロジェクト全体で使用される型定義に関するJavaScriptコード（TypeScriptの型定義ファイルに対応）。
    - `utils/time-parser.js`: Tone.jsの時間表記（例: "8n", "0:0:2"）を解析し、秒数に変換するユーティリティ。
    - `dist/demo/`: デモページ用のJavaScriptロジック。
        - `main.js`: デモのメインロジック（UIイベント処理、シーケンス再生など）。
        - `modules/audioManager.js`: オーディオコンテキストの管理とシーケンス再生の実行。
        - `modules/uiManager.js`: ユーザーインターフェースの操作と状態管理。
        - `sequenceLoader.js`: プリセットのシーケンスデータをロードする機能。
        - `sequences/`: サンプルのシーケンスデータ（`basicSequences.js`, `effectSequences.js`, `synthSequences.js`）。
        - `instrument/`, `effect/`: 各種楽器やエフェクトのデモ設定を記述したJSONデータ。
- **`docs/` ディレクトリ**: プロジェクトの詳細な技術ドキュメント。
    - `tonejs-components-roadmap.ja.md`, `tonejs-components-roadmap.md`: Tone.jsコンポーネントのJSON対応ロードマップ。
- **`examples/` ディレクトリ**: ライブラリの簡単な使用例を示すHTMLファイルやMJSファイル。
- **`googled947dc864c270e07.html`**: Googleサイト認証用ファイル。
- **`issue-notes/` ディレクトリ**: 開発中の課題やメモが記述されたファイル群。
- **`package-lock.json`**: `package.json`に基づく依存関係の厳密なバージョンを記録するファイル。
- **`package.json`**: プロジェクトのメタデータ、依存関係、スクリプトなどが記述されたファイル。
- **`scripts/` ディレクトリ**: ビルドプロセスを補助するためのスクリプト。
    - `copy-to-dist.js`: ビルド成果物を`dist`ディレクトリにコピーするスクリプト。
    - `rename-to-mjs.js`: ES Modules形式のファイルを`.mjs`拡張子にリネームし、インポートパスを修正するスクリプト。
- **`src/` ディレクトリ**: プロジェクトのTypeScriptソースコード。
    - `src/demo/`: デモ用のTypeScriptソースコード。`dist/demo/`のJavaScriptファイルの元となる。
    - `event-scheduler.ts`, `factories/*.ts`, `index.ts`, `ndjson-streaming.ts`, `node-factory.ts`, `offline-renderer.ts`, `sequencer-nodes.ts`, `streaming/*.ts`, `types.ts`, `utils/time-parser.ts`: ライブラリの主要な機能を提供するTypeScriptソースファイル。
- **`tsconfig.*.json`**: TypeScriptコンパイラの設定ファイル群。

## 関数詳細説明
- **`rampParameter(param: Tone.ToneAudioParam, value: number, time: Tone.Unit.Time)`** (src/event-scheduler.ts):
    - **役割**: Tone.jsのオーディオパラメータ（例: `volume`, `frequency`）を、指定された時刻までに指定された値へ滑らかに変化させます。
    - **引数**: `param` (変更対象のTone.jsオーディオパラメータ)、`value` (目標値)、`time` (変化が完了する時刻)。
    - **戻り値**: なし。
    - **機能**: `rampTo`メソッドを使用して、音色の変化やエフェクトの調整をスムーズに行います。
- **`scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent, time: Tone.Unit.Time)`** (src/event-scheduler.ts):
    - **役割**: JSON形式で定義された単一の音楽イベント（ノード作成、接続、音符発音、パラメータ変更など）を、Tone.jsのタイムライン上でスケジュールまたは即座に実行します。
    - **引数**: `Tone` (Tone.jsライブラリのインスタンス)、`nodes` (ノード管理インスタンス)、`event` (処理するイベントオブジェクト)、`time` (イベントの実行時刻)。
    - **戻り値**: なし。
    - **機能**: `eventType`に応じて、適切なTone.jsのメソッド（`triggerAttackRelease`, `rampTo`など）を呼び出し、音楽イベントをオーディオエンジンに伝えます。
- **`playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[], startTime: Tone.Unit.Time = Tone.now())`** (src/event-scheduler.ts):
    - **役割**: JSON形式で記述された音楽イベントのシーケンス全体を再生します。
    - **引数**: `Tone` (Tone.jsライブラリのインスタンス)、`nodes` (ノード管理インスタンス)、`sequence` (再生するイベントの配列)、`startTime` (再生を開始する時刻、デフォルトは現在時刻)。
    - **戻り値**: `Promise<void>`。シーケンスの再生が完了したときに解決されます。
    - **機能**: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、指定された時刻にイベントをスケジュールします。
- **`createEffect(Tone: typeof Tone, type: EffectNodeType, args: any[])`** (src/factories/effect-factory.ts):
    - **役割**: 指定されたタイプと引数に基づいてTone.jsのエフェクトノードを作成します。
    - **引数**: `Tone` (Tone.jsライブラリのインスタンス)、`type` (エフェクトのタイプ名、例: 'Reverb')、`args` (エフェクトのコンストラクタ引数)。
    - **戻り値**: 作成されたTone.jsエフェクトノードのインスタンス。
    - **機能**: `switch`文により、様々なエフェクトタイプ（Reverb, Chorus, Distortionなど）に対応し、それぞれのコンストラクタを呼び出します。
- **`createInstrument(Tone: typeof Tone, type: InstrumentNodeType, args: any[])`** (src/factories/instrument-factory.ts):
    - **役割**: 指定されたタイプと引数に基づいてTone.jsの楽器（シンセサイザー、サンプラーなど）ノードを作成します。
    - **引数**: `Tone` (Tone.jsライブラリのインスタンス)、`type` (楽器のタイプ名、例: 'Synth')、`args` (楽器のコンストラクタ引数)。
    - **戻り値**: 作成されたTone.js楽器ノードのインスタンス。
    - **機能**: `switch`文により、様々な楽器タイプ（Synth, FMSynth, Samplerなど）に対応し、それぞれのコンストラクタを呼び出します。特に`PolySynth`や`Sampler`は特別な処理を行います。
- **`createNode(Tone: typeof Tone, type: NodeEventType, args: any, nodes: SequencerNodes)`** (src/node-factory.ts):
    - **役割**: `createInstrument`または`createEffect`を呼び出して新しいTone.jsノード（楽器またはエフェクト）を生成し、`SequencerNodes`に登録します。
    - **引数**: `Tone` (Tone.jsライブラリのインスタンス)、`type` (ノードのタイプ、例: 'Synth', 'Reverb')、`args` (ノードのコンストラクタ引数)、`nodes` (ノード管理インスタンス)。
    - **戻り値**: 作成されたTone.jsノードのインスタンス。
    - **機能**: ノードの種類を判別し、適切なファクトリを呼び出してノードを生成します。
- **`connectNode(sourceNode: Tone.ToneAudioNode, connectTo: string | number, nodes: SequencerNodes)`** (src/node-factory.ts):
    - **役割**: 2つのTone.jsノードを接続します。接続先はノードIDまたは'toDestination'のような文字列で指定できます。
    - **引数**: `sourceNode` (接続元のTone.jsノード)、`connectTo` (接続先のIDまたは'toDestination')、`nodes` (ノード管理インスタンス)。
    - **戻り値**: なし。
    - **機能**: `connectTo`が数値の場合は`SequencerNodes`から対応するノードを取得し、文字列の場合は`toDestination`メソッドを呼び出します。
- **`parseNDJSON(ndjsonString: string)`** (src/ndjson-streaming.ts):
    - **役割**: 改行区切りJSON (NDJSON) 形式の文字列をパースし、`SequenceEvent`オブジェクトの配列に変換します。
    - **引数**: `ndjsonString` (NDJSON形式の文字列)。
    - **戻り値**: `SequenceEvent[]`。パースされたイベントの配列。
    - **機能**: 各行を個別のJSONオブジェクトとして解析し、無効な行はスキップします。
- **`NDJSONStreamingPlayer` クラス** (src/ndjson-streaming.ts):
    - **役割**: NDJSON形式の音楽データをリアルタイムでストリーミング再生し、ライブ編集やループ再生をサポートします。
    - **メソッド**:
        - **`constructor(Tone: typeof Tone, nodes: SequencerNodes, options?: NDJSONStreamingPlayerOptions)`**: プレーヤーを初期化します。
        - **`start(ndjson: string | SequenceEvent[])`**: NDJSONデータまたはイベント配列で再生を開始または更新します。
        - **`stop()`**: 再生を停止します。
        - **`updateEvents(newEvents: SequenceEvent[])`**: 再生中のシーケンスデータを動的に更新します（ライブ編集機能）。
        - **`isPlaying(): boolean`**: 現在再生中かどうかを返します。
    - **機能**: 先読みロジック（`lookaheadMs`）、ループ機能、再生中のイベントハイライトなどを管理します。
- **`audioBufferToWav(audioBuffer: AudioBuffer)`** (src/offline-renderer.ts):
    - **役割**: Web Audio APIの`AudioBuffer`オブジェクトをWAV形式の`Blob`（バイナリデータ）に変換します。
    - **引数**: `audioBuffer` (変換する`AudioBuffer`インスタンス)。
    - **戻り値**: `Blob`。WAV形式のオーディオデータ。
    - **機能**: WAVファイルのヘッダとオーディオデータを構築し、`Blob`として返します。
- **`downloadWav(buffer: AudioBuffer, filename: string)`** (src/offline-renderer.ts):
    - **役割**: `AudioBuffer`をWAVファイルとしてブラウザからダウンロードします。
    - **引数**: `buffer` (ダウンロードする`AudioBuffer`)、`filename` (ダウンロードするファイル名)。
    - **戻り値**: なし。
    - **機能**: `audioBufferToWav`で変換したBlobを使って、ダウンロードリンクを生成しクリックします。
- **`OfflineRenderer` クラス** (src/offline-renderer.ts):
    - **役割**: JSONシーケンスをオフラインでレンダリングし、結果のオーディオをファイルとして保存できるようにします。
    - **メソッド**:
        - **`constructor(Tone: typeof Tone, nodes: SequencerNodes)`**: レンダラーを初期化します。
        - **`render(sequence: SequenceEvent[], durationSeconds: number, onUpdate?: (progress: number) => void)`**: 指定されたシーケンスを指定された時間でレンダリングします。
        - **`calculateSequenceDuration(sequence: SequenceEvent[]): number`**: シーケンスの総再生時間を計算します。
    - **機能**: `Tone.Offline`機能を利用して、バックグラウンドでオーディオを生成します。
- **`SequencerNodes` クラス** (src/sequencer-nodes.ts):
    - **役割**: Tone.jsによって作成された全ての楽器やエフェクトノードを一元的に管理するためのシンプルなキーバリューペアストアです。
    - **メソッド**:
        - **`constructor()`**: 新しいマップを初期化します。
        - **`get(nodeId: number)`**: 指定されたIDのノードを取得します。
        - **`set(nodeId: number, node: Tone.ToneAudioNode)`**: 新しいノードをIDで登録します。
        - **`disposeAll()`**: 管理下の全てのノードを破棄し、リソースを解放します。
    - **機能**: ノードへのアクセスを簡素化し、リソース管理を容易にします。
- **`EventProcessor` クラス** (src/streaming/event-processor.ts):
    - **役割**: NDJSONストリーミング再生において、新しいイベントの作成、既存ノードへの接続、およびイベントのスケジューリングを処理します。
    - **メソッド**:
        - **`constructor(Tone: typeof Tone, nodes: SequencerNodes, debugLogger?: (message: string) => void)`**: プロセッサを初期化します。
        - **`createNodesAndConnections(events: SequenceEvent[])`**: イベントリストからノードを作成し、接続を確立します。
        - **`processNewCreateAndConnectEvents(allEvents: SequenceEvent[], playbackState: PlaybackState)`**: 再生中に新しく追加されたノード作成・接続イベントを処理します。
        - **`scheduleEvent(event: SequenceEvent, actualTime: number)`**: 指定されたイベントを指定された実際の時刻にスケジュールします。
    - **機能**: NDJSONStreamingPlayerの内部で利用され、リアルタイムでのノード管理とイベント実行を担います。
- **`PlaybackState` クラス** (src/streaming/playback-state.ts):
    - **役割**: NDJSONストリーミング再生の現在の状態を管理します。これには、再生開始時刻、現在のイベントリスト、処理済みイベントのインデックス、ループカウントなどが含まれます。
    - **メソッド**:
        - **`constructor()`**: 初期状態をセットアップします。
        - **`isPlaying(): boolean`**: 再生中かどうかを返します。
        - **`start(events: SequenceEvent[], startTime: number)`**: 再生を開始し、状態を初期化します。
        - **`stop()`**: 再生を停止し、状態をリセットします。
        - **`markEventAsProcessed(index: number)`**: 指定されたインデックスのイベントが処理済みであるとマークします。
        - **`resetProcessedEvents()`**: 処理済みイベントの記録をクリアします。
    - **機能**: ストリーミング再生のライブ編集やループ処理のロジックを支えます。
- **`TimeParser` クラス** (src/utils/time-parser.ts):
    - **役割**: Tone.jsで使用される様々な時間表記（例: "8n", "0:0:2", "40hz"）を解析し、秒数に変換するユーティリティ。
    - **メソッド**:
        - **`constructor(Tone: typeof Tone)`**: Tone.jsのインスタンスを受け取り、内部的にTimeオブジェクトを利用できるようにします。
        - **`parseTimeToSeconds(timeNotation: Tone.Unit.Time): number`**: 指定された時間表記を秒数に変換します。
        - **`parseTickTime(tickTime: string): number`**: TICKS形式（例: "120t"）を秒数に変換します。
        - **`parseToneNotation(notation: string): number`**: Tone.jsの標準的な時間表記（例: "4n"）を秒数に変換します。
        - **`parseBarBeatTime(notation: string): number`**: 小節:拍:16分音符（例: "0:0:0"）表記を秒数に変換します。
    - **機能**: ユーザーが様々な形式で時間を指定できるようにし、ライブラリ内部で一貫した時間処理を可能にします。
- **`loadAllSequences()`** (src/demo/sequenceLoader.ts):
    - **役割**: デモページで使用される全てのプリセットシーケンスデータを非同期でロードします。
    - **引数**: なし。
    - **戻り値**: `Promise<SequenceDataCollection>`。ロードされたシーケンスデータのコレクション。
    - **機能**: `minimal.ts`, `tempo-test.ts`などのファイルからシーケンス定義をインポートし、利用可能な状態にします。
- **`playWithAudioContext()`** (src/demo/main.ts):
    - **役割**: ユーザーがデモで再生ボタンをクリックした際に、オーディオコンテキストを開始し、選択されたシーケンスを再生します。
    - **引数**: なし。
    - **戻り値**: `Promise<void>`。
    - **機能**: `Tone.start()`を呼び出してWeb Audio Contextを初期化し、`audioManager.playSequence`を呼び出します。
- **`ensureAudioContextStarted()`** (src/demo/modules/audioManager.ts):
    - **役割**: Web Audio Contextが開始状態にあることを保証します。多くのブラウザでは、ユーザーの操作なしにオーディオ再生を開始できないため、この関数でユーザー操作を待って開始します。
    - **引数**: なし。
    - **戻り値**: `Promise<void>`。オーディオコンテキストが開始されたときに解決されます。
    - **機能**: `Tone.start()`を呼び出します。

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
Generated at: 2026-02-12 07:14:28 JST
