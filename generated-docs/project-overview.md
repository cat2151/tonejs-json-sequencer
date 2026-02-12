Last updated: 2026-02-13

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド:
  - **HTML/CSS/JavaScript**: デモページやライブラリの使用例をブラウザ上で実行するための基本的なWeb技術。
- 音楽・オーディオ:
  - **Tone.js**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、シーケンサーなどの複雑なオーディオ処理を容易にするJavaScriptライブラリ。本プロジェクトの核となる。
  - **Web Audio API**: ブラウザ上で高度なオーディオ処理（音源の生成、エフェクトの適用、空間オーディオなど）を行うための標準API。Tone.jsがこれを活用している。
- 開発ツール:
  - **TypeScript**: 静的型付けを導入することで、大規模なJavaScriptアプリケーション開発における可読性と保守性を向上させる言語。
  - **npm**: JavaScriptのパッケージマネージャー。プロジェクトの依存関係の管理、ビルドスクリプトの実行などに使用される。
  - **GitHub Actions**: リポジトリでのイベントに基づいてワークフローを自動化するCI/CDツール。本プロジェクトではドキュメントの自動翻訳などに利用されている。
  - **EditorConfig**: 異なるIDEやエディタ間でコードスタイルの一貫性を保つための設定ファイル。
- テスト:
  - **TypeScript**: コンパイル時に型チェックを行うことで、一定の品質を担保する。明示的な単体テストフレームワークの記述は提供情報からは見られない。
- ビルドツール:
  - **TypeScript Compiler (tsc)**: TypeScriptコードをJavaScriptに変換する。
  - **ES Modules (mjs) / CommonJS (js)**: JavaScriptのモジュール形式。複数の環境で利用できるよう、ビルド時に両方の形式で出力される。
- 言語機能:
  - **JSON (JavaScript Object Notation)**: 軽量なデータ交換フォーマット。本プロジェクトでは音色、エフェクト、演奏イベントなどをデータとして記述するために使用される。
  - **NDJSON (Newline Delimited JSON)**: 改行区切りのJSON。リアルタイムストリーミングやライブ編集のデータ形式として採用されている。
- 自動化・CI/CD:
  - **GitHub Actions**: 前述の通り、自動翻訳やデプロイに関連するワークフローを自動化する。
- 開発標準:
  - **EditorConfig**: コーディングスタイルを統一し、共同開発を円滑にする。

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
googled947dc864c270e07.html
issue-notes/
  100.md
  108.md
  109.md
  110.md
  111.md
  112.md
  120.md
  124.md
  137.md
  139.md
  162.md
  166.md
  89.md
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

- **`src/index.ts`**:
  プロジェクトのエントリーポイントとなるファイルで、主要なモジュール（`SequencerNodes`、`playSequence`、`NDJSONStreamingPlayer`など）を外部にエクスポートします。
- **`src/event-scheduler.ts`**:
  JSONで定義された単一の音楽イベント（ノード作成、接続、音符発音、パラメータ変更など）を解析し、Tone.jsの対応するメソッドを呼び出してスケジューリングまたは即時実行するコアロジックを実装しています。`playSequence`関数もここで定義されており、JSONシーケンス全体を再生する役割を担います。
- **`src/sequencer-nodes.ts`**:
  Tone.jsで生成されたオーディオノード（シンセサイザー、エフェクトなど）を、一意のIDで管理するためのクラス`SequencerNodes`を定義しています。ノードの取得、登録、および全てのノードの解放（`dispose`）機能を提供します。
- **`src/factories/instrument-factory.ts`**:
  JSONイベントの`nodeType`が楽器（`Synth`, `FMSynth`, `Sampler`など）の場合に、その種類に応じて適切なTone.jsの楽器インスタンスを作成するファクトリ関数`createInstrument`を提供します。
- **`src/factories/effect-factory.ts`**:
  JSONイベントの`nodeType`がエフェクト（`Reverb`, `Chorus`, `Distortion`など）の場合に、その種類に応じて適切なTone.jsのエフェクトインスタンスを作成するファクトリ関数`createEffect`を提供します。
- **`src/node-factory.ts`**:
  楽器とエフェクトの両方を含む、任意のTone.jsノードの作成（`createNode`）と、それらのノード間の接続（`connectNode`）を抽象化する機能を提供します。内部で`instrument-factory.ts`と`effect-factory.ts`を利用します。
