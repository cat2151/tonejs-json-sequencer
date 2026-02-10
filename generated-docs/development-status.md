Last updated: 2026-02-11

# Development Status

## 現在のIssues
- [Issue #162](../issue-notes/162.md): streaming demoにおいて、NDJSONの各行が予約処理された瞬間に、対応するUI要素を200ms緑色に点灯させる可視化機能の追加が求められています。
- [Issue #124](../issue-notes/124.md): `demo-lib`が意図通りに機能しているか、手動での動作確認が必要です。
- [Issue #89](../issue-notes/89.md): streaming機能の全体的な健全性を保証するため、手動でテストを実施する必要があります。

## 次の一手候補
1. [Issue #162](../issue-notes/162.md): streaming demoにおけるNDJSON行の予約処理可視化を実装する
   - 最初の小さな一歩: `src/demo/streaming.ts`内でNDJSONイベントをDOM要素にマッピングし、再生タイミングでCSSクラスを適用するロジックを特定する。
   - Agent実行プロンプ:
     ```
     対象ファイル: src/demo/streaming.ts, demo/streaming-demo.css

     実行内容: streaming demoにおいて、NDJSONの各行が予約処理された際に、その行に対応するHTML要素に一時的にCSSクラスを適用してハイライトする機能の実装方法を分析してください。具体的には、`src/demo/streaming.ts`内でイベント処理とDOM更新ロジックを特定し、200msの間ハイライトするためのCSSクラス（例: `.highlight-green`）を`demo/streaming-demo.css`に追加する案を含めてください。

     確認事項:
     - 各NDJSON行がDOM内のどの要素と対応付けられているか。
     - `Tone.js`のスケジュールイベントとDOM更新を同期させるための適切なタイミング。
     - 既存のCSSスタイルとの競合がないか。
     - 実際の予約処理が行われる正確なコード箇所。

     期待する出力:
     - `src/demo/streaming.ts`の変更箇所を示すコードスニペットと、その変更理由。
     - `demo/streaming-demo.css`に追加する`.highlight-green`クラスのCSS定義例（200msで背景色を緑に変えるアニメーションを含む）。
     - これらの変更による効果と実装上の注意点をMarkdown形式で出力してください。
     ```

2. [Issue #124](../issue-notes/124.md) & [Issue #89](../issue-notes/89.md): `demo-library`と`streaming`デモの手動テスト計画を策定する
   - 最初の小さな一歩: `demo-library/index.html`と`demo/streaming.html`の現在の構成、および`src/demo/`配下のデモスクリプトを分析し、テスト対象となる主要な機能とインタラクションポイントを洗い出す。
   - Agent実行プロンプ:
     ```
     対象ファイル: demo-library/index.html, demo-library/README.md, demo/streaming.html, src/demo/**/*.ts

     実行内容: `demo-library`と`streaming`デモについて、手動テストを効率的に実施するためのテスト計画初期ドラフトをMarkdown形式で生成してください。以下の観点を含めてください：
     1. テストすべき主要機能とシナリオ（例: 楽器の読み込み、エフェクトの適用、シーケンス再生、ストリーミングイベント処理）。
     2. 各シナリオにおける具体的な確認項目と期待される挙動。
     3. テストの優先順位付けと、将来的な自動化の可能性に関する考察。

     確認事項:
     - 各デモの依存関係（`Tone.js`コンポーネント、外部リソースなど）。
     - ユーザーがデモを操作する際の主要なUI要素とインタラクション。
     - エラーが発生した場合の表示や挙動。

     期待する出力: `demo-library`および`streaming`デモの手動テスト計画初期ドラフトをMarkdown形式で出力してください。各機能ごとに具体的なテスト手順と期待結果を記述し、テスト環境構築に関する簡単な提案も含めてください。
     ```

3. `src/demo/effect/`内のエフェクトデモコードのスタイルと整合性を向上させる
   - 最初の小さな一歩: `src/demo/effect/`ディレクトリ内のTypeScriptファイルをリストアップし、`src/demo/effect/chorus-object-args.ts`で導入されたオブジェクト引数パターンが他のデモにどのように適用できるかを概観する。
   - Agent実行プロンプ:
     ```
     対象ファイル: src/demo/effect/chorus-object-args.ts, src/demo/effect/autofilter.ts, src/demo/effect/autopanner.ts, src/demo/effect/autowah.ts, src/demo/effect/bitcrusher.ts, src/demo/effect/chebyshev.ts, src/demo/effect/distortion.ts, src/demo/effect/feedbackdelay.ts, src/demo/effect/freeverb.ts, src/demo/effect/frequencyshifter.ts, src/demo/effect/jcreverb.ts, src/demo/effect/phaser.ts, src/demo/effect/pingpongdelay.ts, src/demo/effect/pitchshift.ts, src/demo/effect/reverb.ts, src/demo/effect/stereowidener.ts, src/demo/effect/tremolo.ts, src/demo/effect/vibrato.ts

     実行内容: `src/demo/effect/chorus-object-args.ts`で示されているエフェクトの初期化とオプション設定におけるオブジェクト引数パターンを分析し、他の`src/demo/effect/`配下のTypeScriptファイルが同様のパターンに移行可能であるかを評価してください。移行が推奨されるファイルについて、その理由と具体的な変更の方向性（コードスニペット例を含む）をMarkdown形式で記述してください。

     確認事項:
     - 各エフェクトデモで`Tone.js`エフェクトがどのようにインスタンス化され、パラメータが設定されているか。
     - オプション設定の現在の多様性。
     - 変更が既存のデモ動作に影響を与えないこと。

     期待する出力: オブジェクト引数パターンへの移行を提案するエフェクトデモファイルのリストと、その具体的な移行方針、そして代表的な一つのファイルに対する変更前後のコードスニペットを含む、詳細な分析レポートをMarkdown形式で出力してください。
     ```

---
Generated at: 2026-02-11 07:20:46 JST
