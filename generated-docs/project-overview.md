Last updated: 2026-01-10

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js (Web上でリッチな音楽表現を実現するオーディオライブラリ)、Web Audio API (ブラウザの低レベルオーディオ処理API)、HTML/CSS/JavaScript (ユーザーインターフェースの構築とアプリケーションロジックの実装)
- 音楽・オーディオ: JSON (音色定義、演奏内容、タイミング情報などの音楽データを記述するためのデータ形式)
- 開発ツール: TypeScript (JavaScriptのスーパーセットで、型安全なコード記述を支援)、Node.js (開発環境でのスクリプト実行などに使用)
- テスト: (明示的なテストフレームワークの記載はありませんが、内部的な検証やドッグフーディングを通じて品質を確保しています。)
- ビルドツール: TypeScript Compiler (TypeScriptコードをJavaScriptに変換)、カスタムスクリプト (ビルド後のファイルのコピーやES Modules形式へのリネームを自動化)
- 言語機能: JavaScript (ES Modules / CommonJS形式でモジュール化された主要な実装言語)、TypeScript (型定義やモダンなJavaScript機能の活用)
- 自動化・CI/CD: GitHub Actions (リポジトリのREADMEファイルの自動翻訳などのワークフローを自動化)
- 開発標準: .editorconfig (エディタのコードスタイル設定をプロジェクト全体で統一)

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
📖 CONVERSION_SUMMARY.md
📄 LICENSE
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📄 _config.yml
📁 dist/
  📁 cjs/
    📘 index.d.ts
    📜 index.js
  📁 esm/
    📘 index.d.ts
    📄 index.mjs
  📘 index.d.ts
  📜 index.js
  📄 index.mjs
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
  📖 2.md
  📖 3.md
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
  🌐 index.html
  📜 main.js
  📜 play.js
  🎨 redirect.css
  📜 sampleData.js
  📜 scheduleOrExecuteEvent.js
  🎨 styles.css
📁 src-ts/
  📘 index.ts