- **`src/ndjson-streaming.ts`**:
  NDJSON（改行区切りJSON）形式の音楽イベントストリームをリアルタイムで処理し、ライブ編集、ループ再生、先読みスケジューリングなどの機能を提供する`NDJSONStreamingPlayer`クラスを定義しています。これにより、動的な音楽体験が可能になります。
- **`src/offline-renderer.ts`**:
  JSONシーケンスをリアルタイムではなくオフラインでレンダリングし、最終的なオーディオ出力をWAVファイルとして生成する機能を提供する`OfflineRenderer`クラスを定義しています。`audioBufferToWav`や`downloadWav`といったユーティリティも含まれます。
- **`src/streaming/event-processor.ts`**:
  `NDJSONStreamingPlayer`内で使用され、NDJSONストリーミング中に発生するイベント（ノードの作成、接続、スケジューリングなど）の具体的な処理ロジックをカプセル化します。
- **`src/streaming/playback-state.ts`**:
  `NDJSONStreamingPlayer`の現在の再生状態（再生中かどうか、開始時刻、処理済みのイベントインデックス、ループ回数など）を管理するクラス`PlaybackState`を定義しています。
- **`src/utils/time-parser.ts`**:
  "8n", "0:0:2"のようなTone.js独自の音楽時間表記を、秒単位の数値やティック単位の数値に正確にパースするためのユーティリティ関数を提供します。
- **`src/types.ts`**:
  プロジェクト全体で使用される型定義（`SequenceEvent`、`NodeConfig`、`InstrumentType`など）を集中管理し、コードの型安全性を確保します。
- **`src/demo/` ディレクトリ**:
  プロジェクトの様々な機能（楽器、エフェクト、ストリーミング、オフラインレンダリングなど）を示すためのHTML、CSS、TypeScript（後にJavaScriptにコンパイルされる）のデモンストレーションファイル群が含まれています。
- **`dist/` ディレクトリ**:
  TypeScriptで記述されたソースコードをJavaScriptにコンパイルし、CommonJS (`cjs/`) とES Modules (`esm/`) の両方の形式で配布するためのビルド済みファイル群です。各ファイルには対応する型定義ファイル (`.d.ts`) も含まれます。
- **`docs/tonejs-components-roadmap.ja.md`**:
  Tone.jsの各コンポーネント（楽器、エフェクトなど）がJSONでどこまで制御可能か、現在の対応状況、今後の実装計画、優先順位などを詳細に記述したドキュメント（日本語版）。
- **`examples/` ディレクトリ**:
  ライブラリの基本的な使用方法を示す簡潔なコード例（CDN経由での利用、npmパッケージとしての利用、オフラインレンダリングの例など）が含まれています。

## 関数詳細説明

- **`scheduleOrExecuteEvent(Tone, nodes, event, time)`**:
  - **役割**: JSONで記述された単一の音楽イベント（例: ノード作成、接続、音符発音、パラメータ変更、テンポ設定）を解析し、指定された時刻にTone.jsの適切なAPIを呼び出して実行します。
  - **引数**:
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`クラスのインスタンスで、作成されたTone.jsノード群を管理します。
    - `event`: 処理対象となる`SequenceEvent`型のJSONイベントオブジェクト。
    - `time`: イベントを実行するTone.jsの時間表記（例: `'8n'`, `'0:0:2'`, `'1s'`）または秒数。
  - **戻り値**: `Promise<void>`（非同期処理を含む場合）または`void`。
  - **機能**: イベントタイプに応じた動的なTone.js操作（`createNode`, `connectNode`, `triggerAttackRelease`, `rampTo`など）を実行します。
- **`playSequence(Tone, nodes, sequence)`**:
  - **役割**: JSONで定義された音楽イベントの配列（シーケンス）全体を順次再生します。
  - **引数**:
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`クラスのインスタンス。
    - `sequence`: `SequenceEvent`オブジェクトの配列で構成されるJSONシーケンス。
  - **戻り値**: `Promise<void>`。シーケンスの再生が完了したときに解決されます。
  - **機能**: シーケンス内の各イベントに対して`scheduleOrExecuteEvent`を呼び出し、音楽を時間通りに進行させます。
