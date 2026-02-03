Last updated: 2026-02-04

# Development Status

## 現在のIssues
- [Issue #97](../issue-notes/97.md) は、デモのデプロイ先が`demo/`になっているため、プロジェクトルートに移動しユーザーの混乱を防ぐことを目指しています。
- [Issue #90](../issue-notes/90.md) は、BPMなどの未実装要素を洗い出し、`README.ja.md`にロードマップとして反映することを求めています。
- [Issue #87](../issue-notes/87.md) と [Issue #88](../issue-notes/88.md) は、それぞれJSONでテンポ（BPM）と指定ノードの音量を変更できるようにする機能追加です。

## 次の一手候補
1.  [Issue #87](../issue-notes/87.md): tempo（BPM）をJSONで指定できるようにする
    -   最初の小さな一歩: `src/types.ts`に`setTempo`イベントの型定義を追加し、`src/streaming/event-processor.ts`でそのイベントを処理するための仮実装（`Tone.Transport.bpm.value = tempoValue;`）を追加する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `src/types.ts`, `src/streaming/event-processor.ts`, `src/event-scheduler.ts`

        実行内容: `src/types.ts`に新しい`eventType`として`setTempo`を追加し、`payload`に`value: number`（BPM値）を含む型定義を行ってください。次に、`src/streaming/event-processor.ts`の`scheduleOrExecuteEvent`メソッド内で`setTempo`イベントを処理するための条件分岐と仮実装として`Tone.Transport.bpm.value = tempoValue;`を追加してください。同様に、`src/event-scheduler.ts`の`playSequence`関数内でも`setTempo`イベントを処理するロジックを追加してください。

        確認事項: Tone.jsの`Tone.Transport.bpm`プロパティの正確な使用法を確認し、既存のスケジューリングロジック（`scheduleOrExecuteEvent`および`playSequence`）との整合性を保つこと。また、NDJSONストリーミングでのリアルタイムなテンポ変更が機能するかを考慮してください。

        期待する出力: 上記ファイルの修正案をmarkdown形式で出力してください。追加・変更箇所が明確にわかるように、具体的なコードスニペットと説明を含めてください。
        ```

2.  [Issue #88](../issue-notes/88.md): JSONで、指定したnodeの音量を変更できるようにする
    -   最初の小さな一歩: `src/types.ts`に音量変更用の`setVolume`イベントの型定義を追加し、`src/sequencer-nodes.ts`に指定ノードの音量を設定する公開メソッドを準備する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `src/types.ts`, `src/sequencer-nodes.ts`, `src/streaming/event-processor.ts`, `src/event-scheduler.ts`

        実行内容: `src/types.ts`に新しい`eventType`として`setVolume`を追加し、`payload`に`nodeId: number`と`value: number`（音量値）を含む型定義を行ってください。`src/sequencer-nodes.ts`に、`nodeId`で指定されたTone.jsノードの`volume.value`を設定する`setNodeVolume(nodeId: number, value: number)`という公開メソッドを追加してください。その後、`src/streaming/event-processor.ts`と`src/event-scheduler.ts`で`setVolume`イベントを処理するロジックを実装し、`SequencerNodes`の新しい`setNodeVolume`メソッドを呼び出すように修正してください。

        確認事項: Tone.jsの各ノードが`volume`プロパティを持っているか、または`Gain`ノードなどを経由して音量を制御する必要があるかを確認してください。既存のイベント処理フローと`SequencerNodes`クラスの役割との整合性を保つこと。

        期待する出力: 上記ファイルの修正案をmarkdown形式で出力してください。追加・変更箇所が明確にわかるように、具体的なコードスニペットと説明を含めてください。
        ```

3.  [Issue #90](../issue-notes/90.md): 直近でtempo（BPM）等が未実装だったように、未実装な要素を洗い出して、README.ja.mdにロードマップとして反映する
    -   最初の小さな一歩: `README.ja.md`と`docs/tonejs-components-roadmap.ja.md`の内容を精査し、未実装とされている機能やコンポーネントの現状をリストアップする。
    -   Agent実行プロンプ:
        ```
        対象ファイル: `README.ja.md`, `docs/tonejs-components-roadmap.ja.md`

        実行内容: `README.ja.md`の「ロードマップ」セクションおよび「Tone.js コンポーネントのJSON対応」セクション（特に「計画中」「今後検討予定」）、さらに`docs/tonejs-components-roadmap.ja.md`の内容を詳細に分析してください。現在未実装とされている機能やコンポーネントを網羅的にリストアップし、そのリストに基づいて`README.ja.md`の「ロードマップ」セクションをより詳細かつ体系的に更新する提案を行ってください。また、`docs/tonejs-components-roadmap.ja.md`の「実装の優先順位と計画」も合わせて更新し、最新のプロジェクト状況を反映させるための変更案を提示してください。

        確認事項: `README.ja.md`内の他のセクション（「状況」「3行で説明」「Why」「Design Philosophy」など）との整合性を保つこと。`docs/tonejs-components-roadmap.ja.md`との情報重複や食い違いがないかを確認し、両ドキュメント間で一貫した情報が提供されるようにしてください。

        期待する出力: 更新された`README.ja.md`と`docs/tonejs-components-roadmap.ja.md`の`ロードマップ`部分のmarkdown形式での提案を出力してください。変更前後で何がどのように変わるのかを明確に示すために、差分形式や具体的な更新内容の説明を含めてください。
        ```

---
Generated at: 2026-02-04 07:14:03 JST
