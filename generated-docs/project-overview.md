Last updated: 2026-01-14

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: HTML5 (デモ), CSS3 (デモ), JavaScript (TypeScriptで開発され、JavaScriptとして配布), Web Audio API (Tone.jsの基盤として利用)
- 音楽・オーディオ: Tone.js (Web Audio API上に構築された高レベルオーディオフレームワーク。シンセ、エフェクト、スケジューリングなどを提供)
- 開発ツール: TypeScript (静的型付けJavaScriptのスーパーセット), Node.js (開発スクリプトの実行環境), npm (パッケージ管理)
- テスト: (プロジェクト情報には記載なし)
- ビルドツール: TypeScript Compiler (tsc, TypeScriptコードをJavaScriptに変換), その他のJavaScriptスクリプト (ビルド後のファイルコピーやリネームに使用)
- 言語機能: TypeScript (型安全性と最新のJavaScript機能を提供), JavaScript (ブラウザ実行環境およびNode.js環境で利用)
- 自動化・CI/CD: GitHub Actions (READMEの自動翻訳などに利用)
- 開発標準: EditorConfig (様々なエディタでコードのスタイルを統一するための設定ファイル)

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
  📖 4.md
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
- `src/event-scheduler.ts` (および `dist/cjs/event-scheduler.js`, `dist/esm/event-scheduler.mjs`):
    プロジェクトの核となるロジックを実装。JSONで記述された音楽イベントをTone.jsのタイムラインにスケジュールしたり、即座に実行したりする役割を担います。
- `src/node-factory.ts` (および `dist/cjs/node-factory.js`, `dist/esm/node-factory.mjs`):
    JSON定義に基づいてTone.jsのオーディオノード（楽器やエフェクトなど）を動的に生成し、それらを接続してオーディオチェーンを構築する機能を提供します。
- `src/sequencer-nodes.ts` (および `dist/cjs/sequencer-nodes.js`, `dist/esm/sequencer-nodes.mjs`):
    プロジェクト内で生成されたTone.jsのオーディオノードを管理するためのユーティリティを提供します。これにより、ノードの参照、設定、および解放が容易になります。
- `src/types.ts` (および `dist/cjs/types.js`, `dist/esm/types.mjs`):
    プロジェクト全体で使用されるTypeScriptの型定義が含まれています。JSONデータ構造や関数の引数・戻り値の型を定義し、コードの整合性と保守性を向上させます。
- `src/index.ts` (および `dist/cjs/index.js`, `dist/esm/index.mjs`):
    このライブラリのエントリポイントです。主要なモジュール（`event-scheduler`, `node-factory`, `sequencer-nodes`など）をエクスポートし、外部から利用できるようにします。
- `src/demo/main.ts` (および `dist/demo/main.js`):
    デモンストレーションアプリケーションのメインロジックを実装しています。UI要素の初期化、オーディオマネージャーとUIマネージャーの連携、シーケンス再生の制御などを行います。
- `src/demo/modules/audioManager.ts` (および `dist/demo/modules/audioManager.js`):
    デモアプリケーションにおけるオーディオ関連の管理を担当します。Tone.jsインスタンスの初期化、AudioContextの開始、およびシーケンスデータの再生を制御します。
- `src/demo/modules/uiManager.ts` (および `dist/demo/modules/uiManager.js`):
    デモアプリケーションのユーザーインターフェース要素（シーケンスセレクター、テキストエリア、再生ボタンなど）の管理とイベントリスナーの設定を行います。
- `src/demo/sequenceLoader.ts` (および `dist/demo/sequenceLoader.js`):
    デモアプリケーションで利用される、様々な音楽シーケンスデータ（JSON形式で定義された楽器やエフェクトの設定、演奏イベントなど）をロードする役割を担います。
- `src/demo/instrument/*`, `src/demo/effect/*`, `src/demo/sequences/*`:
    デモ用に用意されたJSON形式のデータファイル群です。Tone.jsの様々な楽器（シンセ）やエフェクトの設定、および具体的な音楽シーケンスの定義が含まれています。これらのファイルは、ライブラリの機能を示す具体的な使用例となります。