- **`createNode(Tone, nodes, event)`**:
  - **役割**: `createNode`イベントタイプに基づいてTone.jsの新しいオーディオノード（シンセサイザー、エフェクトなど）を作成し、`SequencerNodes`に登録します。
  - **引数**:
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`クラスのインスタンス。
    - `event`: `eventType`が`'createNode'`の`SequenceEvent`オブジェクト。
  - **戻り値**: 作成されたTone.jsオーディオノードのインスタンス。
  - **機能**: `instrument-factory`や`effect-factory`を内部で利用し、`nodeType`（例: `'Synth'`, `'Reverb'`)と`args`に基づいてTone.jsノードをインスタンス化します。
- **`connectNode(nodes, event)`**:
  - **役割**: `connect`イベントタイプに基づいて、`SequencerNodes`に登録されている既存のTone.jsノード間を接続します。
  - **引数**:
    - `nodes`: `SequencerNodes`クラスのインスタンス。
    - `event`: `eventType`が`'connect'`の`SequenceEvent`オブジェクト。
  - **戻り値**: `void`。
  - **機能**: 指定された`nodeId`のノードを`connectTo`で指定された宛先（別のノードIDまたは`'toDestination'`）に接続します。
- **`createInstrument(Tone, instrumentType, args)` (src/factories/instrument-factory.ts)**:
  - **役割**: 指定された種類のTone.js楽器（例: `Synth`, `FMSynth`, `Sampler`）のインスタンスを生成します。
  - **引数**:
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `instrumentType`: 生成する楽器のタイプ名（文字列）。
    - `args`: 楽器のコンストラクタに渡す設定オブジェクト。
  - **戻り値**: 生成された`Tone.Instrument`またはその派生クラスのインスタンス。
  - **機能**: `switch`文を使用して`instrumentType`に応じた楽器クラスを動的にインスタンス化します。`PolySynth`や`Sampler`などの特殊なケースも処理します。
- **`createEffect(Tone, effectType, args)` (src/factories/effect-factory.ts)**:
  - **役割**: 指定された種類のTone.jsエフェクト（例: `Reverb`, `Chorus`, `Distortion`）のインスタンスを生成します。
  - **引数**:
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `effectType`: 生成するエフェクトのタイプ名（文字列）。
    - `args`: エフェクトのコンストラクタに渡す設定オブジェクト。
  - **戻り値**: 生成された`Tone.Effect`またはその派生クラスのインスタンス。
  - **機能**: `switch`文を使用して`effectType`に応じたエフェクトクラスを動的にインスタンス化し、`startIfAvailable`を呼び出してエフェクトを開始します。
- **`parseNDJSON(ndjsonStringOrArray)` (src/ndjson-streaming.ts)**:
  - **役割**: NDJSON形式の文字列、または`SequenceEvent`オブジェクトの配列をパースし、整形された`SequenceEvent`の配列を返します。
  - **引数**:
    - `ndjsonStringOrArray`: NDJSON形式の文字列、または既にパースされた`SequenceEvent`オブジェクトの配列。
  - **戻り値**: `SequenceEvent`オブジェクトの配列。
  - **機能**: 文字列が与えられた場合、各行をJSONとしてパースし、エラー処理も行います。
- **`audioBufferToWav(buffer)` (src/offline-renderer.ts)**:
  - **役割**: Web Audio APIの`AudioBuffer`オブジェクトを標準的なWAV形式の`Blob`に変換します。
  - **引数**:
    - `buffer`: 変換する`AudioBuffer`インスタンス。
  - **戻り値**: `Blob`オブジェクト（MIMEタイプは`audio/wav`）。
  - **機能**: AudioBufferのチャンネルデータ、サンプリングレートなどの情報を用いて、WAVファイルヘッダとオーディオデータを構築します。
- **`downloadWav(buffer, filename)` (src/offline-renderer.ts)**:
  - **役割**: `AudioBuffer`をWAV形式に変換し、指定されたファイル名でユーザーのブラウザにダウンロードさせます。
  - **引数**:
    - `buffer`: ダウンロードする`AudioBuffer`インスタンス。
    - `filename`: ダウンロードされるファイルのベース名（拡張子`.wav`は自動的に追加されます）。
  - **戻り値**: `Promise<void>`。ダウンロード処理が完了したときに解決されます。
  - **機能**: `audioBufferToWav`を呼び出してBlobを生成し、一時的なURLを作成してダウンロードトリガーします。
- **`rampParameter(param, value, time)` (src/event-scheduler.ts)**:
  - **役割**: Tone.jsのオーディオパラメータ（例: `synth.volume`, `filter.frequency`）を、指定された時刻までに目標値まで滑らかに変化させます。
  - **引数**:
    - `param`: 変化させるTone.jsの`Param`オブジェクト。
    - `value`: 目標とする数値。
    - `time`: 変化が完了するTone.jsの時間表記（例: `'0:0:0'`, `'+1s'`）。
  - **戻り値**: `void`。
  - **機能**: `param.rampTo()`メソッドを利用し、パラメータのエンベロープ制御を実現します。
- **`parseTimeToSeconds(timeNotation, bpm)` (src/utils/time-parser.ts)**:
  - **役割**: "0:0:0" (bar:beat:sixteenth) や "8n" (8分音符) のようなTone.jsの時間表記を、現在のBPMに基づいて秒単位の数値に変換します。
  - **引数**:
    - `timeNotation`: パースする時間表記文字列。
    - `bpm`: 現在のテンポ（Beats Per Minute）。
  - **戻り値**: パースされた秒単位の時間（`number`）。
  - **機能**: `isToneNotation`, `parseToneNotation`, `parseBarBeatTime`, `parseTickTime`といった内部ヘルパー関数を呼び出して時間表記の様々な形式に対応します。
- **`loadAllSequences()` (src/demo/sequenceLoader.ts)**:
  - **役割**: デモンストレーションで使用される全てのサンプルシーケンス（JSON形式）をロードし、コレクションとして提供します。
  - **引数**: なし。
  - **戻り値**: `DemoSequence`オブジェクトの配列。
  - **機能**: `src/demo/instrument`, `src/demo/effect`, `src/demo/sequences`ディレクトリ内の各サンプルJSONファイルを動的にインポートし、利用可能なシーケンスのリストを作成します。
- **`NDJSONStreamingPlayer` クラス (src/ndjson-streaming.ts)**:
  - **役割**: NDJSON形式の音楽シーケンスをリアルタイムで再生、ライブ編集、ループ再生をサポートする機能を提供します。
  - **コンストラクタ**: `NDJSONStreamingPlayer(Tone, nodes, options)`
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`インスタンス。
    - `options`: `lookaheadMs`, `loop`, `onLoopComplete`などの再生設定。
  - **主なメソッド**:
    - `start(ndjson)`: NDJSONストリームまたは配列で再生を開始/更新します。
    - `stop()`: 再生を停止します。
    - `processEvents()`: 内部で繰り返し呼び出され、スケジュールされたイベントを処理し、Tone.jsに渡します。
    - `updateEvents(newEvents)`: ライブ編集時に新しいイベントリストで再生内容を更新します。
