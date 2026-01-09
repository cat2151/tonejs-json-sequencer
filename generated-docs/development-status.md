Last updated: 2026-01-10

# Development Status

## 現在のIssues
- [Issue #14](../issue-notes/14.md) は、最新のリリースにおいてCDNへのライブラリ登録状況の確認が主要なタスクです。
- 特に、`tonejs-json-sequencer`の`mjs`ファイルがブラウザから404エラーなく利用可能かを確認する必要があります。
- これは、公開されたライブラリがユーザーに正しく配信され、期待通りに動作することを保証するために不可欠な検証作業です。

## 次の一手候補
1.  [Issue #14](../issue-notes/14.md) CDN配信の動作確認とmjsファイルの検証
    -   最初の小さな一歩: CDNから直接 `mjs` ファイルへのアクセスを試み、ブラウザの開発者ツールでネットワークリクエストとレスポンスを確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `examples/cdn-example.html`, `package.json`, `.github/workflows/release.yml`

        実行内容: `package.json` に記載されている最新バージョン情報と `.github/workflows/release.yml` のCDN関連設定（unpkg, jsdelivrなど）に基づき、CDNから公開されている`tonejs-json-sequencer`の`mjs`ファイルを特定してください。その後、`examples/cdn-example.html`がその`mjs`ファイルを正常に読み込めるか、あるいは直接ブラウザでURLを開いて404エラーが発生しないかを確認するための具体的な手順とURLをmarkdown形式で出力してください。

        確認事項: `package.json`の`version`フィールドが最新であること。`.github/workflows/release.yml`で定義されているCDNへのデプロイが成功していること。

        期待する出力: CDN上の`mjs`ファイルへの直接リンク、およびそのファイルがブラウザで正常に表示される（またはダウンロードされる）ことを確認するためのステップを含むmarkdownドキュメント。
        ```

2.  [Issue #14](../issue-notes/14.md) `package.json`と`release.yml`におけるCDN関連情報の整合性確認
    -   最初の小さな一歩: `package.json`内の`unpkg`および`jsdelivr`フィールドの記述が、実際のCDNパスと一致しているかを目視で確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `package.json`, `.github/workflows/release.yml`

        実行内容: `package.json`内の`unpkg`および`jsdelivr`フィールドに記述されているパスと、`.github/workflows/release.yml`がCDNへデプロイするファイルのパスとの間に不整合がないかを確認してください。特に、リリースされたバージョンのディレクトリ構造とファイル名がCDNの期待する形式に合致しているかを分析し、もし不整合があれば修正案を提案してください。

        確認事項: `package.json`の`main`, `module`, `unpkg`, `jsdelivr`フィールドの存在と書式。`.github/workflows/release.yml`におけるビルド成果物のパスとデプロイ先のパス。

        期待する出力: 分析結果と、もし不整合があればその修正提案をmarkdown形式で出力してください。
        ```

3.  [Issue #14](../issue-notes/14.md) `examples/cdn-example.html`の動作確認と更新
    -   最初の小さな一歩: `examples/cdn-example.html`をローカルで開き、ブラウザのコンソールにエラーが出ていないか、機能が動作しているかを確認する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `examples/cdn-example.html`, `src/sampleData.js`

        実行内容: `examples/cdn-example.html`がCDNから`tonejs-json-sequencer`を正しく読み込み、`src/sampleData.js`で定義されているサンプルのデータを適切に利用して機能することを確認してください。必要であれば、最新のCDNパスを反映させるために`cdn-example.html`を更新し、動作検証のための簡単な指示を追加してください。

        確認事項: `examples/cdn-example.html`内のスクリプトタグで参照されているCDN URLが最新のバージョンを指しているか。依存関係がすべて解決されているか。

        期待する出力: `examples/cdn-example.html`が正しく動作することを確認した旨の報告、および必要であれば更新された`examples/cdn-example.html`の内容（コードブロック形式）。
        ```

---
Generated at: 2026-01-10 07:09:21 JST
