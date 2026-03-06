Last updated: 2026-03-07

# Development Status

## 現在のIssues
- Demoライブラリの動作確認（[Issue #124](../issue-notes/124.md)）とStreaming機能のテスト（[Issue #89](../issue-notes/89.md)）がオープン中の主要タスクです。
- これらの手動テストは、ライブラリの安定性と機能検証における重要なステップとなります。
- また、コードベースのリファクタリングも進んでおり、テストしやすい環境が整いつつあります。

## 次の一手候補
1. [Issue #124](../issue-notes/124.md) Demoライブラリの既存機能と構成の把握
   - 最初の小さな一歩: `src/demo/` ディレクトリ内の既存のTypeScriptファイルと `dist/demo/` に生成されるJavaScriptファイルを分析し、主要なデモ機能とそれらがカバーするライブラリ機能をリストアップする。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/**/*.ts` および `dist/demo/**/*.js`

     実行内容: `src/demo/` 内のTypeScriptファイルと `dist/demo/` 内のJavaScriptファイルを分析し、実装されている主なデモ機能（例: 特定のエフェクトのデモ、インストゥルメントのデモ、シーケンスのデモ）を洗い出してください。各デモが具体的に何をテスト/表示しているのかを簡潔に記述してください。

     確認事項: 各デモファイルの目的と、それがTone.js JSON Sequencerライブラリのどの機能に対応しているかを明確にすること。特に、`demo-library/` ディレクトリの役割も考慮する。

     期待する出力: Markdown形式で、各デモファイルのパスと、そのデモが示す機能の簡潔な説明のリスト。これにより、[Issue #124](../issue-notes/124.md) の手動テストの範囲を明確にするためのベースラインが提供される。
     ```

2. [Issue #89](../issue-notes/89.md) Streaming機能の主要データフローとテストシナリオの初期特定
   - 最初の小さな一歩: `src/streaming/` ディレクトリ内の主要なファイル（`event-processor.ts`, `ndjson-parser.ts`, `playback-state.ts`, `prediction-manager.ts`）を分析し、各コンポーネントの役割と相互作用、およびテストすべき主要なシナリオを特定する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/streaming/event-processor.ts`, `src/streaming/ndjson-parser.ts`, `src/streaming/playback-state.ts`, `src/streaming/prediction-manager.ts`

     実行内容: `src/streaming/` ディレクトリ内の主要なファイルについて、それぞれの役割、入力、出力、および相互作用を分析し、streaming機能全体のデータフローを説明してください。また、この分析に基づいて、手動テストまたは自動テストで検証すべき主要なユースケースやエラーケースを3つ提案してください。

     確認事項: `ndjson-streaming.ts` が全体のインターフェースとなること、および `demo/streaming.ts` がどのようにこれらのコンポーネントを使用しているかを考慮すること。

     期待する出力: Markdown形式で、streaming機能の主要コンポーネント間のデータフロー図（テキストベースで可）と、[Issue #89](../issue-notes/89.md) のテスト計画の基礎となる3つの主要テストシナリオのリスト。
     ```

3. `.github/workflows/call-check-large-files.yml` の設定レビューと改善点の検討
   - 最初の小さな一歩: `.github/workflows/call-check-large-files.yml` ワークフローの設定、特にファイルサイズしきい値、および `.github/actions-tmp/.github_automation/check-large-files/check-large-files.toml.default` との関連性を確認する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `.github/workflows/call-check-large-files.yml`, `.github/actions-tmp/.github_automation/check-large-files/README.md`, `.github/actions-tmp/.github_automation/check-large-files/check-large-files.toml.default`

     実行内容: `call-check-large-files.yml` ワークフローがどのように設定され、特にどのファイルサイズしきい値を使用しているか（またはデフォルト設定に依存しているか）を分析してください。また、このワークフローが検出した「大きいファイル」について、どのような報告メカニズムがあるのかを調べてください。

     確認事項: ワークフローが正しくトリガーされているか、しきい値がプロジェクトの現状に合致しているか、および large files の検出結果が開発者に適切に通知される仕組みがあるかを評価する。

     期待する出力: Markdown形式で、`call-check-large-files.yml` の現在の設定（特にしきい値と報告方法）の概要と、今後の改善点（例: プロジェクト固有の設定ファイルの使用、検出結果のIssue自動作成など）に関する簡単な提案。

---
Generated at: 2026-03-07 07:12:10 JST