- **`SequencerNodes` クラス (src/sequencer-nodes.ts)**:
  - **役割**: Tone.jsノードのインスタンスをIDで管理するためのシンプルなマップです。
  - **コンストラクタ**: `SequencerNodes()`
  - **主なメソッド**:
    - `get(nodeId)`: 指定されたIDのノードを取得します。
    - `set(nodeId, node)`: ノードをIDで登録します。
    - `disposeAll()`: 管理している全てのノードを解放（`Tone.js`の`dispose()`メソッドを呼び出し）します。
- **`OfflineRenderer` クラス (src/offline-renderer.ts)**:
  - **役割**: JSONシーケンスをオフラインでレンダリングし、最終的なオーディオ出力を`AudioBuffer`として提供する機能です。
  - **コンストラクタ**: `OfflineRenderer(Tone, nodes)`
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`インスタンス。
  - **主なメソッド**:
    - `render(sequence, durationSeconds)`: シーケンスを指定された期間レンダリングし、`AudioBuffer`を返します。
- **`EventProcessor` クラス (src/streaming/event-processor.ts)**:
  - **役割**: `NDJSONStreamingPlayer`によってイベントが処理される際の、Tone.jsノードの作成、接続、およびスケジューリングのロジックをカプセル化します。
  - **コンストラクタ**: `EventProcessor(Tone, nodes, debug)`
    - `Tone`: `Tone.js`ライブラリのグローバルオブジェクト。
    - `nodes`: `SequencerNodes`インスタンス。
    - `debug`: デバッグ情報を出力するかどうかのフラグ。
  - **主なメソッド**:
    - `createNodesAndConnections(events)`: イベント配列からノードを作成し、それらの接続を確立します。
    - `processNewCreateAndConnectEvents(allEvents, processedEventIndices)`: 未処理の新規ノード作成および接続イベントを処理します。
    - `scheduleEvent(event, time)`: 単一のイベントをTone.jsにスケジュールします。
- **`PlaybackState` クラス (src/streaming/playback-state.ts)**:
  - **役割**: `NDJSONStreamingPlayer`の内部再生状態を管理します。
  - **コンストラクタ**: `PlaybackState()`
  - **主なプロパティ**:
    - `isPlaying`: 再生中かどうかの真偽値。
    - `startTime`: 再生開始時のオーディオコンテキスト時刻。
    - `currentEvents`: 現在再生中のイベントの配列。
    - `processedEventIndices`: 処理済みのイベントのインデックスを保持するSet。
    - `loopCount`: ループ再生の実行回数。
    - `cachedSequenceDuration`: シーケンスの再生時間（キャッシュ）。
  - **主なメソッド**:
    - `start(newEvents, loop)`: 再生状態を開始し、イベントとループ設定を更新します。
    - `stop()`: 再生状態を停止します。
    - `markEventAsProcessed(index)`: 指定されたインデックスのイベントを処理済みとしてマークします。
    - `resetProcessedEvents()`: 処理済みイベントの記録をリセットします。

## 関数呼び出し階層ツリー
```
- playSequence(Tone, nodes, sequence)
    - scheduleOrExecuteEvent(Tone, nodes, event, time) (シーケンス内の各イベントに対して)
        - rampParameter(param, value, time) (パラメータ変更イベントの場合)
        - createNode(Tone, nodes, event) (ノード作成イベントの場合)
            - createInstrument(Tone, instrumentType, args)
                - createPolySynth(Tone, args)
                - createSampler(Tone, args)
            - createEffect(Tone, effectType, args)
                - startIfAvailable(effect)
        - connectNode(nodes, event) (ノード接続イベントの場合)

