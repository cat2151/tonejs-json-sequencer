Last updated: 2026-01-09

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: Tone.js (Web Audio APIを抽象化し、Web上での高度な音楽表現を可能にするライブラリ)、HTML、CSS、JavaScript (デモUIや再生ロジックに使用)
- 音楽・オーディオ: Tone.js (シンセサイザー、エフェクトチェーン、スケジューリングなど、音楽機能の中核を担う)
- 開発ツール: TypeScript (静的型付けによるコード品質向上と開発効率化)、Node.js (開発スクリプトの実行環境)
- テスト: (プロジェクト情報から特定のテストフレームワークの言及なし)
- ビルドツール: TypeScriptコンパイラ (TSからJSへのトランスパイル)、Node.jsスクリプト (ビルド成果物のコピー、ファイル名変換など)
- 言語機能: JavaScript (ES Modulesを含む)、TypeScript (最新のJS機能と型安全性を活用)
- 自動化・CI/CD: GitHub Actions (READMEの自動翻訳など、CI/CDワークフローを自動化)
- 開発標準: EditorConfig (複数人での開発においてコーディングスタイルを統一し、コードの一貫性を保つ)

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
- **`.editorconfig`**: プロジェクト内の異なるエディタやIDE間で一貫したコーディングスタイル（インデント、改行コードなど）を維持するための設定ファイルです。
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリ（例: ビルド成果物、依存関係モジュール）を指定する設定ファイルです。
- **`CONVERSION_SUMMARY.md`**: プロジェクトの変換やビルドプロセスに関する概要、変更履歴などをまとめたドキュメントです。
- **`LICENSE`**: プロジェクトの利用条件を定めるライセンス情報（例: MIT License）です。
- **`NPM_README.md`**: npmパッケージとして公開する際に表示されるREADMEファイルです。
- **`README.ja.md`**: プロジェクトの日本語での概要、使い方、設計思想などを説明する主要ドキュメントです。
- **`README.md`**: プロジェクトの英語での概要、使い方などを説明する主要ドキュメントで、通常は`README.ja.md`から自動生成されます。
- **`_config.yml`**: GitHub Pagesなどの静的サイトジェネレータで使用される設定ファイルです。
- **`dist/`**: TypeScriptで書かれたコードがJavaScriptにコンパイルされ、配布可能な形式にビルドされた成果物を格納するディレクトリです。
    - **`dist/cjs/index.d.ts`**: CommonJSモジュール形式で利用するための型定義ファイルです。`scheduleOrExecuteEvent`や`playSequence`といった主要関数の型情報を提供します。
    - **`dist/cjs/index.js`**: CommonJSモジュール形式で利用するためのJavaScriptコードです。プロジェクトの主要な再生ロジックが含まれます。
    - **`dist/esm/index.d.ts`**: ES Module形式で利用するための型定義ファイルです。
    - **`dist/esm/index.mjs`**: ES Module形式で利用するためのJavaScriptコードです。
    - **`dist/index.d.ts`**: プロジェクトの主要な型定義をまとめたファイルです。
    - **`dist/index.js`**: プロジェクトの主要なJavaScriptコードをまとめたCommonJS形式のファイルです。
    - **`dist/index.mjs`**: プロジェクトの主要なJavaScriptコードをまとめたES Module形式のファイルです。
- **`examples/`**: このライブラリの使用方法を示すサンプルコードやHTMLファイルを含むディレクトリです。
    - **`examples/cdn-example.html`**: CDN経由でライブラリを読み込み、使用するデモンストレーション用のHTMLファイルです。
    - **`examples/npm-example.mjs`**: npmでインストールしたライブラリをESモジュールとして使用するサンプルJavaScriptファイルです。
- **`generated-docs/callgraph.html`**: プロジェクト内の関数呼び出し関係を視覚的に表現したグラフドキュメントのHTMLファイルです。
- **`googled947dc864c270e07.html`**: Googleサイトの所有権確認に使用される認証ファイルです。
- **`index.html`**: プロジェクトのデモページやメインエントリポイントとなるHTMLファイルです。
- **`issue-notes/`**: 開発中に発生した課題や検討事項に関する詳細なメモ、議論を記録するディレクトリです。
    - **`issue-notes/*.md`**: 個別の課題や検討事項の詳細を記述したMarkdownファイルです。
- **`package-lock.json`**: プロジェクトのnpmパッケージ依存関係と、それらの依存関係の正確なバージョンツリーを記録するファイルです。再現性のあるビルドを保証します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、スクリプト、依存関係を定義する設定ファイルです。
- **`scripts/`**: ビルドプロセスや開発作業を自動化するためのJavaScriptスクリプトを含むディレクトリです。
    - **`scripts/copy-to-dist.js`**: ビルドされたファイルを`dist`ディレクトリにコピーする処理を行うスクリプトです。
    - **`scripts/rename-to-mjs.js`**: 特定のファイルを`.mjs`拡張子にリネームする処理を行うスクリプトです。
