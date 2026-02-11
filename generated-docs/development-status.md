Last updated: 2026-02-12

# Development Status

## 現在のIssues
- 現在、デモライブラリの動作確認 ([Issue #124](../issue-notes/124.md)) とストリーミング機能のテスト ([Issue #89](../issue-notes/89.md)) が未完了の課題として残っています。
- 最近の変更では、NDJSONストリーミングにおけるスケジュールされたイベントのハイライト表示機能が追加されました。
- また、デモにおける楽器やエフェクトの引数渡し方法がオブジェクト形式に更新されており、デモ全体の検証が重要です。

## 次の一手候補
1. ストリーミング機能のNDJSONハイライトの正確性を検証する [Issue #89](../issue-notes/89.md)
   - 最初の小さな一歩: `src/ndjson-streaming.ts`の実装と`demo/streaming.html`の表示ロジックを比較し、ハイライト表示が意図通りに機能しているかコードレベルで確認する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/ndjson-streaming.ts`, `src/demo/streaming.ts`, `demo/streaming.html`, `demo/streaming-demo.css`

     実行内容: `src/ndjson-streaming.ts`におけるNDJSONイベントのスケジューリングロジックと、`src/demo/streaming.ts`および`demo/streaming.html`、`demo/streaming-demo.css`におけるこれらのイベントのハイライト表示ロジックを分析してください。特に、イベントがスケジュールされた際に期待されるDOM要素の変更とCSS適用が適切に行われるか、関連コードを追って詳細に説明してください。

     確認事項: `ndjson-streaming.ts`のイベント処理と、デモUIがどのように同期しているか（特にイベントの開始/終了タイミングでのクラス付与やスタイル変更）を確認してください。

     期待する出力: NDJSONイベントがスケジュールされたときにデモUIがどのように変化し、ハイライトが適用されるか、具体的なコードスニペットを交えてmarkdown形式で説明してください。
     ```

2. 更新されたデモの構造とカバレッジを分析する [Issue #124](../issue-notes/124.md)
   - 最初の小さな一歩: `src/demo`ディレクトリ内の各デモファイル（特に`effect`と`instrument`サブディレクトリ）をリストアップし、それぞれのデモがTone.jsのどのコンポーネントを使用しているかを抽出する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/**/*.ts` (特に `src/demo/effect/` と `src/demo/instrument/` 配下)

     実行内容: `src/demo`ディレクトリ配下の各デモファイルについて、使用されているTone.jsのEffectやInstrumentコンポーネント、およびそれらの初期化方法（特にオブジェクト引数を使用しているか）を特定し、一覧形式で分析してください。

     確認事項: 各デモファイルが独立して動作し、意図するTone.jsコンポーネントを正しく使用しているか、また最近の変更で導入されたオブジェクトオプションが正しく適用されているかを確認してください。

     期待する出力: 各デモファイル名と、それが使用するTone.jsコンポーネント（例: `Chorus`, `AMSynth`など）、および初期化時にオブジェクト引数が使われているかを示すリストをmarkdown形式で出力してください。
     ```

3. デモ環境でのイベントトリガーと再生制御の現状を整理する [Issue #89](../issue-notes/89.md), [Issue #124](../issue-notes/124.md)
   - 最初の小さな一歩: `src/demo/main.ts`と`src/demo/modules/uiManager.ts`のコードを読み込み、ユーザー操作がどのように音声イベントやシーケンスの再生に結びついているか、主要な関数とイベントリスナーを特定する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/main.ts`, `src/demo/modules/audioManager.ts`, `src/demo/modules/uiManager.ts`, `demo/index.html`, `demo/streaming.html`

     実行内容: デモ環境におけるユーザーインタラクション（ボタンクリックなど）がどのように音声再生やストリーミングイベントのトリガーに繋がっているかを分析し、主要なJavaScript関数とHTML要素の関連を抽出してください。特に、`main.ts`がどのようにUIとオーディオマネージャーを連携させているかに焦点を当ててください。

     確認事項: デモの再生開始/停止、シーケンス選択、エフェクト適用などの操作が、どのコードパスを通ってTone.jsのAPIに到達するかを確認してください。

     期待する出力: デモのUI要素（IDやクラス名）と、それに対応するJavaScriptのイベントリスナーおよび主要な処理関数をまとめた、デモのインタラクションフローを説明するmarkdown形式のドキュメントを生成してください。
     ```

---
Generated at: 2026-02-12 07:14:01 JST
