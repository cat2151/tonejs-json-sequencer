Last updated: 2026-05-19

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: **HTML, CSS, JavaScript, TypeScript**: Webブラウザ上で動作するユーザーインターフェースやデモの構築に使用されます。Tone.jsもWeb上で動作するJavaScriptライブラリです。
- 音楽・オーディオ: **Tone.js**: Web Audio APIを抽象化し、Web上で高度な音楽表現を可能にする強力なJavaScriptフレームワークです。本プロジェクトのオーディオ処理の基盤となります。
- 開発ツール: **TypeScript**: 型安全なJavaScript開発を可能にし、大規模なプロジェクトでの保守性を高めます。**Node.js**: 開発環境の実行基盤およびビルドスクリプトの実行に利用されます。**npm**: JavaScriptパッケージの管理とインストールに使用されます。
- テスト: 現状、プロジェクト情報からは具体的なテスト関連技術は確認できません。
- ビルドツール: **TypeScript Compiler (tsc)**: TypeScriptコードを標準JavaScriptに変換します。**スクリプト**: `scripts/`ディレクトリに存在するファイルコピーやファイル名変更などのビルド補助スクリプトが使用されます。
- 言語機能: **TypeScript, JavaScript**: プロジェクトの主要なプログラミング言語です。
- 自動化・CI/CD: **GitHub Actions**: READMEの自動英訳などに利用されており、継続的な統合・デリバリーのワークフローに活用されています。
- 開発標準: **EditorConfig**: 複数のエディタやIDEでコードのスタイル（インデント、改行コードなど）を統一するために使用されます。

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
      📘 ndjson-parser.d.ts
      📘 playback-state.d.ts
      📜 playback-state.js
      📘 prediction-manager.d.ts
      📘 streaming-types.d.ts
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
      📜 generic-ramp-to.js
      📜 jcreverb.js
      📜 lpf-envelope.js
      📜 lpf-q-lfo.js
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
      📁 effect-sequences/
        📜 delay-distortion-sequences.js
        📜 modulation-sequences.js
        📜 reverb-sequences.js
      📜 effectSequences.js
      📜 synthSequences.js
    📁 streaming-modules/
      📜 debug-output.js
      📜 playback-viewer.js
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
      📘 ndjson-parser.d.ts
      📄 ndjson-parser.mjs
      📘 playback-state.d.ts
      📄 playback-state.mjs
      📘 prediction-manager.d.ts
      📄 prediction-manager.mjs
      📘 streaming-types.d.ts
      📄 streaming-types.mjs
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
    📘 ndjson-parser.d.ts
    📜 ndjson-parser.js
    📘 playback-state.d.ts
    📜 playback-state.js
    📘 prediction-manager.d.ts
    📜 prediction-manager.js
    📘 streaming-types.d.ts
    📜 streaming-types.js
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
  📖 108.md
  📖 109.md
  📖 110.md
  📖 111.md
  📖 112.md
  📖 120.md
  📖 124.md
  📖 137.md
  📖 139.md
  📖 162.md
  📖 170.md
  📖 180.md
  📖 188.md
  📖 89.md
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
      📘 generic-ramp-to.ts
      📘 jcreverb.ts
      📘 lpf-envelope.ts
      📘 lpf-q-lfo.ts
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
      📁 effect-sequences/
        📘 delay-distortion-sequences.ts
        📘 modulation-sequences.ts
        📘 reverb-sequences.ts
      📘 effectSequences.ts
      📘 synthSequences.ts
    📁 streaming-modules/
      📘 debug-output.ts
      📘 playback-viewer.ts
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
    📘 ndjson-parser.ts
    📘 playback-state.ts
    📘 prediction-manager.ts
    📘 streaming-types.ts
  📘 types.ts
  📁 utils/
    📘 time-parser.ts