📊 tsconfig.json
```

## ファイル詳細説明
- **dist/cjs/index.d.ts**: CommonJS形式でビルドされたJavaScriptコード向けの型定義ファイルです。`scheduleOrExecuteEvent`や`playSequence`といった主要な関数の型情報を提供します。
- **dist/cjs/index.js**: CommonJS形式でビルドされたプロジェクトの主要なJavaScriptコードです。JSON定義に基づくイベントのスケジュール、Tone.jsノードの生成と接続、シーケンス再生のロジックを含みます。
- **dist/esm/index.d.ts**: ES Modules形式でビルドされたJavaScriptコード向けの型定義ファイルです。CommonJS版と同様に主要関数の型情報を提供します。
- **dist/index.d.ts**: プロジェクト全体のエントリポイントとなる型定義ファイルです。CommonJSとES Modulesの両方の形式で利用されます。
- **dist/index.js**: プロジェクト全体のエントリポイントとなるCommonJS形式のJavaScriptコードです。
- **examples/cdn-example.html**: CDN（コンテンツデリバリーネットワーク）からライブラリを直接読み込んで使用する例を示すHTMLファイルです。
- **generated-docs/callgraph.html**: プロジェクト内の関数呼び出し関係を視覚化したドキュメントを生成するHTMLファイルです。
- **googled947dc864c270e07.html**: Googleサイト検証用の空のHTMLファイルです。
- **index.html**: デモアプリケーションのルートとなるHTMLファイルで、基本的なアプリケーションの構造を定義します。
- **scripts/copy-to-dist.js**: ビルド時に生成されたファイルを`dist`ディレクトリにコピーするためのNode.jsスクリプトです。
- **scripts/rename-to-mjs.js**: `dist`ディレクトリ内のJavaScriptファイルをES Modulesとして適切に認識されるよう、`.mjs`拡張子にリネームするためのNode.jsスクリプトです。
- **src/index.html**: デモアプリケーションのユーザーインターフェース（UI）のHTML構造を定義するファイルです。
- **src/main.js**: デモアプリケーションのUIに関連するロジック（シーケンスデータの初期化、選択肢の動的な表示、テキストエリアの更新など）を処理するJavaScriptファイルです。
- **src/play.js**: デモアプリケーションにおけるオーディオ再生の開始・停止を制御するJavaScriptファイルです。AudioContextの初期化やシーケンスの再生ロジックを含みます。
- **src/redirect.css**: 特定の目的（例えばリダイレクト時のスタイル適用）で使用されるCSSファイルです。
- **src/sampleData.js**: デモアプリケーションで再生される様々な音楽シーケンスのサンプルデータ（JSON形式）を格納しているJavaScriptファイルです。
- **src/scheduleOrExecuteEvent.js**: プロジェクトの核となるJavaScriptファイルです。JSON形式で記述された個々の音楽イベントを解析し、Tone.jsの適切なメソッドを呼び出して実行またはスケジュールします。
- **src/styles.css**: デモアプリケーションの全体的な外観を定義するCSSファイルです。
- **src-ts/index.ts**: プロジェクトの主要なTypeScriptソースコードのエントリポイントです。コアロジックをTypeScriptで記述しています。
- **tsconfig.json**: TypeScriptコンパイラのための設定ファイルで、コンパイルオプションや対象ファイルなどを指定します。
- **.editorconfig**: 異なるエディタやIDE間でコードのスタイル（インデント、改行コードなど）を統一するための設定ファイルです。
- **.gitignore**: Gitバージョン管理システムが無視すべきファイルやディレクトリを指定するファイルです。
- **CONVERSION_SUMMARY.md**: 変換やビルドプロセスのサマリーを記述したMarkdownファイルです。
- **LICENSE**: プロジェクトのライセンス情報が記載されたファイルです。
- **NPM_README.md**: npm (Node Package Manager) レジストリに公開する際のREADMEファイルです。
- **README.ja.md**: プロジェクトの日本語版READMEファイルで、概要、使い方、設計思想などが説明されています。
- **README.md**: プロジェクトの英語版READMEファイルで、通常`README.ja.md`の自動翻訳版です。
- **_config.yml**: GitHub Pagesのサイト設定を記述するYAMLファイルです。
- **issue-notes/*.md**: 開発中の課題や検討事項を記録するためのメモファイル群です。
- **package-lock.json**: `package.json`に記述された依存関係の正確なバージョンとツリー構造を記録するファイルで、ビルドの再現性を保証します。
- **package.json**: プロジェクトのメタデータ（名前、バージョン、説明など）と、依存関係やスクリプトを定義するファイルです。

## 関数詳細説明
- **scheduleOrExecuteEvent(element: object)**:
    - 役割: JSONで定義された単一の音楽イベント（例: ノートのトリガー、パラメータ変更、ノード生成など）を受け取り、それをTone.jsを通じて実行またはスケジュールする、プロジェクトの主要なイベントハンドラです。
    - 引数: `element` (object) - 処理すべきイベントの詳細（タイプ、時間、パラメータなど）を含むJSONオブジェクト。
    - 戻り値: なし。
    - 機能: イベントの種類を`switch`文で判断し、適切なTone.jsのメソッド呼び出し（例: `createNode`, `connectNode`, `triggerAttackRelease`, `rampTo`など）にディスパッチします。
- **createNode(element: object)**:
    - 役割: JSON定義に基づいて新しいTone.jsオーディオノード（シンセサイザーやエフェクトなど）のインスタンスを生成します。
    - 引数: `element` (object) - 生成するノードのタイプ（例: `Tone.Synth`, `Tone.Reverb`）と初期設定パラメータを含むJSONオブジェクト。
    - 戻り値: 生成されたTone.jsオーディオノードインスタンス。
    - 機能: Tone.jsの対応するコンストラクタを動的に呼び出し、指定された引数でノードを初期化します。
- **connectNode(element: object)**:
    - 役割: JSON定義に従って、Tone.jsオーディオノード間の接続、またはノードをマスター出力に接続します。
    - 引数: `element` (object) - 接続元ノード、接続先ノード（またはマスター出力）の情報を含むJSONオブジェクト。
    *   戻り値: なし。
    *   機能: オーディオ信号のルーティングパスを確立し、エフェクトチェーンなどを構築します。
- **playSequence(sequenceData: Array<object>)**:
    - 役割: 複数の音楽イベントからなるJSON配列（シーケンス）を受け取り、その中の各イベントを`scheduleOrExecuteEvent`関数に渡して再生を開始します。
    - 引数: `sequenceData` (Array<object>) - 再生する音楽イベントのシーケンスデータ。
    - 戻り値: なし。
    - 機能: シーケンス内のイベントを順次処理し、それぞれのイベントを適切なタイミングで実行するように手配します。
- **initializeSequenceDataCollection() (src/main.js)**:
    - 役割: デモアプリケーション内で使用されるサンプルシーケンスデータを準備し、管理可能な状態にします。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: `sampleData.js`からデータを読み込み、UIでの選択や表示のために整形します。
- **populateSequenceSelector() (src/main.js)**:
    - 役割: デモアプリケーションのシーケンス選択用UI要素（ドロップダウンなど）に、利用可能なサンプルシーケンスの選択肢を動的に追加します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: `initializeSequenceDataCollection`で用意されたデータをもとにUIを更新します。
- **updateTextareaWithSelectedSequence() (src/main.js)**:
    - 役割: デモアプリケーションでユーザーが選択したシーケンスデータを、UI上のテキストエリアに表示します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: 選択されたJSONデータを整形して表示し、ユーザーが内容を確認できるようにします。
- **playWithAudioContext() (src/play.js)**:
    - 役割: Web Audio APIの`AudioContext`を初期化し、ブラウザでオーディオ再生を開始するための準備を整えます。Tone.jsの初期化もここで行われます。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: ユーザーの操作に応じてオーディオエンジンを活性化し、音が出せる状態にします。
- **play() (src/play.js)**:
    - 役割: 現在デモアプリケーションのテキストエリアに表示されているJSONシーケンスデータを解析し、`playSequence`を呼び出して実際の再生を開始します。
    - 引数: なし。
    - 戻り値: なし。
    - 機能: ユーザーが「Play」ボタンを押した際に実行され、エラーハンドリングを含みながら音楽再生フローを管理します。
- **renameFiles(directoryPath: string) (scripts/rename-to-mjs.js)**:
    - 役割: 指定されたディレクトリ内のJavaScriptファイルを、ES Modulesとして正しく認識されるように`.mjs`拡張子にリネームします。
    - 引数: `directoryPath` (string) - 対象ディレクトリのパス。
    - 戻り値: なし。
    - 機能: ファイルシステム操作により、ファイル名の拡張子を変更します。
- **catch()**:
    - 役割: エラーが発生した際にそのエラーを捕捉し、適切なエラー処理を行うための汎用的なメカニズム（Promiseのチェインやtry-catchブロックで使用）。
    - 引数: エラーオブジェクト。
    - 戻り値: なし。
    - 機能: エラーメッセージのログ出力や、ユーザーへのフィードバック提供など。
- **switch(), if()**:
    - 役割: プログラムの実行パスを条件に基づいて分岐させる制御構造。
    - 引数: なし（これらは言語のキーワード）。
    - 戻り値: なし。
    - 機能: `scheduleOrExecuteEvent`などの関数内で、イベントの種類や条件に応じた処理の選択に使用されます。
- **forEach()**:
    - 役割: 配列やリストの各要素に対して、指定された関数を一度ずつ実行するためのイテレーションメソッド。
    - 引数: コールバック関数。
    - 戻り値: なし。
    - 機能: シーケンス内の各イベントを順番に処理する際などに利用されます。
- **get(), set(), disposeAll(), constructor()**:
    - 役割: これらはTone.jsオブジェクトのプロパティアクセス、設定、リソース解放、およびインスタンス初期化に関連する一般的なメソッドです。プロジェクトのコード内では、`scheduleOrExecuteEvent`を通じて動的に呼び出されるTone.jsインスタンスのメソッドとして機能します。
    - 引数/戻り値: 文脈により異なりますが、`get`はプロパティ値の取得、`set`は値の設定、`disposeAll`は関連リソースの破棄、`constructor`はオブジェクトの初期化を行います。

## 関数呼び出し階層ツリー
```
- catch (scripts/copy-to-dist.js)
  - forEach ()
    - scheduleOrExecuteEvent (dist/cjs/index.d.ts)
      - playSequence ()
      - get ()
      - set ()
      - disposeAll ()
      - createNode ()
      - connectNode ()
      - constructor (undefined)
    - playWithAudioContext ()
      - play ()
  - renameFiles (scripts/rename-to-mjs.js)
- if (src/play.js)
- switch (src/scheduleOrExecuteEvent.js)

---
Generated at: 2026-01-10 07:09:29 JST
