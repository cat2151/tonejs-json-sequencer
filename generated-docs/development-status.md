Last updated: 2026-02-06

# Development Status

## 現在のIssues
-   [Issue #120](../issue-notes/120.md)では、デモページ（streaming.html）が`dist/demo/streaming.js`ファイルを見つけられず404エラーが発生しており、デモ機能が利用できない状況です。
-   [Issue #118](../issue-notes/118.md)と関連する[Issue #119](../issue-notes/119.md)では、`tonejs-mml-to-json`リポジトリの最近の変更に合わせ、ループの明示的な境界を示す`loopEnd`イベントへの対応が必要です。
-   [Issue #89](../issue-notes/89.md)は、streaming機能の動作を人手で確認し、その安定性と正確性を検証するタスクとしてオープンされています。

## 次の一手候補
1.  [Issue #120](../issue-notes/120.md) デモページのエラーを解消する
    -   最初の小さな一歩: ローカル環境でプロジェクトをビルドし、`dist/demo/streaming.js`が期待されるパスに正しく生成されているか、および`demo/streaming.html`からの参照パスが正しいかを確認します。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `package.json`, `tsconfig.json`, `src/demo/streaming.ts`, `demo/streaming.html`, `scripts/copy-to-dist.js`, `.github/workflows/deploy-pages.yml`

        実行内容: プロジェクトのビルドプロセスとGitHub Pagesのデプロイ設定を分析し、`src/demo/streaming.ts`がどのようにビルドされ、`dist/demo/streaming.js`として出力されるか、また`demo/streaming.html`からの相対パスが正しいかを確認してください。特に、`dist/demo/streaming.js`がGitHub Pagesのデプロイ対象に含まれているか、またはビルド時に正しくコピーされているかを特定し、404エラーの原因を究明してください。

        確認事項:
        - `package.json`の`scripts`セクションにあるビルドコマンドと、`tsconfig.json`の`outDir`設定の確認。
        - `scripts/`ディレクトリ内のファイルコピーや名前変更に関するスクリプト（もしあれば）の動作確認。
        - `demo/streaming.html`における`script`タグの`src`属性のパスが、ビルド後のファイルパスと一致しているか。
        - `.github/workflows/deploy-pages.yml`において、`dist/demo/streaming.js`がデプロイ対象として含まれているか。

        期待する出力:
        - `dist/demo/streaming.js`がビルドによって生成されるべきパスと、現在のビルドプロセスおよびデプロイ設定で実際に出力・配置されるパスを示す詳細な分析レポートをMarkdown形式で出力してください。
        - もしパスの不一致やファイル欠落の可能性がある場合、その修正方針を提案してください。
        ```

2.  [Issue #118](../issue-notes/118.md) `loopEnd` イベントに対応する
    -   最初の小さな一歩: `tonejs-mml-to-json`リポジトリの関連PR（[Issue #119](../issue-notes/119.md)で言及されている）の内容を特定し、`loopEnd`イベントがどのような形式で出力されるのか、およびそれが既存のイベント処理にどのように影響するかを調査します。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/streaming/event-processor.ts`, `src/ndjson-streaming.ts`, `src/types.ts`, `dist/esm/ndjson-streaming.mjs`, `dist/cjs/ndjson-streaming.js`

        実行内容:
        1. `tonejs-mml-to-json`リポジトリの`loopEnd`イベントに関するPRの内容を調査し、`loopEnd`イベントの構造と意図を理解してください。
        2. 現在の`NDJSONStreamingPlayer` (`src/ndjson-streaming.ts`) がどのようにイベントを処理しているか、特にループ関連のロジック (`onLoopComplete`など) を分析してください。
        3. `loopEnd`イベントを既存のストリーミング再生ロジックに統合するための変更点を洗い出し、特に`src/types.ts`における型定義の変更が必要か検討してください。

        確認事項:
        - `loopEnd`イベントが既存のノートイベントやコントロールイベントとどのように共存するか。
        - ループの開始点と終了点の計算ロジックにどのような影響を与えるか。
        - 後方互換性への影響と、その対策案。

        期待する出力:
        - `loopEnd`イベントの仕様と、それを`NDJSONStreamingPlayer`に組み込むための詳細な設計案をMarkdown形式で出力してください。
        - 設計案には、影響を受けるクラス、メソッド、および既存のテストへの影響に関する考察を含めてください。
        - もし`src/types.ts`の更新が必要な場合は、その変更も提案してください。
        ```

3.  [Issue #89](../issue-notes/89.md) streaming機能の手動テスト計画を策定する
    -   最初の小さな一歩: `demo/streaming.html`とその背後にある`src/demo/streaming.ts`のコードを概観し、現状のstreaming機能が提供している主要なインタラクションと設定オプションをリストアップします。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `demo/streaming.html`, `src/demo/streaming.ts`, `README.md` (テストに関する記述があれば)

        実行内容:
        1. `demo/streaming.html`で提供されている機能（ライブ編集、ループ再生、デバッグモード、更新反映方式など）と、`src/demo/streaming.ts`のコードを分析し、streamingデモがどのようなシナリオでテストされるべきかを特定してください。
        2. 特に、主要な機能ごとにテストケースを考案し、[Issue #120](../issue-notes/120.md)が解決され、デモが動作することを前提とした手動テスト計画を策定してください。
        3. 基本的な再生動作、編集時の動作、ループ時の動作、エラー時の挙動などの確認項目を明確にしてください。

        確認事項:
        - 各機能（再生、停止、ループ、ライブ編集、デバッグ表示、更新モード切替など）が意図通りに動作するか。
        - ユーザーインターフェースが適切に反応するか、およびエラーハンドリングが適切か（例：不正なNDJSON入力時）。
        - [Issue #118](../issue-notes/118.md)対応後であれば、`loopEnd`イベントも正しく処理されているか。

        期待する出力:
        - streaming機能の手動テスト計画書をMarkdown形式で出力してください。
        - テスト計画書には、各テストシナリオ、期待される結果、および具体的な手順を含めてください。
        - 将来的な自動テスト導入に向けた検討事項があれば、それも記述してください。
        ```

---
Generated at: 2026-02-06 07:12:25 JST
