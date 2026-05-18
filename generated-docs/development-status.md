Last updated: 2026-05-19

# Development Status

## 現在のIssues
- 現在、[Issue #124](../issue-notes/124.md)でdemo-libの動作確認が、[Issue #89](../issue-notes/89.md)でstreaming機能のテストが、それぞれ人力での検証が求められています。
- これら2つのオープンIssueは、手動での確認とテストが中心であり、プロジェクト全体として自動化されたテストや検証体制の強化が望まれます。
- 特に、重要なデモ機能とストリーミング機能の安定性確保には、体系的な検証が不可欠です。

## 次の一手候補
1.  [Issue #124](../issue-notes/124.md): demo-libの動作確認と自動化されたテストの検討
    -   最初の小さな一歩: `demo-library/index.html` をブラウザで開き、基本的な機能（例: 音声再生、UI操作）が期待通りに動作するかを手動で確認し、現状の問題点を洗い出す。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `demo-library/index.html`, `demo-library/README.md`, `src/demo/` 以下の関連ファイル（特に `src/demo/main.ts`, `src/demo/sequenceLoader.ts`）

        実行内容: `demo-library`がどのように動作するのか、主要なコンポーネントとその相互作用を分析してください。特に、どのJavaScriptファイルやCSSが読み込まれ、どのように初期化され、Tone.jsのインスタンスが利用されているかを調査し、現状の動作を把握してください。

        確認事項: `demo-library`が依存する`dist/`内のファイルパスが正しいか、サンプルコードが意図通りに動くか、ブラウザのコンソールにエラーが表示されていないか。

        期待する出力: `demo-library`の現状の動作概要と、手動テストに必要な具体的な手順書をmarkdown形式で出力してください。また、将来的には自動テストを導入するための検討課題も示してください。
        ```

2.  [Issue #89](../issue-notes/89.md): streaming機能のテスト戦略策定
    -   最初の小さな一歩: `src/streaming/` ディレクトリ内の主要なファイル（`event-processor.ts`, `ndjson-parser.ts`, `playback-state.ts`, `prediction-manager.ts`）を読み、それぞれのファイルが担当する役割と、全体としてのストリーミング処理の流れを概観する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/streaming/event-processor.ts`, `src/streaming/ndjson-parser.ts`, `src/streaming/playback-state.ts`, `src/streaming/prediction-manager.ts`, `src/ndjson-streaming.ts`, `src/demo/streaming.ts`

        実行内容: Streaming機能の主要コンポーネントと、それらがどのように連携してNDJSONデータから音声を生成・再生しているかを分析してください。特に、NDJSONデータのパース、イベントのスケジューリング、再生状態の管理、および予測メカニズムのフローを詳細に把握してください。

        確認事項: `src/ndjson-streaming.ts`と`src/streaming/`下のファイル間の依存関係、および`dist/esm/streaming/`内のコンパイル結果との整合性。既存のデモ (`src/demo/streaming.ts`) がどのようにストリーミング機能を利用しているか。

        期待する出力: Streaming機能のアーキテクチャ図（簡単なテキストベースで可）と、既存のテストがない場合に、主要なコンポーネントやフローをカバーするためのテストケースを設計するためのポイント（何をテストすべきか、テストデータの例など）をmarkdown形式で出力してください。
        ```

3.  GitHub ActionsにおけるLLM生成物の信頼性向上策の検討
    -   最初の小さな一歩: 過去の関連Issueノート（`issue-notes/4.md`, `issue-notes/9.md`, `issue-notes/24.md`）を再読し、LLMのハルシネーションやエラー隠蔽、リトライ不足といった問題が具体的にどのワークフローやスクリプトで発生し、どのような影響があったかをまとめる。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `.github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs`, `.github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md`, `issue-notes/4.md`, `issue-notes/9.md`, `issue-notes/24.md`

        実行内容: 過去のIssueノートで指摘されたGitHub ActionsのLLMハルシネーションとエラー発生事例を分析し、それがどのワークフローやスクリプト、プロンプト設計に起因している可能性が高いかを特定してください。特に、LLMによって生成される情報の信頼性を向上させるための具体的なアプローチ（例: 出力フォーマットの厳格なスキーマ定義とバリデーション、生成前のコンテキスト情報の精緻化、複数モデルによるクロスチェック、失敗時の詳細なログ記録と通知メカニズム）について検討してください。

        確認事項: 既存のワークフロー（例: `daily-project-summary.yml`）でのLLM呼び出し箇所、そのプロンプトの内容、および生成された出力の利用方法。過去のコミットログやアクションの実行履歴でエラー発生時の具体的な挙動。

        期待する出力: LLM生成物の信頼性を向上させるための具体的な改善案リストをmarkdown形式で出力してください。それぞれの案について、実装の難易度（高/中/低）と、期待される効果を簡潔に記述してください。

---
Generated at: 2026-05-19 07:28:11 JST