- `demo/index.html`, `demo/styles.css`:
    プロジェクトのウェブデモページを構成するHTML構造とCSSスタイルシートです。
- `docs/tonejs-components-roadmap.ja.md`:
    Tone.jsの様々なコンポーネント（楽器、エフェクトなど）がJSONでどこまで対応しているか、今後の実装計画や優先順位が日本語で詳細に記述されたドキュメントです。
- `scripts/copy-to-dist.js`, `scripts/rename-to-mjs.js`:
    ビルドプロセスを支援するユーティリティスクリプトです。ビルド成果物のコピーや、ES Modules向けにファイル拡張子を`.mjs`にリネームし、インポートパスを調整するなどの処理を行います。
- `package.json`, `package-lock.json`:
    プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発依存関係、およびスクリプトを定義するファイルです。`package-lock.json`は依存関係の厳密なバージョンを記録します。
- `tsconfig.json`:
    TypeScriptコンパイラの設定ファイルです。TypeScriptコードのコンパイル方法（ターゲットECMAScriptバージョン、モジュール形式、出力ディレクトリなど）を定義します。

## 関数詳細説明
- `scheduleOrExecuteEvent(event, time)` (dist/cjs/event-scheduler.js):
    - **役割**: JSONで定義された単一の音楽イベント（例: 音符のトリガー、パラメータ変更）をTone.jsのタイムラインにスケジュールするか、即座に実行します。
    - **引数**:
        - `event`: 実行するイベントの定義を含むJSONオブジェクト。
        - `time`: イベントを実行するTone.jsの時間（オプション）。指定がない場合は即座に実行されます。
    - **戻り値**: なし
    - **機能**: イベントの種類を判別し、適切なTone.jsのメソッドを呼び出して音を生成したり、音色パラメータを変更したりします。
- `playSequence(sequence)` (dist/cjs/event-scheduler.js):
    - **役割**: 複数の音楽イベントで構成されるシーケンス（JSON配列）を再生します。
    - **引数**:
        - `sequence`: 複数のイベントオブジェクトを含むJSON配列。
    - **戻り値**: なし
    - **機能**: シーケンス内の各イベントに対して`scheduleOrExecuteEvent`を呼び出し、全体的な音楽の再生を制御します。
- `createNode(definition)` (dist/cjs/node-factory.js):
    - **役割**: JSON定義に基づいて、Tone.jsの楽器（Synthなど）やエフェクトのインスタンスを生成します。
    - **引数**:
        - `definition`: 生成するTone.jsノードの種類と初期設定を含むJSONオブジェクト。
    - **戻り値**: 生成されたTone.jsのオーディオノードインスタンス。
    - **機能**: 指定されたコンポーネント名（例: "Synth", "Reverb"）とパラメータを使って、対応するTone.jsオブジェクトを初期化します。
- `connectNode(sourceNode, destinationNode)` (dist/cjs/node-factory.js):
    - **役割**: Tone.jsのオーディオノード同士を接続し、オーディオルーティングを確立します。
    - **引数**:
        - `sourceNode`: 音源となるTone.jsノード。
        - `destinationNode`: 音の送り先となるTone.jsノード。
    - **戻り値**: なし
    - **機能**: `sourceNode`の出力を`destinationNode`の入力に接続し、オーディオ信号の流れを定義します。
- `constructor()` (dist/demo/main.js, dist/demo/modules/audioManager.js, dist/demo/modules/uiManager.js):
    - **役割**: それぞれのクラス（`Main`, `AudioManager`, `UIManager`）のインスタンスを初期化します。
    - **引数**: なし
    - **戻り値**: なし
    - **機能**: クラスのプロパティを初期設定し、必要な準備を行います。
- `initialize()` (dist/demo/main.js):
    - **役割**: デモンストレーションアプリケーションの初期設定を行います。
    - **引数**: なし
    - **戻り値**: Promise (初期化完了を待機するため)
    - **機能**: UIマネージャーとオーディオマネージャーのセットアップ、シーケンスデータのロード、イベントリスナーの設定など、アプリ起動時に必要な処理を実行します。
