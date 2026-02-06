Last updated: 2026-02-07

# Development Status

## 現在のIssues
- デモページにはリポジトリへのリンクがなく、一部のリンクは404エラーとなるため、UI/UXの改善とリンク修正 ([Issue #128](../issue-notes/128.md), [Issue #127](../issue-notes/127.md)) が必要です。
- Streaming機能において、ループ演奏時に間が空いてしまうバグ ([Issue #125](../issue-notes/125.md)) が存在し、その原因究明と修正が進行中または必要です。
- demo-lib ([Issue #124](../issue-notes/124.md)) および streaming ([Issue #89](../issue-notes/89.md)) 機能の人力による動作確認が未実施です。

## 次の一手候補
1.  Demoページへのリポジトリリンク追加と404リンク修正 ([Issue #128](../issue-notes/128.md), [Issue #127](../issue-notes/127.md))
    -   最初の小さな一歩: `demo/styles.css` にリポジトリリンク表示のためのCSSを追加し、`demo/index.html` および `demo-library/index.html` にフッター部分のHTML要素と、demo-libraryからの404リンクを修正する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `demo/styles.css`, `demo/index.html`, `demo-library/index.html`, `demo-library/README.md`

        実行内容:
        1. `demo/styles.css` に、demoページ左下に半透明で表示されるリポジトリリンク用のCSSスタイル（クラス名`.repository-link-footer`）を追加してください。背景色、文字色、フォントサイズ、位置（fixed bottom-left）、透明度などの調整を含みます。
        2. `demo/index.html` と `demo-library/index.html` の各body要素の最後に、上記スタイルを適用したHTML要素として、GitHubリポジトリへのリンクと、`demo-library` から `demo` ページへのリンクを追加してください。
        3. `demo-library/README.md` と `demo-library/index.html` 内の、`demo` への相対リンクが壊れている箇所（例: `../demo/index.html` のようなパス）を修正し、デプロイ後のGitHub Pagesで正しく動作するように、適切な絶対パスや修正された相対パスに調整してください。

        確認事項:
        * 既存のCSSスタイルやHTMLレイアウトに意図しない影響がないことを確認してください。
        * GitHub Pagesでのデプロイを想定したリンクパスの修正が正しいことを確認してください。
        * 新規追加するリンクは、ページコンテンツと重ならないよう、Z-indexなどを考慮してください。

        期待する出力:
        上記変更を反映した`demo/styles.css`, `demo/index.html`, `demo-library/index.html`, `demo-library/README.md` の修正内容をMarkdown形式で出力してください。
        ```

2.  Streamingループ演奏バグの修正検証と原因究明 ([Issue #125](../issue-notes/125.md))
    -   最初の小さな一歩: `src/streaming/event-processor.ts` 内のループ処理に関連するロギングを詳細化し、`demo/streaming.html` にデバッグ情報を表示する部分を追加して、ループ時のイベント発行間隔のズレを可視化する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/streaming/event-processor.ts`, `demo/streaming.html`, `src/demo/streaming.ts`

        実行内容:
        1. `src/streaming/event-processor.ts` の `EventProcessor` クラス内で、特に `scheduleEvent` メソッドと、ループの開始・終了を処理する部分に、以下の情報をコンソール出力するデバッグログを追加してください：
           - `audioContext.currentTime` (現在のWeb Audio API時間)
           - スケジュールされるイベントの開始時間 (`startTime`)
           - ループ関連の内部状態（例: `loopEnd`, `loopStart`, `loopCount` など）
           - イベント間の計算された間隔（`inter-event spacing`）
           ログは、ループの検出、新しいループの開始、イベントスケジューリングの直前・直後で出力されるようにしてください。
        2. `demo/streaming.html` に、追加したデバッグログが表示されるように、既存の `#output` エリアとは別に新しい `<pre id="debugOutput"></pre>` 要素を追加してください。この要素はCSSで適切に配置・スタイリングし、見やすくしてください。
        3. `src/demo/streaming.ts` または `dist/demo/streaming.js` に、上記で追加したコンソールログを `debugOutput` エリアに表示するためのロジックを実装してください。
        4. TypeScriptファイルをコンパイルする対象となっているため、`dist` ディレクトリ内の対応するJavaScriptファイル群も更新が必要になります。具体的には `dist/cjs/streaming/event-processor.js`, `dist/esm/streaming/event-processor.mjs`, `dist/streaming/event-processor.js` も自動的に更新されるようにしてください。（通常、`tsc` コマンドやビルドプロセスで処理されますが、明示的に記述します）

        確認事項:
        * ログがパフォーマンスに大きな影響を与えないことを確認してください（開発時のみ有効化できるようなオプションがあればベターですが、まずはシンプルな追加で問題ありません）。
        * デバッグログが、ループ開始・終了時とイベントスケジュール時に正確なタイムスタンプと共に表示されることを確認してください。
        * `demo/streaming.html` のUIがデバッグ表示で崩れないことを確認してください。

        期待する出力:
        上記変更を反映した`src/streaming/event-processor.ts`, `demo/streaming.html`, `src/demo/streaming.ts` の修正内容、および更新された`dist`ファイルへの言及をMarkdown形式で出力してください。
        ```

3.  Streamingイベント処理の堅牢性向上とタイム精度確認
    -   最初の小さな一歩: `src/ndjson-streaming.ts` と `src/streaming/event-processor.ts` のコードを詳細に分析し、特にイベントのパース、キューイング、スケジューリングにおけるタイムアウトや遅延処理のロジックが、さまざまなネットワーク状況や負荷の下でどのように振る舞うかを把握する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: `src/ndjson-streaming.ts`, `src/streaming/event-processor.ts`, `src/event-scheduler.ts`

        実行内容:
        対象ファイルにおけるNDJSONストリーミングイベントのパース、キューイング、スケジューリング、そして実行の各フェーズについて、以下の観点から詳細に分析し、その処理フローと潜在的な課題（特にタイムアウトやネットワーク遅延、負荷増大時の挙動）をMarkdown形式で説明してください。
        1. イベントデータの読み込みとパースのメカニズム
        2. イベントキューへの追加と管理方法
        3. `audioContext.currentTime` を基準としたイベントスケジューリングのロジックと精度
        4. イベントが遅延したり、時間通りに処理されなかった場合のハンドリング（またはその欠如）
        5. `loopEnd`, `loopStart` といったループ関連の状態が、イベントスケジューリングにどのように影響するか

        確認事項:
        * 各ファイルの主要なクラスや関数の役割を正確に理解し、分析に反映してください。
        * コードコメントや既存のドキュメントがあれば、それらも参考にしてください。
        * 実行環境（ブラウザ、Node.jsなど）におけるWeb Audio APIの動作特性も考慮に入れてください。

        期待する出力:
        分析結果を以下のセクションに分けてMarkdown形式で記述してください。
        - ## NDJSONストリーミングイベント処理フローの分析
          - ### 1. イベントデータの読み込みとパース
          - ### 2. イベントキューとスケジューリング
          - ### 3. タイムアウト、遅延、負荷時の挙動
          - ### 4. ループ処理とイベントスケジューリングへの影響
          - ### 5. 潜在的な課題と改善の方向性
        ```

---
Generated at: 2026-02-07 07:09:46 JST