- **`src/`**: Webブラウザで動作するクライアントサイドのソースコードを格納するディレクトリです。
    - **`src/index.html`**: このプロジェクトのデモインターフェースを提供するHTMLファイルです。
    - **`src/main.js`**: デモUIのロジック（シーケンス選択、表示更新など）を処理するJavaScriptファイルです。
    - **`src/play.js`**: Web Audioコンテキストの初期化やTone.jsを使った音声再生の開始を制御するJavaScriptファイルです。
    - **`src/redirect.css`**: リダイレクトページに適用されるスタイルシートです。
    - **`src/sampleData.js`**: デモで使用される様々な音楽シーケンスのサンプルデータ（JSON形式）を定義したJavaScriptファイルです。
    - **`src/scheduleOrExecuteEvent.js`**: JSONイベントを解析し、Tone.jsの対応するメソッドを呼び出す、プロジェクトの中核となるロジックです。
    - **`src/styles.css`**: デモページの全体的なレイアウトやデザインを定義するスタイルシートです。
- **`src-ts/`**: TypeScriptで記述されたプロジェクトの主要なソースコードを格納するディレクトリです。
    - **`src-ts/index.ts`**: プロジェクトのコアロジックをTypeScriptで実装したファイルです。ここからJavaScriptにコンパイルされます。
- **`tsconfig.json`**: TypeScriptコンパイラの動作を設定するファイルです。コンパイルオプションや対象ファイルなどを定義します。

## 関数詳細説明
- **`scheduleOrExecuteEvent`**
    - 役割: JSON形式のイベントデータを受け取り、その内容に基づいてTone.jsの対応するメソッドをスケジューリングまたは即時実行する、プロジェクトの核心となる機能です。
    - 機能: 音源の生成、エフェクトの接続、パラメータ変更など、多様な音楽イベントの処理を中央で管理し、Tone.jsを介して実行します。
    - 引数: `event` (JSONオブジェクト): 処理する音楽イベントの詳細を記述したオブジェクト。
    - 戻り値: なし (Tone.jsの状態変更によるサイドエフェクト)。
- **`playSequence`**
    - 役割: 複数のJSONイベントから構成される音楽シーケンス全体を再生開始する機能です。
    - 機能: シーケンス内の各イベントを`scheduleOrExecuteEvent`関数に渡し、指定されたタイミングで順次再生されるように調整します。
    - 引数: `sequenceData` (JSON配列): 再生する音楽イベントのリストを含む配列。
    - 戻り値: なし (Tone.jsの状態変更によるサイドエフェクト)。
- **`createNode`**
    - 役割: JSON定義に基づいて、Tone.jsのシンセサイザーやエフェクトなどのオーディオノードを生成する機能です。
    - 機能: 指定されたTone.jsのクラス名とコンストラクタ引数を使って新しいインスタンスを作成し、内部で管理します。
    - 引数: `nodeDefinition` (JSONオブジェクト): 生成するノードの種類と初期設定を記述したオブジェクト。
    - 戻り値: 生成されたTone.jsノードのインスタンス。
- **`connectNode`**
    - 役割: 複数のTone.jsオーディオノード間を接続し、オーディオ信号のフロー（オーディオチェーン）を構築する機能です。
    - 機能: JSON定義に従って、指定されたソースノードをターゲットノードまたはTone.jsの最終出力（Master）に接続します。
    - 引数: `connectionDefinition` (JSONオブジェクト): 接続元、接続先ノード、ポート情報などを記述したオブジェクト。
    - 戻り値: なし (Tone.jsのオーディオグラフの状態変更によるサイドエフェクト)。
- **`initializeSequenceDataCollection` (src/main.js)**
    - 役割: サンプルシーケンスデータを初期化し、UIで利用可能な形式に整理する機能です。
    - 機能: `sampleData.js`から音楽データを読み込み、ユーザーインターフェースのドロップダウンメニューなどに表示するための準備を行います。
    - 引数: なし。
    - 戻り値: なし (内部データの初期化)。
- **`populateSequenceSelector` (src/main.js)**
    - 役割: HTML上のセレクタ要素（例: `<select>`タグ）に、利用可能なシーケンスデータのオプションを動的に追加する機能です。
    - 機能: `initializeSequenceDataCollection`で準備されたデータをもとに、ユーザーが選択できるシーケンスのリストをUIに生成します。
    - 引数: なし。
    - 戻り値: なし (UI要素の変更によるサイドエフェクト)。
- **`updateTextareaWithSelectedSequence` (src/main.js)**
    - 役割: ユーザーがセレクタで選択したシーケンスデータをテキストエリアに表示する機能です。
    - 機能: 選択されたシーケンスのJSONデータを整形し、指定されたHTMLテキストエリア要素に挿入してユーザーに内容を可視化します。
    - 引数: `event` (Eventオブジェクト): セレクタの変更イベントなど。
    - 戻り値: なし (UI要素の変更によるサイドエフェクト)。