- `play(event)` (dist/demo/main.js):
    - **役割**: UIの「Play」ボタンがクリックされたときに、オーディオシーケンスの再生を開始します。
    - **引数**:
        - `event`: クリックイベントオブジェクト。
    - **戻り値**: なし
    - **機能**: AudioContextが開始されていることを確認し、選択されたシーケンスを`audioManager`経由で再生します。
- `ensureAudioContextStarted()` (dist/demo/modules/audioManager.js):
    - **役割**: Web Audio APIのAudioContextが確実に開始されている状態にします。
    - **引数**: なし
    - **戻り値**: Promise (AudioContextの開始を待機するため)
    - **機能**: ブラウザの自動再生ポリシーに対応するため、ユーザーインタラクションがあった場合にのみAudioContextを開始または再開します。
- `loadAllSequences()` (dist/demo/sequenceLoader.js):
    - **役割**: デモで使用するすべての音楽シーケンスデータをロードし、利用可能な状態にします。
    - **引数**: なし
    - **戻り値**: ロードされたシーケンスデータのコレクション。
    - **機能**: 楽器定義、エフェクト定義、具体的な演奏シーケンスなど、様々なJSONデータを読み込みます。
- `setupEventListeners()` (dist/demo/modules/uiManager.js):
    - **役割**: デモアプリケーションのUI要素に対するイベントリスナーを設定します。
    - **引数**: なし
    - **戻り値**: なし
    - **機能**: シーケンスセレクターの変更、再生/停止ボタンのクリックなどのユーザー操作を検知し、対応する処理をトリガーします。
- `disposeAll()` (dist/cjs/sequencer-nodes.js):
    - **役割**: 管理しているすべてのTone.jsノードを解放し、リソースをクリーンアップします。
    - **引数**: なし
    - **戻り値**: なし
    - **機能**: 不要になったオーディオノードを適切に破棄し、メモリリークを防ぎます。
- `renameFiles(directory)` (scripts/rename-to-mjs.js):
    - **役割**: 指定されたディレクトリ内のJavaScriptファイルを`.mjs`拡張子にリネームします。
    - **引数**:
        - `directory`: リネーム対象のディレクトリパス。
    - **戻り値**: なし
    - **機能**: ES Modulesとして配布するためのファイル形式変換を行います。
- `updateImports(filePath)` (scripts/rename-to-mjs.js):
    - **役割**: `.mjs`ファイル内のインポートパスを更新し、`.js`拡張子を`.mjs`に修正します。
    - **引数**:
        - `filePath`: 更新対象のファイルパス。
    - **戻り値**: なし
    - **機能**: ファイル名の変更に伴い、モジュール間の参照が正しく行われるようにインポート文を調整します。

## 関数呼び出し階層ツリー
```
- initialize (dist/demo/main.js)
  - initializeSequenceDataCollection (dist/demo/main.js)
  - updateTextareaWithSelectedSequence (dist/demo/main.js)
  - setupEventListeners (dist/demo/modules/uiManager.js)
    - populateSequenceSelector (dist/demo/modules/uiManager.js)
      - loadAllSequences (dist/demo/sequenceLoader.js)
        - (各種シーケンスデータファイルをロード)
- play (dist/demo/main.js)
  - ensureAudioContextStarted (dist/demo/modules/audioManager.js)
  - playSequence (dist/demo/modules/audioManager.js)
    - playSequence (dist/cjs/event-scheduler.js)
      - scheduleOrExecuteEvent (dist/cjs/event-scheduler.js)
        - createNode (dist/cjs/node-factory.js)
        - connectNode (dist/cjs/node-factory.js)
        - (Tone.js API呼び出し: 例: triggerAttackRelease, rampTo)
      - forEach (イベント配列の反復処理)
      - get (ノード参照の取得)
      - set (ノードプロパティの設定)
      - disposeAll (dist/cjs/sequencer-nodes.js)
- renameFiles (scripts/rename-to-mjs.js)
  - updateImports (scripts/rename-to-mjs.js)

---
Generated at: 2026-01-14 07:09:31 JST
