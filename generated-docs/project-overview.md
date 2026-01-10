Last updated: 2026-01-11

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリです。
- コードを書かずに音をデータで制御できるため、UIやストリーミングと自然に連携可能です。
- 時間順のイベントをデータとして扱い、緻密な演奏表現を実現します。

## 技術スタック
- フロントエンド:
    -   **HTML**: Webブラウザ上でデモUIや説明ページを構成するために使用されます。`index.html`, `src/index.html`, `examples/cdn-example.html` など。
    -   **CSS**: デモUIの見た目を整えるために使用されます。`src/styles.css`, `src/redirect.css` など。
- 音楽・オーディオ:
    -   **Tone.js**: Web Audio APIを抽象化し、シンセサイザー、エフェクト、スケジューリングなどの音楽処理を容易にするJavaScriptフレームワークです。プロジェクトの核となる技術です。
    -   **Web Audio API**: ブラウザ上で高度なオーディオ処理を行うためのAPI。Tone.jsの内部で利用されています。
- 開発ツール:
    -   **TypeScript**: JavaScriptに静的型付けを追加し、大規模なプロジェクトでの保守性とコード品質を向上させます。ソースコードはTypeScript (`src-ts/index.ts`) で記述され、JavaScriptにコンパイルされます。
    -   **Node.js**: 開発スクリプト (`scripts/copy-to-dist.js`, `scripts/rename-to-mjs.js`) の実行環境として使用されます。
    -   **.editorconfig**: 異なるエディタやIDE間でコードスタイルを統一するための設定ファイルです。
- テスト:
    -   プロジェクト情報に明示的なテストフレームワークの記述はありませんが、「テストデータ」の作成や「テストレッド」の言及があり、品質確保への意識が見られます。
- ビルドツール:
    -   **TypeScript Compiler (tsc)**: TypeScriptソースコードをJavaScriptに変換し、配布可能な形式（CommonJS, ES Module）を生成します。
    -   **カスタムスクリプト**: ビルドプロセスの補助として、ファイルコピーやリネームを行うJavaScriptスクリプトが使用されます。
- 言語機能:
    -   **JavaScript (ESNext)**: プロジェクトのランタイム言語であり、ビルド後のコードやスクリプトで広く使用されます。
    -   **TypeScript**: 型安全なコード記述を可能にするスーパーセット言語です。
- 自動化・CI/CD:
    -   **GitHub Actions**: リポジトリのイベント（プッシュなど）をトリガーとして、自動ビルド、テスト、ドキュメント生成などのワークフローを実行するために使用されます。特にREADMEの自動英訳にも利用されています。
- 開発標準:
    -   **.editorconfig**: プロジェクト全体のコーディングスタイルを統一し、開発者間の協調性を高めるための設定ファイルです。

