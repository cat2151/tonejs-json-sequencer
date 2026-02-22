Last updated: 2026-02-23

# Development Status

## 現在のIssues
- NDJSON欄を書き換えても楽器の音色が即座に反映されず、再生し直さないと変更が適用されないというstreaming demoの不具合 ([Issue #180](../issue-notes/180.md)) がオープンしています。
- `demo-lib`が正しく動作することを確認するための手動テスト ([Issue #124](../issue-notes/124.md)) が必要です。
- `streaming`機能の全体的な動作と安定性を確認するための手動テスト ([Issue #89](../issue-notes/89.md)) が求められています。

## 次の一手候補
1.  [Issue #180](../issue-notes/180.md): streaming demoでの楽器変更の即時反映問題を解決する
    -   最初の小さな一歩: `src/demo/streaming.ts`、`src/streaming/event-processor.ts`、`src/streaming/playback-state.ts`を分析し、NDJSON更新後の楽器インスタンスのライフサイクルと、オーディオコンテキストへの反映メカニズムを把握する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: src/demo/streaming.ts, src/streaming/event-processor.ts, src/streaming/playback-state.ts

        実行内容: `streaming`デモにおいて、NDJSON欄の書き換え後に楽器の音色が即座に反映されず、再生し直さないと変更が適用されない問題（[Issue #180](../issue-notes/180.md)）の原因を特定するため、以下の点を分析してください：
        1) NDJSONのパースと楽器インスタンスの生成・更新ロジック。
        2) `event-processor.ts`が既存の楽器インスタンスを再利用しているか、あるいは新しいインスタンスに切り替えるメカニズム。
        3) `playback-state.ts`における楽器状態の管理と、それがオーディオコンテキストにどのように反映されるか。
        4) 特に、`Synth`から`FMSynth`への変更が、再生中のシーケンスにどのように影響するか。
        分析結果を、問題の根本原因を特定するための仮説と共にmarkdown形式で出力してください。

        確認事項: 既存の`Tone.js`インスタンスがどのように管理され、新しい設定が適用されるか、特に`Tone.Transport`の状態とイベントキューへの影響を確認してください。また、関連する先行事例（`tonejs-step-sequencer`のissue #98）で示唆される修正点も考慮に入れてください。

        期待する出力: `streaming`デモにおける楽器変更の即時反映に関する問題の原因仮説、およびその検証方法を含む詳細な分析結果をmarkdown形式で出力してください。
        ```

2.  [Issue #124](../issue-notes/124.md): `demo-lib`の動作確認計画を策定する
    -   最初の小さな一歩: `demo-library/README.md`と`demo-library/index.html`を調査し、`demo-library`の意図された使用方法、依存関係、および基本的な構成要素を特定する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: demo-library/README.md, demo-library/index.html, package.json, src/demo/**/*.ts

        実行内容: `demo-library`の動作確認を行うために、その構造と依存関係を分析し、動作確認に必要な情報と手順をまとめてください。具体的には：
        1) `demo-library`の目的と想定される利用方法。
        2) `index.html`がどのように他のデモファイルを読み込んでいるか。
        3) `package.json`から推測されるビルドや実行に関する依存関係。
        4) 動作確認を行う上で考慮すべき点や、事前に準備すべき環境設定（もしあれば）。
        結果をmarkdown形式で出力してください。

        確認事項: `demo-library`がプロジェクトの他の`demo`ディレクトリ (`demo/`) とどのように連携しているか、または独立しているかを確認してください。また、ビルドプロセスが`dist/demo`以下に正しくファイルを生成しているかも考慮してください。

        期待する出力: `demo-library`の動作確認手順書をmarkdown形式で生成してください。これには、セットアップ方法、テストシナリオの提案、期待される動作に関する説明を含めてください。
        ```

3.  [Issue #89](../issue-notes/89.md): `streaming`機能の包括的なテスト計画を策定する
    -   最初の小さな一歩: `src/demo/streaming.ts`と`demo/streaming.html`をレビューし、`streaming`機能の主要な要素（NDJSONの読み込み、イベント処理、再生制御）と、ユーザーが操作可能なインタフェースを特定する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: src/demo/streaming.ts, demo/streaming.html, src/streaming/event-processor.ts, src/streaming/playback-state.ts

        実行内容: `streaming`機能（[Issue #89](../issue-notes/89.md)）のテスト計画を作成するために、以下の点を分析してください：
        1) `streaming.html`のUI要素と、`streaming.ts`がそれらをどのように制御しているか。
        2) NDJSONストリームのデータ形式とその処理ロジック。
        3) リアルタイムでのイベントスケジューリングと再生ロジック。
        4) 楽器の動的な変更（[Issue #180](../issue-notes/180.md)のようなシナリオを含む）と、その反映状況。
        5) 再生の開始、停止、一時停止、シークといった基本操作。
        結果をmarkdown形式で出力してください。

        確認事項: `event-processor.ts`がイベントを効率的かつ正確に処理しているか、`playback-state.ts`が再生状態を適切に管理しているかを確認してください。また、ネットワーク遅延や大量のイベントがストリームされた場合の挙動も考慮に入れてください。

        期待する出力: `streaming`機能の包括的なテストシナリオと、各シナリオで検証すべき項目をリストアップしたテスト計画書をmarkdown形式で出力してください。
        ```

---
Generated at: 2026-02-23 07:10:03 JST