📊 tsconfig.all.json
📊 tsconfig.demo-new.json
📊 tsconfig.json
```

## ファイル詳細説明
- **README.md / README.ja.md**: プロジェクトの目的、機能、インストール方法、使用例などを日本語と英語で説明する主要なドキュメントです。
- **src/ディレクトリ**: プロジェクトのコアとなるTypeScriptソースコードが格納されています。
    - **src/event-scheduler.ts**: JSON形式のイベントを解析し、Tone.jsのオーディオ操作（音符の発音、パラメータ変更など）を適切なタイミングでスケジュールまたは即時実行する中心的なロジックを担います。
    - **src/ndjson-streaming.ts**: NDJSON（改行区切りJSON）形式のイベントストリームをリアルタイムで処理し、ライブ編集やループ再生といった動的な音楽再生機能を提供します。
    - **src/sequencer-nodes.ts**: Tone.jsで作成された各種オーディオノード（シンセサイザー、エフェクトなど）のインスタンスを一元的に管理し、IDによるアクセスや破棄を可能にします。
    - **src/node-factory.ts**: JSONで定義された情報に基づいて、Tone.jsのオーディオノード（楽器やエフェクト）を動的に生成するための主要なファクトリです。
    - **src/factories/instrument-factory.ts**: Tone.jsの様々な楽器（例: Synth, PolySynth, Sampler）ノードの生成ロジックを専門に扱います。
    - **src/factories/effect-factory.ts**: Tone.jsの各種エフェクト（例: Reverb, Chorus, Distortion）ノードの生成ロジックを専門に扱います。
    - **src/utils/time-parser.ts**: "4n"（4分音符）や"0:0:2"（0小節0拍2連符）のような音楽的な時間表記を、Tone.jsが理解できる正確な秒数形式に変換するユーティリティ機能を提供します。
    - **src/offline-renderer.ts**: JSONシーケンスをWebブラウザ上で再生するだけでなく、その結果をWAV形式のオーディオファイルとしてオフラインでレンダリングし、ダウンロードする機能を提供します。
    - **src/types.ts**: プロジェクト全体で使用されるカスタム型定義（TypeScriptのインターフェースや型エイリアス）が記述されており、コードの型安全性を保証します。
- **dist/ディレクトリ**: TypeScriptソースコードをJavaScriptにコンパイルし、配布可能な形式にビルドしたファイル群が格納されています。ES Modules (`.mjs`) と CommonJS (`.js`) 形式の両方を提供します。
- **demo/ディレクトリ**: プロジェクトの様々な機能を示すブラウザベースのデモンストレーションページと、それらを駆動するJavaScriptコードが含まれています。ユーザーが実際にプロジェクトの動作を確認できる場所です。
    - **demo/index.html**: メインデモページのHTML構造を定義し、基本的な再生機能を提供します。
    - **demo/streaming.html**: NDJSONストリーミング機能のインタラクティブなデモを提供し、ライブ編集やループ再生を体験できます。
    - **demo/offline-rendering.html**: オフラインレンダリング機能のデモページです。
- **examples/ディレクトリ**: プロジェクトライブラリの具体的な使用方法を示す簡潔なコード例が含まれています。他のプロジェクトからライブラリとして利用する際の参考になります。
- **docs/ディレクトリ**: Tone.jsコンポーネントのJSON対応ロードマップなど、より詳細な技術ドキュメントが格納されています。
- **scripts/ディレクトリ**: ビルドプロセスを補助するスクリプト（例: ビルド成果物のコピー、ファイル名のリネーム）が格納されています。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）および依存関係（使用している外部ライブラリ）を定義するファイルです。

## 関数詳細説明
- **scheduleOrExecuteEvent(Tone, nodes, event)**
    - **役割**: JSON形式の単一イベントをTone.jsのオーディオグラフに適用します。イベントは指定された時刻にスケジュールされるか、即座に実行されます。
    - **引数**: `Tone` (Tone.jsライブラリ), `nodes` (`SequencerNodes`インスタンス), `event` (JSONイベントオブジェクト)。
    - **機能**: `eventType`（例: `createNode`, `triggerAttackRelease`, `rampTo`など）に応じて、対応するTone.jsの操作を呼び出し、音の生成やパラメータ変更を行います。
- **playSequence(Tone, nodes, sequence)**
    - **役割**: JSON形式のイベント配列全体を受け取り、Tone.jsのTransport時刻に沿ってシーケンスとして再生します。
    - **引数**: `Tone` (Tone.jsライブラリ), `nodes` (`SequencerNodes`インスタンス), `sequence` (JSONイベントの配列)。
    - **機能**: シーケンス内の各イベントを順番に処理し、`scheduleOrExecuteEvent`を呼び出すことで、音楽的なフレーズやエフェクトチェインを構築・再生します。
- **createNode(Tone, type, args)**
    - **役割**: 指定されたTone.jsのタイプ（例: 'Synth'、'Reverb'）とコンストラクタ引数を使用して、新しいオーディオノードのインスタンスを作成します。
    - **引数**: `Tone` (Tone.jsライブラリ), `type` (ノードタイプ文字列), `args` (コンストラクタ引数オブジェクト)。
    - **機能**: 内部的に`createInstrument`または`createEffect`を呼び出し、適切なTone.jsノードを生成して返します。
- **connectNode(nodes, sourceId, destination)**
    - **役割**: 2つのTone.jsノード間、またはノードと最終出力（`toDestination`）との接続を確立します。
    - **引数**: `nodes` (`SequencerNodes`インスタンス), `sourceId` (接続元ノードのID), `destination` (接続先ノードのIDまたは'toDestination'文字列)。
    - **機能**: `SequencerNodes`から接続元ノードを取得し、指定された接続先に接続します。
- **createInstrument(Tone, instrumentType, args)**
    - **役割**: 指定された楽器タイプと引数に基づいて、Tone.jsの楽器（例: `Synth`, `PolySynth`, `Sampler`など）インスタンスを作成します。
    - **引数**: `Tone` (Tone.jsライブラリ), `instrumentType` (楽器タイプ文字列), `args` (コンストラクタ引数)。
    - **機能**: 各楽器タイプに対応するTone.js楽器オブジェクトを生成し、必要に応じて`PolySynth`や`Sampler`といった特殊な設定を処理します。
- **createEffect(Tone, effectType, args)**
    - **役割**: 指定されたエフェクトタイプと引数に基づいて、Tone.jsのエフェクト（例: `Reverb`, `Chorus`, `Distortion`など）インスタンスを作成します。
    - **引数**: `Tone` (Tone.jsライブラリ), `effectType` (エフェクトタイプ文字列), `args` (コンストラクタ引数)。
    - **機能**: 各エフェクトタイプに対応するTone.jsエフェクトオブジェクトを生成します。
- **audioBufferToWav(audioBuffer)**
    - **役割**: Web Audio APIの`AudioBuffer`オブジェクトを標準的なWAV形式のバイナリデータ（`Blob`）に変換します。
    - **引数**: `audioBuffer` (変換元の`AudioBuffer`オブジェクト)。
    - **機能**: 音声データをサンプリングレート、チャンネル数、ビット深度などのメタデータと共にWAVフォーマットにエンコードします。
- **downloadWav(wavBlob, filename)**
    - **役割**: `Blob`形式のWAVファイルをユーザーのブラウザにダウンロードさせます。
    - **引数**: `wavBlob` (ダウンロードするWAV形式の`Blob`オブジェクト), `filename` (ダウンロード時のファイル名)。
    - **機能**: ブラウザのダウンロード機能を利用して、生成されたWAVファイルをユーザーのローカルに保存します。
- **parseNDJSON(ndjsonStringOrArray)**
    - **役割**: NDJSON（改行区切りJSON）形式の文字列、またはJSONイベントの配列を、アプリケーションで処理可能なJSONイベントの配列にパースします。
    - **引数**: `ndjsonStringOrArray` (NDJSON文字列またはイベント配列)。
    - **機能**: 各行をJSONとして解析し、有効なイベントオブジェクトの配列を生成します。無効な行はスキップします。
- **updateBPM(bpm)**
    - **役割**: Tone.jsのグローバルなテンポ（BPM: Beats Per Minute）を設定します。
    - **引数**: `bpm` (設定する新しいテンポ値)。
    - **機能**: Tone.jsの`Transport.bpm.value`プロパティを更新し、すべての時間ベースのイベントの再生速度に影響を与えます。
- **resolveTarget(toneObject, path)**
    - **役割**: ドット区切りのパス文字列（例: "filter.frequency.value"）を使用して、Tone.jsオブジェクト内の深くネストされたプロパティやパラメータを解決し、その参照を取得します。
    - **引数**: `toneObject` (探索対象のTone.jsオブジェクト), `path` (ドット区切りのプロパティパス文字列)。
    - **機能**: 指定されたパスに沿ってオブジェクトを辿り、最終的なプロパティまたはパラメータへの参照を返します。これにより、動的なパラメータアクセスが可能になります。
- **rampParameter(param, value, time, delay)**
    - **役割**: Tone.jsのオーディオパラメータ（例: ボリューム、フィルター周波数）を指定された時間と遅延で滑らかに目標値まで変化させます。
    - **引数**: `param` (対象のTone.jsパラメータオブジェクト), `value` (目標パラメータ値), `time` (変化にかける時間), `delay` (変化開始までの遅延時間)。
    - **機能**: `Tone.js`の`rampTo`メソッドを利用して、パラメータにエンベロープのような滑らかな変化を適用し、表現豊かな音の変化を実現します。
- **SequencerNodesクラス**
    - **役割**: Tone.jsのオーディオノードを効率的に管理するためのクラスです。
    - **主要メソッド**:
        - `get(nodeId)`: 指定されたIDのノードを取得します。
        - `set(nodeId, node)`: 指定されたIDでノードを登録します。
        - `disposeSingle(nodeId)`: 特定のノードを破棄し、関連するオーディオリソースを解放します。
        - `disposeAll()`: 管理している全てのノードを破棄します。
- **NDJSONStreamingPlayerクラス**
    - **役割**: NDJSON形式のイベントストリームを処理し、リアルタイムでのライブ編集、ループ再生、50msの先読みスケジューリングをサポートするプレイヤーです。
    - **主要メソッド**:
        - `start(ndjson)`: NDJSONイベントストリームの再生を開始または更新します。
        - `stop()`: 現在の再生を停止します。
- **OfflineRendererクラス**
    - **役割**: JSONシーケンスに基づいてオーディオをオフラインでレンダリングし、WAVファイルとして出力するための機能を提供します。
    - **主要メソッド**:
        - `render(sequence)`: 指定されたJSONシーケンスをオーディオとしてレンダリングし、`AudioBuffer`を返します。
- **TimeParserクラス**
    - **役割**: 音楽的な時間表記（例: "4n", "0:0:2"）を正確な秒数に変換するためのユーティリティクラスです。
    - **主要メソッド**:
        - `parseTimeToSeconds(time)`: 様々な時間表記を秒数に変換します。

## 関数呼び出し階層ツリー
```
- if (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - resolveTarget (dist/cjs/event-scheduler.js)
      - rampParameter ()
      - forEach ()
      - defineProperty ()
      - start ()
      - stop ()
      - get ()
      - disposeAll ()
      - ensureAudioContextStarted ()
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode ()
  - createInstrument (dist/cjs/factories/instrument-factory.d.ts)
    - createPolySynth ()
      - createSampler ()
  - set ()
  - parseNDJSON (dist/cjs/streaming/ndjson-parser.d.ts)
  - copyRecursive (scripts/copy-to-dist.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports ()
  - createEffect (dist/cjs/factories/effect-factory.d.ts)
    - startIfAvailable ()
  - disposeSingle ()
  - disposeNode ()
  - debug ()
  - isSchedulableEvent ()
  - getTimeNotation ()
  - getEventTime ()
  - clear ()
  - generate ()
- for (dist/cjs/event-scheduler.js)
- switch (dist/cjs/event-scheduler.js)
- catch (dist/cjs/event-scheduler.js)
- audioBufferToWav (dist/cjs/offline-renderer.d.ts)
  - constructor (undefined)
- i (dist/demo/instrument/loopend-test.js)
- loadAllSequences (dist/demo/sequenceLoader.js)
- createInitialTimingStats (dist/demo/streaming-modules/debug-output.js)

---
Generated at: 2026-05-19 07:28:51 JST