## ファイル階層ツリー
```
📄 .editorconfig
📄 .gitignore
📖 CONVERSION_SUMMARY.md
📄 LICENSE
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📖 RELEASE.ja.md
📖 RELEASE.md
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
  📖 15.md
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
-   **.editorconfig**: 異なるエディタやIDE間で一貫したコーディングスタイルを維持するための設定ファイルです。
-   **.gitignore**: Gitのバージョン管理から除外するファイルやディレクトリを指定します。
-   **CONVERSION_SUMMARY.md**: プロジェクトの変換やビルドに関する要約、または変更履歴などが記述されている可能性があります。
-   **LICENSE**: プロジェクトのソフトウェアライセンス情報が記載されています。
-   **NPM_README.md**: npmパッケージとして公開される際のREADMEファイルです。
-   **README.ja.md**: プロジェクトの日本語での説明、使い方、目的などが記述されています。
-   **README.md**: プロジェクトの英語での説明、使い方、目的などが記述されています（自動生成）。
-   **RELEASE.ja.md**: プロジェクトの日本語でのリリースノートや変更履歴です。
-   **RELEASE.md**: プロジェクトの英語でのリリースノートや変更履歴です（自動生成）。
-   **_config.yml**: GitHub Pagesなどのサイト設定ファイルです。
-   **dist/**: TypeScriptで記述されたソースコードがJavaScriptにコンパイルされ、配布可能な形式で格納されるディレクトリです。
    -   **dist/cjs/index.d.ts**: CommonJS形式モジュール用のTypeScript型定義ファイルです。
    -   **dist/cjs/index.js**: CommonJS形式でコンパイルされたJavaScriptコードで、Node.js環境などで利用されます。
    -   **dist/esm/index.d.ts**: ES Module形式モジュール用のTypeScript型定義ファイルです。
    -   **dist/esm/index.mjs**: ES Module形式でコンパイルされたJavaScriptコードで、モダンなブラウザやESM対応Node.jsで利用されます。
    -   **dist/index.d.ts**: プロジェクトの型定義ファイルで、TypeScriptプロジェクトでのライブラリ利用をサポートします。
    -   **dist/index.js**: CommonJS形式でコンパイルされたJavaScriptコードです。
    -   **dist/index.mjs**: ES Module形式でコンパイルされたJavaScriptコードです。
-   **examples/**: プロジェクトの利用方法を示すサンプルコードやデモを格納するディレクトリです。
    -   **examples/cdn-example.html**: CDN経由でライブラリをロードし、利用するHTMLサンプルです。
    -   **examples/npm-example.mjs**: npmパッケージとしてインストールしたライブラリをESモジュールとして利用するサンプルです。
-   **generated-docs/callgraph.html**: プロジェクト内の関数呼び出し関係を視覚化したドキュメントです。
-   **googled947dc864c270e07.html**: Googleサイト認証用のファイルです。
-   **index.html**: プロジェクトのトップページ、またはデモへのリダイレクトや基本的な情報を提供します。
-   **issue-notes/**: 開発中に検討された課題や決定事項に関するメモが格納されています。
-   **package-lock.json**: `package.json` に記載された依存関係の正確なバージョンとツリー構造を記録します。
-   **package.json**: プロジェクトのメタデータ（名前、バージョン、依存関係、スクリプトなど）を定義します。
-   **scripts/**: ビルドや開発プロセスを補助するスクリプトを格納するディレクトリです。
    -   **scripts/copy-to-dist.js**: ビルド後のファイルを `dist` ディレクトリにコピーする処理を自動化するスクリプトです。
    -   **scripts/rename-to-mjs.js**: ビルド後のJavaScriptファイルを `.mjs` 拡張子にリネームする処理を自動化するスクリプトです。
-   **src/**: プロジェクトのユーザーインターフェースやデモ関連のソースコードを格納するディレクトリです。
    -   **src/index.html**: デモアプリケーションの主要なHTMLファイルです。
    -   **src/main.js**: デモUIの操作（シーケンスの選択、テキストエリアの更新など）を処理するJavaScriptファイルです。
    -   **src/play.js**: デモアプリケーションでの音楽再生（AudioContextの初期化、イベントのスケジューリングなど）を制御するJavaScriptファイルです。
    -   **src/redirect.css**: リダイレクトページに適用されるスタイルシートです。
    -   **src/sampleData.js**: デモで利用されるJSON形式のサンプル音楽データが定義されています。
    -   **src/scheduleOrExecuteEvent.js**: Tone.jsのイベントをスケジューリングまたは即時実行するコアロジックを含むJavaScriptファイルです（TypeScriptソースのJavaScriptバージョン）。
    -   **src/styles.css**: デモUIの主要なスタイルシートです。
-   **src-ts/**: プロジェクトのコアロジックをTypeScriptで記述したソースコードを格納するディレクトリです。
    -   **src-ts/index.ts**: プロジェクトの主要なTypeScriptソースファイルで、JSONデータに基づくTone.jsのイベント処理、ノード生成・接続のロジックを含みます。
-   **tsconfig.json**: TypeScriptコンパイラの設定ファイルです。

## 関数詳細説明
-   **scheduleOrExecuteEvent**: JSON形式で記述された単一の音楽イベント（音色定義、パラメータ変更、ノートトリガーなど）を受け取り、Tone.jsの機能を使ってそれを適切なタイミングでスケジューリングまたは即時実行します。このライブラリの核となる処理です。
-   **playSequence**: 複数の音楽イベントからなるJSONシーケンス全体を処理し、`scheduleOrExecuteEvent` を繰り返し呼び出すことで、一連の音楽を再生します。
-   **createNode**: JSON定義に基づいてTone.jsのシンセサイザーやエフェクトなどのオーディオノードを動的に生成します。
-   **connectNode**: 生成されたTone.jsのオーディオノードを、JSON定義に従って接続し、複雑なエフェクトチェーンやルーティングを構築します。
-   **constructor**: オブジェクトが生成される際に初期化処理を行うための特別な関数です。Tone.jsの内部的なノード管理などで使われます。
-   **get**: オブジェクトのプロパティ値を取得するための関数です。
-   **set**: オブジェクトのプロパティ値を設定するための関数です。
-   **disposeAll**: 複数のTone.jsノードやリソースを一括で解放し、メモリをクリーンアップするための関数です。
-   **initializeSequenceDataCollection**: デモページで利用するシーケンスデータのコレクションを初期化し、UIに表示可能な状態にします。
-   **populateSequenceSelector**: デモページのUIにあるシーケンス選択用のドロップダウン（セレクタ）に、利用可能なシーケンスの選択肢を生成・表示します。
-   **updateTextareaWithSelectedSequence**: デモページでユーザーが選択したシーケンスデータを、UIのテキストエリアに表示・更新します。
-   **playWithAudioContext**: Web Audio APIのAudioContextを初期化し、音声を再生するための準備を行います。
-   **play**: 音楽再生を開始するための主要な関数で、`playWithAudioContext`を呼び出し、実際のオーディオ処理を開始させます。
-   **renameFiles**: ファイルシステム上のファイルを指定されたルールに基づいてリネームするスクリプト内の関数です。
-   **catch**: エラーハンドリングのための一般的なJavaScriptのキーワードで、エラーが発生した場合の処理を定義します。
-   **forEach**: 配列やイテラブルなオブジェクトの各要素に対して、指定された関数を一度ずつ実行するための一般的なJavaScriptのメソッドです。
-   **switch**: 複数の条件分岐を簡潔に記述するための一般的なJavaScriptの制御構文です。
-   **if**: 条件が真である場合に特定のコードブロックを実行するための一般的なJavaScriptの制御構文です。

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
      - constructor
    - playWithAudioContext ()
      - play ()
  - renameFiles (scripts/rename-to-mjs.js)
- if (src/play.js)
- switch (src/scheduleOrExecuteEvent.js)

---
Generated at: 2026-01-11 07:08:29 JST
