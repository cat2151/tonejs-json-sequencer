Last updated: 2026-02-10

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js (Web Audio APIをラップし、Web上で高度な音響処理や音楽表現を可能にするライブラリ), JavaScript/TypeScript (ブラウザ上で動作する主要言語)
- 音楽・オーディオ: Tone.js (シンセサイザー、エフェクト、シーケンサー機能を提供), NDJSON (New-line Delimited JSON形式で、リアルタイムストリーミングやイベントのシーケンスを表現)
- 開発ツール: TypeScript (静的型付けによるJavaScript開発を可能にする言語), Node.js (JavaScript実行環境、ビルドスクリプトの実行に利用)
- テスト: (具体的なテストフレームワークの記載はありませんが、TypeScriptの型定義がコード品質の一部を担保します)
- ビルドツール: TypeScript Compiler (tsc) (TypeScriptコードをJavaScriptにコンパイル), npm/yarn (プロジェクトの依存関係管理とビルドスクリプトの実行)
- 言語機能: JavaScript (ES Modules / CommonJS形式をサポート), TypeScript (最新のECMAScript機能と型システム)
- 自動化・CI/CD: GitHub Actions (READMEファイルの自動翻訳など、CI/CDパイプラインを自動化), npm scripts (ビルド、ファイル操作、リリース準備などのタスクを自動化)
- 開発標準: EditorConfig (.editorconfig) (複数のエディタやIDEでコードのスタイルとフォーマットを統一するための設定ファイル)

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
- **README.md / README.ja.md**: プロジェクトの概要、使い方、機能、ロードマップなどを記述した主要ドキュメント（英語/日本語）。
- **LICENSE**: プロジェクトのライセンス情報。
- **package.json**: プロジェクトのメタデータ、依存関係、スクリプトなどが定義されたファイル。
- **package-lock.json**: `package.json`に基づく依存関係の厳密なバージョンを記録するファイル。
- **src/index.ts**: ライブラリのエントリポイント。主要なクラスや関数を外部にエクスポートします。
- **src/event-scheduler.ts**: JSONイベントを解析し、Tone.jsのイベント（音符の発音、パラメータ変更など）をスケジュールまたは即座に実行するコアロジックを実装しています。
- **src/sequencer-nodes.ts**: Tone.jsのシンセサイザーやエフェクトなどのノードをIDで一元的に管理するクラスを提供します。これにより、シーケンスイベントから特定のノードを簡単に参照・操作できます。
- **src/ndjson-streaming.ts**: NDJSON (改行区切りJSON) 形式の音楽イベントストリームをリアルタイムで処理し、ライブ編集やループ再生を可能にする機能を提供します。
- **src/node-factory.ts**: JSON定義に基づいてTone.jsのノード（楽器やエフェクト）を作成し、接続する役割を担います。
- **src/factories/instrument-factory.ts**: JSON定義からTone.jsの各種シンセサイザー（Synth, FMSynthなど）やサンプラーといった楽器インスタンスを作成するファクトリ関数を実装しています。
- **src/factories/effect-factory.ts**: JSON定義からTone.jsの各種エフェクト（Reverb, Chorusなど）インスタンスを作成するファクトリ関数を実装しています。
- **src/offline-renderer.ts**: 音楽シーケンスをリアルタイムではなく、オフラインでレンダリングし、結果としてAudioBuffer（またはWAVファイル）を出力する機能を提供します。
- **src/utils/time-parser.ts**: Tone.jsで使われる時間表記（例: "8n"、"0:0:2"）を秒単位に変換するユーティリティ関数を提供します。
- **src/types.ts**: プロジェクト全体で使用されるカスタムのTypeScript型定義を集めたファイルです。
- **src/streaming/event-processor.ts**: NDJSONストリーミングにおいて、イベントを解析し、適切なタイミングでTone.jsのスケジュールに投入するロジックを処理します。
- **src/streaming/playback-state.ts**: NDJSONストリーミングの現在の再生状態（開始時間、処理済みイベント、ループカウントなど）を管理するクラスです。
- **src/demo/**: ライブラリの機能を示すためのデモアプリケーションのソースコードが含まれています。
    - **src/demo/main.ts**: デモアプリケーションのメインロジックを制御します。
    - **src/demo/modules/audioManager.ts**: Tone.jsのオーディオコンテキストの管理とシーケンス再生を担います。
    - **src/demo/modules/uiManager.ts**: デモのユーザーインターフェース操作（ボタンクリック、テキストエリア更新など）を管理します。
    - **src/demo/sequenceLoader.ts**: デモで使用するプリセットのJSONシーケンスデータをロードします。
    - **src/demo/sequences/**: 各種楽器やエフェクトを使った具体的な音楽シーケンスのJSON定義ファイル群です。
- **dist/**: TypeScriptソースコードからコンパイルされたJavaScriptファイルと型定義ファイル、およびデモ用のビルド済みファイルが含まれるディレクトリです。ES Modules (esm) とCommonJS (cjs) の両方の形式で提供されます。
- **docs/tonejs-components-roadmap.ja.md**: Tone.jsコンポーネントのJSON対応状況、実装のロードマップ、詳細な計画が記述されたドキュメント（日本語）。
- **examples/**: ライブラリの基本的な使用方法を示す簡潔なコード例が含まれています。
- **scripts/**: プロジェクトのビルドプロセスやファイル操作に使用されるユーティリティスクリプトが含まれています。

## 関数詳細説明
- **SequencerNodes.constructor()**:
    - 役割: `SequencerNodes`クラスのインスタンスを初期化し、Tone.jsノードを管理するための内部マップを作成します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 新しい`SequencerNodes`オブジェクトを作成する際に、ノードを格納する準備をします。
- **SequencerNodes.get(nodeId: number)**:
    - 役割: 指定された数値IDに対応するTone.jsノードまたはパラメータを取得します。
    - 引数: `nodeId` (取得したいノードのID)。
    - 戻り値: `Tone.ToneAudioNode | Tone.Param | undefined` (見つかったノードまたは`undefined`)。
    - 機能: ノードIDをキーとして内部マップを検索し、対応するTone.jsインスタンスを返します。
- **SequencerNodes.set(nodeId: number, node: Tone.ToneAudioNode | Tone.Param)**:
    - 役割: 指定された数値IDでTone.jsノードまたはパラメータを登録します。
    - 引数: `nodeId` (登録するノードのID), `node` (登録するTone.jsノードまたはパラメータインスタンス)。
    - 戻り値: なし。
    - 機能: ノードIDとTone.jsインスタンスのペアを内部マップに保存します。
- **SequencerNodes.disposeAll()**:
    - 役割: `SequencerNodes`が管理している全てのTone.jsノードを破棄し、関連するリソースを解放します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 内部マップに登録されている各ノードに対してTone.jsの`dispose()`メソッドを呼び出し、ガベージコレクションを促します。
- **SequencerNodes.forEach(callback: (node: Tone.ToneAudioNode | Tone.Param, nodeId: number) => void)**:
    - 役割: 管理している各ノードに対して指定されたコールバック関数を実行します。
    - 引数: `callback` (各ノードとそれに対応するIDを引数にとる関数)。
    - 戻り値: なし。
    - 機能: 全てのノードをイテレートし、それぞれにカスタム処理を適用できるようにします。
- **rampParameter(param: Tone.Param, value: Tone.Unit.Unit, duration: Tone.Unit.Time, time: Tone.Unit.Time)**:
    - 役割: Tone.jsのオーディオパラメータを指定された時間で滑らかに目標値まで変化させます（ランプ処理）。
    - 引数: `param` (対象となるTone.jsのパラメータインスタンス), `value` (最終目標値), `duration` (変化にかかる時間), `time` (変化を開始する時刻)。
    - 戻り値: なし。
    - 機能: ディレイビブラートなどの奏法表現で、パラメータを動的に制御するために使用されます。
- **scheduleOrExecuteEvent(Tone: typeof Tone, nodes: SequencerNodes, event: SequenceEvent, time: Tone.Unit.Time)**:
    - 役割: JSONで定義された単一の音楽イベントをTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - 引数: `Tone` (Tone.jsライブラリ全体), `nodes` (SequencerNodesインスタンス), `event` (処理するイベントオブジェクト), `time` (イベントが実行されるTone.jsの時間)。
    - 戻り値: `Promise<void>`。
    - 機能: イベントの種類（ノード作成、接続、音符発音、パラメータ変更など）に応じて、対応するTone.jsのAPIを呼び出します。
- **playSequence(Tone: typeof Tone, nodes: SequencerNodes, sequence: SequenceEvent[])**:
    - 役割: JSON配列で記述された一連の音楽イベントシーケンス全体を再生します。
    - 引数: `Tone` (Tone.jsライブラリ全体), `nodes` (SequencerNodesインスタンス), `sequence` (再生するイベントオブジェクトの配列)。
    - 戻り値: `Promise<void>` (全てのイベントのスケジュールが完了したときに解決されるPromise)。
    - 機能: シーケンス内の各イベントを順番に`scheduleOrExecuteEvent`に渡し、全体の再生フローを管理します。
- **parseNDJSON(ndjsonString: string | SequenceEvent[])**:
    - 役割: NDJSON (改行区切りJSON) 形式の文字列、またはイベントオブジェクトの配列をパースし、有効な`SequenceEvent`オブジェクトの配列を返します。
    - 引数: `ndjsonString` (NDJSON文字列またはイベント配列)。
    - 戻り値: `SequenceEvent[]` (パースされたイベントの配列)。
    - 機能: 各行を個別のJSONオブジェクトとして解析し、構文エラーのある行はスキップして、処理可能なイベントリストを作成します。
- **NDJSONStreamingPlayer.constructor(Tone: typeof Tone, nodes: SequencerNodes, options?: NDJSONStreamingPlayerOptions)**:
    - 役割: NDJSONストリーミングプレーヤーの新しいインスタンスを初期化します。
    - 引数: `Tone` (Tone.jsライブラリ), `nodes` (SequencerNodesインスタンス), `options` (先読み時間、ループ設定、デバッグコールバックなどの設定)。
    - 戻り値: なし。
    - 機能: リアルタイム再生、ライブ編集、ループ再生をサポートするための内部状態とタイマーを設定します。
- **NDJSONStreamingPlayer.start(ndjson: string | SequenceEvent[])**:
    - 役割: NDJSONストリーミングの再生を開始または、再生中の場合はイベントストリームを更新してライブ編集を適用します。
    - 引数: `ndjson` (新しいNDJSON文字列またはイベント配列)。
    - 戻り値: `Promise<void>`。
    - 機能: 再生を初期化し、イベントプロセッサを起動して、イベントをスケジュールします。再生中の更新では、既存の再生を中断せずに新しいイベントを適用します。
- **NDJSONStreamingPlayer.stop()**:
    - 役割: 現在進行中のNDJSONストリーミング再生を停止します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 全てのスケジュールされたTone.jsイベントをクリアし、内部の再生状態をリセットします。
- **NodeFactory.createNode(Tone: typeof Tone, event: CreateNodeEvent)**:
    - 役割: `CreateNodeEvent`の定義に基づいて、新しいTone.jsの楽器またはエフェクトノードを作成します。
    - 引数: `Tone` (Tone.jsライブラリ), `event` (ノード作成イベントオブジェクト)。
    - 戻り値: `Tone.ToneAudioNode | undefined` (作成されたノードまたは`undefined`)。
    - 機能: イベント内の`nodeType`（例: "Synth", "Reverb"）を基に、適切なファクトリ（`InstrumentFactory`または`EffectFactory`）を呼び出してノードをインスタンス化します。
- **NodeFactory.connectNode(nodes: SequencerNodes, event: ConnectEvent)**:
    - 役割: `ConnectEvent`の定義に基づいて、既存のTone.jsノード同士、またはノードを最終出力（`toDestination`）に接続します。
    - 引数: `nodes` (SequencerNodesインスタンス), `event` (ノード接続イベントオブジェクト)。
    - 戻り値: なし。
    - 機能: `nodeId`で指定されたソースノードを`connectTo`で指定されたターゲットノードまたは`Tone.Destination`に接続します。
- **InstrumentFactory.createInstrument(Tone: typeof Tone, nodeType: string, args: any)**:
    - 役割: 指定された種類と引数でTone.jsの楽器（シンセサイザー、サンプラーなど）を作成します。
    - 引数: `Tone` (Tone.jsライブラリ), `nodeType` (楽器の種類を示す文字列、例: "Synth", "FMSynth"), `args` (楽器のコンストラクタに渡す引数オブジェクト)。
    - 戻り値: `Tone.Instrument | Tone.PolySynth | Tone.Sampler | undefined` (作成された楽器インスタンスまたは`undefined`)。
    - 機能: `nodeType`に対応するTone.jsの楽器クラスをインスタンス化します。PolySynthやSamplerのような特殊なケースも処理します。
- **EffectFactory.createEffect(Tone: typeof Tone, nodeType: string, args: any)**:
    - 役割: 指定された種類と引数でTone.jsのエフェクトを作成します。
    - 引数: `Tone` (Tone.jsライブラリ), `nodeType` (エフェクトの種類を示す文字列、例: "Reverb", "Chorus"), `args` (エフェクトのコンストラクタに渡す引数オブジェクト)。
    - 戻り値: `Tone.Effect | undefined` (作成されたエフェクトインスタンスまたは`undefined`)。
    - 機能: `nodeType`に対応するTone.jsのエフェクトクラスをインスタンス化し、必要に応じて起動します。
- **OfflineRenderer.constructor(Tone: typeof Tone, nodes: SequencerNodes)**:
    - 役割: `OfflineRenderer`クラスのインスタンスを初期化します。
    - 引数: `Tone` (Tone.jsライブラリ), `nodes` (SequencerNodesインスタンス)。
    - 戻り値: なし。
    - 機能: オフラインレンダリングに必要なTone.jsのコンテキストとノード管理インスタンスを保持します。
- **OfflineRenderer.render(sequence: SequenceEvent[], duration: Tone.Unit.Time, progressCallback?: (progress: number) => void)**:
    - 役割: JSONシーケンスをオフラインでレンダリングし、最終的なオーディオデータを含む`AudioBuffer`を返します。
    - 引数: `sequence` (レンダリングするイベントの配列), `duration` (レンダリングする時間長), `progressCallback` (レンダリング進捗を通知するコールバック関数)。
    - 戻り値: `Promise<AudioBuffer>` (レンダリングが完了したときに解決されるPromise)。
    - 機能: `Tone.Offline()`環境を利用して、指定されたシーケンスを高速に処理し、オーディオ出力を生成します。
- **OfflineRenderer.audioBufferToWav(buffer: AudioBuffer)**:
    - 役割: `AudioBuffer`オブジェクトのオーディオデータを標準のWAVファイル形式の`Blob`に変換します。
    - 引数: `buffer` (変換する`AudioBuffer`インスタンス)。
    - 戻り値: `Blob` (WAV形式のデータを含むBlobオブジェクト)。
    - 機能: オフラインレンダリングで得られた生のオーディオデータを、保存可能なファイル形式に変換します。
- **OfflineRenderer.downloadWav(buffer: AudioBuffer, filename: string)**:
    - 役割: `AudioBuffer`をWAVファイルとしてユーザーのブラウザにダウンロードさせます。
    - 引数: `buffer` (ダウンロードする`AudioBuffer`インスタンス), `filename` (ダウンロードされるWAVファイルの名前)。
    - 戻り値: なし。
    - 機能: `audioBufferToWav`を使用してBlobを生成し、それをダウンロードリンクとして提供します。
- **TimeParser.constructor(Tone: typeof Tone)**:
    - 役割: `TimeParser`クラスのインスタンスを初期化します。
    - 引数: `Tone` (Tone.jsライブラリ)。
    - 戻り値: なし。
    - 機能: 時間表記の解析に利用するため、Tone.jsのTransportインスタンスを内部的に利用します。
- **TimeParser.parseTimeToSeconds(time: string | number)**:
    - 役割: Tone.jsで一般的に使用される時間表記（例: "4n", "0:0:1", "1.5s"）を秒単位の数値に変換します。
    - 引数: `time` (解析する時間表記文字列または数値)。
    - 戻り値: `number` (秒単位の数値)。
    - 機能: 異なる時間表記形式を統一された秒単位に変換し、正確なスケジューリングを可能にします。
- **EventProcessor.constructor(Tone: typeof Tone, nodes: SequencerNodes)**:
    - 役割: `EventProcessor`クラスのインスタンスを初期化します。
    - 引数: `Tone` (Tone.jsライブラリ), `nodes` (SequencerNodesインスタンス)。
    - 戻り値: なし。
    - 機能: NDJSONストリーミング中のイベント処理ロジックに必要なTone.jsとノード管理のインスタンスを保持します。
- **EventProcessor.createNodesAndConnections(events: SequenceEvent[])**:
    - 役割: イベントリストの中から`createNode`と`connect`イベントを抽出し、Tone.jsのノードを作成および接続します。
    - 引数: `events` (イベントオブジェクトの配列)。
    - 戻り値: `Promise<void>`。
    - 機能: 音楽イベントの再生が始まる前に、必要な楽器やエフェクトのセットアップを事前に行います。
- **EventProcessor.processNewCreateAndConnectEvents(allEvents: SequenceEvent[], processedEventIndices: Set<number>)**:
    - 役割: NDJSONストリームの更新があった際に、まだ処理されていない新しい`createNode`と`connect`イベントを識別し、実行します。
    - 引数: `allEvents` (現在の全てのイベントの配列), `processedEventIndices` (既に処理済みのイベントのインデックスを格納するSet)。
    - 戻り値: `Promise<void>`。
    - 機能: ライブ編集シナリオにおいて、再生を中断することなく新しいノードの追加や接続を動的に行います。
- **EventProcessor.scheduleEvent(event: SequenceEvent, scheduleTime: number)**:
    - 役割: 単一の音楽イベントをTone.jsの内部タイムラインにスケジュールします。
    - 引数: `event` (スケジュールするイベントオブジェクト), `scheduleTime` (イベントをスケジュールするTone.jsの秒数)。
    - 戻り値: なし。
    - 機能: 内部で`scheduleOrExecuteEvent`を呼び出し、イベントを適切なタイミングでTone.jsに処理させます。
- **EventProcessor.calculateSequenceDuration(events: SequenceEvent[])**:
    - 役割: イベントシーケンス全体の予想される再生時間を秒単位で計算します。
    - 引数: `events` (計算対象のイベント配列)。
    - 戻り値: `number` (シーケンスの長さを示す秒数)。
    - 機能: 各イベントの開始時刻と持続時間を考慮し、シーケンスの終了時刻を特定します。
- **PlaybackState.constructor()**:
    - 役割: `PlaybackState`クラスのインスタンスを初期化します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 再生中かどうかのフラグ、開始時刻、現在のイベントリスト、処理済みイベントのインデックス、ループカウントなど、ストリーミング再生の各種状態変数を初期化します。
- **PlaybackState.isPlaying()**:
    - 役割: 現在再生がアクティブであるかどうかを示します。
    - 引数: なし。
    - 戻り値: `boolean` (再生中であれば`true`、そうでなければ`false`)。
    - 機能: 再生状態の確認に使用されます。
- **PlaybackState.start()**:
    - 役割: 再生状態を開始済みに設定し、開始時刻を記録します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: プレーヤーが再生を開始したときに呼び出されます。
- **PlaybackState.stop()**:
    - 役割: 再生状態を停止済みに設定し、すべての内部状態をリセットします。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: プレーヤーが停止したときに呼び出され、次の再生に備えて状態をクリーンアップします。
- **PlaybackState.processLoopCount()**:
    - 役割: ループ再生のロジックを処理します。ループが有効な場合、ループカウントをインクリメントし、関連する状態をリセットします。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: NDJSONストリーミングがシーケンスの終わりに達したときに、ループ設定に基づいて再生を継続するかどうかを決定します。
- **PlaybackState.incrementProcessLoopCount()**:
    - 役割: ループカウントを1増やし、処理済みイベントのインデックスをリセットします。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: シーケンスの各ループ開始時に呼び出されます。
- **PlaybackState.markEventAsProcessed(index: number)**:
    - 役割: 特定のイベントが処理済みであることを記録します。
    - 引数: `index` (処理されたイベントのインデックス)。
    - 戻り値: なし。
    - 機能: 重複するイベント処理を防ぎ、ライブ編集時のイベント追跡に利用されます。
- **PlaybackState.resetProcessedEvents()**:
    - 役割: 処理済みイベントの記録をクリアします。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 新しいシーケンスがロードされたときやループの開始時に、以前の処理済み情報をリセットします。
- **scripts/copy-to-dist.js: copyRecursive(src: string, dest: string)**:
    - 役割: ソースパスからデスティネーションパスへ、ファイルやディレクトリを再帰的にコピーします。
    - 引数: `src` (コピー元パス), `dest` (コピー先パス)。
    - 戻り値: なし。
    - 機能: `dist`ディレクトリへのビルド成果物の配置など、ファイルシステム操作に使用されます。
- **scripts/rename-to-mjs.js: renameFiles(dir: string, oldExt: string, newExt: string)**:
    - 役割: 指定されたディレクトリ内のファイルの拡張子を、古いものから新しいものへ一括で変更します。
    - 引数: `dir` (対象ディレクトリ), `oldExt` (変更前の拡張子), `newExt` (変更後の拡張子)。
    - 戻り値: なし。
    - 機能: ビルド後のJavaScriptファイルの拡張子を`.js`から`.mjs`に変更するなど、モジュール形式の対応に使用されます。
- **scripts/rename-to-mjs.js: updateImports(filePath: string, oldExt: string, newExt: string)**:
    - 役割: 指定されたファイル内のインポート文のファイルパスの拡張子を更新します。
    - 引数: `filePath` (対象ファイル), `oldExt` (変更前の拡張子), `newExt` (変更後の拡張子)。
    - 戻り値: なし。
    - 機能: 拡張子の変更に伴い、内部のモジュール参照を正しく修正します。
- **src/demo/sequenceLoader.ts: loadAllSequences()**:
    - 役割: デモアプリケーションで使用される全てのプリセットシーケンスデータをロードし、名前でアクセス可能なコレクションとして返します。
    - 引数: なし。
    - 戻り値: `Record<string, DemoSequenceData>` (シーケンス名とデータを含むオブジェクト)。
    - 機能: さまざまな楽器やエフェクトのデモシーケンスをアプリケーションに提供します。

## 関数呼び出し階層ツリー
```
playSequence (from event-scheduler.ts)
  └── scheduleOrExecuteEvent (from event-scheduler.ts)
      ├── SequencerNodes.get (from sequencer-nodes.ts)
      ├── SequencerNodes.set (from sequencer-nodes.ts)
      ├── NodeFactory.createNode (from node-factory.ts)
      │   ├── InstrumentFactory.createInstrument (from instrument-factory.ts)
      │   │   ├── InstrumentFactory.createPolySynth (from instrument-factory.ts)
      │   │   └── InstrumentFactory.createSampler (from instrument-factory.ts)
      │   └── EffectFactory.createEffect (from effect-factory.ts)
      ├── NodeFactory.connectNode (from node-factory.ts)
      └── rampParameter (from event-scheduler.ts)
  └── SequencerNodes.forEach (from sequencer-nodes.ts)
  └── Tone.start (Tone.js global function - implied)

NDJSONStreamingPlayer.start (from ndjson-streaming.ts)
  ├── parseNDJSON (from ndjson-streaming.ts)
  ├── NDJSONStreamingPlayer.initializePlayback (from ndjson-streaming.ts)
  ├── NDJSONStreamingPlayer.updateEvents (from ndjson-streaming.ts)
  │   ├── EventProcessor.processNewCreateAndConnectEvents (from streaming/event-processor.ts)
  │   │   ├── NodeFactory.createNode (from node-factory.ts)
  │   │   └── NodeFactory.connectNode (from node-factory.ts)
  │   ├── EventProcessor.scheduleEvent (from streaming/event-processor.ts)
  │   │   └── scheduleOrExecuteEvent (from event-scheduler.ts)
  │   └── EventProcessor.calculateSequenceDuration (from streaming/event-processor.ts)
  ├── PlaybackState.start (from streaming/playback-state.ts)
  └── PlaybackState.processLoopCount (from streaming/playback-state.ts)
      └── PlaybackState.incrementProcessLoopCount (from streaming/playback-state.ts)

OfflineRenderer.render (from offline-renderer.ts)
  ├── playSequence (from event-scheduler.ts)
  ├── TimeParser.parseTimeToSeconds (from utils/time-parser.ts)
  │   ├── TimeParser.parseTickTime (from utils/time-parser.ts)
  │   ├── TimeParser.isToneNotation (from utils/time-parser.ts)
  │   ├── TimeParser.parseToneNotation (from utils/time-parser.ts)
  │   └── TimeParser.parseBarBeatTime (from utils/time-parser.ts)
  ├── OfflineRenderer.calculateSequenceDuration (from offline-renderer.ts - internal helper)
  └── SequencerNodes.disposeAll (from sequencer-nodes.ts)

OfflineRenderer.audioBufferToWav (from offline-renderer.ts)
  └── writeString (internal helper function within audioBufferToWav)

OfflineRenderer.downloadWav (from offline-renderer.ts)
  └── OfflineRenderer.audioBufferToWav (from offline-renderer.ts)

scripts/copy-to-dist.js: copyRecursive
scripts/rename-to-mjs.js: renameFiles
  └── scripts/rename-to-mjs.js: updateImports

src/demo/sequenceLoader.ts: loadAllSequences (module imports, not function calls in strict sense)
  ├── (Various demo sequence data imports from src/demo/instrument and src/demo/sequences)

---
Generated at: 2026-02-10 07:18:52 JST