- NDJSONStreamingPlayer.start(ndjson)
    - parseNDJSON(ndjson)
    - initializePlayback()
        - EventProcessor.createNodesAndConnections(events)
            - createNode(Tone, nodes, event)
            - connectNode(nodes, event)
    - processEvents() (内部で`requestAnimationFrame`により繰り返し呼び出される)
        - EventProcessor.processNewCreateAndConnectEvents(allEvents, processedEventIndices)
            - createNode(Tone, nodes, event)
            - connectNode(nodes, event)
        - EventProcessor.scheduleEvent(event, time)
            - scheduleOrExecuteEvent(Tone, nodes, event, time)
        - PlaybackState.markEventAsProcessed(index)
        - PlaybackState.incrementProcessLoopCount() (ループ再生時)

- OfflineRenderer.render(sequence, durationSeconds)
    - SequencerNodesのインスタンス作成/管理
    - playSequence(Tone.Offline, nodes, sequence) (オフラインレンダリングコンテキストで再生)
    - audioBufferToWav(buffer)
    - downloadWav(buffer, filename)

- SequencerNodesクラスのメソッド
    - get(nodeId)
    - set(nodeId, node)
    - disposeAll()
        - Tone.AudioNode.dispose() (管理下の各ノードに対して)

- TimeParserクラスのメソッド
    - parseTimeToSeconds(timeNotation, bpm)
        - parseTickTime(tickNotation)
        - isToneNotation(notation)
        - parseToneNotation(notation)
        - parseBarBeatTime(barBeatTime, bpm)

- scripts/copy-to-dist.js: copyRecursive(src, dest)
    - fs.readdirSync(src)
    - fs.statSync(src)
    - fs.mkdirSync(dest)
    - fs.copyFileSync(src, dest)

- scripts/rename-to-mjs.js: renameFiles(dirPath)
    - fs.readdirSync(dirPath)
    - fs.renameSync(oldPath, newPath)
    - updateImports(filePath)
        - fs.readFileSync(filePath)
        - fs.writeFileSync(filePath, newContent)

---
Generated at: 2026-02-13 07:14:17 JST
