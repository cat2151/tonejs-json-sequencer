Last updated: 2026-03-04

# Development Status

## 現在のIssues
- NDJSONStreamingPlayerにおけるBPM同期と再生位置のずれ（[Issue #186](../issue-notes/186.md), [Issue #185](../issue-notes/185.md)）の問題が継続しており、修正作業が進められています。
- 複数の主要なTypeScriptファイル（`src/demo/streaming.ts`、`src/ndjson-streaming.ts`等）が500行を超えており、リファクタリングとテストの実装が求められています（[Issue #184](../issue-notes/184.md)）。
- 人力でのdemo-libの動作確認（[Issue #124](../issue-notes/124.md)）とstreaming機能のテスト（[Issue #89](../issue-notes/89.md)）が未完了です。

## 次の一手候補
1. [Issue #186](../issue-notes/186.md) および [Issue #185](../issue-notes/185.md) の最終確認とクローズ
   - 最初の小さな一歩: 関連するデモ（BPM180デモなど）を手動で実行し、再生位置の同期が正常に行われているか、およびBPM変更後の動作を確認する。必要であれば、追加のログやデバッグ情報を `src/demo/streaming.ts` に一時的に追加して検証する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/streaming.ts`, `src/ndjson-streaming.ts`, `src/utils/time-parser.ts`

     実行内容:
     1. `src/demo/streaming.ts` の `StreamingDemo.handleDebugMessage` メソッドに、`TimeParser` のBPM情報（`this.player.timeParser.bpm`）をログ出力するデバッグコードを一時的に追加してください。
     2. `src/ndjson-streaming.ts` において、`NDJSONStreamingPlayer.initializePlayback` メソッドで `TimeParser` のBPMが `Tone.Transport.bpm` と同期されていることを確認するためのデバッグログを追加してください。
     3. `src/utils/time-parser.ts` の `updateBPM` メソッドが意図通りに機能しているか、または不要な場合はその理由を分析してください。
     4. 現在のテストコードでこれらの修正がカバーされているか、テストプランを作成してください。

     確認事項:
     - デバッグコードは一時的なものであり、最終的には削除されることを前提とします。
     - `Tone.Transport.bpm` と `TimeParser` のBPMの同期が正しく行われていることを最優先で確認します。
     - 既存の再生機能やライブ編集機能に悪影響を与えないことを確認します。

     期待する出力:
     - 上記実行内容で追加・修正するデバッグログのコードスニペット。
     - `src/demo/streaming.ts` における手動テストの手順（どのシーケンスを再生し、どのBPMで何を確認するか）。
     - 関連するテストプランの提案（既存テストの修正案または新規テストケース）。
     - 作業完了後、[Issue #186](../issue-notes/186.md) と [Issue #185](../issue-notes/185.md) のクローズを検討するための報告。
     ```

2. [Issue #184](../issue-notes/184.md) の `src/demo/streaming.ts` へのテスト実装計画
   - 最初の小さな一歩: `src/demo/streaming.ts` の主要な機能（シーケンスのロード、再生/停止、ライブ編集時の更新、再生位置の視覚化、デバッグ出力）を洗い出し、それぞれの機能に対するテストケースの概要をMarkdown形式で記述する。特に `parseNDJSON` や `buildPlaybackTracks` のような純粋な関数部分を特定し、単体テストの可能性を評価する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/streaming.ts`, `src/ndjson-streaming.ts`

     実行内容:
     1. `src/demo/streaming.ts` の `StreamingDemo` クラスの主要なパブリックメソッドと、それらが依存するプライベートメソッドや外部モジュール（`NDJSONStreamingPlayer` など）を洗い出してください。
     2. `StreamingDemo` 内でテスト可能なユニット（特に純粋なロジック部分や、UIとの結合が少ない部分）を特定し、それらに対する単体テストのケース概要（入力、期待される出力、検証観点）をMarkdown形式で記述してください。
     3. `src/ndjson-streaming.ts` の `parseNDJSON` 関数は現在テストされているか確認し、されていない場合はテストケースの概要を記述してください。
     4. 既存のプロジェクト構造でJavaScript/TypeScriptのテストがどのように管理されているかを調査し、`src/demo/streaming.ts` のテストをどこに、どのようなツール（例: Vitest, Jest）で追加するのが適切か提案してください。

     確認事項:
     - テストケースは具体的な実装方法ではなく、テストの目的と検証観点を明確にすることに焦点を当てます。
     - UI操作に密接に関連する部分は、統合テストまたは手動テストの範囲として区別します。
     - テストフレームワークの選定は、既存プロジェクトの構成と互換性を考慮します。

     期待する出力:
     - `src/demo/streaming.ts` の主要機能とそれに対応するテストケース概要を記述したMarkdownドキュメント。
     - `parseNDJSON` のテスト状況とテストケース概要。
     - テストフレームワークの提案と、テストファイル配置の推奨パス。
     ```

3. [Issue #184](../issue-notes/184.md) の `src/demo/sequences/effectSequences.ts` のリファクタリング計画策定
   - 最初の小さな一歩: `src/demo/sequences/effectSequences.ts` の内容を分析し、肥大化の原因（例: 同様の構造を持つエフェクトの繰り返し定義）を特定する。冗長な部分を抽出し、データ駆動型のアプローチで共通化できるパターンを検討する。
   - Agent実行プロンプト:
     ```
     対象ファイル: `src/demo/sequences/effectSequences.ts`

     実行内容:
     1. `src/demo/sequences/effectSequences.ts` のコードを分析し、`sequenceDefinitions` 配列内の各 `SequenceDefinition` オブジェクトの構造と、`data` プロパティ内の `SequenceEvent` のパターンを詳細に調査してください。
     2. 複数のエフェクト定義間で繰り返されている共通のパターン（例: Synthノードの作成、特定のエフェクトノードの作成、toDestinationへの接続、似たような `triggerAttackRelease` イベントの並び）を特定してください。
     3. これらの共通パターンを抽出し、より簡潔な形式で表現するためのリファクタリング戦略を提案してください。例えば、エフェクトの種類ごとに共通の初期化関数を作成したり、`triggerAttackRelease` イベントのシーケンスを生成するヘルパー関数を導入したりする方法を検討してください。
     4. リファクタリングによってコードの可読性、保守性、拡張性がどのように向上するかを説明してください。

     確認事項:
     - リファクタリング後も、生成される `SequenceEvent` の構造と内容は元のファイルと同一であることを保証します。
     - 新しいヘルパー関数やデータ構造が、既存のデモ機能に悪影響を与えないことを確認します。
     - コードの行数を削減するだけでなく、理解しやすさも考慮に入れます。

     期待する出力:
     - `src/demo/sequences/effectSequences.ts` の肥大化の原因分析と、共通パターン抽出の具体的な例。
     - 提案するリファクタリング戦略の概要と、いくつかの具体的なリファクタリング例（疑似コードまたは実際のコードスニペット）。
     - リファクタリングによるメリットと、考慮すべきトレードオフについての説明。
     - リファクタリング後のファイル構成案。
     ```

---
Generated at: 2026-03-04 07:12:40 JST
