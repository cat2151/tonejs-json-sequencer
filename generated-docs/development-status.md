Last updated: 2026-04-19

# Development Status

## 現在のIssues
- `demo-library` に最近多数の修正がマージされたため、`demo-lib` の動作確認 `[Issue #124](../issue-notes/124.md)` が引き続き重要です。
- `streaming` 機能にも関連ファイルの変更があり、機能の安定性確保のため手動テスト `[Issue #89](../issue-notes/89.md)` が必要とされています。
- これらの手動検証タスクは、コードベースの継続的な変更に対して自動テストを導入することで効率化できる可能性があります。

## 次の一手候補
1. `demo-library` の主要機能に対する単体テストの導入 `[Issue #124](../issue-notes/124.md)`
   - 最初の小さな一歩: `demo-library/index.html` が利用する `src/demo/streaming.ts` や `src/demo/main.ts` から、`demo-library` に特化したロジックを特定し、その関数に対するテストファイル (`test/demo-library.test.ts` など) を新規作成する準備をします。
   - Agent実行プロンプト:
     ```
     対象ファイル: `demo-library/index.html`, `src/demo/streaming.ts`, `src/demo/main.ts`, `package.json`

     実行内容: `demo-library` が `src/demo/streaming.ts` や `src/demo/main.ts` 内のどの機能を呼び出しているかを分析し、その主要なインタラクションポイントを特定してください。その後、Node.js環境で実行可能なテストフレームワーク（例: `jest`）を `package.json` に追加し、`demo-library` の主要な再生機能（例: シーケンスのロード、再生開始/停止）のモック環境での単体テストを記述するための基本的な構造を `test/demo-library.test.ts` として作成してください。

     確認事項: `demo-library/index.html` がどのように `dist/demo` 内のスクリプトをロードしているか、および `src/demo/streaming.ts` や `src/demo/main.ts` の依存関係を確認してください。また、Tone.js のAudioContextに依存しない形でテスト可能な範囲を特定してください。

     期待する出力: `package.json` に`jest`などのテストフレームワークが追加され、`test/demo-library.test.ts` というファイルに、`demo-library` の主要な再生機能をテストするためのスケルトンコード（テストブロックと主要な関数呼び出しのモック）がMarkdown形式で出力される。
     ```

2. `ndjson-streaming` 機能のイベント処理に関する単体テストの導入 `[Issue #89](../issue-notes/89.md)`
   - 最初の小さな一歩: `src/streaming/event-processor.ts` と `src/streaming/ndjson-parser.ts` の主要なクラスや関数を特定し、これらがNDJSONデータをパースし、イベントを処理するロジックを検証するためのテストファイルを新規作成する準備をします。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/ndjson-streaming.ts`, `src/streaming/event-processor.ts`, `src/streaming/ndjson-parser.ts`, `package.json`

     実行内容: `src/streaming/event-processor.ts` と `src/streaming/ndjson-parser.ts` がNDJSON形式のイベントデータをどのように処理しているか、その入力と出力を分析してください。これらのモジュールがNDJSONデータを正確にパースし、イベントキューに渡すロジックについて、モックデータを用いた単体テストコードを `test/streaming.test.ts` として作成してください。テストには、不正なNDJSON形式や、複数のイベントが連続して渡された場合の処理も考慮に入れてください。

     確認事項: `ndjson-streaming` が `event-processor` や `ndjson-parser` をどのように利用しているか、およびこれらのクラスの公開メソッドとその役割を確認してください。また、AudioContextへの依存がない純粋なデータ処理ロジックに焦点を当ててください。

     期待する出力: `test/streaming.test.ts` というファイルに、`ndjson-parser` と `event-processor` の主要なデータ処理ロジックをテストするための具体的な単体テストコードがMarkdown形式で出力される。
     ```

3. `project-summary` 生成プロンプトの出力形式と内容の整合性検証
   - 最初の小さな一歩: `generated-docs/development-status.md` と `generated-docs/project-overview.md` の最新の出力を目視で確認し、この「開発状況生成プロンプト」で指定された出力フォーマット、生成しないもののルール、Markdownリンクの形式が遵守されているかを確認します。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md`, `.github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md`, `generated-docs/development-status.md`, `generated-docs/project-overview.md`

     実行内容: `development-status-prompt.md` と `project-overview-prompt.md` を用いて生成された `generated-docs/development-status.md` と `generated-docs/project-overview.md` の内容を分析し、**このプロンプトの指示（開発状況生成プロンプト）で指定されている「生成しないもの」のルールに違反していないか、および指定の「出力フォーマット」に厳密に準拠しているか**を検証してください。特に、ハルシネーションや不必要な提案がないか、Markdownリンクの形式が正しいか、フォーマットが崩れていないかを確認してください。

     確認事項: `development-status-prompt.md` と `project-overview-prompt.md` の最終出力結果（`generated-docs` 内のファイル）と、この「開発状況生成プロンプト」の全てのルールとガイドラインを厳密に比較すること。

     期待する出力: 検証結果をMarkdown形式で出力してください。具体的には、どのファイルでどのルール違反（例: ハルシネーションの検出、不適切な出力フォーマット、指定されたMarkdownリンク形式の不遵守など）が見つかったか、およびその具体的な箇所を指摘し、改善提案を含めてください。違反がなければ「全て期待通り」と記述してください。
     ```

---
Generated at: 2026-04-19 07:14:58 JST