- **`playWithAudioContext` (src/play.js)**
    - 役割: Web Audio APIのオーディオコンテキストを初期化し、Tone.jsの再生環境を準備する機能です。
    - 機能: Web Audio APIがブラウザによってユーザー操作を必要とする場合に備え、オーディオコンテキストの初期化を行い、`play`関数を呼び出して実際のシーケンス再生を開始します。
    - 引数: なし。
    - 戻り値: なし (音声再生環境の準備)。
- **`play` (src/play.js)**
    - 役割: 現在選択されているシーケンスデータを取得し、Tone.jsの再生ロジックを起動する機能です。
    - 機能: UIから現在選択されているシーケンスデータを取得し、それを`playSequence`関数に渡して実際の音楽再生を実行します。
    - 引数: なし。
    - 戻り値: なし (音声再生の開始)。
- **`constructor`**
    - 役割: オブジェクト指向プログラミングにおけるクラスのインスタンスを初期化する特別なメソッドです。
    - 機能: 新しいオブジェクトが作成される際に自動的に呼び出され、そのオブジェクトが必要とする初期プロパティの設定やセットアップ処理を行います。
    - 引数: オブジェクトの種類によって異なる初期化パラメータ。
    - 戻り値: 新しく初期化されたオブジェクトのインスタンス。
- **`get`**
    - 役割: オブジェクトから特定のプロパティの値を取得するメソッドです。
    - 機能: キーを指定することで、オブジェクト内に格納されている対応する値を取得します。
    - 引数: `key` (文字列): 取得したいプロパティの名前。
    - 戻り値: 指定されたキーに対応する値。
- **`set`**
    - 役割: オブジェクトの特定のプロパティに新しい値を設定するメソッドです。
    - 機能: キーと値を指定することで、オブジェクト内の既存のプロパティを更新するか、新しいプロパティを追加します。
    - 引数: `key` (文字列): 設定したいプロパティの名前。 `value` (任意の方): 設定する新しい値。
    - 戻り値: なし (オブジェクトの状態変更によるサイドエフェクト)。
- **`disposeAll`**
    - 役割: 生成されたすべてのTone.jsノードや関連リソースを解放し、クリーンアップを行う機能です。
    - 機能: メモリリークを防ぎ、現在再生中の音声を停止し、Web Audio APIのオーディオグラフから接続されていたノードをすべて削除します。
    - 引数: なし。
    - 戻り値: なし (リソースの解放)。
- **`forEach`**
    - 役割: 配列や他のイテラブルなコレクションの各要素に対して、指定されたコールバック関数を一度ずつ実行する高階関数です。
    - 機能: コレクション内のすべての項目を順番に処理し、それぞれに特定の操作を適用します。
    - 引数: `callback` (関数): 各要素に対して実行される関数。
    - 戻り値: なし (副作用としてコレクションの要素への操作)。
- **`catch`**
    - 役割: JavaScriptの`try...catch`ブロックやPromiseチェーンで使用され、エラーが発生した場合にそのエラーを捕捉し処理する機能です。
    - 機能: エラー発生時にプログラムが予期せぬ終了をするのを防ぎ、エラーログの出力やユーザーへの通知など、適切なエラーハンドリングを実行します。
    - 引数: `error` (Errorオブジェクト): 発生したエラーに関する情報を含むオブジェクト。
    - 戻り値: なし (エラー処理)。
- **`switch`**
    - 役割: 一つの変数の値に基づいて、複数の異なるコードブロックの中から一つを実行するための制御構造です。
    - 機能: `scheduleOrExecuteEvent`関数内で、イベントの種類（例: "createNode"、"callMethod"など）に応じて、対応する処理ロジックを選択的に実行します。
    - 引数: `expression` (任意の型): 評価される値。
    - 戻り値: なし (選択されたコードブロックの実行)。
- **`if`**
    - 役割: 特定の条件が真である場合にのみ、コードブロックを実行するための基本的な条件分岐制御構造です。
    - 機能: 指定された条件式の結果が`true`である場合にのみ、その内部のコードを実行し、プログラムのフローを制御します。
    - 引数: `condition` (真偽値): 評価される条件式。
    - 戻り値: なし (条件付きのコードブロック実行)。
- **`renameFiles` (scripts/rename-to-mjs.js)**
    - 役割: ビルド後のJavaScriptファイルを`.mjs`拡張子にリネームする機能です。
    - 機能: ESモジュールとして適切に扱われるようファイル名を変更し、Node.js環境やモダンなブラウザでの互換性を高めます。
    - 引数: `directoryPath` (文字列): リネーム対象のファイルが存在するディレクトリのパス。
    - 戻り値: なし (ファイルシステムへの変更によるサイドエフェクト)。

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
Generated at: 2026-01-09 07:09:53 JST
