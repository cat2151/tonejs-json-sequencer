Last updated: 2025-11-10

# Project Overview

## プロジェクト概要
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

## 技術スタック
- フロントエンド: HTML, CSS, JavaScript (ブラウザ環境)。ユーザーインターフェースの構築とクライアントサイドでのロジック実行に使用されます。
- 音楽・オーディオ: Tone.js, Web Audio API, JSON。Tone.jsはWeb Audio APIを抽象化し、シンセサイザー、エフェクト、スケジューリングなどの高度な音楽機能をブラウザ上で実現するためのJavaScriptライブラリです。JSONは音色定義、演奏内容、タイミング情報などの音楽データを記述するのに使用されます。
- 開発ツール: .editorconfig (エディタ設定の統一), GitHub Actions (CI/CD), Gemini (READMEの自動翻訳に使用)。
- テスト: 現状は特定のテストフレームワークは明示されていませんが、ロードマップにてオーディオのヨレ改善のためのテストデータ作成計画が示されています。
- ビルドツール: プロジェクト情報からは明確なビルドツール（例: Webpack, Vite）の使用は確認できません。JavaScriptファイルは直接ブラウザで読み込まれています。
- 言語機能: JavaScript。クライアントサイドの主要なプログラミング言語として、アプリケーションの全てのロジックを実装しています。
- 自動化・CI/CD: GitHub Actions。READMEの自動翻訳など、開発プロセスの自動化に利用されています。
- 開発標準: .editorconfig (コードスタイルの一貫性を保つため), Markdown (ドキュメント記述のため)。

## ファイル階層ツリー
```
📄 .editorconfig
📄 LICENSE
📖 README.ja.md
📖 README.md
📄 _config.yml
📁 generated-docs/
🌐 index.html
📁 issue-notes/
  📖 1.md
  📖 2.md
  📖 3.md
  📖 4.md
📁 src/
  🌐 index.html
  📜 main.js
  📜 play.js
  🎨 redirect.css
  📜 sampleData.js
  📜 scheduleOrExecuteEvent.js
  🎨 styles.css
```

## ファイル詳細説明
- **`.editorconfig`**: 異なる開発環境間でコーディングスタイル（インデント、改行コードなど）の一貫性を保つための設定ファイルです。
- **`LICENSE`**: プロジェクトの著作権、利用条件、配布に関する規定が記述されたライセンスファイルです。
- **`README.ja.md`**: プロジェクトの目的、機能、使用方法、技術スタックなどの概要を日本語で説明する主要なドキュメントファイルです。
- **`README.md`**: `README.ja.md`の内容を基にGitHub ActionsとGeminiによって自動生成された、英語で記述されたプロジェクトの概要ドキュメントです。
- **`_config.yml`**: GitHub Pagesがサイトを構築する際に使用するJekyllの設定ファイルです。
- **`generated-docs/`**: 自動生成されるドキュメント（例: APIリファレンス）を格納するためのディレクトリです。
- **`index.html`**: プロジェクトのデモまたはメインのウェブページへリダイレクトするためのトップレベルのHTMLファイルです。
- **`issue-notes/`**: 開発中に発生した課題、検討事項、将来の計画などをメモとして記録しているMarkdownファイル群を格納するディレクトリです。
    - **`issue-notes/1.md`**, **`issue-notes/2.md`**, **`issue-notes/3.md`**, **`issue-notes/4.md`**: それぞれ特定の課題や検討事項に関する詳細なメモが記述されています。
- **`src/`**: プロジェクトの主要なソースコードが格納されているディレクトリです。
    - **`src/index.html`**: Tone.jsとJSONシーケンサーのデモアプリケーションのUIを表示するHTMLファイルです。必要なJavaScriptとCSSファイルを読み込みます。
    - **`src/main.js`**: シーケンスデータの初期化、UI上のシーケンス選択ドロップダウンメニューの生成、選択されたシーケンスをテキストエリアに表示するなどのUI関連ロジックを扱います。
    - **`src/play.js`**: 音楽再生の中核を担うJavaScriptファイルです。Web Audio APIのAudioContextを開始し、JSON形式のシーケンスデータを解析して`scheduleOrExecuteEvent`関数を呼び出し、Tone.jsによる音の再生を制御します。
    - **`src/redirect.css`**: 特定のウェブページ（例: リダイレクトページ）に適用されるスタイルを定義するCSSファイルです。
    - **`src/sampleData.js`**: シーケンス再生のためのJSON形式のサンプルデータ（音色定義、イベントシーケンスなど）を複数定義しているJavaScriptファイルです。
    - **`src/scheduleOrExecuteEvent.js`**: プロジェクトのコアロジックを実装しており、JSON形式の単一イベントオブジェクトを受け取り、その内容（シンセのトリガー、エフェクトの適用、パラメータ変更など）に基づいてTone.jsの対応するメソッドを動的に呼び出して実行します。
    - **`src/styles.css`**: アプリケーション全体のレイアウト、フォント、色などの視覚的なデザインを定義する主要なCSSファイルです。

