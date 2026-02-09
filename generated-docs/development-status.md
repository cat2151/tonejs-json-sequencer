Last updated: 2026-02-10

# Development Status

## 現在のIssues
- 現在オープン中の主要なタスクとして、[Issue #124](../issue-notes/124.md)でdemo-libの動作確認、[Issue #89](../issue-notes/89.md)でstreaming機能のテストがそれぞれ人力での実施を必要としています。
- 最近のコミットでは、デモライブラリの404エラー修正やエフェクト（chorus, LPFなど）の機能改善が進められ、コードベースの品質が向上しています。
- これらの進捗を踏まえ、残る人力テストを効率的に実施しつつ、さらなる自動化と品質保証の強化が次の焦点となります。

## 次の一手候補
1.  [Issue #124](../issue-notes/124.md) demo-libの動作確認を完了する
    - 最初の小さな一歩: `demo/index.html`、`demo/offline-rendering.html`、`demo/streaming.html` の各デモページをブラウザで開き、最近修正された `demo-library` への相対リンクが正しく機能しているか、およびデモが意図通りに動作しているかを目視で確認する。
    - Agent実行プロンプ:
      ```
      対象ファイル: `demo/index.html`, `demo/offline-rendering.html`, `demo/streaming.html`, `demo-library/index.html`, `issue-notes/124.md`

      実行内容: `issue-notes/124.md` に記載されている「demo-libの動作確認」の現状を把握するため、最近のコミット `5bfb766` (`Fix demo-library 404: correct relative link paths in demo HTML files`) による変更と、`demo/` ディレクトリ内のHTMLファイルから `demo-library/` ディレクトリ内のリソースへの参照が正しい相対パスになっているかを分析してください。

      確認事項: `_config.yml` がGitHub PagesのベースURL設定に影響を与える可能性があるため、その内容も確認し、相対パスの解決に影響がないかを考慮してください。ブラウザでの手動確認をサポートするための具体的な確認項目をリストアップしてください。

      期待する出力: 現在のデモHTMLファイル (`demo/*.html`) から `demo-library` 内のリソース (`demo-library/*.html`) への相対パスが正しいかを評価したレポートをmarkdown形式で出力してください。また、もし問題があれば具体的な修正案、または手動テストのためのチェックリストを提示してください。
      ```

2.  [Issue #89](../issue-notes/89.md) streaming機能のテスト計画を具体化し、実行する
    - 最初の小さな一歩: `demo/streaming.html` をブラウザで開き、Streaming Demomの基本的な再生、停止、NDJSONストリームからのイベント処理が機能しているかを目視で確認し、問題点をメモする。
    - Agent実行プロンプ:
      ```
      対象ファイル: `src/streaming/event-processor.ts`, `src/streaming/playback-state.ts`, `src/ndjson-streaming.ts`, `demo/streaming.html`, `issue-notes/89.md`

      実行内容: `issue-notes/89.md` にある「streamingのtest」タスクの実行を支援するため、`src/streaming` 関連ファイルおよび `demo/streaming.html` の構造を分析し、どのようなテストケースが考えられるかをリストアップしてください。特に、イベントの正確な処理、再生状態の管理、NDJSONストリームのパースにおける潜在的な課題に焦点を当ててください。

      確認事項: `package.json` のスクリプトや既存のテストフレームワーク（もしあれば）を確認し、追加テストの導入が容易であるか、またはどのようなアプローチでテストを進めるべきかを検討してください。`dist/demo/streaming.js` が `src/demo/streaming.ts` からビルドされている点も考慮し、ビルド後の挙動に影響がないか確認してください。

      期待する出力: streaming機能の包括的なテスト計画案をmarkdown形式で出力してください。これには、主要なテスト項目（例: シーク、ループ、速度変更）、手動で確認すべき詳細な手順、および将来的に自動テストとして導入を検討できる点を具体的に含めてください。
      ```

3.  GitHub Pagesデプロイ後のデモページリンク切れを自動チェックするワークフローを導入する
    - 最初の小さな一歩: プロジェクト内の `demo/**/*.html` および `_config.yml` を分析し、GitHub Pagesにデプロイされた際に生成されるデモページのURL構造と、そこに含まれる内部・外部リンクのパターンを特定する。
    - Agent実行プロンプ:
      ```
      対象ファイル: `.github/workflows/deploy-pages.yml`, `demo/**/*.html`, `_config.yml`, `package.json`

      実行内容: GitHub Pagesにデプロイされているデモページ (`demo/` ディレクトリ配下のHTMLファイル) の内部リンクおよび外部リソースリンク (`src`, `href`) が有効であるかを自動でチェックするGitHub Actionsワークフローの草案を作成してください。このワークフローは、既存の `deploy-pages.yml` とは独立して、定期的に実行されることを想定します。

      確認事項:
      1.  GitHub PagesのURL構造 (`_config.yml`の `baseurl` 設定など) を正しく考慮し、絶対パス/相対パスの解決を適切に行えるツール（例: `lychee-link-checker`や`htmltest`など）を選定すること。
      2.  外部CDNやJavaScriptファイルへのリンク切れチェックも可能であること。
      3.  既にデプロイされている公開ページに対して実行可能であること（デプロイ後のチェック）。
      4.  必要なnpmパッケージやGitHub Actionsのステップを適切に含めること。

      期待する出力: 提案されたリンクチェックワークフローの `yml` ファイルの内容をmarkdown形式で出力してください。このファイルは `.github/workflows/check-demo-links.yml` として配置することを想定します。また、ワークフロー内で使用する可能性のある追加のスクリプトやツールの選定理由と、その使用方法についても簡潔に記述してください。
      ```

---
Generated at: 2026-02-10 07:18:17 JST