## 関数詳細説明
- **`initializeSequenceDataCollection()`** (src/main.js)
    - **役割**: アプリケーションで使用するサンプルシーケンスデータを内部コレクションに初期化・設定します。
    - **引数**: なし。
    - **戻り値**: なし。
    - **機能**: `sampleData.js`からシーケンスデータを読み込み、UIでの選択や再生に利用できるように準備します。
- **`populateSequenceSelector()`** (src/main.js)
    - **役割**: UI上のシーケンス選択用のドロップダウンメニュー（`<select>`要素）に、利用可能なシーケンスの選択肢を追加します。
    - **引数**: なし。
    - **戻り値**: なし。
    - **機能**: `initializeSequenceDataCollection`で準備されたシーケンスの名前を抽出し、ドロップダウンメニューに追加してユーザーが選択できるようにします。
- **`updateTextareaWithSelectedSequence()`** (src/main.js)
    - **役割**: ユーザーが選択したシーケンスのJSONデータを、UI上のテキストエリアに整形して表示します。
    - **引数**: なし。
    - **戻り値**: なし。
    - **機能**: ユーザーが選択したシーケンスの詳細をUIで確認・編集できるようにします。
- **`playWithAudioContext()`** (src/play.js)
    - **役割**: Web Audio APIのAudioContextを再開し、オーディオ再生が可能な状態にします。
    - **引数**: なし。
    - **戻り値**: なし。
    - **機能**: ブラウザの自動再生ポリシーに対応するため、ユーザーインタラクション（例: ボタンクリック）をきっかけにAudioContextを`resume()`します。
- **`play()`** (src/play.js)
    - **役割**: 指定されたJSONシーケンスデータに基づいて音楽の再生を開始します。
    - **引数**:
        - `sequence` (Array<Object>): 再生するJSONイベントオブジェクトの配列。
        - `tempo` (Number): 演奏のテンポ（BPM）。
    - **戻り値**: なし。
    - **機能**: 渡されたシーケンス内の各イベントを時間順に処理し、`scheduleOrExecuteEvent`関数を呼び出してTone.jsの対応する処理を実行させます。
- **`scheduleOrExecuteEvent()`** (src/scheduleOrExecuteEvent.js)
    - **役割**: JSON形式の単一イベントオブジェクトを解析し、その内容に基づいてTone.jsの適切なAPIを呼び出して音楽イベントを実行またはスケジューリングします。
    - **引数**:
        - `event` (Object): 処理対象のJSONイベントオブジェクト。
        - `time` (Number): イベントが実行されるべきTone.jsの内部時刻。
    - **戻り値**: なし。
    - **機能**: イベントオブジェクトの`type`（例: 'synth', 'effect', 'param'）や`method`プロパティに応じて、シンセサイザーの音をトリガーしたり、エフェクトを適用したり、パラメータを動的に変更したりするプロジェクトのコアとなるイベント処理ロジックです。

※ 提供された「関数呼び出し階層」に記載されている `if (src/play.js)`、`catch (src/play.js)`、`switch (src/scheduleOrExecuteEvent.js)` は、JavaScriptの制御構造であり、独立した関数ではありません。これらはそれぞれ、`playWithAudioContext()` の呼び出し条件、`play()` 関数内のエラーハンドリング、`scheduleOrExecuteEvent()` 関数内のイベントタイプによる処理分岐を担っています。

## 関数呼び出し階層ツリー
```
playWithAudioContext()
└─ play(sequence, tempo)
   └─ scheduleOrExecuteEvent(event, time)

---
Generated at: 2025-11-10 07:08:11 JST
